const spaceOfGame = document.getElementById('game-container')

// Genero i miei box
generateBox();

// Variabili di gioco principali
let player = 0
let position = [[], [], []];
let clickedBox = [];

// Controllo click
spaceOfGame.addEventListener('click', (event) => {

    //---------- Gestione dei player ---------- //
    //Controllo se il box è stato già cliccato
    if (!clickedBox.includes(event.target.id)) {
        // Aggiunge il box cliccato alla lista
        clickedBox.push(event.target.id)

        // Aggiunge la classe x/o-player al div.box
        if (player) {
            event.target.classList.add('x-player')
        } else {
            event.target.classList.add('o-player')
        }

        //---------- Posizionamento dei player (Controlla la posizione di chi e dove ha cliccato) ---------- //
        let rowPosition = event.target.getAttribute('row')
        let colPosition = event.target.getAttribute('col')
        if (player) {
            position[rowPosition][colPosition] = 0
        } else {
            position[rowPosition][colPosition] = 1
        }

        //----------  Controlli Vincita ---------- //
        winCondition()
        winControl()

        //----------  Cambio Giocatore ---------- //
        player = !player
    }
});

//-------------------- FUNCTIONS --------------------//

// Generazione dei box
function generateBox() {
    // Genero i miei box
    for (let i = 0; i < 9; i++) {

        // Controlla la riga in cui si trova
        let row = 0
        if (i >= 3) {
            row++
        }
        if (i >= 6) {
            row = 2
        }
        // Controlla la colonna in cui si trova
        let col = 0
        if (i == 1 || i == 4 || i == 7) {
            col = 1
        }
        if (i == 2 || i == 5 || i == 8) {
            col = 2
        }


        // Genera i div.box
        spaceOfGame.innerHTML += `
<div class="box" id="${i}" row="${row}" col="${col}"></div>
`
    }
}

// Condizioni di Vincita
function winCondition() {

    // Orizzontal WIN
    for (let index = 0; index < 3; index++) {
        for (let num = 0; num < 2; num++) {
            if (position[index][0] == num && position[index][1] == num && position[index][2] == num) {
                return true;
            }
        }
    }

    // Vertical WIN
    for (let index = 0; index < 3; index++) {
        for (let num = 0; num < 2; num++) {
            if (position[0][index] == num && position[1][index] == num && position[2][index] == num) {
                return true;
            }
        }
    }

    // Oblique WIN
    for (let num = 0; num < 2; num++) {
        if (position[0][0] == num && position[1][1] == num && position[2][2] == num) {
            return true;
        }
        if (position[0][2] == num && position[1][1] == num && position[2][0] == num) {
            return true;
        }
    }
}

// Condizione di Pareggio
function checkNoWin() {
    // position[index].length
    if (position[0].length + position[1].length + position[2].length === 9) {
        return true
    }
}

// Controlli in caso di Vincita o Pareggio
function winControl() {
    const winBox = document.getElementById('win-box');
    const winResult = document.getElementById('win-result');
    const main = document.querySelector('main')

    if (winCondition()) {
        // Disattivo il click
        main.classList.add('disable-click')

        // Attento e mostro il box con il vincitore
        setTimeout(() => {
            winBox.classList.remove('d-none')
        }, 500);
        winResult.innerHTML = `Ha vinto <span ${(player) ? 'class="x-color">X' : 'class="o-color">O'}</span>`

        // Attendo e resetto il gioco
        setTimeout(() => {
            winBox.classList.add('d-none')
            resetGame()
            main.classList.remove('disable-click')
        }, 1000);
    } else if (checkNoWin()) {

        // Disattivo il click
        main.classList.add('disable-click')

        // Attento e mostro il box con il vincitore
        setTimeout(() => {
            winBox.classList.remove('d-none')
        }, 500);
        winResult.innerHTML = 'Pareggio'

        // Attendo e resetto il gioco
        setTimeout(() => {
            winBox.classList.add('d-none')
            resetGame()
            main.classList.remove('disable-click')
        }, 1000);

    }
}

//Reset del gioco
function resetGame() {
    position = [[], [], []];
    clickedBox = [];
    player = 0
    spaceOfGame.innerHTML = '';
    generateBox();
}
