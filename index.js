let body = document.querySelector("body");

let groupCount = 16;

window.addEventListener("load", createNewGrid);

function createNewGrid() {
	//Create body structure

	let sketchContainer = document.createElement("main");
	let menuContainer = document.createElement("section");
	menuContainer.classList.add("menu");

	body.append(menuContainer, sketchContainer);

	//Create menu
	menuContainer.innerHTML =
		"<p>Pixel Pad</p><p>Select a mode to begin</p><button>Set Squares Per Side</button><button>Choose Color</button><input type='color' id='color-picker' value='#4169a6'/><button>Rainbow Mode</button><button>Progressively Darken</button><button>Eraser</button><button>Clear Canvas</button>";
	let menuButtons = document.querySelectorAll("button");
	menuButtons.forEach((element) => {
		element.classList.add("menu-button");
	});
	let heading = document.querySelector(".menu");
	heading.children[0].classList.add("heading");
	heading.children[1].classList.add("subheading");

	//Set Container Variables
	let containerLength = 500; //px
	let groupHeight = (containerLength - 2 * groupCount) / groupCount; // formula is weird because it factors in the borders of 1px applied to the div elements

	//Step 1 - Create container with flex direction column and set container width
	let container = document.createElement("div");
	container.classList.add("container");
	container.style.width = containerLength + "px";
	container.style.height = containerLength + "px";
	sketchContainer.appendChild(container);

	//Step 2 - Create groupCount sets of grouping-div with flex direction row and set grouper height
	for (let i = 0; i < groupCount; i++) {
		let grouper = document.createElement("div");
		grouper.classList.add("group");
		grouper.style.height = groupHeight + "px";
		grouper.style.width = containerLength + "px";
		container.appendChild(grouper);

		//Step 3 - For each grouping-div, create 16 standard div within them and set standardLength as width and height
		for (let j = 0; j < groupCount; j++) {
			let standard = document.createElement("div");
			standard.classList.add("standard");
			standard.style.width = groupHeight + "px";
			standard.style.height = groupHeight + "px";
			grouper.appendChild(standard);
		}
	}

	//Step 4 - Set Color Variables and select all standard div elements
	let colorPicker = document.querySelector("#color-picker");
	let selectedColor = colorPicker.value; // color picker value is set to a default in the virtual HTML. See menuContainer.innerHTML
	let initialHslColor = "hsl(0, 100%, 90%)";
	let standardDiv = document.querySelectorAll(".standard");

	//Step 5 - Add Buttons for prompting and add event listener to trigger new Grid, change modes and clear canvas

	menuButtons[0].addEventListener("click", setGridSize);

	colorPicker.addEventListener("change", (e) => {
		selectedColor = e.target.value;
		standardColorPicker();
	});

	menuButtons[2].addEventListener("click", addRandomColor);

	menuButtons[3].addEventListener("click", progressive);

	menuButtons[4].addEventListener("click", eraser);

	menuButtons[5].addEventListener("click", clearCanvas);

	//Step 6 - Create functions

	//Function for standard color selection
	function standardColorPicker() {
		standardDiv.forEach((item) => {
			item.addEventListener("mouseover", (e) => {
				e.target.style.backgroundColor = selectedColor;
			});
		});
	}

	//Function to generate Random Color
	function addRandomColor() {
		standardDiv.forEach((item) => {
			item.addEventListener("mouseover", (e) => {
				e.target.style.backgroundColor =
					"#" + Math.floor(Math.random() * 16777215).toString(16);
			});
		});
	}

	// Function for progressive darken
	function progressive() {
		standardDiv.forEach((item) => {
			let tempColor = initialHslColor;
			item.addEventListener("mouseover", (e) => {
				const [hue, saturation, lightness] = tempColor
					.match(/\d+/g)
					.map(Number);
				const newLightness = Math.max(0, Math.min(100, lightness - 10));
				tempColor = `hsl(${hue}, ${saturation}%, ${newLightness}%)`;
				e.target.style.backgroundColor = tempColor;
			});
		});
	}

	//Function to simulate eraser
	function eraser() {
		standardDiv.forEach((item) => {
			item.addEventListener("mouseover", (e) => {
				e.target.style.backgroundColor = "#e0e5ec";
			});
		});
	}

	//Function to clear pixel pad
	function clearCanvas() {
		standardDiv.forEach((item) => {
			item.style.backgroundColor = "#e0e5ec";
		});
	}
}

//Step 7 - Add footer area
let footerArea = document.createElement("footer");
footerArea.innerHTML =
	"<p>Designed & developed by <a href='https://github.com/Kwadwo-Firempong-Boakye'>Kwadwo Firempong-Boakye</a>  | &copy; The Odin Project Foundations Course  |  2022</p>";
footerArea.classList.add("footer");
body.insertAdjacentElement("afterend", footerArea);

//Step 8 - External functions

//Function to reset Grid;
function resetGrid() {
	let main = document.querySelector("main");
	let sketchCon = document.querySelector("section");
	body.removeChild(main);
	body.removeChild(sketchCon);
}

//Function to prompt and set grid size from user
function setGridSize() {
	let userSelection = +prompt(
		"How many squares do you want on each side? \n\nMaximum you can have is 100"
	);

	let computedSelection = Math.round(userSelection);
	
	if (computedSelection > 100 || computedSelection < 1) {
		alert(
			"Maximum number of squares on each side is limited between 1 to 100 to avoid your browser from crashing. \n\nSelect a different number of squares."
		);
	} else if (isNaN(computedSelection)) {
		alert("Only numbers are accepted. \nTry again.");
	} else {
		groupCount = computedSelection;
	}

	resetGrid();
	createNewGrid();
}
