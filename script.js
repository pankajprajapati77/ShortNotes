var uid = new ShortUniqueId();
const addBtn = document.querySelector(".add-btn");
const modalCont = document.querySelector(".modal-cont");
const allPriorityColors = document.querySelectorAll(".priority-color");
let colors = ["lightpink", "lightgreen", "lightblue", "black"];
let modalPriorityColor = colors[colors.length - 1]; //black
let textAreaCont = document.querySelector(".textarea-cont");
const mainCont = document.querySelector(".main-cont");

let ticketsArr = [];
let toolboxcolors = document.querySelectorAll(".color");

//to open close modal container
let isModalPresent = false;
addBtn.addEventListener('click', function () {
    if (!isModalPresent) {
        modalCont.style.display = "flex"; //modal add ho gya screen pe
        // isModalPresent = true;
    } else {
        modalCont.style.display = "none";
        // isModalPresent = false;
        
    }
    isModalPresent = !isModalPresent; //toggling effect 
})



// console.log(allPriorityColors);

//to remove and add active class from each priority color of modal container
allPriorityColors.forEach(function (colorElement) {
  colorElement.addEventListener("click", function () {
    allPriorityColors.forEach(function (priorityColorElem) {
        priorityColorElem.classList.remove("active");
    });
      colorElement.classList.add("active");
      modalPriorityColor = colorElement.classList[0];
  });
});

//to generate and display a ticket
modalCont.addEventListener("keydown", function (e) {
    let key = e.key;
    if (key == "Shift") {
      console.log(modalPriorityColor);
      console.log(textAreaCont.value);
      createTicket(modalPriorityColor, textAreaCont.value);
      modalCont.style.display = "none";
        isModalPresent = false;
        textAreaCont.value = "";
        allPriorityColors.forEach(function (colorElem) {
            colorElem.classList.remove("active");
        })
    }
});

//function to create new ticket
function createTicket(ticketColor, data, ticketId) {
    let id = ticketId || uid();
    let ticketCont = document.createElement("div"); //<div></div>
    ticketCont.setAttribute("class", "ticket-cont");
    ticketCont.innerHTML = `
        <div class="ticket-color ${ticketColor} "></div>
        <div class="ticket-id">${id}</div>
        <div class="task-area">${data}</div>
    `;

    mainCont.appendChild(ticketCont);

//if ticket is being created for the first time, then ticketid would be undefined
if(!ticketId){
    ticketsArr.push(
        {
            ticketColor, 
            data, 
            ticketId: id
        }
    );
    localStorage.setItem("tickets", JSON.stringify(ticketsArr));
 }
};

//get all tickets from local storage
if(localStorage.getItem("tickets")){
    ticketsArr = JSON.parse(localStorage.getItem("tickets"));
    ticketsArr.forEach(function(ticketObj){
        createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
    })
}
//filter tickets on the basis of ticketcolor
for(let i = 0; i < toolboxcolors.length; i++){
    toolboxcolors[i].addEventListener("click", function(){
        let currToolBoxColor = toolboxcolors[i].classList[0];

        let filteredTickets = ticketsArr.filter(function(ticketObj){
            return currToolBoxColor == ticketObj.ticketColor;
        });
        
        //remove all the tickets
        let alltickets = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < alltickets.length; i++){
            alltickets[i].remove();
        }

        //display fileteredtickets
        filteredTickets.forEach(function(ticketObj){
            createTicket(
                ticketObj.ticketColor,
                ticketObj.data,
                ticketObj.ticketId
            );
        })
    })
    //to display all the tickets of all colors on double clicking
    toolboxcolors[i].addEventListener("dblclick", function(){
        //remove all the color specific tickets
        let alltickets = document.querySelectorAll(".ticket-cont");
        for(let i = 0; i < alltickets.length; i++){
            alltickets[i].remove();
        }

        //display alll tickets
        ticketsArr.forEach(function(ticketObj){
            createTicket(ticketObj.ticketColor, ticketObj.data, ticketObj.ticketId);
        });
    })
}