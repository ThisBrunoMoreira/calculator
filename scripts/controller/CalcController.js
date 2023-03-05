class CalcController {
    constructor() {
        this._locale = 'pt-BR'

        this._dateEl = document.querySelector('[data-day]')
        this._timeEl = document.querySelector('[data-hour]')
        this._displayCalcEl = document.querySelector('[data-display]')
        this._buttons = document.querySelectorAll('[data-btn]')

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
            element.addEventListener(event, fn)
        })
    }
    /*
        Inicializa os ouvintes de eventos de clique e arrasto para os botões da calculadora.
        Este método inicializa os ouvintes de eventos de clique e arrasto para todos os botões com o atributo 'data-btn'.
        Os botões são obtidos usando um seletor de consulta e armazenados como uma propriedade da classe para fácil acesso.
        Os ouvintes de eventos são adicionados usando o método forEach do array de botões e o método addEventListenerAll desta classe,
        e registram o conjunto de dados do botão no console quando clicado ou arrastado.
  
        @function
        @name initButtonsEvents
  */
    initButtonsEvents() {
        const buttons = this._buttons;
        buttons.forEach((btn) => {
            this.addEventListenerAll(btn, 'click drag', () => {
                console.log(btn.dataset.btn);
            });
        });
    }

 

    get displayTime() {
        return this._timeEl.innerHTML = time
    }

    set displayTime(time) {
        this._timeEl.innerHTML = time
    }

    get displayDate() {
        return this._dateEl.innerHTML
    }

    set displayDate(date) {
        return this._dateEl.innerHTML = date
    }

    get displayCalc() {
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value) {
        this._displayCalcEl.innerHTML = value
    }

    get currentDate() {
        return new Date()
    }

    set currentDate(date) {
        this._currentDate = date
    }
}

