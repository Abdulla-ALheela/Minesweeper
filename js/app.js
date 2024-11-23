
/*-------------------------------- Constants --------------------------------*/
let backBoard = [];
let frontBoard = [];
/*---------------------------- Variables (state) ----------------------------*/
let numberOfMines;
let win = false;
let difficulty;
let width;
let height;
let numberOfSquares;
let rowEl;
let backDivEl;
let frontDivEl;
let container;
let minePlaced = false;
let randomNumber;
let numberOfAroundMines = 0;
let idNumber;
let id;
/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector("#board");
const messageEl = document.querySelector("#message");
const easyButtonEl = document.querySelector("#easy");
const mediumButtonEl = document.querySelector("#medium");
const hardButtonEl = document.querySelector("#hard");

/*-------------------------------- Functions --------------------------------*/

const initBoard = ((width, height) => {

    while (boardEl.hasChildNodes()) {
        boardEl.removeChild(boardEl.firstChild);

    };

    boardEl.style.display = "grid";
    boardEl.style.gridTemplateColumns = `repeat(${width}, 25px)`;
    boardEl.style.gridTemplateRows = `repeat(${height}, 25px)`;

    numberOfSquares = width * height;

    for (let n = 0; n < numberOfSquares; n++) {

        backBoard[n] = "";
        frontBoard[n] = "";
    };

    //create back board
    for (let r = 0; r < width; r++) {
        rowEl = document.createElement("div");
        rowEl.setAttribute("class", "row");
        rowEl.setAttribute("id", "row " + r);

        boardEl.appendChild(rowEl);

        for (let i = 0; i < height; i++) {
            container = document.createElement("div");
            container.setAttribute("class", "container");
            container.setAttribute("id", "container" + r + i);
            rowEl.appendChild(container);
            backDivEl = document.createElement("div");
            backDivEl.setAttribute("class", "bsqr");
            backDivEl.setAttribute("id", "back-sqr " + r + i);
            container.appendChild(backDivEl);
            frontDivEl = document.createElement("div");
            frontDivEl.setAttribute("class", "fsqr");
            frontDivEl.setAttribute("id", "front-sqr " + r + i);
            container.appendChild(frontDivEl);

        };
    };

    const frontBoardSquaresEl = document.querySelectorAll(".bsqr");
    frontBoardSquaresEl.forEach((frontBoardSquare) => {


        frontBoardSquare.addEventListener("click", handleBoardClicks);


    });
    //create front board
    // for (let r = 0; r < width; r++) {
    //     frontRowEl= document.createElement("div");
    //     frontRowEl.setAttribute("class", "row");
    //     frontRowEl.setAttribute("id", "front-row " + r);

    //     boardEl.appendChild(frontRowEl);

    //         for (let i=0; i < height; i++){

    //         frontdivEl = document.createElement("div");
    //         frontdivEl.setAttribute("class", "fsqr");
    //         frontdivEl.setAttribute("id", "front-sqr " + i);
    //         frontRowEl.appendChild(frontdivEl);

    //         };
    //     };

});

const placeMines = (() => {

    const backBoardSquaresEl = document.querySelectorAll(".bsqr");

    if (minePlaced === false) {
        loopAgain: for (let p = 0; p < numberOfMines; p++) {

            randomNumber = Math.floor(Math.random() * numberOfSquares);


            if (backBoard[randomNumber] === "") {

                backBoard[randomNumber] = "💣"
                backBoardSquaresEl[randomNumber].textContent = backBoard[randomNumber]
            } else {
                p--
                continue loopAgain;

            }
        }
        minePlaced = true
        render()
    }


})

const placeNumbers = (() => {
    const backBoardSquaresEl = document.querySelectorAll(".bsqr");
    console.log(backBoardSquaresEl);


    backBoardSquaresEl.forEach((backBoardSquare) => {
        numberOfAroundMines = 0
        id = backBoardSquare.id.split(" ")
        idNumber = id[1]

        if (backBoardSquare.textContent === "") {
           

                if (numberOfAroundMines > 0) {
                    backBoardSquare.textContent = numberOfAroundMines
                }
            }
            
})
})


const handleBoardClicks = ((event) => {

    placeMines()
    placeNumbers()



})



const render = (() => {



});


const initEasy = (() => {
    backBoard = [];
    frontBoard = [];
    win = false;
    minePlaced = false;
    difficulty = "easy";
    numberOfMines = 10;
    width = 9;
    height = 9;
    initBoard(width, height);

});

const initMedium = (() => {
    backBoard = [];
    frontBoard = [];
    win = false;
    minePlaced = false;
    difficulty = "medium";
    numberOfMines = 40;
    width = 16;
    height = 16;
    initBoard(width, height);

});

const initHard = (() => {
    backBoard = [];
    frontBoard = [];
    win = false;
    minePlaced = false;
    difficulty = "hard";
    numberOfMines = 99;
    width = 16;
    height = 30;
    initBoard(width, height);

});

/*----------------------------- Event Listeners -----------------------------*/

easyButtonEl.addEventListener("click", initEasy);
mediumButtonEl.addEventListener("click", initMedium);
hardButtonEl.addEventListener("click", initHard);



