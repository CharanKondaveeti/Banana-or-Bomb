'use strict'

// layers revealers----------------------------------
const all_seven_layers = document.querySelectorAll('.layer');
const all_revealers = document.querySelectorAll('.revealer');
let active_layer_index = activeLayer_index();
const activeLayer = document.querySelector('.layer--active');
let active_Layer_revealers = document.querySelectorAll('.layer--active .revealer');
const all_seven_layers_revealers = document.querySelectorAll('.layer .revealer');

const layer6_revealers = document.querySelectorAll('.layer6 .revealer');
const layer5_revealers = document.querySelectorAll('.layer5 .revealer');
const layer4_revealers = document.querySelectorAll('.layer4 .revealer');
const layer3_revealers = document.querySelectorAll('.layer3 .revealer');
const layer2_revealers = document.querySelectorAll('.layer2 .revealer');
const layer1_revealers = document.querySelectorAll('.layer1 .revealer');
const layer0_revealers = document.querySelectorAll('.layer0 .revealer');
const allLayers = [layer0_revealers, layer1_revealers, layer2_revealers, layer3_revealers, layer4_revealers, layer5_revealers, layer6_revealers]

// -------------------- html doms ----------------------------
const bananaHtml = `<img class="banana" src="banana.png" alt="">`;
const bombHtml = `<img class="bomb" src="bomb.png" alt="">`;

// ------------------ buttons ------------------------------
const okButton = document.querySelector('.ok--button');
const winnings_restartButton = document.querySelector('.winningsCard-restart-button');
const restartButton = document.querySelectorAll('.restart-button');
const gameover_restart_button_el = document.querySelector('.gameover--restart-button');
const take_winningsButton = document.querySelector('.take-away-winnings-el');


// absoluted pop up cards
const gameover_card = document.querySelector('.gameover')
const wincard_winnings = document.querySelector('.currnt-winning-cash--value');
const betcard_el = document.querySelector('.setBetcard');
const winnings_card_el = document.querySelector('.winnings--card');
const setBetcard_closeButton_el = document.querySelector('.setBetcard--closeButton');

// extras 
const highlighter = document.querySelector('.highlighter');
const shader = document.querySelector('.shader');

// betting things
const cash_avabl_container = document.querySelector('.cash-avbl--container');
const current_winnings_container = document.querySelector('.current-winnings--container');
const bet_amount_container = document.querySelector('.bet-amount--container');
const bet_amount_El = document.querySelector('.bet-amount-value');
const BetAmount_entered_inputValue = document.querySelector('.bet-amount--input');
const current_winnings_el = document.querySelector('.current-winning-cash--value');
const cashAvbl_el = document.querySelector('.cash-avbl-value');
const bet_here = document.querySelector('.bet-here');

let betPlaced;
let cash_available = 1500;
let betAmount = 200;
let current_winnings = 0;
const winnings_incrementer = [17, 10, 6, 4, 2.5, 2, 1.5];
let take_winnings_permission = false;

cashAvbl_el.textContent = cash_available;
bet_amount_El.textContent = betAmount;
current_winnings_el.textContent = current_winnings;

//  => highlighter dimensions
let highlighter_movement_counter = 1;
const actlyr_width = activeLayer.getBoundingClientRect().width;
const actlyr_height = activeLayer.getBoundingClientRect().height;
highlighter.style.width = `${actlyr_width}px`;
highlighter.style.height = `${actlyr_height}px`;
highlighter_movement(highlighter_movement_counter);




// ------------------------  cooding starts here --------------------------------- 
// initialising bettings ----------------

//===> firsty set the bananas and bombs
set_bananasBombs();
//===>
shifter(active_Layer_revealers);







// ====> all functions here --------------------------------------------------

