
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
let numberPlaced = false;
let randomNumber;
let numberOfAroundMines = 0;
let idNumber;
let id;
let loop;
let t = 0
let x
let y
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
    loop = 0;



    boardEl.style.display = "grid";
    boardEl.style.gridTemplateColumns = `repeat(${width}, 25px)`;
    boardEl.style.gridTemplateRows = `repeat(${height}, 25px)`;

    numberOfSquares = width * height;

    for (let n = 0; n < numberOfSquares; n++) {

        backBoard[n] = "";
        frontBoard[n] = "";
    };

    //create back board
    for (let x = 0; x < width; x++) {
        rowEl = document.createElement("div");
        rowEl.setAttribute("class", "row");
        rowEl.setAttribute("id", "row " + x);

        boardEl.appendChild(rowEl);

        for (let y = 0; y < height; y++) {
            loop++
            container = document.createElement("div");
            container.setAttribute("class", "container");
            container.setAttribute("id", "container" + loop);
            container.setAttribute("id", loop);
            rowEl.appendChild(container);
            backDivEl = document.createElement("div");
            backDivEl.setAttribute("class", "bsqr");
            backDivEl.setAttribute("id", "bx= " + x + " by= " + y);
            container.appendChild(backDivEl);
            frontDivEl = document.createElement("div");
            frontDivEl.setAttribute("class", "fsqr");
            frontDivEl.setAttribute("id", "fx= " + x + " fy= " + y);
            container.appendChild(frontDivEl);

        };
    };

    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
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
    console.log(boardEl);
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
    if(numberPlaced === false){
    const backBoardSquaresEl = document.querySelectorAll(".bsqr");
    // console.log(backBoardSquaresEl);
    const gridArry = [
        [-1, -1], [0, -1], [1, -1],
        [-1, 0], [1, 0],
        [-1, 1], [0, 1], [1, 1]
    ];


    backBoardSquaresEl.forEach((backBoardSquare) => {
        
        numberOfAroundMines = 0
        id = backBoardSquare.id.split(" ")
        


        if (backBoardSquare.textContent === "") {
            gridArry.forEach((location) => {
                
                x = id[1]
                y = id[3]
                x = parseFloat(x) + parseFloat(location[0])
                y = parseFloat(y) + parseFloat(location[1])
              
                if(x>=0 && y>=0 && x<width && y<height){
                const elem = document.getElementById("bx= " + x + " by= " + y)
                
                
                if (elem.textContent === "💣") {
                    numberOfAroundMines++
    
                    
                }
            }
            })
            if (numberOfAroundMines > 0) {
                backBoardSquare.textContent = numberOfAroundMines
            }

        }
       

    })
}
numberPlaced = true;
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
    numberPlaced = false;
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
    numberPlaced = false;
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
    numberPlaced = false;
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



