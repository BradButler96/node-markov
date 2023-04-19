const { MarkovMachine } = require('./markov.js');
const { createText, fileToText, urlToText } = require('./makeText.js')
// const fs = require('fs')
// const process = require('process');
// const axios = require('axios');


function WordCount(str) { 
    return str.split(" ").length;
  }

test('create markov text from string input', function () {
    let txt = 'I would not like them Here or there. I would not like them Anywhere. I do not like Green eggs and ham. I do not like them, Sam-I-am'
    let res = createText(txt)
    let count = WordCount(res)
    expect(typeof res).toBe('string')
    expect(count).toBeLessThanOrEqual(100)
    expect(res).toContain('Sam-I-am')
})



