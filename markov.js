/** Textual markov chain generator */


class MarkovMachine {

    /** build markov machine; read in text.*/

    constructor(text) {
        let words = text.split(/[ \r\n]+/);
        this.words = words.filter(c => c !== "");
        this.makeChains();
    }

    /** set markov chains:
     *
     *  for text of "the cat in the hat", chains will be
     *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

    makeChains() {
        let chains = new Map();

        for (let i = 0; i < this.words.length; i++) {
            let word = this.words[i]
            let nextWord = this.words[i + 1]

            if (chains.has(word)) {
                chains.get(word).push(nextWord)
            } else {
                chains.set(word, [nextWord])
            }
        }
        this.chains = chains
    }

    chooseWord(arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }

    /** return random text from chains */

    makeText(numWords = 100) {
        let keysArr = Array.from(this.chains.keys())
        let choice = this.chooseWord(keysArr)
        let nextWord = this.chains.get(choice)
        let outputArr = [];

        //
        for (let i = 0; i < numWords; i++) {
            if (outputArr.length < numWords && choice != undefined) {
                outputArr.push(choice)
                choice = this.chooseWord(nextWord)
                nextWord = this.chains.get(choice)
            }

        }
        console.log(outputArr.join(' '))
        return outputArr.join(' ')
    }
}

module.exports = { MarkovMachine };