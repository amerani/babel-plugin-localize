const punctuations = ['.', ',', ';', '?', '!'];

function isPunctuation(value) {
  return punctuations.includes(value.trim());
}

module.exports = {
  isPunctuation,
};
