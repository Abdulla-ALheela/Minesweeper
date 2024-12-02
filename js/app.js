
/*-------------------------------- Constants --------------------------------*/

const gridArry = [
    [-1, -1], [0, -1], [1, -1],
    [-1, 0], [1, 0],
    [-1, 1], [0, 1], [1, 1]
];
const storages = [];

/*---------------------------- Variables (state) ----------------------------*/

let backBoard = [];
let numberOfMines = 0;
let win = false;
let lose = false;
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
let numberOfAroundMines;
let id;
let loop;
let x;
let y;

//fid short for frontBoardID
let fid;

// variables for the first square clicked
let clicked;
let clickedx;
let clickedy;
let firstClick = true;

let checkNumber;
let count;
let bombId;
let winCount = 0;
let time = 0;
let timerId;
let reveal = false;

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
// set numbers for the timer and the counter
timerEl.textContent = time;
countEl.textContent = numberOfMines;

/*-------------------------------- Functions --------------------------------*/

// Function for the timer
const timer = (() => {
    timerId = setTimeout(timer, 1000);
    time++;
    timerEl.textContent = time;
    if (win === true || lose === true) {
        clearTimeout(timerId);
    };

});

// Function to create the board depending on the size passed to it 
const initBoard = ((width, height) => {

    // while loop to delete the old board before making new one
    while (boardEl.hasChildNodes()) {
        boardEl.removeChild(boardEl.firstChild);

    };


    //CSS for the board
    boardEl.style.display = "grid";
    boardEl.style.gridTemplateColumns = `repeat(${width}, 25px)`;
    boardEl.style.gridTemplateRows = `repeat(${height}, 25px)`;

    numberOfSquares = width * height;
    loop = 0;

    // Creating the board elements
    for (let x = 0; x < width; x++) {
        rowEl = document.createElement("div");
        rowEl.setAttribute("class", "row");
        rowEl.setAttribute("id", "row " + x);

        boardEl.appendChild(rowEl);

        for (let y = 0; y < height; y++) {
            loop++;
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

    //Caching the front board elements after creating the elements
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontBoardSquare) => {

        frontBoardSquare.addEventListener("click", handleBoardClicks);
    });

});


// Function to place the mines randomly
const placeMines = ((event) => {

    //Creating an empty array to place mines inside it randomly
    for (let n = 0; n < numberOfSquares; n++) {

        backBoard[n] = "";

    };

    //Caching the back board elements after creating the elements in initBoard function
    const backBoardSquaresEl = document.querySelectorAll(".bsqr");

    //place mines randomly
    if (minePlaced === false) {

        //To get the ID of the clicked square and prevent mines from being placed on those squares
        clicked = event.srcElement.id.split(" ");
        clickedx = clicked[1];
        clickedy = clicked[3];


        // loopAgain is a tag to repeat the for loop if a number is generated multiple times
        loopAgain: for (let p = 0; p < numberOfMines; p++) {

            randomNumber = Math.floor(Math.random() * numberOfSquares);

            if (backBoard[randomNumber] === "" && backBoardSquaresEl[randomNumber].id !== "bx= " + clickedx + " by= " + clickedy) {

                backBoard[randomNumber] = "💣";
                backBoardSquaresEl[randomNumber].textContent = backBoard[randomNumber];
            } else {
                p--;
                continue loopAgain;

            };
        };
        minePlaced = true;
    };
});

