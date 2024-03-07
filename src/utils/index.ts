export const capitalizeFirstLetterOfWords = (sentence: string) => {
  // Split the sentence into an array of words
  let words = sentence.split(' ');

  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    // Capitalize the first letter of each word
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back into a sentence
  return words.join(' ');
};
