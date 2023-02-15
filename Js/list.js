const createNewListBtn = document.querySelector("#createNewList");

//test array . hämta från local storage
let localStorageArr = ["63eb95e613a30465c1e2de96", "63eb95e913a30465c1e2de97", "63eb95ef13a30465c1e2de98"]


//skapar en lista och pushar in list-id i tillfälligt substitut för localstorage array
async function createList() {
    const listname = "Add Listname";

    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            listname: listname,
        }),
    });
    const { list } = await res.json();
    localStorageArr.push(list._id);

}

// funktion som hämtar en lista från API utifrån ett ID
async function getListByID(listId) {
    let ID = listId
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${ID}`);
    const data = await res.json();
    console.log(data);

    let listname = data.listname;

    let listLength = data.itemList.length;


    //funktion som skapar en accordion och displayar i browser
    createListAccordion(listname, listLength);
}


//anropar getListByID för varje id i den array som senare 
//kommer vara i local storage (listor kopplade till inloggad användare)
localStorageArr.forEach(id => {
    getListByID(id);
});


//funktion som skapar array från lista i API. Skriver ut i brower (förlåt för ful)
function createListAccordion(listname, listlength) {

    let div = document.createElement("div");
    div.classList.add("list-accordion", "flex-row");
    document.body.append(div);
    let htmlString = `<div class="image"></div><div class="flex-column text-wrapper"><div class="flex-row"><div class="flex-column"><h2>${listname}</h2><span>${listlength} items</span></div><i class="fa-regular fa-trash-can"></div>`
    div.innerHTML = htmlString;
    let toggleBtn = document.createElement("button");
    let toggleDiv = document.createElement("div");
    toggleDiv.classList.add("list-accordian-open", "hidden");
    toggleBtn.innerHTML = `toggle`;
    toggleBtn.classList.add("arrow-btn")
    div.append(toggleBtn);
    document.body.append(toggleDiv);
    let ul = document.createElement("ul");
    ul.classList.add("itemList");
    toggleDiv.append(ul);

    toggleBtn.addEventListener("click", toggleArrow)

}


//funktion som togglar div i accordion (den utfällda delen) mellan hidden och ej hidden
function toggleArrow(event) {
    let toggleDiv = event.target.parentElement.nextSibling;
    toggleDiv.classList.toggle("hidden")
}

createNewListBtn.addEventListener("click", createList);