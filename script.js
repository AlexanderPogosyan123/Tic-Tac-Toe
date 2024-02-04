var counter = 0;
var cells = document.querySelectorAll('#field td');
var header = document.getElementById('header');

function isVictory() {
    var combos = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6]
    ];

    for(var combo of combos){
        // Проверяем, совпадают ли значения в ячейках комбинации и не являются ли они пустыми
        if (cells[combo[0]].innerHTML == cells[combo[1]].innerHTML && cells[combo[1]].innerHTML == cells[combo[2]].innerHTML && cells[combo[0]].innerHTML != '') {
            // Highlight the winning cells with a yellow background color
            cells[combo[0]].style.backgroundColor = 'yellow';
            cells[combo[1]].style.backgroundColor = 'yellow';
            cells[combo[2]].style.backgroundColor = 'yellow';
            return true;
        }
    }
    // Если не найдено выигрышных комбинаций, возвращаем false
    return false;
}

function tap(event) {
    if(counter % 2 == 0){
        event.target.innerHTML = '<img src="crestic.png" width=100>';
    } else {
        event.target.innerHTML = '<img src="nolic.png" width=100>';
    }

    if(isVictory()){
        for(let cell of cells){
            cell.removeEventListener('click', tap);
        }
        if(counter % 2 == 0) {
            header.innerText = 'X is winner';
        } else {
            header.innerText = 'O is winner';
        }
    } else if(counter == 8) {
        header.innerText = 'Draw!';
    }

    counter++;
    event.target.removeEventListener('click', tap);
}

function startGame() {
    header.innerText = 'Tic Tac Toe';
    counter = 0;

    for(var cell of cells) {
        cell.innerHTML = '';
        cell.style.backgroundColor = ''; // Reset the background color
        cell.addEventListener('click', tap);
    }
}

startGame();
