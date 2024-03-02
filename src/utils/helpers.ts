export function isEven(number: number) {
  return number % 2 === 0;
}
export function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function generateRandomNumber(
  maxDigits: number,
  allowNegative: boolean = false,
) {
  let result = 0;

  while (result === 0) {
    let randomNumber = '';

    for (let i = 0; i < maxDigits; i++) {
      const digit = Math.floor(Math.random() * 10);
      randomNumber += digit;
    }

    result = parseInt(randomNumber, 10);
  }

  return allowNegative ? (Math.random() < 0.5 ? -result : result) : result;
}
