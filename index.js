// Load boards from file or manually
function dataToArray(_data) {
    _data_arr = [['','','','','','','','',''],['','','','','','','','',''],
        ['','','','','','','','',''],['','','','','','','','',''],
        ['','','','','','','','',''],['','','','','','','','',''],
        ['','','','','','','','',''],['','','','','','','','',''],['','','','','','','','','']]
    let plus = 0
    for (let j = 0; j<9; j++) {
        for (let i = 0; i<9; i++) {
            if (_data.charAt(i + plus) != '-') {
                console.log(_data.charAt(i + plus));
                _data_arr[j][i] = _data.charAt(i + plus);
            }
        }
        plus += 9;
    }
    return _data_arr
}

const easy = "185329174971485326234761859362574981549618732718293465823946517197852643456137298";
    //;

// "6------7------5-2------1---362----81--96-----71--9-4-5-2---651---78----345-------";
const easy_arr = dataToArray(easy);

const medium = //"--9-------4----6-758-31----15--4-36-------4-8----9-------75----3-------1--2--3--";
"619472583243985617587316924158247369926531478734698152891754236365829741472163895";
const medium_arr = dataToArray(medium);

const hard = //"-1-5-------97-42----5----7-5---3---7-6--2-41---8--5---1-4------2-3-----9-7----8--";
"712583694639714258845269173521436987367928415498175326184697532253841769976352841";
const hard_arr = dataToArray(hard);

console.log(easy_arr);
console.log(medium_arr);
console.log(hard_arr);

//Create var

window.onload = function() {
    //Run startgame function when button is clicked
    id("start-btn").addEventListener("click", startGame);
}

function startGame(){
    //Choose board difficulty
    if (id("diff-1").checked) board = easy_arr;
    else if (id("diff-2").checked) board = medium_arr;
    else board = hard_arr;
    // Create board based on difficulty
    generateBoard(board);
    // Set theme based on input
    if (id("theme-1").checked) {
        qs("body").classList.remove("dark");
    } else {
        qs("body").classList.add("dark");
    }
}

function generateBoard(_board) {
    //Clear previous board
    clearPrevious();
    // Create 81 tiles
    for (let j=0; j<9; j++) {
        for (let i=0; i<9; i++) {
            //Create a new paragraph element
            let tile = document.createElement("p");
            //Set tile text to correct number
            tile.textContent = _board[j][i];
            // Assign tile id
            tile.id = j + '' + i;
            // Add tile class to all tiles
            tile.classList.add("tile");
            // Making borders
            if (Math.floor(tile.id / 10) === 2 || Math.floor(tile.id / 10) === 5) {
                tile.classList.add("bottomBorder");
            }
            if (tile.id % 10 == 2 || tile.id % 10 == 5) {
                tile.classList.add("rightBorder");
            }
            // Add tile to board
            id("board").append(tile);
        }
    }
    if (checkCorrect(_board)) {
        id("info").textContent = "Судоку!"
    } else id("info").textContent = "Что-то не так"
}

function checkCorrect(_board) {
    // If no coincidence in colomn, line, cell, return true
    let seen = new Set()
    let len = seen.size
    for (let j=0; j<9; j++) {
        for (let i=0; i<9; i++) {
            current_val = _board[j][i];
            if (current_val != '') {
                seen.add(current_val + " in line " + j)
                seen.add(current_val + " in colomn " + i)
                seen.add(current_val + " in cell " + Math.floor(j / 3) + '-' + Math.floor(i / 3))
                if (len+3 != seen.size) return false
                else len+=3
                }
            }


        }
    return true
    }


function clearPrevious() {
    //Access all of the tiles
    let tiles = qsa(".tile");
    //Remove ech tile
    for (let i=0; i<tiles.length; i++) {
        tiles[i].remove();
    }
}

// Helper functions
function qs(_selector) {
    return document.querySelector(_selector);
}

function qsa(_selector) {
    return document.querySelectorAll(_selector);
}

function id(_id) {
    return document.getElementById(_id);
}
