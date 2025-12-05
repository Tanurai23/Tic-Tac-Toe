let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-Btn");
let newGameBtn = document.querySelector("#new-Btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let clickSound = document.querySelector("#click-sound");
let winSound = document.querySelector("#win-sound");

let turnO = true;

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    clickSound.play();

    if (turnO) {
      box.innerText = "O";
      box.style.color = "#00eaff";
    } else {
      box.innerText = "X";
      box.style.color = "#ff00ff";
    }

    box.disabled = true;
    checkWinner();
    turnO = !turnO;
  });
});

const disableBoxes = () => {
  boxes.forEach((box) => box.disabled = true);
};

const enableBoxes = () => {
  boxes.forEach((box) => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win-glow");
  });
};

const showWinner = (winner, pattern) => {
  msg.innerText = `🎉 Winner: ${winner}`;
  msgContainer.classList.remove("hide");

  winSound.play();

  // Apply glowing effect only to winning boxes
  pattern.forEach(i => boxes[i].classList.add("win-glow"));

  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    let val1 = boxes[a].innerText;
    let val2 = boxes[b].innerText;
    let val3 = boxes[c].innerText;

    if (val1 && val1 === val2 && val2 === val3) {
      showWinner(val1, pattern);
      return;
    }
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
