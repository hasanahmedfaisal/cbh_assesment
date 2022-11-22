# Refactoring

You've been asked to refactor the function `deterministicPartitionKey` in [`dpk.js`](dpk.js) to make it easier to read and understand without changing its functionality. For this task, you should:

1. Write unit tests to cover the existing functionality and ensure that your refactor doesn't break it. We typically use `jest`, but if you have another library you prefer, feel free to use it.
2. Refactor the function to be as "clean" and "readable" as possible. There are many valid ways to define those words - use your own personal definitions, but be prepared to defend them. Note that we do like to use the latest JS language features when applicable.
3. Write up a brief (~1 paragraph) explanation of why you made the choices you did and why specifically your version is more "readable" than the original.

You will be graded on the exhaustiveness and quality of your unit tests, the depth of your refactor, and the level of insight into your thought process provided by the written explanation.

## Your Explanation Here
1. Segregated into individual functions each having single responsibility for better code readability and code extensability.
2. Moved constants together in order to look up constants related to the file at one place.
3. Replaced if-else with ternary operator for better code readability.
4. Method names which tells you what functions they perform, in order to understand what the function does without specifically looking at the logic of the function
5. Added test coverage to check the code coverage and if all the lines are covered from written tests.
