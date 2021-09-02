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

    output() {
        if (this.currentOperand === "0" || this.currentOperand === "" || this.previousOperand === "") return
            this.compute()
            this.operation = operation
            this.currentOperand = this.previousOperand
            this.previousOperand = ""
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        this.previousOperandTextElement.innerText = this.previousOperand
       
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


const calculator = new Calculator (previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener("click", e => {
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


clearButton.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

deleteButton.addEventListener("click", button => {
    calculator.delete()
    calculator.updateDisplay()
})