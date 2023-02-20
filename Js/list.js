const createNewListBtn = document.querySelector("#createNewList");

//! Stina kom ihåg att ändra detta om du vill
let sigUser = localStorage.getItem("signedInUser") ? JSON.parse(localStorage.getItem("signedInUser")): [] ;
const sigUserList = sigUser.userList;
//! Stina kom ihåg att ändra detta om du vill

// Skapar en ny lista i API:et
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
    
    // Skickar det precis skapade listobjektet till create acccordian funktion för att rendera ut i browser
    createListAccordion(list);
    
    // Retunerar id till local storage funktion för att spara en användare skapade listor
    id = list._id

    return id
}


// Funktion som hämtar en lista från API utifrån ett ID
async function getListByID(listId, recProductList) {
    let ID = listId
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${ID}`);
    const sigUserList = await res.json();

    // Funktion som skapar en accordion och displayar i browser
    createListAccordion(sigUserList, recProductList);
    
}

function renderLocalStorageListArr(arr, recProductList) {

    if(arr) {
        // Anropar getListByID för varje id i inloggade användarens array
        arr.forEach(id => {
            getListByID(id, recProductList);
        });
        
        console.log("sigUserList", arr);
    }

}

fetchProductsJson()
.then((data) => { 
    // Om datan kan levereras ritar vi ut produkterna i DOM:en genom funktion drawRecProd(data) som vi skickar med vår produkt-utbud arr i
    renderLocalStorageListArr(sigUserList, data);
})
.catch(err => console.log("Rejected:", err.message));
//? Annars error meddelande - ska jag ta bort?


// Funktion som skapar array från lista i API. Skriver ut i brower (förlåt för ful)
function createListAccordion(userListObj, recProductList) {
    let listName = userListObj.listname;
    // console.log("listName",listName);

    let listLength = userListObj.itemList.length;
    // console.log("list längd",listLength);

    let listID = userListObj._id;
    console.log(listID);

    let div = document.createElement("div");
    div.classList.add("list-accordion", "d-flex", "justify-content-between", "mt-4", "p-3", "shadow");
    document.body.append(div);

    let image = document.createElement("img");
    image.setAttribute("class", "img-fluid image");
    image.setAttribute("src", "/images/giorgio-trovato-fczCr7MdE7U-unsplash.jpg")

    let textWrapper = document.createElement("div");
    textWrapper.classList.add("d-flex", "flex-grow-1", "ms-3", "justify-content-between");

    div.append(image, textWrapper);

    let divText = document.createElement("div");
    textWrapper.append(divText);
    divText.innerHTML = `<h2>${listName}</h2><p class="text-secondary">${listLength} items</p>`;

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex", "flex-column", "justify-content-between")
    div.append(buttonDiv);

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("align-self-start", "border-0", "bg-transparent", "deleteListBtn")
    trashBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    buttonDiv.append(trashBtn);

    let toggleBtn = document.createElement("button");
    toggleBtn.classList.add("align-self-end", "rounded", "border", "border-secondary")
    toggleBtn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
    buttonDiv.append(toggleBtn);

    let toggleDiv = document.createElement("div");
    toggleDiv.classList.add("list-accordian-open", "hidden", "p-3", "shadow");
    document.body.append(toggleDiv);

    toggleBtn.addEventListener("click", toggleArrow);

    //recomendationBar
    let recommendationUL = document.createElement("ul");
    recommendationUL.classList.add("recommendationUl")

    toggleDiv.append(recommendationUL);

    let h2 = document.createElement("h2");
    h2.classList.add("subheading")
    h2.innerText = "Recommended for you";

    let divRecomendationBar = document.createElement("div");
    divRecomendationBar.classList.add("row", "gy-5", "recProdContainer");

    // Hämtar list id på den nyss renderade listan och sätter det som id på rec-bar
    // Då kan vi se vilken lista anv vill lägga till den klickade produkten i
    divRecomendationBar.setAttribute("id", listID);
    console.log("id", divRecomendationBar.id);

    recommendationUL.append(h2, divRecomendationBar)


    // Funktion som ska ta bort listan från DOM:em, local storage och API:et
    let Lina = (() => {
        let listAccordion = document.querySelectorAll('div.list-accordion');

        listAccordion.forEach(trashcan => {
            trashcan.addEventListener('click', (event) => {

                if(event.target.classList.value === 'fa-regular fa-trash-can'){
                    console.log('you clicked on the trashcan');
                    // tar bort listan från DOMen
                    event.target.parentElement.parentElement.parentElement.remove();
                    // lägg till att ta bort listan från local storage och API
                }
            });
        });
    });

    Lina();

}



//funktion som togglar div i accordion (den utfällda delen) mellan hidden och ej hidden
function toggleArrow(event) {
    let toggleDiv = event.target.parentElement.parentElement.nextSibling;
    toggleDiv.classList.toggle("hidden")
}

createNewListBtn.addEventListener("click", (e) => {

    createList().then(id => {
        // Anropar funktionen som uppdaterar local-storage-arrayen med användarens precis skapade list-id
        updateUserListArr(id)

    });

}) 
