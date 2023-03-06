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

    /** 
  
      Inicializa a exibição da data e hora atualizável na calculadora e atualiza a cada segundo.
        @function
        @name initialize
        @returns {void}
    */
    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
        this.setLastNumberToDisplay()
    }

    /**
        Inicia o listener de eventos do teclado, que verifica os eventos de teclas pressionadas
        e executa a ação correspondente à tecla pressionada. As teclas permitidas são:
    
        Escape: limpa toda a operação.
        Backspace: limpa o último número inserido.
        / - % + *: adiciona a operação correspondente.
        . , : adiciona um ponto decimal ao último número da operação.
        Enter = : realiza o cálculo da operação.
        0-9: adiciona o número correspondente na operação.
    
        @function
        @name initKeyboard
        @returns {void}
    */
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


    /** 
      
      Define a data e a hora atual para exibição na calculadora.
     
        @function
        @name setDisplayDateTime
        @returns {void}
    */
    setDisplayDateTime() {
        this.displayDate =
            this.currentDate.toLocaleDateString(this._locale);
        this.displayTime =
            this.currentDate.toLocaleTimeString(this._locale);
    }


    /** 

        Adiciona ouvintes de eventos a um elemento para vários eventos.
    
        Este método adiciona ouvintes de eventos a um elemento para vários eventos especificados em uma string separada por espaços.
        Os ouvintes de eventos são adicionados usando o método forEach do array de eventos.
    
        @function
        @name addEventListenerAll
        @param {Element} element - O elemento ao qual os ouvintes de eventos serão adicionados.
        @param {string} events - Uma string contendo os nomes dos eventos separados por espaços.
        @param {function} fn - A função que será executada quando qualquer um dos eventos for acionado.
    */
    addEventListenerAll(element, events, fn) {
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn);
        });
    }
    /** 
        Remove todas as operações armazenadas na memória da calculadora e atualiza a exibição do visor para 0.

        @function
        @name clearAll
        @returns {void}
    */
    clearAll() {
        this._operation = [];
        this._lastNumber = '';
        this._lastOperator = ''
        this.setLastNumberToDisplay();
    }

    /** 
        Remove a última entrada da memória.
        
        @function
        @name clearEntry
    */
    clearEntry() {
        this._operation.pop();
        this.setLastNumberToDisplay();
    }

    /** 
        Define a exibição para mostrar "Erro".
    
        @function
        @name setError
    */
    setError() {
        this.displayCalc = "Error";
    }

    /**
     Adiciona um ponto decimal ao último número na operação.
    
     Se o último item na operação for um operador ou não houver item na operação,
     adiciona um "0." na operação. Caso contrário, adiciona um ponto decimal ao último número.
    
     @function
     @name addDot
     @returns {void}
   */
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

    /** 
        Retorna o último valor adicionado ao array de operação.
        
        @function
        @name getLastOperation
        @returns {number|string} - O último valor adicionado ao array de operação.
    */
    getLastOperation() {
        return this._operation.slice(-1)[0];
    }


    /** 
      Verifica se o valor é um operador matemático.
      
        @function
        @name isOperator
        @param {string} value - O valor a ser verificado.
        @returns {boolean} - Retorna true se o valor for um operador matemático e false caso contrário.
    */
    isOperator(value) {
        return ['+', '-', '*', '%', '/'].includes(value);
    }




    /**
         
        Obtém o resultado da operação atual na calculadora.
        @function
        @returns {number} O resultado da operação.
  */
    getResult() {
        try {
            // Converte a operação em uma string e a avalia com a função eval().
            return eval(this._operation.join(""));
        } catch (e) {
            // Em caso de erro, define a calculadora como erro.
            this.setError();
        }
    }


    /** 
        Calcula o resultado da operação atual e atualiza o array de operações com o resultado e o último valor.
        @function
        @name calc
        @returns {void}
    */
    calc() {
        let last = '';
        this._lastOperator = this.getLastItem();

        // Se a operação atual tiver menos de 3 itens, adiciona o último valor à operação.
        if (this._operation.length < 3) {
            let firstItem = this._operation[0];
            this._operation = [firstItem, this._lastOperator, this._lastNumber];
        }

        // Se a operação atual tiver mais de 3 itens, remove o último item e calcula o resultado.
        if (this._operation.length > 3) {
            last = this._operation.pop();
            this._lastNumber = this.getResult();
        } else if (this._operation.length == 3) {
            this._lastNumber = this.getLastItem(false);
        }

        let result = this.getResult();

        // Se o último item for um operador de porcentagem, divide o resultado por 100.
        if (last == '%') {
            result /= 100;
            this._operation = [result];
        } else {
            // Adiciona o último item de volta à operação.
            this._operation = [result];
            if (last) this._operation.push(last);
        }

        // Atualiza a tela da calculadora com o último número digitado.
        this.setLastNumberToDisplay();
    }

    /** 
     
        Adiciona uma nova operação ao array de operações. Se o tamanho do array for maior que 3, chama a função calc() para calcular o resultado.
        @function
        @name   pushOperation
        @param {*} value - O valor a ser adicionado ao array de operações.
        @returns {void}
    */
    pushOperation(value) {
        this._operation.push(value);
        if (this._operation.length > 3) {
            this.calc();
          
        }
    }

    /** 
        Define o valor do último item da operação com o valor especificado.
        @function
        @name setLastOperation
        @param {number} value - Valor a ser atribuído ao último item da operação.
    */

    setLastOperation(value) {
        this._operation.pop();
        this._operation.push(value);
    }

    /**
       Retorna o último item adicionado à matriz de operações que corresponde aos critérios especificados.
       @function
       @name getLastItem
       @param {boolean} [isOperator = true] - Indica se o último item deve ser um operador.
       @returns {(number | string | undefined)} - O último item que corresponde aos critérios especificados, ou undefined se não houver item correspondente.
  */
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



    /**
        Define o último número a ser exibido na calculadora.
        @function
        @returns {void}
    */
    setLastNumberToDisplay() {
        // Obtém o último item digitado pelo usuário.
        let lastNumber = this.getLastItem(false);

        if (!lastNumber) {
            lastNumber = 0;
        }

        // Define o valor do último número na calculadora.
        this.displayCalc = lastNumber;
    }


    /** 
     Adiciona um valor à operação atual ou atualiza o último operador.
     Se a última operação não for um número, trata como uma string.
     Se o valor for um operador, troca o último operador pelo novo valor.
     Se o valor não for um operador, adiciona-o à operação como uma nova string.
     Se a última operação for um número, adiciona o valor atual a ele.
      
     @function
     @name addOperation
     @param {number|string} value - O valor a ser adicionado à operação atual.
     @returns {void}
     */
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


    /**
        Executa a ação correspondente ao valor do botão clicado ou arrastado pelo usuário.
        Se o valor for 'c', chama o método clearAll.
        Se o valor for 'ce', chama o método clearEntry.
        Se o valor for um número de 0 a 9, chama addOperation com parseInt(value) como argumento.
        Se o valor for um dos operadores (+, -, *, /, %), chama addOperation com o operador como argumento.
        Se o valor for um ponto '.', chama addOperation com o ponto como argumento.
        Para todos os outros casos, chama o método setError.

        @function
        @name execBtn
        @param {string} value - Valor do botão clicado ou arrastado pelo usuário.
        @returns {void}
    */
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


    /** 
        Inicializa os ouvintes de eventos de clique e arrasto para todos os botões com o atributo 'data-btn'.
        Os botões são obtidos usando um seletor de consulta e armazenados como uma propriedade da classe para fácil acesso.
        Os ouvintes de eventos são adicionados usando o método forEach do array de botões e
        o método addEventListenerAll desta classe. Quando clicado ou arrastado,
        chama execBtn com dataset.btn como argumento.
     
        @function
        @name initButtonsEvents
    */
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
