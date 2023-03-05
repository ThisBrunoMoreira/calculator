class CalcController {
    constructor() {
        this._locale = 'pt-BR';

        this._dateEl = document.querySelector('[data-day]');
        this._timeEl = document.querySelector('[data-hour]');
        this._displayCalcEl = document.querySelector('[data-display]');
        this._buttons = document.querySelectorAll('[data-btn]');
        this._operation = []
        this._currentDate;
        this.initialize();
        this.initButtonsEvents();
    }

    /*
  
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
    }

    /*
      
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


    /*

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
    /*
      Limpa todas as operações da memória.
     
      @function
      @name clearAll
    */
    clearAll() {
        this._operation = [];
    }

    /*
        Remove a última entrada da memória.
        
        @function
        @name clearEntry
    */
    clearEntry() {
        this._operation.pop();
    }

    /*
        Define a exibição para mostrar "Erro".

        @function
        @name setError
    */
    setError() {
        this.displayCalc = "Error";
    }

    /*
        Retorna o último valor adicionado ao array de operação.
        
        @function
        @name getLastOperation
        @returns {number|string} - O último valor adicionado ao array de operação.
    */
    getLastOperation() {
        return this._operation.slice(-1)[0];
    }


    /*
      Verifica se o valor é um operador matemático.
      
        @function
        @name isOperator
        @param {string} value - O valor a ser verificado.
        @returns {boolean} - Retorna true se o valor for um operador matemático e false caso contrário.
    */
    isOperator(value) {
        return ['+', '-', '*', '%', '/'].includes(value);
    }



    /*
   
        Calcula o resultado da operação atual e atualiza o array de operações com o resultado e o último valor.
        @name    calc
        @returns {void}
   
    */
    calc() {
        const last = this._operation.pop();
        const result = eval(this._operation.join(""));
        this._operation = [result, last];
    }
    /*
     
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
            console.log('pushOperation', this._operation);
        }
    }

    /*
    Define o valor do último item da operação com o valor especificado.
     
     
         @function
        @name setLastOperation
        @param {number} value - Valor a ser atribuído ao último item da operação.
    */

    setLastOperation(value) {
        this._operation.pop();
        this._operation.push(value);
    }

    /*
        Adiciona valor à operação atual ou atualiza o último operador.
        Se a última operação não for um número, trate como uma string.
        Se o valor for um operador, troque o último operador pelo novo valor.
        Se o valor não for um operador, adicione-o à operação como uma nova string.
        Se a última operação for um número, adicione o valor atual a ele.
    
        @function
        @name addOperation
        @param {number|string} value - Valor a ser adicionado à operação atual.
        @returns {void}
    */

    addOperation(value) {
        const lastOperation = this.getLastOperation();



        if (isNaN(lastOperation)) {
            if (this.isOperator(value)) {
                this.setLastOperation(value);
            } else if (!isNaN(value)) {

                this.pushOperation(value);

            }


        } else {
            if (!this.isOperator(value)) {
                const newValue = `${lastOperation}${value}`;
                this.setLastOperation(+newValue);
                this.setLastNumberToDisplay()
            } else {
                this.pushOperation(value);
            }
        }

        console.log(this._operation);
    }


    /*
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
                break
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
                this.addOperation('.');
                break;
            case 'equals':

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

    /*
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
        this._displayCalcEl.innerHTML = value;
    }

    get currentDate() {
        return new Date();
    }

    set currentDate(date) {
        this._currentDate = date;
    }
}
