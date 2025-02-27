const { predictFakeNews } = require("../fact-check/predict");
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

module.exports = {
    factCheck
}
