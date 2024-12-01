
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
let numberOfMines = 0;
let win = false;
let lose = false
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
let count
let bombId
let winCount = 0
let time = 0
let timerId
let revel = false
/*------------------------ Cached Element References ------------------------*/
const boardEl = document.querySelector("#board");
const messageEl = document.querySelector("#message");
const easyButtonEl = document.querySelector("#easy");
const mediumButtonEl = document.querySelector("#medium");
const hardButtonEl = document.querySelector("#hard");
const countEl = document.querySelector("#count");
const timerEl = document.querySelector("#timer");
const tutorialEl = document.querySelector("#tutorial-text");
const tutorialButtonEl = document.querySelector("#tutorial");
timerEl.textContent = time
countEl.textContent = numberOfMines
/*-------------------------------- Functions --------------------------------*/

const timer = (() => {
    timerId = setTimeout(timer, 1000)
    time++
    timerEl.textContent = time
    if (win === true || lose === true) {
        clearTimeout(timerId)
    }

})

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

});

const placeMines = ((event) => {

    const backBoardSquaresEl = document.querySelectorAll(".bsqr");

    if (minePlaced === false) {
        clicked = event.srcElement.id.split(" ")
        clickedx = clicked[1]
        clickedy = clicked[3]
        loopAgain: for (let p = 0; p < numberOfMines; p++) {

            randomNumber = Math.floor(Math.random() * numberOfSquares);


            if (backBoard[randomNumber] === "" && backBoardSquaresEl[randomNumber].id !== "bx= " + clickedx + " by= " + clickedy) {

                backBoard[randomNumber] = "💣"
                backBoardSquaresEl[randomNumber].textContent = backBoard[randomNumber]
            } else {
                p--
                continue loopAgain;

            }
        }
        minePlaced = true

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
                    if (numberOfAroundMines === 1) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(41, 177, 142)"
                    } else if (numberOfAroundMines === 2) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(80, 150, 43)"
                    } else if (numberOfAroundMines === 3) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(231, 182, 67)"
                    } else if (numberOfAroundMines === 4) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(233, 6, 34)"
                    } else if (numberOfAroundMines === 5) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(113, 46, 50)"
                    } else if (numberOfAroundMines === 6) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(22, 23, 23)"
                    } else if (numberOfAroundMines === 7) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(21, 40, 54)"
                    } else if (numberOfAroundMines === 8) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(209, 204, 123)"
                    } else if (numberOfAroundMines === 9) {
                        backBoardSquare.textContent = numberOfAroundMines
                        backBoardSquare.style.color = "rgb(223, 71, 58)"
                    }


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

    const repeat = ((fx, fy) => {
        fid[1] = fx
        fid[3] = fy
        const fsqr = document.getElementById("fx= " + fx + " fy= " + fy)
        fsqr.classList.add("hide");
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



                    if (checkNumber === "" && fsqr.classList.contains("hide") === false && fsqr.textContent === "") {
                        fsqr.classList.add("hide");
                        storages.push([fx, fy])
                        fx = parseFloat(fx) + parseFloat(location[0])
                        fy = parseFloat(fy) + parseFloat(location[1])
                    } else if (fsqr.classList.contains("hide") === false && fsqr.textContent === "") {
                        fsqr.classList.add("hide");
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


const checkLose = ((event) => {
    if (win === false) {
        id = event.srcElement.id.split(" ")
        x = id[1]
        y = id[3]
        const bsqr = document.getElementById("bx= " + x + " by= " + y)

        if (bsqr.textContent === "💣") {
            messageEl.textContent = "Explode"
            messageEl.style.overflow = "visible"
            messageEl.style.display = "block"
            lose = true
            bsqr.style.backgroundColor = "red"
            const backBoardSquaresEl = document.querySelectorAll(".bsqr");
            backBoardSquaresEl.forEach((backBoardSquare) => {
                if (backBoardSquare.textContent === "💣") {
                    bombId = backBoardSquare.id.split(" ")
                    x = bombId[1]
                    y = bombId[3]
                    const fsqr = document.getElementById("fx= " + x + " fy= " + y)
                    fsqr.classList.add("hide");
                }

            })
        }


    }

    if (lose === true) {
        clearTimeout(timerId)

    }
})

const checkWin = (() => {
    if (lose === false) {
        const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
        frontBoardSquaresEl.forEach((frontBoardSquare) => {

            if (frontBoardSquare.classList.contains("hide") === true || frontBoardSquare.textContent === "🚩") {
                winCount++



            }
        })

        if (winCount === numberOfSquares && count === 0) {
            messageEl.textContent = "Clear"
            win = true
            messageEl.style.overflow = "visible"
            messageEl.style.display = "block"

        } else {
            winCount = 0;
        }
    }

    if (win === true) {
        clearTimeout(timerId)

    }
})


const placeMark = ((event) => {
    event.preventDefault();
    if (lose === false && win === false) {
        id = event.srcElement.id.split(" ")
        x = id[1]
        y = id[3]
        const fsqr = document.getElementById("fx= " + x + " fy= " + y)


        if (fsqr.textContent === "") {

            fsqr.textContent = "🚩"
            count--


        } else if (fsqr.textContent === "🚩") {

            fsqr.textContent = ""
            count++

        }
        countEl.textContent = count
        checkWin()
    }
})


const handleBoardClicks = ((event) => {
    if (firstClick === true) {
        timer()
        firstClick = false
    }
    id = event.srcElement.id.split(" ")
    x = id[1]
    y = id[3]
    const fsqr = document.getElementById("fx= " + x + " fy= " + y)
    if (lose === false && win === false) {
        if (fsqr.textContent !== "🚩") {
            placeMines(event)
            placeNumbers(event)
            checkLose(event)
            removeSquares(event)
            checkWin()
        }
    }
})


const initEasy = (() => {
    tutorialEl.style.overflow = "hidden"
    tutorialEl.style.display = "none"
    messageEl.style.overflow = "hidden"
    messageEl.style.display = "none"
    revel = false
    easyButtonEl.textContent = "Reset"
    mediumButtonEl.textContent = "Intermediate"
    hardButtonEl.textContent = "Expert"
    clearTimeout(timerId)
    firstClick = true
    backBoard = [];
    frontBoard = [];
    win = false;
    lose = false;
    minePlaced = false;
    numberPlaced = false;
    difficulty = "easy";
    numberOfMines = 10;
    count = numberOfMines
    countEl.textContent = count
    width = 9;
    height = 9;
    messageEl.textContent = ""
    time = 0
    timerEl.textContent = time
    initBoard(width, height);
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
        frontSquare.addEventListener("contextmenu", placeMark);
    })

});

const initMedium = (() => {
    tutorialEl.style.overflow = "hidden"
    tutorialEl.style.display = "none"
     messageEl.style.overflow = "hidden"
    messageEl.style.display = "none"
    revel = false
    easyButtonEl.textContent = "Beginner"
    mediumButtonEl.textContent = "Reset"
    hardButtonEl.textContent = "Expert"
    clearTimeout(timerId)
    firstClick = true
    backBoard = [];
    frontBoard = [];
    win = false;
    lose = false;
    minePlaced = false;
    numberPlaced = false;
    difficulty = "medium";
    numberOfMines = 40;
    count = numberOfMines
    countEl.textContent = count
    width = 16;
    height = 16;
    messageEl.textContent = ""
    time = 0
    timerEl.textContent = time
    initBoard(width, height);
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
        frontSquare.addEventListener("contextmenu", placeMark);
    })

});

