class Calculator {
    constructor(
        previousOperandTextElement, currentOperandTextElement
    ) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear ()
    }

    clear() {
        this.previousOperand = "";
        this.currentOperand = 0
        this.operation = undefined;
    }

    delete () {
        this.currentOperand = this.currentOperand.slice(0, -1)
    }
    
    chooseOperation (operation) {
        if (this.currentOperand === "") return
        if (this.previousOperand !== "") {
            this.compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let result
        const first = parseFloat(this.previousOperand)
        const second = parseFloat(this.currentOperand)
        if (isNaN(first) || isNaN(second)) return
        switch (this.operation) {
            case "+":
                result = first + second
                break
            case "-":
                result = first - second
                break
            case "*":
                result = first * second
                break
            case "÷":
                result = first / second
                break
            case "√":
                result = Math.sqrt(second)
                break
            default: 
                return
        }
        this.previousOperand = ""
        this.currentOperand = result
        this.operation = undefined
    }
       


    appendNumber(number) {
        if (number === "." && this.currentOperand.includes(".")) return
        if (this.currentOperand === 0) { 
            this.currentOperand = (this.currentOperand.toString()).replace("0", number)
        } else {
            this.currentOperand = this.currentOperand.toString() + number.toString()}
        
    }

    

    // tweakDisplay(input) {
    //     let integerDigits
    //     let decimalDigits
    //     let finalDigits
    //     var result = this.currentOperand
    //     // if (isNaN(integerDigits)) {return integerDigits = ""}
    //     if (result) {
    //         integerDigits = (input.toString()).split(".")[0]
    //         decimalDigits = (input.toString()).split(".")[1]
    //         finalDigits = (parseFloat(integerDigits)).toLocaleString("en")
    //         return `${finalDigits.toString()}.${decimalDigits}`
    //     } else {
    //         return ((parseFloat(input)).toLocaleString("en")).toString()
    //     }
       
    // 

    tweakDisplay(input) {
        const numberToString = input.toString()
        const numberInteger = parseFloat(numberToString.split(".")[0])
        const numberDecimal = numberToString.split(".")[1]
        let finalDisplay
        if (isNaN(numberInteger)) {
            finalDisplay = ""
        }  else {
            finalDisplay = numberInteger.toLocaleString("en-US", {maximumFractionDigits: 10})
        }
        if (numberDecimal != null) {
            return `${finalDisplay}. ${numberDecimal}`
        } else {
            return  finalDisplay
        }
    }
 

    output() {
        if (this.currentOperand === "0" || this.currentOperand === "" || this.previousOperand === "") return
            this.compute()
            // this.operation = operation
            // this.currentOperand = this.previousOperand
            // this.previousOperand = ""
    }

    sqrtOutput() {
        if (this.currentOperand === "0" || this.currentOperand === "" || this.previousOperand !== "" || this.currentOperand < 0) return
        let result
        result = Math.sqrt(parseFloat(this.currentOperand))
        this.currentOperand = result
    }


    percentOutput() {
        if (this.currentOperand === "0" || this.currentOperand === "") return
        let result
        if (this.previousOperand !== "") {
            this.compute()
            // this.operation = operation
            // this.currentOperand = this.previousOperand
            // this.previousOperand = ""
            result = (this.currentOperand) / 100
        } else {
            result = (this.currentOperand) / 100
        }
        this.currentOperand = result        
    }


    negateDisplay() {
        if (this.currentOperand === "0") return
        let number, result
        number = parseFloat(this.currentOperand)
        result = 0 - number
        this.currentOperand = result
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.tweakDisplay(this.currentOperand)
        if (this.operation == null) {
            this.previousOperandTextElement.innerText = ""} else {
            this.previousOperandTextElement.innerText = `${this.tweakDisplay(this.previousOperand)}${this.operation}`
        }
    }
    
}


const numberButtons = document.querySelectorAll("[data-number]")
const operationButtons = document.querySelectorAll("[data-operation]")
const negateButton = document.querySelector("[data-negate]")
const clearButton = document.querySelector("[data-clear]")
const deleteButton = document.querySelector("[data-delete]")
const historyButton = document.querySelector("[data-history]")
const previousOperandTextElement = document.querySelector("[data-previous-operand]")
const currentOperandTextElement = document.querySelector("[data-current-operand]")
const equalsButton = document.querySelector("[data-equals]")
const sqrtButton = document.querySelector("[data-sqrt]")
const percentButton = document.querySelector("[data-percent]")


const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", () => {
    calculator.output()
    calculator.updateDisplay()
})

sqrtButton.addEventListener("click", () => {
    calculator.sqrtOutput()
    calculator.updateDisplay()
})

clearButton.addEventListener("click", () => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", () => {
    calculator.delete()
    calculator.updateDisplay()
})

percentButton.addEventListener("click", () => {
    calculator.percentOutput()
    calculator.updateDisplay()
})

negateButton.addEventListener("click", () => {
    calculator.negateDisplay()
    calculator.updateDisplay()
})

