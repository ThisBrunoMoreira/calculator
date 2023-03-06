class ThemeSwitcher {
    constructor() {
        this.elements =
            document.querySelectorAll('[data-color], [data-toggler] ');
        this.switcher =
            document.querySelector('[data-switcher]');
        this.styles =
            document.querySelectorAll('[data-theme-color]');

        this.init()
    }

    init() {
        this.addEventListeners();
        this.loadFromLocalStorage();
    }

 
    addEventListeners() {
        this.elements.forEach(element => {

            element.addEventListener('click', this.handleClick.bind(this));

        })

        window.addEventListener('click', this.hideThemes.bind(this))
    }



    handleClick(event) {

        const { toggler, color } = event.currentTarget.dataset;
        this.handleButtonClick(toggler || color)

    }

  
    hideThemes(event) {

        if (!this.switcher.contains(event.target) &&
            (this.switcher.classList.contains('visible'))) {
            this.switcher.classList.remove('visible')
        }

    }







    handleButtonClick(value) {

        switch (value) {
            case 'closed':
             
                this.switcher.classList.toggle('visible');
                break
            case 'dark-wine-purple':
            case 'spruce-green':
            case 'ocean-blue':
            case 'magenta':
                this.setActiveStyle(value);
                this.saveToLocalStorage(value)
                break
        }
    }


    setActiveStyle(value) {

        for (const style of this.styles) {
            const isMatching = value === style.dataset.themeColor
            style.disabled = !isMatching
        }

    }

    saveToLocalStorage(value) {
        localStorage.setItem('theme', value)

    }

    getFromLocalStorage() {
        return localStorage.getItem('theme')
    }


    loadFromLocalStorage() {
        const theme = this.getFromLocalStorage()

        if (theme) {
            this.setActiveStyle(theme)
        }

    }



}

const themeSwitcher = new ThemeSwitcher();