const initHard = (() => {
    tutorialEl.style.overflow = "hidden"
    tutorialEl.style.display = "none"
    messageEl.style.overflow = "hidden"
    messageEl.style.display = "none"
    revel = false
    easyButtonEl.textContent = "Beginner"
    mediumButtonEl.textContent = "Intermediate"
    hardButtonEl.textContent = "Reset"
    clearTimeout(timerId)
    firstClick = true
    backBoard = [];
    frontBoard = [];
    win = false;
    lose = false;
    minePlaced = false;
    numberPlaced = false;
    difficulty = "hard";
    numberOfMines = 99;
    count = numberOfMines
    countEl.textContent = count
    width = 30;
    height = 16;
    messageEl.textContent = ""
    time = 0
    timerEl.textContent = time
    initBoard(width, height);
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
        frontSquare.addEventListener("contextmenu", placeMark);
    })

});

const displayTutorial = (() => {
    easyButtonEl.textContent = "Beginner"
    mediumButtonEl.textContent = "Intermediate"
    hardButtonEl.textContent = "Expert"
    messageEl.style.overflow = "hidden"
    messageEl.style.display = "none"
    clearTimeout(timerId)
    time = 0
    timerEl.textContent = time
    numberOfMines = 0;
    countEl.textContent = numberOfMines

    while (boardEl.hasChildNodes()) {
        boardEl.removeChild(boardEl.firstChild);

    };
    loop = 0;
    if (revel === false) {
        tutorialEl.style.overflow = "visible"
        tutorialEl.style.display = "block"
        revel = true
    } else if (revel === true) {
        tutorialEl.style.overflow = "hidden"
        tutorialEl.style.display = "none"
        revel = false
    }
})

/*----------------------------- Event Listeners -----------------------------*/
easyButtonEl.addEventListener("click", initEasy);
mediumButtonEl.addEventListener("click", initMedium);
hardButtonEl.addEventListener("click", initHard);
tutorialButtonEl.addEventListener("click", displayTutorial)


