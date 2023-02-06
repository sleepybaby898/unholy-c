const fs = require('fs')
const path = require('path')

class unholy {
    constructor(code) {
        this.code = code
        this.vars = []
    }
    tokenize() {
        const length = this.code.length
        let pos = 0
        let tokens = []
        const BUILT_IN_KEYWORDS = ["systemutilsunholycoutputtext", "systemutilsunholycaddnumbers", "systemutilsunholycsubtractnumbers", "systemutilsunholycsetvariable", "systemutilsunholycgetvariable", "systemutilsunholycmultiplynumbers", "systemutilsunholycdividenumbers"]
        const varChars='abcdefghijklmnopqrstuvwxyz~'
        const numbers='1234567890'
        while (pos < length) {
            let currentChar = this.code[pos]
            // if its "space" or newline then continue
            if(currentChar === "\n") {
                return console.log("NEWLINES ARE NOT ALLOWED IN UNHOLY C --")
            }
            if(currentChar === "_" || currentChar === "|" || currentChar === "\r") {
                pos++
                continue
            } else if (currentChar === '*') {
                // if char is * then it's a string
                let res = ""
                pos++
                while(this.code[pos] !== '*' && this.code[pos] !== '\n' && pos < length) {
                    res += this.code[pos]
                    pos++
                }
                if (this.code[pos] !== '*') {
                    return {
                        error: 'didnt finish the string'
                    }
                }
                pos++
                tokens.push({
                    type: "string",
                    value: res
                })
            } else if (varChars.includes(currentChar)) {
                let res = currentChar
                pos++
                while (varChars.includes(this.code[pos]) && pos < length) {
                    res += this.code[pos]
                    pos++
                }
                if (!BUILT_IN_KEYWORDS.includes(res)) {
                    return {
                        error: `lol what is ${res}`
                    }
                }
                // add keyword to tokens
                tokens.push({
                    type: "keyword",
                    value: res
                })
            } else if (numbers.includes(currentChar)) {
                let res = currentChar
                pos++
                while (numbers.includes(this.code[pos]) && pos < length) {
                    res += this.code[pos]
                    pos++
                }
                tokens.push({
                    type: "number",
                    value: res
                })
            } else { // person who wrote code is dumb
                return {
                    error: `Unexpected character at ${this.code[pos]}`
                }
            }
        }
        return {
            error: false,
            tokens
        }
    }
    parse(tokens){
        const len = tokens.length
        let pos = 0
        while(pos < len) {
            const token = tokens[pos]
            if(token.type === "keyword" && token.value === "systemutilsunholycoutputtext") {
                if(!tokens[pos + 1]) {
                    return console.log("unexpected EOL, expected a string")
                }

                let isString = tokens[pos + 1].type === "string"

                if(!isString) {
                    return console.log(`expected a string ? u are stupid`)
                }
                console.log('\x1b[35m%s\x1b[0m', tokens[pos + 1].value) // horror

                pos += 2 // add 2 because the check after print keyword is already checked
            } else if (token.type === "keyword" && token.value === "systemutilsunholycaddnumbers") {
                if (!tokens[pos + 1]) {
                    return console.log("Unexpected EOL, expected a number")
                }
                let isNum = tokens[pos + 1].type === "number"
                if(!isNum) {
                    return console.log(`expected number`)
                }
                console.log('\x1b[35m%s\x1b[0m', (Number(tokens[pos + 1].value[0]) + Number(tokens[pos+1].value[1])).toString())

                pos += 2
            } else if (token.type === "keyword" && token.value === "systemutilsunholycsubtractnumbers") {
                if (!tokens[pos + 1]) {
                    return console.log("Unexpected EOL, expected a number")
                }
                let isNum = tokens[pos + 1].type === "number"
                if(!isNum) {
                    return console.log(`expected number`)
                }
                console.log('\x1b[35m%s\x1b[0m', (Number(tokens[pos + 1].value[0]) - Number(tokens[pos+1].value[1])).toString())

                pos += 2
            } else if (token.type === "keyword" && token.value === "systemutilsunholycsetvariable") {
                if (!tokens[pos + 1]) {
                    return console.log("Unexpected EOL, expected a string")
                }
                let isString = tokens[pos + 1].type === "string"
                if(!isString) {
                    return console.log(`expected string`)
                }

                this.vars.push({
                    name: `${tokens[pos + 1].value[0]}`,
                    value: `${tokens[pos + 1].value.slice(1)}`
                })

                pos += 2
            } else if (token.type === "keyword" && token.value === "systemutilsunholycgetvariable") {
                if (!tokens[pos + 1]) {
                    return console.log("Unexpected EOL, expected a string")
                }
                let isString = tokens[pos + 1].type === "string"
                if(!isString) {
                    return console.log(`expected string`)
                }

                for(let i=0; i<this.vars.length; i++) {
                    if(this.vars[i].name.toString() == tokens[pos + 1].value) {
                        return console.log('\x1b[35m%s\x1b[0m', this.vars[i].value)
                    } else {
                        continue;
                    }
                }
                console.log("???????")
                pos += 2
            } else if (token.type === "keyword" && token.value === "systemutilsunholycmultiplynumbers") {
                if (!tokens[pos + 1]) {
                    return console.log("Unexpected EOL, expected a number")
                }
                let isNum = tokens[pos + 1].type === "number"
                if(!isNum) {
                    return console.log(`expected number`)
                }
                console.log('\x1b[35m%s\x1b[0m', (Number(tokens[pos + 1].value[0]) * Number(tokens[pos+1].value[1])).toString())

                pos += 2
            } else if (token.type === "keyword" && token.value === "systemutilsunholycmultiplynumbers") {
                if (!tokens[pos + 1]) {
                    return console.log("Unexpected EOL, expected a number")
                }
                let isNum = tokens[pos + 1].type === "number"
                if(!isNum) {
                    return console.log(`expected number`)
                }
                console.log('\x1b[35m%s\x1b[0m', (Number(tokens[pos + 1].value[0]) / Number(tokens[pos+1].value[1])).toString())

                pos += 2
            } else {
                return console.log(`Unexpected token ${token.type}`)
            } 
        }
    }
    run() {
        const {
            tokens,
            error
        } = this.tokenize()
        if (error) {
            console.log(error)
            return
        }
        this.parse(tokens)
    }
}

const code = fs.readFileSync(path.join(__dirname, 'index.unholyc'), 'utf8').toString()
const coderunner= new unholy(code)
coderunner.run()
