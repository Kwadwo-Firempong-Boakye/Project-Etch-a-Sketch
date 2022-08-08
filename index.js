let body = document.querySelector("body");

let squareSideCount = 16;
let groupCount = squareSideCount;
let containerWidth = 80; //vw
let containerHeight = 80; //vh
let groupHeight = (containerHeight - 5) / groupCount; //vh
let standardLength = groupHeight; //vh and vw

//let containerDiv = document.querySelector(".container");
//let grouperDiv = document.querySelector(".group");
//let standardDiv = document.querySelector(".standard");

function createNewGrid () {

    //Step 1 - Create container with flex direction column and set container width
        let container = document.createElement("div");
        container.classList.add("container");
        container.style.width = containerWidth + "vw";
        container.style.height = containerHeight + "vh";
        body.appendChild(container);
    
    //Step 2 - Create groupCount sets of grouping-div with flex direction row and set grouper height
        for (let i = 0; i < groupCount; i++) {
            let grouper = document.createElement("div");
            grouper.classList.add("group");
            grouper.style.height = groupHeight +"vh";
            container.appendChild(grouper);
    
    //Step 3 - For each grouping-div, create 16 standard div within them and set standardLength as width and height
            for (let j = 0; j < groupCount; j++) {
                let standard = document.createElement("div");
                standard.classList.add("standard");
                standard.style.width = standardLength + "vw";
                standard.style.height = standardLength + "vh";
                grouper.appendChild(standard);
            }
        }

    //Step 4 - Add event listener on each standard div for hover effect
    let standardDiv = document.querySelectorAll(".standard");
    standardDiv.forEach((item) => {
        item.addEventListener("mouseover", (e) => {
            e.target.style.backgroundColor = "#252526";
        })
    });

    }

    //Call the function 
    createNewGrid();
    
    
   
    

    


 


