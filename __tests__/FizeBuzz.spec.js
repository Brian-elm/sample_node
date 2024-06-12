const FizzBuzz = require('../FizzBuzz');

describe('FizzBuzz', () => {
    it('returns "FizzBuzz" if number is divisible by 3 and 5', () => {
        expect(FizzBuzz.getOutput(15)).toBe('FizzBuzz');
    });

    it('returns "Fizz" if number is divisible by 3', () => {
        expect(FizzBuzz.getOutput(3)).toBe('Fizz');
    });

    it('returns "Buzz" if number is divisible by 5', () => {
        expect(FizzBuzz.getOutput(5)).toBe('Buzz');
    });

    it('throws an error if number is greater than or equal to 1000', () => {
        expect(() => FizzBuzz.getOutput(1000)).toThrow('Number should not be greater than 1000');
    });

    it('returns the number as a string if none of the above conditions are met', () => {
        expect(FizzBuzz.getOutput(7)).toBe('7');
    });
});
