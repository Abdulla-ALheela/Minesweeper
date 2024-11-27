
/*-------------------------------- Constants --------------------------------*/
let backBoard = [];
let frontBoard = [];
const gridArry = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"]
const remeber = [];
const storages = [];
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
let t1 = 0;
let t2 = 0;
let x;
let y;
let fid;
let currentItration;
let previosArrayLength = 0;
let currentLength
let clicked
let clickedx
let clickedy
let firstClick = true
let checkNumber
let init = false

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

const placeMines = ((event) => {
    //     if(firstClick){
    //    clicked = event.srcElement.id.split(" ")
    //    clickedx = clicked[1]
    //    clickedy= clicked[3]
    //    const bsqr = document.getElementById("bx= " + clickedx + " by= " + clickedy)
    //    firstClick = false
    //     }

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

const placeNumbers = ((event) => {
    clicked = event.srcElement.id.split(" ")
    clickedx = clicked[1]
    clickedy = clicked[3]
    const bsqr = document.getElementById("bx= " + clickedx + " by= " + clickedy)
        ;

    if (numberPlaced === false) {
        const backBoardSquaresEl = document.querySelectorAll(".bsqr");
        // console.log(backBoardSquaresEl);



        backBoardSquaresEl.forEach((backBoardSquare) => {

            numberOfAroundMines = 0
            id = backBoardSquare.id.split(" ")



            if (backBoardSquare.textContent === "") {
                gridArry.forEach((location) => {

                    x = id[1]
                    y = id[3]
                    x = parseFloat(x) + parseFloat(location[0])
                    y = parseFloat(y) + parseFloat(location[1])


                    if (x >= 0 && y >= 0 && x < width && y < height) {
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

const removeSquares = ((event) => {
    fid = event.srcElement.id
    fid = fid.split(" ")
    fx = fid[1]
    fy = fid[3]

    // gridArry.forEach((location) => {

    //     const repeat = ((fx, fy) => {

    //         if (fx >= 0 && fy >= 0 && fx < width && fy < height) {
    //             const bsqr = document.getElementById("bx= " + fx + " by= " + fy)
    //             checkNumber = bsqr.textContent
    //             if(checkNumber === "" ){
    //             const fsqr = document.getElementById("fx= " + fx + " fy= " + fy)
    //             fsqr.setAttribute("class", "hide");
    //             fx = parseFloat(fx) + parseFloat(location[0])
    //             fy = parseFloat(fy) + parseFloat(location[1])
    //             repeat(fx, fy)
    //             }else{
    //                 const fsqr = document.getElementById("fx= " + fx + " fy= " + fy)
    //                 fsqr.setAttribute("class", "hide");
    //             }
    //         } 
    //     })
    //     fx = fid[1]
    //     fy = fid[3]
    //     repeat(fx, fy)
    // })
    const repeat = ((fx, fy) => {
        fid[1] = fx
        fid[3] = fy
        const fsqr = document.getElementById("fx= " + fx + " fy= " + fy)
        fsqr.setAttribute("class", "hide");
        const bsqr = document.getElementById("bx= " + fx + " by= " + fy)
        checkNumber = bsqr.textContent
        if (checkNumber === "") {
            gridArry.forEach((location) => {

                fx = fid[1]
                fy = fid[3]

                fx = parseFloat(fx) + parseFloat(location[0])
                fy = parseFloat(fy) + parseFloat(location[1])
                if (fx >= 0 && fy >= 0 && fx < width && fy < height) {
                    const bsqr = document.getElementById("bx= " + fx + " by= " + fy)
                    checkNumber = bsqr.textContent
                    const fsqr = document.getElementById("fx= " + fx + " fy= " + fy)

                    // condition should check for hide class if avilabe skip

                    if (checkNumber === "" && fsqr.classList.contains("hide") === false) {
                        fsqr.setAttribute("class", "hide");
                        storages.push([fx, fy])
                        fx = parseFloat(fx) + parseFloat(location[0])
                        fy = parseFloat(fy) + parseFloat(location[1])
                    } else if (fsqr.classList.contains("hide") === false) {
                        fsqr.setAttribute("class", "hide");
                    }
                }

            })
        }

        if (storages.length > 0) {
            storages.forEach((storage) => {
                let itrate = storages.shift();
                repeat(itrate[0], itrate[1])


            })
        }

    })

    repeat(fx, fy)
})


const checkLose = (() => {



})

const checkWin = (() => {




})


const placeMark = ((event) => {
    event.preventDefault();

id = event.srcElement.id.split(" ")
x = id[1]
y = id[3]
const fsqr = document.getElementById("fx= " + x + " fy= " + y)


if( fsqr.textContent === ""){

    fsqr.textContent = "🚩"

}else if(fsqr.textContent === "🚩"){

    fsqr.textContent = ""
}

})


const handleBoardClicks = ((event) => {

    placeMines(event)
    placeNumbers(event)
    checkLose()
    removeSquares(event)
    checkWin()

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
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
    frontSquare.addEventListener("contextmenu", placeMark);
    })

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
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {    
        frontSquare.addEventListener("contextmenu", placeMark);
    })

});

const initHard = (() => {
    backBoard = [];
    frontBoard = [];
    win = false;
    minePlaced = false;
    numberPlaced = false;
    difficulty = "hard";
    numberOfMines = 99;
    width = 30;
    height = 16;
    initBoard(width, height);
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => { 
        frontSquare.addEventListener("contextmenu", placeMark);
    })

});

/*----------------------------- Event Listeners -----------------------------*/
easyButtonEl.addEventListener("click", initEasy);
mediumButtonEl.addEventListener("click", initMedium);
hardButtonEl.addEventListener("click", initHard);



