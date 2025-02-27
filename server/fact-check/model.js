const tf = require('@tensorflow/tfjs-node');
const { loadDataset, encodeText } = require('./preprocess');
const path = require('path');
const MAX_LENGTH = 100; // Max words per input
const datasetPath = path.join(__dirname, 'fake_news.csv'); // Full path

// Define LSTM Model
const createModel = () => {
    const model = tf.sequential();
    
    model.add(tf.layers.embedding({ inputDim: 100, outputDim: 16, inputLength: MAX_LENGTH }));
    model.add(tf.layers.lstm({ units: 64, returnSequences: true }));
    model.add(tf.layers.lstm({ units: 32 }));
    model.add(tf.layers.dense({ units: 1, activation: 'sigmoid' }));

    model.compile({
        optimizer: 'adam',
        loss: 'binaryCrossentropy',
        metrics: ['accuracy']
    });

    return model;
};

// Train Model
const trainModel = async () => {
    const dataset = await loadDataset(datasetPath);
    
    const trainX = dataset.map(d => encodeText(d.text));
    const trainY = dataset.map(d => d.label);

    const xs = tf.tensor2d(trainX);
    const ys = tf.tensor2d(trainY, [trainY.length, 1]);

    const model = createModel();
    await model.fit(xs, ys, {
        epochs: 10,
        batchSize: 32,
        validationSplit: 0.2
    });

    console.log("TypeError: forwardFunc is not a function");

    console.log('Training Complete! Saving Model...');
    await model.save('file://fake_news_model');
};

module.exports = {
    trainModel
}
