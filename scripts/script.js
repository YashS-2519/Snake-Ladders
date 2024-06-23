alert("Currenly in Development");

const board = document.querySelector('.board');
const player1 = document.querySelector('#player1');
const player2 = document.querySelector('#player2');

const positionMap = [
    ['100%', '10%'], ['100%', '20%'], ['100%', '30%'], ['100%', '40%'], ['100%', '50%'],
    ['100%', '60%'], ['100%', '70%'], ['100%', '80%'], ['100%', '90%'], ['100%', '100%'],
    ['90%', '100%'], ['90%', '90%'], ['90%', '80%'], ['90%', '70%'], ['90%', '60%'],
    ['90%', '50%'], ['90%', '40%'], ['90%', '30%'], ['90%', '20%'], ['90%', '10%'],
    ['80%', '10%'], ['80%', '20%'], ['80%', '30%'], ['80%', '40%'], ['80%', '50%'],
    ['80%', '60%'], ['80%', '70%'], ['80%', '80%'], ['80%', '90%'], ['80%', '100%'],
    ['70%', '100%'], ['70%', '90%'], ['70%', '80%'], ['70%', '70%'], ['70%', '60%'],
    ['70%', '50%'], ['70%', '40%'], ['70%', '30%'], ['70%', '20%'], ['70%', '10%'],
    ['60%', '10%'], ['60%', '20%'], ['60%', '30%'], ['60%', '40%'], ['60%', '50%'],
    ['60%', '60%'], ['60%', '70%'], ['60%', '80%'], ['60%', '90%'], ['60%', '100%'],
    ['50%', '100%'], ['50%', '90%'], ['50%', '80%'], ['50%', '70%'], ['50%', '60%'],
    ['50%', '50%'], ['50%', '40%'], ['50%', '30%'], ['50%', '20%'], ['50%', '10%'],
    ['40%', '10%'], ['40%', '20%'], ['40%', '30%'], ['40%', '40%'], ['40%', '50%'],
    ['40%', '60%'], ['40%', '70%'], ['40%', '80%'], ['40%', '90%'], ['40%', '100%'],
    ['30%', '100%'], ['30%', '90%'], ['30%', '80%'], ['30%', '70%'], ['30%', '60%'],
    ['30%', '50%'], ['30%', '40%'], ['30%', '30%'], ['30%', '20%'], ['30%', '10%'],
    ['20%', '10%'], ['20%', '20%'], ['20%', '30%'], ['20%', '40%'], ['20%', '50%'],
    ['20%', '60%'], ['20%', '70%'], ['20%', '80%'], ['20%', '90%'], ['20%', '100%'],
    ['10%', '100%'], ['10%', '90%'], ['10%', '80%'], ['10%', '70%'], ['10%', '60%'],
    ['10%', '50%'], ['10%', '40%'], ['10%', '30%'], ['10%', '20%'], ['10%', '10%']
]


    // generate blocks of board
    ; (() => {
        let c = 111;

        for (let i = 0; i < 10; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            row.id = `row${i + 1}`;
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
            else {
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

// roll a dice
function rollDice() {
    return (Math.floor(Math.random() * 6) + 1)
}

// move player
let currentPlayer = 1;
let player1Position = 0;
let player2Position = 0;

document.querySelectorAll('.rollDice').forEach((elem) => {
    elem.addEventListener('click', () => {

        let dice = rollDice();
        document.querySelectorAll('.display').forEach((elem) => {
            elem.innerHTML = dice;
        })

        if (currentPlayer == 1) {
            player1Position + dice <= 100 ? player1Position += dice : player1Position;
            let pos = positionMap[player1Position - 1];
            player1.style.top = pos[0];
            player1.style.left = pos[1];
            dice == 6 ? currentPlayer = 1 : currentPlayer = 2;
        }
        else {
            player2Position + dice <= 100 ? player2Position += dice : player2Position;
            let pos = positionMap[player2Position - 1];
            player2.style.top = pos[0];
            player2.style.left = pos[1];
            dice == 6 ? currentPlayer = 2 : currentPlayer = 1;
        }

        document.querySelectorAll('h2').forEach((elem) => {
            let color = currentPlayer == 1 ? '#ff6969' : '#33CC33';
            elem.innerHTML = `Player ${currentPlayer}'s turn`;
            elem.style.color = color;
        });

        if (player1Position == 100 || player2Position == 100) {
            setTimeout(() => {
                document.querySelector('.info').style.display = 'flex';
                document.querySelector('.modal').style.scale = '1';
                document.querySelector('.modal h3').innerHTML = `Player ${currentPlayer == 1 ? '2' : '1'} win!`
                console.log('Win!');
            }, 500);
        }

        // console.log(`Player ${currentPlayer == 1 ? '2' : '1'} position ${player1Position} rolled a ${dice} `);
    })
})

// game reset
document.querySelector('.reset').addEventListener('click', () => {
    player1Position = 0;
    player2Position = 0;
    currentPlayer = 1;
    player1.style.top = '99.5%';
    player1.style.left = '0%';
    player2.style.top = '100.5%';
    player2.style.left = '0%';
    dice = 0;
    document.querySelectorAll('.display').forEach((elem) => {
        elem.innerHTML = '0';
    })
    document.querySelectorAll('h2').forEach((elem) => {
        elem.innerHTML = 'Player 1\'s turn';
        elem.style.color = '#ff6969';
    })
    document.querySelector('.info').style.display = 'none';
    document.querySelector('.modal').style.scale = '0';

});