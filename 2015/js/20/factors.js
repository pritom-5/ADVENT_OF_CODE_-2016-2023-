function getFactors(num) {
  const factors = [];

  // Loop through all numbers from 1 to the square root of the number.
  for (let i = 1; i <= Math.sqrt(num); i++) {
    // Check if the number is divisible by the current number.
    if (num % i === 0) {
      // Add the number to the factors array.
      factors.push(i);

      // If the number is not the square root, add the other factor to the array as well.
      if (i !== Math.sqrt(num)) {
        factors.push(num / i);
      }
    }
  }

  // Sort the factors in ascending order.
  factors.sort((a, b) => a - b);

  console.log(factors);
}

// Example usage
const number = 36;
getFactors(number);
