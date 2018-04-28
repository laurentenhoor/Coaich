var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var Promise = require('promise');

module.exports = class ToneAnalyzer {

    constructor() {
        this.toneAnalyzer = new ToneAnalyzerV3({
            "url": "https://gateway.watsonplatform.net/tone-analyzer/api",
            "username": "d7e547c7-ddd0-4b8b-be0f-c0bbb2301112",
            "password": "ZXlZw38SknBS",
            "version": "2017-09-21"
          });
    }

    analyze(text) {
        console.log('Analyze tone in Watson. Text:', text);
        return new Promise((resolve, reject) => {
            this.toneAnalyzer.tone(this.compileParams(text), function (error, response) {
                if (error)
                  reject(error)
                else
                  resolve(JSON.stringify(response, null, 2));
                }
              );
        })
        
    }

    compileParams(text) {
        return {
            'tone_input': { 'text': text },
            'content_type': 'application/json'
        };
    }

}