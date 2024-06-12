class FizzBuzz {
    static getOutput(number) {
        if (number >= 1000)
            throw new Error('Number should not be greater than 1000')

        if (number % 3 === 0 && number % 5 === 0)
            return "FizzBuzz"

        if (number % 3 === 0)
            return "Fizz"

        if (number % 5 === 0)
            return "Buzz"

        return number.toString()
    }
}

module.exports = FizzBuzz