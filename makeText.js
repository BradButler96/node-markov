/** Command-line tool to generate Markov text. */
const { MarkovMachine } = require('./markov.js')
const fs = require('fs')
const process = require('process');
const axios = require('axios');

function createText(txt) {
    let markov = new MarkovMachine(txt)
    console.log(markov.makeText())
}

function fileToText(path) {
    fs.readFile(path, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error in ${path}: ${err}`)
            process.exit(1)
        } else {
            createText(data)
        }
    })
}

async function urlToText(url) {
    try {
        let res = await axios.get(url)
        createText(res.data)
    } 
    catch(err) {
        console.error(`Error when fetching ${url}: ${err}`)
        process.exit(1)
    }
}

let type = process.argv[2]
let path = process.argv[3]

if (type === 'file') {
    fileToText(path)
}

if (type === 'url') {
    urlToText(path)
}
