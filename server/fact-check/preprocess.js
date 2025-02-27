const fs = require('fs');
const csv = require('csv-parser');
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const MAX_LENGTH = 100; // Maximum words per input

// Load dataset from CSV file
const loadDataset = async (filePath) => {
    return new Promise((resolve, reject) => {
        let dataset = [];
        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (row) => {
                dataset.push({
                    text: preprocessText(row.text),
                    label: parseInt(row.label) // 1 = Fake, 0 = Real
                });
            })
            .on('end', () => resolve(dataset))
            .on('error', (error) => reject(error));
    });
};

// Text Preprocessing
const preprocessText = (text) => {
    return tokenizer.tokenize(text.toLowerCase()).join(' ');
};

// Convert text into vector format
const encodeText = (text) => {
    let words = text.split(' ');
    let vector = new Array(MAX_LENGTH).fill(0);
    words.forEach((word, i) => {
        if (i < MAX_LENGTH) vector[i] = word.charCodeAt(0) % 100;
    });
    return vector;
};

module.exports = { loadDataset, preprocessText, encodeText };
