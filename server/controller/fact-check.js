// const { predictFakeNews } = require("../fact-check/predict");
const axios = require('axios');
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const GOOGLE_API_KEY = 'AIzaSyCUJuKz_nAbIHb45SYKImwkfB2yhyfiQWA';
const News = require("../models/news");
const User = require("../models/user");
const GOOGLE_FACT_CHECK_URL = 'https://factchecktools.googleapis.com/v1alpha1/claims:search';
async function factCheck(req, res, next){
    // req.params.id
    const { text } = req.body;
    const result = await predictFakeNews(text);
    res.json({ prediction: result });

    // res.status(200).json({
    //     status: "success",
    //     message: "Inserted one user",
    //   });
}

async function factCheck(req, res, next){
    
    const { article } = req.body;
    
    if (!article) {
        return res.status(400).send('Article content is required.');
    }

    try{
        const response = await axios.get(GOOGLE_FACT_CHECK_URL, {
            params: {
              query: article,
              key: GOOGLE_API_KEY,
            },
          });
            // Handle the response and provide a result
    if (response.data?.claims.length == 0) {
        return res.json({ message: 'No fact-checks found for this article.' });
      }
      const jwtToken = req.headers["authorization"] || req.body.headers.Authorization;
      const token = jwt.decode(jwtToken);
      const userId = new mongoose.Types.ObjectId(token._id); 
      const claims = response.data.claims;

      await News.create({
        article: article,
        claims: claims,
        created_by: userId
      });

      res.status(200).json({
        status: "success",
        data: claims
      });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error processing the request.');
    }
}


const getfactCheck = async (req, res, next) => {

  try{

  const jwtToken = req.headers["authorization"] || req.body.headers.Authorization;
  const token = jwt.decode(jwtToken);
  const userId = new mongoose.Types.ObjectId(token._id); 
  const news = await News.find({ created_by: userId });
  res.status(200).json({
    status: "success",
    data: news
  });

} catch (error) {
    console.error(error);
    res.status(500).send('Error processing the request.');
}
}
module.exports = {
    factCheck,
    getfactCheck
}