function myfunction() {

    if (betPlaced) {


        this.style.transform = 'rotateY(180deg)';

        //====> if clicked is banana
        if (this.lastChild.matches('.banana')) {

            // if active layer index is greater then 0
            if (active_layer_index) {

                // update current winnings
                // animation: blinker_curnt_winnings 1s forwards;
                current_winnings_container.style.animation = 'blinker_curnt_winnings 1s forwards';
                setTimeout(() => {
                    current_winnings_container.style.animation = 0;
                }, 1000);
                current_winnings = betAmount * winnings_incrementer[active_layer_index];
                current_winnings_el.textContent = current_winnings;

                // ===> shift the active layer
                all_seven_layers[active_layer_index].classList.remove('layer--active');
                all_seven_layers[active_layer_index - 1].classList.add('layer--active');

                allLayers[active_layer_index].forEach(el => el.style.pointerEvents = 'none');

                // Store the new active layer index
                active_layer_index = activeLayer_index();
                active_Layer_revealers = allLayers[active_layer_index];

                // the active layer on gets clicked
                allLayers[active_layer_index].forEach(el => el.style.pointerEvents = 'auto');

                // highlighter movement
                highlighter_movement_counter = highlighter_movement_counter + 1
                highlighter_movement(highlighter_movement_counter);

                // permission of take wiinings
                take_winnings_permission = true;

                // call recursively
                shifter(active_Layer_revealers);
            }

            // if player reached to end
            else if (!active_layer_index) {
                winningCard();
            }
        }

        // ====> if clicked was bomb
        else {
            // active layer revealers pointer events none
            allLayers[active_layer_index].forEach(el => el.style.pointerEvents = 'none')

            // game is over
            gameover_card.style.display = 'flex';
            gameover_card.style.animation = 'openthe_betcard 0.2s';
            shader.style.display = 'block';
            setTimeout(() => {
                gameover_card.style.animation = 0;
            }, 2000);
        }
    }

}

function shifter(passs_active_layer) {
    passs_active_layer.forEach(element => {
        element.addEventListener('click', myfunction)
    });
}

function highlighter_movement(highlighter_m_c) {
    highlighter.style.transform = `translateX(-50%) translateY(-${highlighter_m_c * actlyr_height}px)`;
}


// ====> active layer index retun number
function activeLayer_index() {
    let index;
    all_seven_layers.forEach((el, indx, arr) => {
        if (el.classList.contains('layer--active')) {
            index = indx;
        };
    });
    return index;
}


// ====>  generate two different random numbers
function ranNumm() {
    let ranNum = [];
    while (ranNum.length < 3) {
        var r = Math.floor(Math.random() * 5);
        if (ranNum.indexOf(r) === -1) ranNum.push(r);
    }

    return ranNum;
}


function unreveal_newsetBananasBombs() {

    all_revealers.forEach(el => {
        el.style.transform = 'rotateY(0deg)';
        el.lastChild.remove();
    })

    setTimeout(() => {
        set_bananasBombs();
    }, 1000);
}



function set_bananasBombs() {
    // ==> setting bananas and bombs to all layers
    allLayers.forEach((el, ind, arr) => {
        const [x, y, z] = ranNumm();

        // ===> set bananas and bombs to layer 5 - 6
        if (ind === 5 || ind === 6) {
            el.forEach((el, ind, arr) => {
                if (ind === x) {
                    el.insertAdjacentHTML('beforeend', bombHtml);
                }
                else {
                    el.insertAdjacentHTML('beforeend', bananaHtml);
                }
            });
        }

        // => set bananas and bombs to layer 3 - 4
        if (ind === 3 || ind === 4) {

            el.forEach((el, ind, arr) => {
                if (ind === x || ind === y) {
                    el.insertAdjacentHTML('beforeend', bombHtml);
                }
                else {
                    el.insertAdjacentHTML('beforeend', bananaHtml);
                }
            });
        }

        // => set bananas and bombs to layer 1 - 2
        if (ind === 1 || ind === 2) {

            el.forEach((el, ind, arr) => {
                if (ind === x || ind === y || ind === z) {
                    el.insertAdjacentHTML('beforeend', bombHtml);
                }
                else {
                    el.insertAdjacentHTML('beforeend', bananaHtml);
                }
            });
        }

        // => set bananas and bombs to layer 0
        if (ind === 0) {
            el.forEach((el, ind, arr) => {
                if (ind === x) {

                    el.insertAdjacentHTML('beforeend', bananaHtml);
                }
                else {
                    el.insertAdjacentHTML('beforeend', bombHtml);
                }
            });
        }
    });
}



// ==> when restart button - betcard clicked

