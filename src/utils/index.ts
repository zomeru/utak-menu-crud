export function capitalizeFirstLetterOfWords(sentence: string) {
  // Split the sentence into an array of words
  let words = sentence.split(' ');

  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    // Capitalize the first letter of each word
    words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
  }

  // Join the words back into a sentence
  return words.join(' ').trim();
}

export function formatOnlyNumbers(value: string) {
  const val = Number.isInteger(+value) ? value : value.slice(0, -1);

  return parseInt(val);
}

export function formatFloat(value: string) {
  const val = value.replace(/[^0-9.]/g, '');

  return parseFloat(val);
}

export function generateRandomString(length: number = 10) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export function keyGen() {
  const currentDate = new Date();
  const dateString = currentDate.toISOString(); // Get the current date and time in ISO format
  const randomString = generateRandomString(10); // Generate 10 random characters
  return `${dateString}-${randomString}`;
}
