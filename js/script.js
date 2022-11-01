
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    const colorCodeLength = 6
    for (let i = 0; i < colorCodeLength; i++) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function randomChoice(choices) {
    var index = getRandomInt(0, choices.length - 1)

    return [choices[index], index];
}

function shuffle(array) {
    let currentIndex = array.length
    let randomIndex;
    while (currentIndex != 0) {
        randomIndex = getRandomInt(0, currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export {
    getRandomColor, getRandomInt, randomChoice, shuffle
}