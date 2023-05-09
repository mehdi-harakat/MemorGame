let startButton = document.querySelector(".start-menu span");
let userName = document.querySelector(".info-container .name span");
let containerBlocks = document.querySelector(".memory-game-container");
let blocks = Array.from(
	document.querySelectorAll(".memory-game-container .game-block")
);
let tries = document.querySelector(".tries span");

let success = document.querySelector("#success");
let endSuccess = document.querySelector("#endSuccess");
let fail = document.querySelector("#fail");
let endFail = document.querySelector("#endFail");

let counter = 1000;

let blocksLength = blocks.length;
let hello = [...Array(blocksLength).keys()];

// Call the shaffle function to random the hello array
randomArray(hello);

// startButton.parentElement.style.display = "none";

// on click by mouse
startButton.onclick = startOne;

// on key enter click
window.onkeyup = (e) => {
	if (e.key === "Enter") {
		startOne();
	}
};

// start function
function startOne() {
	let inpValue = prompt("Your Name");
	if (inpValue === null || inpValue === "") {
		userName.innerHTML = "unknown";
	} else {
		userName.innerHTML = inpValue;
	}
	startButton.parentElement.style.display = "none";

	blocks.forEach((e) => {
		e.classList.add("is-flipped");
	});

	setTimeout(() => {
		blocks.forEach((e) => {
			e.classList.remove("is-flipped");
		});
	}, 2000);
}

// set the random order to all elements
blocks.forEach((e, index) => {
	e.style.order = hello[index];
	flippedBlocks(e);
});

// the sheffle function for random array
function randomArray(arr) {
	let current = arr.length,
		temp,
		random;
	while (current > 0) {
		random = Math.floor(Math.random() * current);

		//! this is the simple way for swapping variables
		// temp = arr[current - 1];
		// arr[current - 1] = arr[random];
		// arr[random] = temp;

		// this swapping by [** data Destructuring **]
		[arr[current - 1], arr[random]] = [arr[random], arr[current - 1]];

		current--;
	}
}

// the flip function for the blocks
function flippedBlocks(test) {
	test.onclick = () => {
		test.classList.add("is-flipped");

		let fil = blocks.filter((elem) => {
			if (elem.classList.contains("is-flipped")) {
				return elem;
			}
		});

		if (fil.length === 2) {
			containerBlocks.style.pointerEvents = "none";
			if (fil[0].dataset.technology === fil[1].dataset.technology) {
				success.play();
				fil[0].classList.remove("is-flipped");
				fil[1].classList.remove("is-flipped");

				fil[0].classList.add("is-matched");
				fil[1].classList.add("is-matched");
				setTimeout(() => {
					containerBlocks.style.pointerEvents = "all";
				}, counter);
				secondFunction();
			} else {
				fail.play();
				tries.innerHTML = parseInt(tries.innerHTML) + 1;
				setTimeout(() => {
					containerBlocks.style.pointerEvents = "all";
					fil[0].classList.remove("is-flipped");
					fil[1].classList.remove("is-flipped");
				}, counter);
				secondFunction();
			}
		}
	};
}

function secondFunction() {
	let filTwo = blocks.filter((el) => {
		if (el.classList.contains("is-matched")) {
			return el;
		}
	});

	let move = blocksLength;

	if (filTwo.length === move) {
		endSuccess.play();
		setTimeout(() => {
			containerBlocks.style.pointerEvents = "none";
		}, counter);
		setTimeout(() => {
			console.log("you win");
			window.location.reload();
		}, 5000);
	} else if (parseInt(tries.innerHTML) === 15) {
		endFail.play();
		setTimeout(() => {
			containerBlocks.style.pointerEvents = "none";
		}, counter);
		setTimeout(() => {
			console.log("you lose");
			window.location.reload();
		}, 5000);
	}
}