// Function to place the numbers around the mines 
const placeNumbers = (() => {

    if (numberPlaced === false) {

        // Re-caching the back board elements because they are outside the scope of the initial cache
        const backBoardSquaresEl = document.querySelectorAll(".bsqr");

        // check all the back boaed squares
        backBoardSquaresEl.forEach((backBoardSquare) => {

            numberOfAroundMines = 0;

            //getting the id of the element
            id = backBoardSquare.id.split(" ");

            // If the square is empty, it will check the surrounding 8 squares for any mines and increase the number based on the mines found
            if (backBoardSquare.textContent === "") {

                // Loop through the array to get the coordinates of the surrounding squares
                gridArry.forEach((location) => {

                    //reset to the square clicked 
                    x = id[1];
                    y = id[3];

                    // to get the the coordinates of the surrounding square
                    x = parseFloat(x) + parseFloat(location[0]);
                    y = parseFloat(y) + parseFloat(location[1]);

                    // Ensure the coordinates are within the boundaries before caching
                    if (x >= 0 && y >= 0 && x < width && y < height) {
                        const elem = document.getElementById("bx= " + x + " by= " + y);

                        if (elem.textContent === "💣") {
                            numberOfAroundMines++;
                        };
                    };
                });

                // give each number diffrent color
                if (numberOfAroundMines > 0) {
                    if (numberOfAroundMines === 1) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(41, 177, 142)";
                    } else if (numberOfAroundMines === 2) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(80, 150, 43)";
                    } else if (numberOfAroundMines === 3) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "blue";
                    } else if (numberOfAroundMines === 4) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(233, 6, 34)";
                    } else if (numberOfAroundMines === 5) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(113, 46, 50)";
                    } else if (numberOfAroundMines === 6) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(22, 23, 23)";
                    } else if (numberOfAroundMines === 7) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(21, 40, 54)";
                    } else if (numberOfAroundMines === 8) {
                        backBoardSquare.textContent = numberOfAroundMines;
                        backBoardSquare.style.color = "rgb(209, 204, 123)";
                    };
                };
            };
        });
    };
    numberPlaced = true;
});

// Function to remove squares until it encounters a number. If the number is clicked, it will only reveal the number.
const removeSquares = ((event) => {
    // get the id of the clicked square on the front board
    fid = event.srcElement.id;
    fid = fid.split(" ");
    fx = fid[1];
    fy = fid[3];

    const repeat = ((fx, fy) => {

        // Saving the new passed coordinates in the array
        fid[1] = fx;
        fid[3] = fy;

        // Caching the front and back squares using the passed ID
        const fsqr = document.getElementById("fx= " + fx + " fy= " + fy);
        const bsqr = document.getElementById("bx= " + fx + " by= " + fy);

        //add to the front square a hide class to reveal it
        fsqr.classList.add("hide");

        // Assigning the text content of the back square to a variable
        checkNumber = bsqr.textContent;

        // If the clicked square is not empty, it will pass. If it is empty, it will proceed inside.
        if (checkNumber === "") {

            // Loop through the array to get the coordinates of the surrounding squares
            gridArry.forEach((location) => {

                //reset to the square clicked 
                fx = fid[1];
                fy = fid[3];

                // to get the the coordinates of the surrounding square
                fx = parseFloat(fx) + parseFloat(location[0]);
                fy = parseFloat(fy) + parseFloat(location[1]);

                // Ensure the coordinates are within the boundaries before caching
                if (fx >= 0 && fy >= 0 && fx < width && fy < height) {
                    const bsqr = document.getElementById("bx= " + fx + " by= " + fy);
                    checkNumber = bsqr.textContent;
                    const fsqr = document.getElementById("fx= " + fx + " fy= " + fy);

                    // If the back square is empty, the front square doesn't have the hide class, and the front square is empty, it will assign the hide class to the front square to reveal it and store the coordinates to check around this empty square in a different iteration.
                    if (checkNumber === "" && fsqr.classList.contains("hide") === false && fsqr.textContent === "") {
                        fsqr.classList.add("hide");
                        storages.push([fx, fy]);
                        fx = parseFloat(fx) + parseFloat(location[0]);
                        fy = parseFloat(fy) + parseFloat(location[1]);
                        // If the back square is not empty it will just reveal it
                    } else if (fsqr.classList.contains("hide") === false && fsqr.textContent === "") {
                        fsqr.classList.add("hide");
                    };
                };

            });
        };

        // If the array has coordinates, it will take these coordinates and pass them to the repeat function to repeat the whole process again.
        if (storages.length > 0) {
            storages.forEach(() => {
                let itrate = storages.shift();
                repeat(itrate[0], itrate[1]);

            });
        };

    });

    // Calling the function for the first time to trigger the recursion effect
    repeat(fx, fy);
});


