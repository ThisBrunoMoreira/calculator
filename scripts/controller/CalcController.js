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
      initialize
      Inicializa a exibição da data e hora atualizável na calculadora e atualiza a cada segundo.
      @returns {void}
    */
    initialize() {
        this.setDisplayDateTime();
        setInterval(() => {
            this.setDisplayDateTime();
        }, 1000);
    }

    /*
      setDisplayDateTime
      Define a data e a hora atual para exibição na calculadora.
     
      @returns {void}
    */
    setDisplayDateTime() {
        this.displayDate =
            this.currentDate.toLocaleDateString(this._locale);
        this.displayTime =
            this.currentDate.toLocaleTimeString(this._locale);
    }

    initButtonsEvents() {

       this._buttons.forEach((btn, index) => {
            btn.addEventListener('click', e=> {
                console.log(btn.dataset.btn)
            })
       })
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

