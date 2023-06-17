class CalcController {
    constructor() {
        this._locale = 'pt-BR';
        this._lastOperator = ''
        this._lastNumber = ''
        this._lastOperator = null;
        this._dateEl = document.querySelector('[data-day]');
        this._timeEl = document.querySelector('[data-hour]');
        this._displayCalcEl = document.querySelector('[data-display]');
        this._buttons = document.querySelectorAll('[data-btn]');
        this._operation = []
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
        this.initKeyboard()
    }

    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay()
    }

    initKeyboard() {
        document.addEventListener('keyup', e => {


            switch (e.key) {
                case 'Escape':
                    this.clearAll();
                    break;
                case 'Backspace':
                    this.clearEntry();
                    break;
                case '*':
                case '-':
                case '/':
                case '%':
                case '/':
                case '+':
                    this.addOperation(e.key);
                    break;
                case '.':
                case ',':
                    this.addDot();
                    break;
                case 'Enter':
                case '=':
                    this.calc();
                    break;
                case '0':
                case '1':
                case '2':
                case '3':
                case '4':
                case '5':
                case '6':
                case '7':
                case '8':
                case '9':
                    this.addOperation(parseInt(e.key));
                    break;
            }

        });

    }

    setDisplayDateTime() {
        this.displayDate =
            this.currentDate.toLocaleDateString(this._locale);
        this.displayTime =
            this.currentDate.toLocaleTimeString(this._locale);
    }

    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn);
        });
    }
 
    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = ''
        this.setLastNumberToDisplay();
    }

    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    setError() {
        this.displayCalc = "Error";
    }

    addDot() {
        const lastOperation = this.getLastOperation();

        if (typeof lastOperation === 'string' && lastOperation.indexOf('.') > -1) {
            return
        }

        if (this.isOperator(lastOperation) || !lastOperation) {
            this.pushOperation('0.');
        } else {
            const lastNumberWithDot = `${lastOperation}.`;
            this.setLastOperation(lastNumberWithDot);
        }

        this.setLastNumberToDisplay();

    }

    getLastOperation() {
        return this._operation.slice(-1)[0];
    }

    isOperator(value) {
        return ['+', '-', '*', '%', '/'].includes(value);
    }

    getResult() {
        try {
            return eval(this._operation.join(""));
        } catch (e) {
            this.setError();
        }
    }

    calc() {
        let last = '';
        this._lastOperator = this.getLastItem();

        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            this._operation = [result];
            if (last) this._operation.push(last);
        }
        this.setLastNumberToDisplay();
    }

    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();

        }
    }

    setLastOperation(value) {
        this._operation.pop();
        this._operation.push(value);
    }

    getLastItem(isOperator = true) {
        const lastItemIndex = this._operation
            .slice()
            .reverse()
            .findIndex((item) => this.isOperator(item) === isOperator);
        if (lastItemIndex === -1) {
            return isOperator ? this._lastOperator : this._lastNumber;
        }
        return this._operation[this._operation.length - 1 - lastItemIndex];
    }
    setLastNumberToDisplay() {
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) {
            lastNumber = 0;
        }
        this.displayCalc = lastNumber;
    }

    addOperation(value) {
        const lastOperation = this.getLastOperation();

        if (isNaN(lastOperation)) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else if (!isNaN(value)) {
                this.pushOperation(value);
                this.setLastNumberToDisplay();
            }
        } else {
            if (!this.isOperator(value)) {
                const newValue = `${lastOperation}${value}`;
                this.setLastOperation(newValue);
                this.setLastNumberToDisplay();
            } else {
                this.pushOperation(value);
            }
        }

    }
    execBtn(value) {
        switch (value) {
            case 'c':
                this.clearAll();
                break;
            case 'ce':
                this.clearEntry();
                break;
            case 'percnt':
                this.addOperation('%');
                break;
            case 'sol':
                this.addOperation('/');
                break;
            case 'times':
                this.addOperation('*');
                break;
            case 'minus':
                this.addOperation('-');
                break;
            case 'plus':
                this.addOperation('+');
                break;
            case 'period':
                this.addDot('.');
                break;
            case 'equals':
                this.calc();
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addOperation(parseInt(value));
                break;
            default:
                this.setError();
                break;
        }
    }

    initButtonsEvents() {
        const buttons = this._buttons;
        buttons.forEach((btn) => {
            this.addEventListenerAll(btn, 'click drag', () => {
                this.execBtn(btn.dataset.btn);
            });
        });
    }

    get displayTime() {
        return this._timeEl.innerHTML = time;
    }

    set displayTime(time) {
        this._timeEl.innerHTML = time;
    }

    get displayDate() {
        return this._dateEl.innerHTML;
    }

    set displayDate(date) {
        return this._dateEl.innerHTML = date;
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML;
    }

    set displayCalc(value) {
        if (value.toString().length > 22) {
            this.setError()
            return false
        }
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(date) {
        this._currentDate = date;
    }
}