// function to check if player lost 
const checkLose = ((event) => {

    // If statement to ensure the code doesn't execute if the player wins
    if (win === false) {

        // Getting the ID to cache the clicked square
        id = event.srcElement.id.split(" ");
        x = id[1];
        y = id[3];
        const bsqr = document.getElementById("bx= " + x + " by= " + y);

        // If the clicked square has a mine, it will display "Explode", highlight the square with a red background, and reveal all mines.
        if (bsqr.textContent === "💣") {

            messageEl.textContent = "Explode";
            messageEl.style.overflow = "visible";
            messageEl.style.display = "block";
            lose = true;
            bsqr.style.backgroundColor = "red";
            const backBoardSquaresEl = document.querySelectorAll(".bsqr");

            //check all the squares and reveal the ones the has mines
            backBoardSquaresEl.forEach((backBoardSquare) => {
                if (backBoardSquare.textContent === "💣") {
                    bombId = backBoardSquare.id.split(" ");
                    x = bombId[1];
                    y = bombId[3];
                    const fsqr = document.getElementById("fx= " + x + " fy= " + y);
                    fsqr.classList.add("hide");;
                };
            });
        };
    };

    //stop the timer
    if (lose === true) {
        clearTimeout(timerId);
    };
});


// function to check if player won
const checkWin = (() => {

    // If statement to ensure the code doesn't execute if the player lose
    if (lose === false) {

        // Re-caching the front boards again because they are outside the scope of the other cached elements
        const frontBoardSquaresEl = document.querySelectorAll(".fsqr");

        // count the number of squares that has been revealed or marked and it has a mine
        frontBoardSquaresEl.forEach((frontBoardSquare) => {

            //caching the back square to check if it has a mine
            id = frontBoardSquare.id.split(" ");
            x = id[1];
            y = id[3];
            const bsqr = document.getElementById("bx= " + x + " by= " + y);

            if (frontBoardSquare.classList.contains("hide") === true || (frontBoardSquare.textContent === "🚩" && bsqr.textContent === "💣")) {
                winCount++;
            };
        });

        // If all the squares are revealed and all the mines are marked, the player wins. Otherwise, reset winCount.
        if (winCount === numberOfSquares && count === 0) {
            messageEl.textContent = "Clear";
            win = true;
            messageEl.style.overflow = "visible";
            messageEl.style.display = "block";

        } else {
            winCount = 0;
        };
    };

    //Stop timer
    if (win === true) {
        clearTimeout(timerId);
    };
});


// Function to mark front squares when the squares are right-clicked
const placeMark = ((event) => {
    event.preventDefault();

    // Ensure the function doesn't execute when the player wins or loses
    if (lose === false && win === false) {

        //caching the front square to place mark on it
        id = event.srcElement.id.split(" ");
        x = id[1];
        y = id[3];
        const fsqr = document.getElementById("fx= " + x + " fy= " + y);

        // If right-clicked on a square, it will remove the mark if it exists, or place a mark if it is empty.
        if (fsqr.textContent === "" && count > 0) {

            fsqr.textContent = "🚩";
            count--;


        } else if (fsqr.textContent === "🚩" && count >= 0) {

            fsqr.textContent = "";
            count++;

        };

        //Update counter and check if player won
        countEl.textContent = count;
        checkWin();
    };
});


// Function that handles board clicks
const handleBoardClicks = ((event) => {

    //start timer with the first click
    if (firstClick === true) {
        timer();
        firstClick = false;
    };

    // Caching the front square to check if it has a mark or not
    id = event.srcElement.id.split(" ");
    x = id[1];
    y = id[3];
    const fsqr = document.getElementById("fx= " + x + " fy= " + y);

    // If statements to ensure the player can't interact with the board when they win or lose, or if there is a mark on the clicked square
    if (lose === false && win === false) {
        if (fsqr.textContent !== "🚩") {
            placeMines(event);
            placeNumbers(event);
            checkLose(event);
            removeSquares(event);
            checkWin(event);
        };
    };
});


