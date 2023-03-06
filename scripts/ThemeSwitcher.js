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

    /*
     Inicializa o componente.
    */
    init() {
        // Adiciona os listeners de eventos e carrega o tema salvo.
        this.addEventListeners();
        this.loadFromLocalStorage();
    }

    /*
      Adiciona listeners de eventos aos elementos interativos do componente.
    */
    addEventListeners() {
        // Adiciona um listener de clique a cada elemento com data-togger ou data-color.
        this.elements.forEach(element => {
            element.addEventListener('click', this.handleClick.bind(this));
        });
        // Adiciona um listener de clique ao corpo da página para ocultar o seletor de tema.
        window.addEventListener('click', this.hideThemes.bind(this))
    }

    /**
      Manipula o clique em um elemento interativo.
     
      @param {Event} event - O evento de clique a ser manipulado.
     */
    handleClick(event) {
        const { toggler, color } = event.currentTarget.dataset;
        // Chama handleButtonClick com base no valor do botão clicado.
        this.handleButtonClick(toggler || color);
    }

    /**
      Oculta o seletor de tema se o usuário clicar fora dele.
     
      @param {Event} event - O evento de clique a ser manipulado.
     */
    hideThemes(event) {
        // Se o usuário clicou fora do seletor de tema e ele está visível, oculta-o.
        if (!this.switcher.contains(event.target) && (this.switcher.classList.contains('visible'))) {
            this.switcher.classList.remove('visible')
        }
    }








    /**
      Manipula o clique em um botão temático.
     
      @param {string} value - O valor associado ao botão clicado.
     */
    handleButtonClick(value) {
        switch (value) {
            case 'closed':
                // Alternar a visibilidade do seletor de tema.
                this.switcher.classList.toggle('visible');
                break;
            case 'dark-wine-purple':
            case 'spruce-green':
            case 'ocean-blue':
            case 'magenta':
                // Definir o estilo ativo com base no valor do tema.
                this.setActiveStyle(value);
                // Salvar o valor do tema atual no armazenamento local do navegador.
                this.saveToLocalStorage(value);
                break;
        }
    }

    /**
     Define o estilo ativo desabilitando todas as folhas de estilo, exceto aquela que possui um atributo `data-theme-color` correspondente ao valor passado como parâmetro.
     
      @param {string} value - O valor do atributo `data-theme-color` da folha de estilo a ser ativada.
    */

    setActiveStyle(value) {

        for (const style of this.styles) {
            const isMatching = value === style.dataset.themeColor
            style.disabled = !isMatching
        }

    }

    /**
        Salva o valor do tema atual no armazenamento local do navegador.

        @param {string} value - O valor do tema a ser salvo no armazenamento local.
    */
    saveToLocalStorage(value) {
        localStorage.setItem('theme', value)

    }

    /**
        Retorna o valor do tema armazenado localmente no navegador.

        @returns {string|null} O valor do tema armazenado localmente, ou `null` se não houver valor armazenado.
    */
    getFromLocalStorage() {
        return localStorage.getItem('theme')
    }

    /**
     Carrega o tema armazenado localmente e define-o como o estilo ativo, se houver um valor armazenado.
     */
    loadFromLocalStorage() {
        // Obtém o tema armazenado localmente.
        const theme = this.getFromLocalStorage()
        // Se houver um tema armazenado localmente, define-o como o estilo ativo.
        if (theme) {
            this.setActiveStyle(theme)
        }

    }



}

const themeSwitcher = new ThemeSwitcher();