const board = document.querySelector('.board');


// generate blocks of board
;(() => {
    let c = 111;
    
    for (let i = 0; i < 10; i++) {
        const row = document.createElement('div');
        row.className = 'row';
        row.id = `row${i+1}`;
        board.append(row);

        if (i % 2 == 0) {
            c = c - 11;
            for (let j = 0; j < 10; j++) {
                const square = document.createElement('div');
                square.className = `square`;
                square.id = `${c}`;
                square.innerHTML = c;
                row.appendChild(square);
                c--;
            }
        }
        else{
            c = c - 9;
            for (let j = 9; j >= 0; j--) {
                const square = document.createElement('div');
                square.className = `square`;
                square.id = `${c}`;
                square.innerHTML = c;
                row.appendChild(square);
                c++;
            }
        }
    }
    
})();


const row = document.querySelectorAll('.row');
const square = document.querySelectorAll('.square');