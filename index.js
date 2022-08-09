let body = document.querySelector("body");

let groupCount = 16;

window.addEventListener("load", createNewGrid);



function createNewGrid () {

        let containerLength = 800; //px
        let groupHeight = (containerLength - (2 * groupCount)) / groupCount;

    //Step 1 - Create container with flex direction column and set container width
        let container = document.createElement("div");
        container.classList.add("container");
        container.style.width = containerLength + "px";
        container.style.height = containerLength + "px";
        body.appendChild(container);
    
    //Step 2 - Create groupCount sets of grouping-div with flex direction row and set grouper height
        for (let i = 0; i < groupCount; i++) {
            let grouper = document.createElement("div");
            grouper.classList.add("group");
            grouper.style.height = groupHeight +"px";
            grouper.style.width = containerLength +"px";
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
        let standardDiv = document.querySelectorAll(".standard");
        standardDiv.forEach((item) => {
        item.addEventListener("mouseover", (e) => {
            e.target.style.backgroundColor = "#353536";
            })
        });

    //Step 5 - Add Button for prompting and add event listener to trigger new Grid
        let promptButton = document.createElement("button"); 
        promptButton.classList.add("promptButton");
        promptButton.innerText = "Set Squares Per Side";
        body.prepend(promptButton);
        promptButton.addEventListener("click", setGridSize);
        }

    //Step 6 - Add footer
        let footerArea = document.createElement("footer");
        // let containerDiv = document.querySelector(".container");
        footerArea.innerHTML = "<p>Designed & developed by <a href='https://github.com/Kwadwo-Firempong-Boakye'>Kwadwo Firempong-Boakye</a>  | &copy; The Odin Project Foundations Course  |  2022</p>"
        footerArea.classList.add("footer")
        body.insertAdjacentElement("afterend", footerArea);

    //Function to reset Grid;
    function resetGrid() {
        let containerDiv = document.querySelector(".container");
        let btn = document.querySelector(".promptButton");
        body.removeChild(containerDiv);
        body.removeChild(btn);
    }
   
    
   //Function to prompt and set grid size from user
    function setGridSize () {
        
    let userSelection = +prompt("How many squares do you want on each side? \n\nMaximum you can have is 100");

        
        if (userSelection > 100 || userSelection < 1) {
            alert("Maximum number of squares on each side is limited between 1 to 100 to avoid your browser from crashing. \n\nSelect a different number of squares.")
        } else if (isNaN(userSelection)) {
            alert("Only numbers are accepted. \nTry again.")
        } else {
            groupCount = userSelection;
        }

        resetGrid();
        createNewGrid();
    }
