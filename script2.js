
const wrapperTwo = document.querySelector('.wrapperTwo')
const cardsTwo = document.querySelectorAll('.cardTwo')
const timeCountTwo = document.querySelector('.time-secTwo')
const refreshTwo = document.querySelector('.refreshTwo')
const alertTwo = document.querySelector('.alertTwo')
const timeText = document.querySelector('.time')

const player1Text = document.querySelector('.player1')
const player2Text = document.querySelector('.player2')

let elapsedTime
let player1Check
let player2Check
let player1Skor = 0
let player2Skor = 0



function startTwo() {
    cardsTwo.forEach((card) => {
        card.classList.add('flip')
    })
    

    setTimeout(() => {
        cardsTwo.forEach((card) => {
            card.classList.remove('flip')
            alertTwo.textContent = "Kartların en fazla çiftini bulan kazanır!"
            card.style.pointerEvents = "all"

            startTimerTwo(0)
        })
    }, 2500);
}


function startTimerTwo(startTime) {

    const timerTwo = () => {
        timeText.textContent = startTime
        startTime++

        if (startTime < 9) {
            timeText.textContent = "0" + timeText.textContent
        }
    }
    
    elapsedTime = setInterval(timerTwo, 1000)
}

function shuffleCardTwo() {
    clearInterval(elapsedTime)
    cardOne = ""
    cardTwo = ""
    player1Skor = 0
    player2Skor = 0
    disableDeck = false
    selectPlayer1()
    setTimeout(() => {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]

        array.sort(() => Math.random() - 0.5)


        cardsTwo.forEach((card, index) => {
            card.classList.remove('flip')
            let imgTag = card.querySelector('img')
            imgTag.src = `img/img-${array[index]}.png`
            card.addEventListener('click', flipCard)
        })
        startTwo()
    }, 1000);
}

function selectPlayer1() {
    player1Check = true
    player2Check = false
    player1Text.style.fontWeight = "700";
    player2Text.style.fontWeight = "400";
}
function selectPlayer2() {
    player1Check = false
    player2Check = true
    player1Text.style.fontWeight = "400";
    player2Text.style.fontWeight = "700";
}