restartButton.forEach(el => el.addEventListener('click', function () {

    //  all revealers points none
    allLayers.forEach((el, ind, arr) => {
        el.forEach((el) => {
            el.style.pointerEvents = 'none';
        })
    });

    // shift active layer
    all_seven_layers[active_layer_index].classList.remove('layer--active');
    all_seven_layers[6].classList.add('layer--active');

    // store active layer index
    active_layer_index = activeLayer_index();

    // new layer is eligile for pointe evenets
    allLayers[active_layer_index].forEach(el => el.style.pointerEvents = 'auto')

    // highlighter movements
    highlighter_movement_counter = 1;
    highlighter_movement(highlighter_movement_counter);

    betAmount = 0;
    current_winnings = 0;
    take_winnings_permission = false;


    // // close all the revealers
    unreveal_newsetBananasBombs();

    setTimeout(() => {
        shader.style.display = 'block';
        betcard_el.style.display = 'flex';
        betcard_el.style.animation = 'openthe_betcard 0.3s forwards';
    }, 500);

    current_winnings_el.textContent = current_winnings;
    wincard_winnings.textContent = current_winnings;
    bet_amount_El.textContent = betAmount;
})
)


function restart() {
    shader.style.display = 'none';

    this.parentNode.style.animation = 'closethe_betcard 0.3s forwards';
    setTimeout(() => {
        this.parentNode.style.display = 'none';
        this.parentNode.animation = 0;
    }, 400);
}

gameover_restart_button_el.addEventListener('click', restart);
winnings_restartButton.addEventListener('click', restart)

winnings_restartButton.addEventListener("keypress", function (event) {
    // If the user presses the "Enter" key on the keyboard
    if (event.key === "Enter") {
        // Cancel the default action, if needed
        event.preventDefault();
        // Trigger the button element with a click
        this.click();
    }
});

function winningCard() {
    if (take_winnings_permission) {

        // cash_available = cash_available;
        cash_available = cash_available + current_winnings;
        console.log(cash_available);
        cashAvbl_el.textContent = cash_available;
        console.log(cash_available);
        current_winnings_el.textContent = current_winnings;
        wincard_winnings.textContent = current_winnings;
        bet_amount_El.textContent = betAmount;

        shader.style.display = 'block';
        winnings_card_el.style.animation = 'openthe_betcard 0.3s forwards';
        winnings_card_el.style.display = 'flex';

        console.log(cash_available);
    }
}

take_winningsButton.addEventListener('click', winningCard)


// ==> when ok button clicked
okButton.addEventListener('click', function () {
    event.preventDefault();
    const verify = Number(BetAmount_entered_inputValue.value);
    if (verify <= 500 && verify >= 100 && cash_available > verify) {
        betAmount = Number(BetAmount_entered_inputValue.value);

        bet_amount_El.textContent = betAmount;
        cash_available = cash_available - betAmount;
        cashAvbl_el.textContent = cash_available;
        current_winnings_el.textContent = current_winnings;

        shader.style.display = 'none';

        betcard_el.style.animation = 'closethe_betcard 0.3s forwards';
        setTimeout(() => {
            betcard_el.style.animation = '0';
            betcard_el.style.display = 'none';
        }, 400);

        betPlaced = true;
        BetAmount_entered_inputValue.value = '';

        bet_amount_container.style.animation = 'blinker 3s forwards';
        setTimeout(() => {
            bet_amount_container.style.animation = 0;
        }, 3000);

    }

    else {
        cash_avabl_container.style.animation = 'nocash_Blinker 1s forwards';
        setTimeout(() => {
            cash_avabl_container.style.animation = 0;
        }, 1000);

        console.log('hello');
    }

});



const instructions = document.querySelector('.instructions');
const instrc_buttons = document.querySelector('.instrucc_buttons');
const iButton = document.querySelector('.ibutton');
const xButton = document.querySelector('.xbutton');

instrc_buttons.innerHTML = '';
instrc_buttons.insertAdjacentHTML('beforeend', `<p class="instbutton ibutton">ℹ</p>`)

instrc_buttons.addEventListener('click', function () {
    // if button is "i"
    if (this.lastChild.matches('.ibutton')) {
        instructions.style.display = 'block';
        shader.style.display = 'block';
        instrc_buttons.innerHTML = '';
        instrc_buttons.insertAdjacentHTML('beforeend', `<p class="instbutton xbutton">❌</p>`)
    }
    else {
        instructions.style.display = 'none';
        shader.style.display = 'none';
        instrc_buttons.innerHTML = '';
        instrc_buttons.insertAdjacentHTML('beforeend', `<p class="instbutton ibutton">ℹ</p>`);
    }
})
