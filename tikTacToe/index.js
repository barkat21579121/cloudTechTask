// Har `box` ko dhoondho
let boxes = document.querySelectorAll(".box");

// Reset button ko dhoondho
let resetBtn = document.querySelector("#reset-btn");

// New game button ko dhoondho
let newGameBtn = document.querySelector("#new-btn");

// Msg container ko dhoondho
let msgContainer = document.querySelector(".msg-container");

// Msg ko dhoondho
let msg = document.querySelector("#msg");

// TurnO true pe set karo
let turnO = true;

// Count ko zero pe set karo
let count = 0;

// Jeetne wale patterns ka array banao
const winPatterns = [
    [0, 1, 2],   // Top row
    [0, 3, 6],   // Left column
    [0, 4, 8],   // Left diagonal
    [1, 4, 7],   // Middle column
    [2, 5, 8],   // Right column
    [2, 4, 6],   // Right diagonal
    [3, 4, 5],   // Middle row
    [6, 7, 8],   // Bottom row
];

// Game ko dobara start karo
const resetGame = () => {
    // TurnO ko true pe set karo
    turnO = true;
    // Count ko zero pe set karo
    count = 0;
    // Sabhi boxes ko enable karo
    enableBoxes();
    // Msg container ko hide karo
    msgContainer.classList.add("hide");
};

// Har `box` ke liye
boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            // Agar turnO hai
            // Box mein "O" likho
            box.innerText = "O";
            // TurnO ko false pe set karo
            turnO = false;
        } else {
            // Agar turnO nahi hai
            // Box mein "X" likho
            box.innerText = "X";
            // TurnO ko true pe set karo
            turnO = true;
        }
        // Box ko disabled kardo
        box.disabled = true;
        // Count ko barhao
        count++;

        // Kya koi jeeta?
        let isWinner = checkWinner();

        // Agar 9 counts ho gaye aur koi jeeta nahi
        if (count === 9 && !isWinner) {
            // Game draw hai
            gameDraw();
        }
    });
});

// Game draw hone par
const gameDraw = () => {
    // Msg mein likho "Game draw hua."
    msg.innerText = `Game was a Draw.`;
    // Msg container ko hide karo
    msgContainer.classList.remove("hide");
    // Sabhi boxes ko disable karo
    disableBoxes();
};

// Sabhi boxes ko disable karo
const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

// Sabhi boxes ko enable karo
const enableBoxes = () => {
    for (let box of boxes) {
        // Box ko enable karo
        box.disabled = false;
        // Box mein kuch na likho
        box.innerText = "";
    }
};

// Winner ko dikhao
const showWinner = (winner) => {
    // Msg mein likho "Mubarak ho, jeetne wala hai: {winner}"
    msg.innerText = `Congratulations, Winner is ${winner}`;
    // Msg container ko hide karo
    msgContainer.classList.remove("hide");
    // Sabhi boxes ko disable karo
    disableBoxes();
};

// Jeetne wale ko check karo
const checkWinner = () => {
    // Har pattern ke liye
    for (let pattern of winPatterns) {
        // Position 1, 2, aur 3 ke values nikalo
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        // Agar koi value nahi hai
        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            // Aur teeno mein same value hai
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // Winner ko dikhao
                showWinner(pos1Val);
                // True return karo
                return true;
            }
        }
    }
};

// New game button pe click hone par
newGameBtn.addEventListener("click", resetGame);
// Reset button pe click hone par
resetBtn.addEventListener("click", resetGame);
