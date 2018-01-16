function getPointValue() {
    var possiblePoints = [1, 25, 25, 50, 50, 75, 75, 75, 100, 100, 100, 150, 150, 150, 200, 200, 200, 300, 300, 400, 400, 800];
    points = possiblePoints[Math.floor(Math.random()*possiblePoints.length)];
    document.getElementById("pointsValue").value = points + " points per letter";
}

function getPositionValues(row, col) {
    if (row == 0) {
        var colVal = 116 + (col * 55);
        return [82, colVal];
    } else if (row == 1) {
        var colVal = 62 + (col * 55);
        return [159, colVal];
    } else if (row == 2) {
        var colVal = 60 + (col * 55);
        return [235, colVal];
    } else {
        var colVal = 116 + (col * 55);
        return [310, colVal];
    }
}

puzzleNum = 0;
puzzles = [
    {
        category: "Ringstrasse",
        words: [
            {
                word: "ringstrasse",
                row: 1,
                offset: 1
            }
        ]
    },
    {
        category: "Tester",
        words: [
            {
                word: "hello",
                row: 0,
                offset: 0
            },
            {
                word: "world",
                row: 3,
                offset:2
            }
        ]
    },
    {
        category: "Irish",
        words: [
            {
                word: "ivar",
                row: 0,
                offset: 0
            },
            {
                word: "O",
                row: 0,
                offset: 5
            },
            {
                word: "chancelor",
                row: 1,
                offset: 1
            },
            {
                word: "neal",
                row: 2,
                offset: 0
            }
        ]
    }
]

function getNextPuzzle() {
    var overlays = document.getElementById("overlays");
    while (overlays.firstChild) {
        overlays.removeChild(overlays.firstChild);
    }

    var puzzle = puzzles[puzzleNum];
    document.getElementById("categoryHeader").innerHTML = "Category: " + puzzle.category;
    for (var i = 0; i < puzzle.words.length; i++) {
        var tempWord = puzzle.words[i];
        placeWord(tempWord.row, tempWord.offset, tempWord.word);
    }
    puzzleNum++;
}

function placeWord(row, offset, word) {
    var overlays = document.getElementById("overlays");
    for (var i = 0; i < word.length; i++) {
        var position = getPositionValues(row, offset + i);
        var tempOverlay = document.createElement("img");
        tempOverlay.setAttribute('src', 'LetterCover.png');
        tempOverlay.style.position = "absolute";
        tempOverlay.style.top = position[0] + "px";
        tempOverlay.style.left = position[1] + "px";
        tempOverlay.setAttribute('letter', word[i]);
        overlays.appendChild(tempOverlay);
    }
}

function handleGuess() {
    var letterGuess = document.getElementById("letterGuess").value.toLowerCase();
    var results = $("[letter=" + letterGuess + "]");
    for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        results[i].src = "letters/" + letterGuess + ".png";
    }
    document.getElementById("pointsEarned").innerHTML = (points * results.length) + " Points Earned!";    
}

$("#letterGuess").on('keyup', function (e) {
    if (e.keyCode == 13) {
        handleGuess();
    }
})