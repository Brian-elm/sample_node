// __tests__/index.spec.js
const { add, subtract, multiply, divide, isEven } = require('../index');

// Default
describe('Default test', () => {
  test('hello_world', () => {
    expect(true).toBe(true);
  });
});

describe('Math functions', () => {
  describe('Addition', () => {
    test('adds 1 + 2 to equal 3', () => {
      expect(add(1, 2)).toBe(3);
    });
  });

  describe('Subtraction', () => {
    test('subtracts 5 - 3 to equal 2', () => {
      expect(subtract(5, 3)).toBe(2);
    });
  });

  describe('Multiplication', () => {
    test('multiplies 2 * 3 to equal 6', () => {
      expect(multiply(2, 3)).toBe(6);
    });
  });

  describe('Division', () => {
    test('divides 6 / 3 to equal 2', () => {
      expect(divide(6, 3)).toBe(2);
    });

    test('division by zero throws error', () => {
      expect(() => divide(6, 0)).toThrow('Division by zero');
    });
  });
});

describe('Utility functions', () => {
  describe('isEven', () => {
    test('checks if 4 is even', () => {
      expect(isEven(4)).toBe(true);
    });

    test('checks if 5 is not even', () => {
      expect(isEven(5)).toBe(false);
    });
  });
});
