const createNewListBtn = document.querySelector("#createNewList");

//test array . hämta från local storage
// let localStorageArr = ["63eb95e613a30465c1e2de96", "63eb95e913a30465c1e2de97", "63eb95ef13a30465c1e2de98"];

//! hejs tin du kanske vill ändra detta med sofia
let sigUser = localStorage.getItem("signedInUser") ? JSON.parse(localStorage.getItem("signedInUser")):[];

const sigUserList = sigUser.userList;


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

    let namn = list.listname;
    let listLength = list.itemList.length;

    createListAccordion(namn, listLength);

    id = list._id
    console.log(id);

    return id
}


// Funktion som hämtar en lista från API utifrån ett ID
async function getListByID(listId) {
    let ID = listId
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${ID}`);
    const data = await res.json();
    console.log("här:", data);

    let listname = data.listname;

    let listLength = data.itemList.length;


    // Funktion som skapar en accordion och displayar i browser
    createListAccordion(listname, listLength);
}

function renderLocalStorageListArr(arr) {

    if(arr) {
        // Anropar getListByID för varje id i den array som senare 
        // Kommer vara i local storage (listor kopplade till inloggad användare)
        arr.forEach(id => {
            getListByID(id);
        });
        
        console.log("sigUserList", arr);
    }

}
renderLocalStorageListArr(sigUserList)

// Funktion som skapar array från lista i API. Skriver ut i brower (förlåt för ful)
function createListAccordion(listname, listlength, arr) {

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
    divText.innerHTML = `<h2>${listname}</h2><p class="text-secondary">${listlength} items</p>`;

    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex", "flex-column", "justify-content-between")
    div.append(buttonDiv);

    let trashBtn = document.createElement("button");
    trashBtn.classList.add("align-self-start", "border-0", "bg-transparent")
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

    recommendationUL.append(h2, divRecomendationBar)


    //!---------------Nytt 
//     function drawRecProd(arr) {
//        console.log("hej")
//        // Här renderas varje item från vårt produktutbud array
//        // Dataattribut används för att enkelt kunna hämta valuet från icon samt h3-tagg
//        arr.forEach((elem) => {
//            divRecomendationBar.innerHTML += `
//            <div class="col-auto text-center ">
//                <li class="rec-product" data-title="${elem.title}" data-icon="${elem.image}">
//                    <i class="${elem.image}"></i>
//                    <h3 class="subheading">${elem.title}</h3>
//                </li>
//            </div>
//            `
//        })
//        // Initerar en addItem() funktion för varje knapp så de är sammanlänkade i JS mototns minne (tror det är så det funkar)
//        addItem()
//    }


    
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
