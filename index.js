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
		"<p>Pixel Pad</p><button>Set Squares Per Side</button><button>Choose Color</button><input type='color' id='color-picker' value='#4169a6'/><button>Rainbow Mode</button><button>Progressively Darken</button><button>Clear Canvas</button>";
	let menuButtons = document.querySelectorAll("button");
	menuButtons.forEach((element) => {
		element.classList.add("menu-button");
	});
	let heading = document.querySelector(".menu");
	heading.children[0].classList.add("heading");

	//Set Container Variables
	let containerLength = 500; //px
	let groupHeight = (containerLength - 2 * groupCount) / groupCount;

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

	//Step 4 - Add event listener on each standard div for hover effect
	let colorPicker = document.querySelector("#color-picker");
	let color = document.querySelector("#color-picker").value;
	let standardDiv = document.querySelectorAll(".standard");

	standardDiv.forEach((item) => {
		item.addEventListener("mouseover", (e) => {
			e.target.style.backgroundColor = color;
		});
	});

	colorPicker.addEventListener("change", (e) => {
		color = e.target.value;
		console.log(color);
	});

	//Step 5 - Add Buttons for prompting and add event listener to trigger new Grid, change modes and clear canvas
	// let randomColor = Math.floor(Math.random()*16777215).toString(16);

	menuButtons[0].addEventListener("click", setGridSize);

    colorPicker.addEventListener("click", removeRandomColor);

	menuButtons[2].addEventListener("click", addRandomColor);

	menuButtons[4].addEventListener("click", () => {
		standardDiv.forEach((element) => {
			element.style.backgroundColor = "#e0e5ec";
		});
	});

	//Function to generate Random Color
	function addRandomColor() {
		standardDiv.forEach((item) => {
			item.addEventListener("mouseover", (e) => {
				e.target.style.backgroundColor =
					"#" + Math.floor(Math.random() * 16777215).toString(16);
			});
		});
	}

    function removeRandomColor() {
		standardDiv.forEach((item) => {
			item.addEventListener("mouseover", (e) => {
				e.target.style.backgroundColor = color;
			});
		});
	}

	function soloColor() {
        standardDiv.forEach((item) => {
            item.addEventListener("mouseover", (e) => {
                e.target.style.backgroundColor = "#000000";
            });
        });
    }
}

//Step 6 - Add footer
let footerArea = document.createElement("footer");

footerArea.innerHTML =
	"<p>Designed & developed by <a href='https://github.com/Kwadwo-Firempong-Boakye'>Kwadwo Firempong-Boakye</a>  | &copy; The Odin Project Foundations Course  |  2022</p>";
footerArea.classList.add("footer");
body.insertAdjacentElement("afterend", footerArea);

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

	if (userSelection > 100 || userSelection < 1) {
		alert(
			"Maximum number of squares on each side is limited between 1 to 100 to avoid your browser from crashing. \n\nSelect a different number of squares."
		);
	} else if (isNaN(userSelection)) {
		alert("Only numbers are accepted. \nTry again.");
	} else {
		groupCount = userSelection;
	}

	resetGrid();
	createNewGrid();
}

//Function to create random colors on hover
