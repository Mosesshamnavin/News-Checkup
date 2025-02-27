const tf = require('@tensorflow/tfjs-node');
const { preprocessText, encodeText } = require('./preprocess');

const MAX_LENGTH = 100;
let model;

// Load the trained model
const loadModel = async () => {
    model = await tf.loadLayersModel('file://fake_news_model/model.json');
    console.log('Model Loaded Successfully');
};

// Predict if news is Fake or Real
const predictFakeNews = async (inputText) => {
    if (!model) await loadModel();

    let processedText = preprocessText(inputText);
    let inputTensor = tf.tensor2d([encodeText(processedText)]);

    let prediction = model.predict(inputTensor);
    let result = await prediction.data();

    return result[0] > 0.5 ? 'Fake News' : 'Real News';
};

module.exports = {
    predictFakeNews
}
// Test Prediction
// predictFakeNews("Breaking: Scientists discover aliens on Mars!")
//     .then(result => console.log(result));
