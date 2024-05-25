
const wrapper = document.querySelector('.wrapper')
const cards = document.querySelectorAll('.card')
const timeCount = document.querySelector('.time-sec')
const flips = document.querySelector('.flips-sec')
const refresh = document.querySelector('.refresh')
const alertHtml = document.querySelector('.alert')

const info_box = document.querySelector('.info-box')
const one_playerBtn = document.querySelector('.one-player')
const two_playerBtn = document.querySelector('.two-player')


let player1Game = false
let player2Game = false

let cardOne, cardTwo
let disableDeck = false
let matched = 0
let counter
let cardClick = 0

let oneRaundTimeValue = 35


events()

function events() {

    cards.forEach((card) => {
        card.addEventListener('click', flipCard)

    })
    refresh.addEventListener('click', () => {
        clearInterval(counter)
        shuffleCard()
    })


    one_playerBtn.addEventListener('click', () => {
        info_box.classList.add('disabled')
        wrapper.classList.add('active')
        player1Game = true


        cards.forEach(card => {
            card.style.pointerEvents = "none";
        });

        shuffleCard()
    })

    two_playerBtn.addEventListener('click', () => {
        player2Game = true
        info_box.classList.add('disabled')
        wrapperTwo.classList.add('active')

        cardsTwo.forEach(card => {
            card.style.pointerEvents = "none"
        })

        shuffleCardTwo()
    })
}



function start() {
    cards.forEach((card) => {
        card.classList.add('flip');

    });

    setTimeout(() => {
        cards.forEach((card) => {
            clearInterval(counter)
            card.classList.remove('flip');
            card.style.pointerEvents = "all";
            cardClick = 0
            flips.textContent = cardClick
            refresh.style.display = "none"
            alertHtml.textContent = "Kartların çiftini bul! Süre devam ediyor..."
            startTimer(oneRaundTimeValue)
        });
    }, 1000)
}


function flipCard(e) {

    let clickedCard = e.target
    if (clickedCard !== cardOne && !disableDeck) {
        cardClick++
        clickedCard.classList.add('flip')

        if (!cardOne) {
            cardOne = clickedCard
            return
        }

        cardTwo = clickedCard
        disableDeck = true
        let cardOneImg = cardOne.querySelector('img').src
        let cardTwoImg = cardTwo.querySelector('img').src

        console.log(cardOne, cardTwo);

        flips.textContent = cardClick
        matchCards(cardOneImg, cardTwoImg)


        if (player1Check) {
            selectPlayer2()
        }else {
            selectPlayer1()
        }

    }
}


function matchCards(img1, img2) {
    if (player1Game) {
        if (img1 === img2) {
            matched++

            if (matched == 8) {
                alertHtml.textContent = "Tebrikler! Tüm Kartların Çiftini Buldun!"
                clearInterval(counter)

                setTimeout(() => {
                    shuffleCard()
                    return
                }, 2000);
            }

            cardOne.removeEventListener('click', flipCard)
            cardTwo.removeEventListener('click', flipCard)
            cardOne = ""
            cardTwo = ""
            return disableDeck = false
        }
    }
    else {
        if (img1 === img2) {
            matched++
            if (player1Check) {
                player1Skor++
                player1Text.textContent = "Player1: " + player1Skor
                
            } else {
                player2Skor++
                player2Text.textContent = "Player2: " + player2Skor
                
            }

            console.log("eşleşen kartlar: ",matched);

            if (matched == 15) {

                if (player1Skor > player2Skor) {
                    alertHtml.textContent = `Tebrikler Player1 ! Tüm Kartların Çiftini Buldun! Toplam Süre: ${timeText.textContent}`

                }
                else if (player2Skor > player1Skor){
                    alertHtml.textContent = `Tebrikler Player2 ! Tüm Kartların Çiftini Buldun! Toplam Süre: ${timeText.textContent}`
                }
                else{
                    alertHtml.textContent = `Tebrikler Oyun Berabere Bitti! Tüm Kartların Çiftini Buldunuz! Toplam Süre: ${timeText.textContent}`                    
                }
                
                clearInterval(elapsedTime)

                setTimeout(() => {
                    shuffleCardTwo()
                    return
                }, 2000);
            }

            cardOne.removeEventListener('click', flipCard)
            cardTwo.removeEventListener('click', flipCard)
            cardOne = ""
            cardTwo = ""
            return disableDeck = false
        }
    }


    if (cardOne != "" && cardTwo != "") {

        setTimeout(() => {
            cardOne.classList.add('shake')
            cardTwo.classList.add('shake')
        }, 400);

        setTimeout(() => {
            cardOne.classList.remove('shake', 'flip')
            cardTwo.classList.remove('shake', 'flip')
            cardOne = ""
            cardTwo = ""
            disableDeck = false
        }, 1200);
    }

}

function shuffleCard() {
    clearInterval(counter)
    matched = 0
    cardOne = ""
    cardTwo = ""
    disableDeck = false

    setTimeout(() => {
        let array = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8]

        array.sort(() => Math.random() - 0.5)

        cards.forEach((card, index) => {
            card.classList.remove('flip')
            let imgTag = card.querySelector('img')
            imgTag.src = `img/img-${array[index]}.png`
            card.addEventListener('click', flipCard)
        })
        start();

    }, 1000);

}

function startTimer(time) {

    const timer = () => {
        timeCount.textContent = time
        time--

        if (time < 9) {
            timeCount.textContent = "0" + timeCount.textContent
        }
        if (time < 0) {
            clearInterval()
            timeCount.textContent = "00"

            cards.forEach(card => {
                card.style.pointerEvents = "none";
            });

            refresh.style.display = "block"

            alertHtml.textContent = "Süre Doldu! Tekrar Dene!"

        }
    }

    counter = setInterval(timer, 1000)
}

