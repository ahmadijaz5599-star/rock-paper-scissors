
let score = JSON.parse(localStorage.getItem('score')) || {
            wins: 0,
            losses: 0,
            ties: 0
        };

        updateScoreElement();

    /*if(!score){
        score = {
            wins: 0,
            losses: 0,
            ties: 0
        };
    }*/
    
    let isAutoPlying = false;
    let intervalID;

    function autoPlay(){
        if(!isAutoPlying){
            intervalID = setInterval(() => {
            const playermove = pickComputerMove();
            playGame(playermove);
        }, 1000);
        isAutoPlying = true;
        document.querySelector('.js-auto-play-button')
        .innerHTML = 'Stop Playing';

        } else {
            clearInterval(intervalID);
            isAutoPlying = false;
            document.querySelector('.js-auto-play-button')
            .innerHTML = 'Auto Play';
        }

    }

    document.querySelector('.js-auto-play-button')
    .addEventListener('click', () => {
        autoPlay();
    });

    document.querySelector('.js-rock-button')
    .addEventListener('click' , () => {
        playGame('rock');
    });
    document.querySelector('.js-paper-button')
    .addEventListener('click' , () => {
        playGame('paper');
    });
    document.querySelector('.js-scissor-button')
    .addEventListener('click' , () => {
        playGame('scissors');
    });

    document.body.addEventListener('keydown' , (event) => {
        console.log(event.key);
    });

    document.body.addEventListener('keydown' , (event) => {
        if(event.key === 'r'){
            playGame('rock');
        } else if(event.key === 'p'){
            playGame('paper');
        } else if(event.key === 's'){
            playGame('scissors');
        } else if(event.key === 'a'){
            autoPlay();
        } else if(event.key === 'Backspace'){
            resetScore();
            showResetConfirmation();
        }
        
    });

     function showResetConfirmation(){
        document.querySelector('.js-reset-confirmation')
        .innerHTML = `<div class="script">Are you sure you want to reset?
        <button class="confirmation-button-yes">
        Yes
        </button>
        <button class="confirmation-button-no">
        No
        </button>
        </div>
        `;

        document.querySelector('.confirmation-button-yes')
        .addEventListener('click', () => {
            resetScore();
            hideResetConfirmation();
        });

        document.querySelector('.confirmation-button-no')
        .addEventListener('click', () => {
            hideResetConfirmation();
        });
        
     }
    

    const playGame = function playGame(playmove){
        const computerMove = pickComputerMove();

        let result = '';

        if(playmove === 'rock'){
            if(computerMove === 'rock'){
                result = 'Tie';
            } else if (computerMove === 'paper'){
                result = 'You lose';
            } else if (computerMove === 'scissors'){
                result = 'You win';
            }
    }

    else if(playmove === 'paper'){
        if(computerMove === 'rock'){
                result = 'You win';
            } else if (computerMove === 'paper'){
                result = 'Tie';
            } else if (computerMove === 'scissors'){
                result = 'You lose';
            }
    }

    else if(playmove === 'scissors'){
        if(computerMove === 'rock'){
                result = 'You lose';
            } else if (computerMove === 'paper'){
                result = 'You win';
            } else if (computerMove === 'scissors'){
                result = 'Tie';
            }
    }

    if(result === 'You win'){
        score.wins += 1;
    } else if (result === 'You lose'){
        score.losses += 1;
    } else if (result === 'Tie'){
        score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    updateScoreElement();

    document.querySelector('.js-result').innerHTML = result;

    document.querySelector('.js-moves').innerHTML = `You pick ${playmove} - Computer pick ${computerMove}.`;

    }

    function updateScoreElement(){
         document.querySelector('.js-score').innerHTML = `wins: ${score.wins}, losses: ${score.losses}, ties:${score.ties}`;
    }

    function pickComputerMove(){
        const randomNumber = Math.random();

        let computerMove = '';

        if(randomNumber >= 0 && randomNumber < 1/3){
            computerMove = 'rock';
        } else if (randomNumber >= 1/3 && randomNumber < 2/3){
            computerMove = 'paper';
        } else if (randomNumber >= 2/3 && randomNumber < 1){
            computerMove = 'scissors';
        }
        
        return computerMove;
         
        }

        function resetScore(){
            score.wins = 0;
            score.losses = 0;
            score.ties = 0; 
            localStorage.removeItem('score');
        }

        function hideResetConfirmation(){
            document.querySelector('.js-reset-confirmation')
            .innerHTML = '';
        }
