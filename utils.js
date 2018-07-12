const punctuations = ['.', ',', ';', '?', '!'];
function isPunctuation(value){
    return punctuations.indexOf(value.trim()) >= 0;
}

module.exports = {
    isPunctuation
}