# Unholy C

Unholy C is a programming "language" written in node.js. It is the complete opposite of Holy C.

## Installation

To install Unholy C (?? why) you can clone the git repository. Code is written in index.unholyc and unholy.js is the interpreter.

```bash
git clone https://github.com/sleepybaby898/unholy-c.git
cd unholy-c
node unholy.js
```

## Usage

```java
// returns '-3'
systemutilsunholycsubtractnumbers_58 // Unholy C can only add/subtract 2 single digit numbers

// returns '13'
systemutilsunholycaddnumbers_58

// returns 'hello, world!'
systemutilsunholycoutputtext_*hello, world!*
```

Variables can <b><ins>ONLY</ins></b> be get, and set. They cannot be used within your code (for inconvenience). Their sole purpose is debugging, so Unholy C will only print the value of a variable.

```java
// returns nothing
systemutilsunholycsetvariable_*atest*

// returns 'test'
systemutilsunholycgetvariable_*a*

```

## Description and Detailed Syntax
Unholy C has next to no error logging (and most errors are very indescriptive), so it is important that you follow syntax rules.

Ignored characters are `| and _`. This means that you cannot use spaces in Unholy C. All code must be written in one line, newlines are not allowed therefore to seperate your code you can use the `|` character. An error will be thrown if you do put a new line, as the lexer cannot read newlines (feature).

To write a string, you must use asterisks rather than quotes. An example of a string is `*hello, world!*`
In most functions which use strings, you put an _ after the function (no brackets etc.), and then the argument you want to pass into the function.

There are no operators in Unholy C, therefore functions must be created to conduct mathematical operations. subtractnumbers and addnumbers are examples. When using numbers in Unholy C, they can only be single digit, so `5+8` becomes `systemutilsunholycaddnumbers_58`.

For a more indepth understanding of Unholy C, take a look at `unholy.js`, which contains the parser and lexer

## Contributing

Pull requests are welcome. Feel free to update or fix bug throughout the compiler. Also feel free to introduce new functions (make sure they are basic functions, not nice-to-haves)

## License

[MIT](https://choosealicense.com/licenses/mit/)