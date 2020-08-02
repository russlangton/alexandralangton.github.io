// accessing the input data from the DOM

const poemTarget = document.getElementById('submit');

poemTarget.onclick = function () {
    let textBody = document.getElementById('textBody').value;
    let numLines = document.getElementById('numLines').value;
    const poem = writePoem(textBody, numLines);

    document.getElementById('poemReturn').textContent = poem;
    document.getElementById('poemHeader').style.display = 'block';
    document.getElementById('poemReturn').style.display = 'inline-block';
};

// The 'reset' button

const resetEvent = document.getElementById('reset');

resetEvent.onclick = function () {
    document.getElementById('poemHeader').style.display = 'none';
    document.getElementById('poemReturn').style.display = 'none';
}

// creating Markov Chain Object

const chainCreator = (splitText) => {
    let chain = {};

    for (let i = 0; i < splitText.length - 1; i++) {
        let word = splitText[i];
        let nextWord = splitText[i + 1];
        if (chain[word]) {
            chain[word].push(nextWord);
        } else {
            chain[word] = [nextWord];
        }
    }
    return chain;
}

// writing a single line

const writeLine = (chain, splitText) => {
    let line = [splitText[Math.floor(Math.random() * (splitText.length - 1))]];
    let lineLength = Math.random() * (10 - 6) + 6;
    let wordCount = 0;
    
    while (wordCount < lineLength) {
        let value = chain[line[wordCount]];
        if (value === undefined) {
	    console.log('VALUE: ', line[wordCount]);
	}
        if (value.length > 1) {
            line.push(value[Math.floor(Math.random() * value.length)]);
        } else {
            line.push(value[0]);
        }
        wordCount++;
    }
    
    // weed out any unfinished endings
    const notMyEnding = ['the', 'a', 'I', 'by', 'of', 'to', 'that', 'who', 'we', 'and', 'i\'m', 'its', 'for', 'we\'ve', 'we’ve', 'or'];

    while (notMyEnding.includes(line[line.length - 1])) {
        delete line[line.length - 1];
    }
    // capitalize the first letter of each line
    let fullLine = line.slice(1);
    let first = line[0];
    fullLine.unshift(`${first[0].toUpperCase()}${first.slice(1)}`);
    return fullLine.join(' ').trim();
}

// writing a full poem

const writePoem = (textBody, numLines) => {
    textBody += ' and'
    const splitText = textBody.toLowerCase().replace(/[.,?!)();(--)]/g, '').replace(/(\n)/g, ' ').replace(/ i /g, ' I ').split(' ');

    const chain = chainCreator(splitText);
    let poem = '';

    while (numLines > 0) {
        poem += writeLine(chain, splitText);
        if (numLines !== 1) poem += ',\n';
        numLines--;
    }
    return (poem += '.');
};
// console.log(writePoem(gettysburg, 8));