// When called, it resets the board
const reset = (() => {
    tutorialEl.style.overflow = "hidden";
    tutorialEl.style.display = "none";
    messageEl.style.overflow = "hidden";
    messageEl.style.display = "none";
    reveal = false;
    clearTimeout(timerId);
    firstClick = true;
    backBoard = [];
    win = false;
    lose = false;
    minePlaced = false;
    numberPlaced = false;
    messageEl.textContent = "";
    time = 0;
    timerEl.textContent = time;
});


// Function that has all the information to create the board on easy difficulty
const initEasy = (() => {

    //changing the button name to reset
    easyButtonEl.textContent = "Reset";
    mediumButtonEl.textContent = "Intermediate";
    hardButtonEl.textContent = "Expert";

    //update counter
    numberOfMines = 10;
    count = numberOfMines;
    countEl.textContent = numberOfMines;

    width = 9;
    height = 9;
    reset();
    initBoard(width, height);

    // Caching the element after creating it to add an event listener to it
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
        frontSquare.addEventListener("contextmenu", placeMark);
    });

});

// Function that has all the information to create the board on medium difficulty
const initMedium = (() => {

    //changing the button name to reset
    easyButtonEl.textContent = "Beginner";
    mediumButtonEl.textContent = "Reset";
    hardButtonEl.textContent = "Expert";

    //update counter
    numberOfMines = 40;
    count = numberOfMines;
    countEl.textContent = numberOfMines;

    width = 16;
    height = 16;
    reset();
    initBoard(width, height);

    // Caching the element after creating it to add an event listener to it
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
        frontSquare.addEventListener("contextmenu", placeMark);
    });

});

// Function that has all the information to create the board on hard difficulty
const initHard = (() => {

    //changing the button name to reset
    easyButtonEl.textContent = "Beginner";
    mediumButtonEl.textContent = "Intermediate";
    hardButtonEl.textContent = "Reset";

    //update counter
    numberOfMines = 99;
    count = numberOfMines;
    countEl.textContent = numberOfMines;

    width = 30;
    height = 16;
    reset();
    initBoard(width, height);

    // Caching the element after creating it to add an event listener to it
    const frontBoardSquaresEl = document.querySelectorAll(".fsqr");
    frontBoardSquaresEl.forEach((frontSquare) => {
        frontSquare.addEventListener("contextmenu", placeMark);
    });

});

// Function to reveal and unreveal the tutorial
const displayTutorial = (() => {

    // Reset the button names
    easyButtonEl.textContent = "Beginner";
    mediumButtonEl.textContent = "Intermediate";
    hardButtonEl.textContent = "Expert";

    //clear the win or lose message
    messageEl.style.overflow = "hidden";
    messageEl.style.display = "none";

    //stop and clear the timer
    clearTimeout(timerId);
    time = 0;
    timerEl.textContent = time;

    //reset the counter
    numberOfMines = 0;
    countEl.textContent = numberOfMines;

    // Delete the board
    while (boardEl.hasChildNodes()) {
        boardEl.removeChild(boardEl.firstChild);

    };

    // Reaveal and unreveal the tutorial
    if (reveal === false) {
        tutorialEl.style.overflow = "visible";
        tutorialEl.style.display = "block";
        reveal = true;
    } else if (reveal === true) {
        tutorialEl.style.overflow = "hidden";
        tutorialEl.style.display = "none";
        reveal = false;
    };
});

/*----------------------------- Event Listeners -----------------------------*/

easyButtonEl.addEventListener("click", initEasy);
mediumButtonEl.addEventListener("click", initMedium);
hardButtonEl.addEventListener("click", initHard);
tutorialButtonEl.addEventListener("click", displayTutorial);


