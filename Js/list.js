

//--------------------------------------------Hämta användarens list-IDn från local storage---------------------------------------------------


let sigUser = getitem("signedInUser") ? getitem("signedInUser") : [];
const sigUserList = sigUser.userList;

console.log(getitem("signedInUser"));




//--------------------------------------------Hämta vår fasta produktlista och sparar ner i recProductList----------------------------------------

// skapar array för produktlista som man kommer åt globalt
let recProductList = [];

// Anropar asynkron funktion för att hämta JSON produkt-fil som JS-arr
fetchProductsJson()
    .then((data) => {
        // Om datan kan levereras ritar vi ut produkterna i DOM:en genom funktionen renderLocalStorageListArr()
        recProductList = data
        renderLocalStorageListArr();
    })
    .catch(err => console.log("Rejected:", err.message));







//--------------------------------------------Anropar funktion som hämtar inloggad användares sparade listor från API en och en--------------------


// Renderar den inloggade användarens sparade listor - om de finns
function renderLocalStorageListArr() {
    // console.log("recProductList", recProductList);
    // console.log("sigUserList", arr);

    if (sigUserList) {
        // Anropar getListByID för varje list-id inloggade användarens har sparat
        sigUserList.forEach(id => {
            getListByID(id)
        });
    }
}




//--------------------------------------------Funktion som hämtar lista från API med hjälp av ID---------------------------------------------------------


// Funktion som hämtar en lista från API utifrån ett ID lagrat i local storage
async function getListByID(listId) {
    let ID = listId
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${ID}`);
    const sigUserObject = await res.json();
    // console.log("sigUserObject rad 64", sigUserObject);


    // Funktion som skapar en accordion och displayar i browser
    const wrapper = createListAccordion(sigUserObject, recProductList);
    // console.log("69", ul);


    // hänmta itemList/varor ifrån data från apiet
    const itemList = sigUserObject.itemList;



    // loopa igenon varorna och skickar in dem i productListItem (skriver ut listorna med varor)
    itemList.forEach((listItemObject) => {
        // skapa productListItem elementet med nuvarande objektet
        productListItem(listItemObject, wrapper, sigUserObject);

    });
}





//-------------------------------------------KÖR FUNKTION SOM SKAPAR NY LISTA NÄR ANVÄNDAREN TRYCKER PÅ CREATE NEW LIST BTN-------------------------


//Hämtar create new list knapp
const createNewListBtn = document.querySelector("#createNewList");


// Vid klick - kör asynkron funktion createList som skapar en ny lista i API:et
createNewListBtn.addEventListener("click", (e) => {
    // console.log("hej");

    createList().then(id => {
        // När den är klar, spara nya listans id i den inloggade användarens array med listID:n
        // console.log("208", id);

        // Anropar funktionen som uppdaterar local-storage-arrayen med användarens precis skapade list-id
        updateUserListArr(id)

    });

})




//--------------------------------------------FUNKTION SOM SKAPAR NY LISTA I API och anropar funktion som skriver ut accordion i browser----------------


// Skapar en ny lista i API:et när användaren trycker på Create new list knappen
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
    // console.log("25", list);
    createListAccordion(list, recProductList);

    // Retunerar id till local storage funktion för att spara en användares skapade listor
    id = list._id
    // console.log(list);
    // console.log("30",id);

    return id
}





//--------------------------------------------Renderar accordions i browser-----------------------------------------------------------------

const listsContainer = document.getElementById("listsContainer");


// Funktion som skapar en accordion från lista i API. Skriver ut i brower (förlåt för ful)
function createListAccordion(userListObj, recProductList) {

    //variabler som ska användas i funktionen
    let listName = userListObj.listname;
    let listID = userListObj._id;

    // huvuddiv för accorian och accordian-open
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add("wrapperDiv");
    wrapperDiv.innerHTML = `
    <div class="list-accordion d-flex justify-content-between mt-4 p-3 shadow">
        <img class="img-fluid image" src="images/giorgio-trovato-fczCr7MdE7U-unsplash.jpg" />
        <div class="d-flex flex-grow-1 ms-3 justify-content-between">
            <div id="${listID}">
                <h2 class="listHeading h2Element">${listName}</h2>
                <p class="pElement text-secondary text-start pElement"></p>
            </div>
        </div>
        <div class="d-flex flex-column justify-content-between">
            <button id="${listID}" class="align-self-start border-0 bg-transparent deleteListBtn"><i class="fa-regular fa-trash-can"></i></button>
            <button class="align-self-end  border-0 toggleBtn"><i class="fa-solid fa-angle-down"></i></button>
        </div>
    </div>
    
    <div class="list-accordian-open hidden shadow toggleDiv">
        <ul class="recommendationUl px-3 pt-3">
            <h2 class="subheading">Recommended for you</h2>
            <div class="recProdContainer d-flex justify-content-between p-2">
            </div>
        </ul>
        <h3 class="inListHeading px-3">In Progress</h3>
        <ul class="progressList px-3"></ul>
        <h3 class="inListHeading px-3">Done</h3>
        <ul class="doneList px-3"></ul>
    </div>`

    listsContainer.append(wrapperDiv);

    let h2Element = wrapperDiv.querySelector(".h2Element")
    h2Element.addEventListener('click', changeListName);

    let pElement = wrapperDiv.querySelector(".pElement")
    changeItemCounterText(pElement, userListObj.itemList)


    let toggleBtn = wrapperDiv.querySelector(".toggleBtn")
    toggleBtn.addEventListener("click", toggleArrow);



    // ---------------------Funktioner som körs inne i accordion-funktion--------------------------

    let recProdContainer = wrapperDiv.querySelector(".recProdContainer")
    // Renderar en redommendation bar till varje list-accordion
    drawRecProd(recProdContainer, recProductList, listID);

    // Initerar addItem() för varje recommendation bar 
    addItem(wrapperDiv);



    // Funktion som tar bort listan från DOM:em, local storage och API:et
    trashList();

    //returnerar progress listan och done listan så att dessa kan användas utanför funktionen
    return wrapperDiv;
}





//--------------------------------------------TA BORT EN LISTA----------------------------------------------------------------------------


let trashList = (() => {
    let listAccordion = document.querySelectorAll('div.list-accordion');

    listAccordion.forEach(trashcan => {

        trashcan.addEventListener('click', (event) => {

            if (event.target.classList.value === 'fa-regular fa-trash-can' && event.target.parentElement.id) {
                // tar bort listan från DOMen
                event.target.closest("div.wrapperDiv").remove();
                // console.log(event.target.parentElement.id);
                let deleteID = event.target.parentElement.id;


                // console.log(sigUser.userList);
                // console.log(deleteID);

                // Raderar id från local storage
                deleteIDLocalStorage(deleteID);


                deleteListFromAPI(deleteID);

            }
        });
    });
});



// ta bort listan från API
async function deleteListFromAPI(deleteID) {

    const res = await fetch(
        `https://nackademin-item-tracker.herokuapp.com/lists/${deleteID}`,
        {
            method: "DELETE",
        }
    );
}


//--------------------------------------------TOGGLA ACCORDION STÄNGD/ÖPPEN-----------------------------------------------------------------


//funktion som togglar div i accordion (den utfällda delen) mellan hidden och ej hidden
function toggleArrow(event) {
    event.target.classList.toggle("toggleBtnRotate");
    let toggleDiv = event.target.parentElement.parentElement.nextSibling.nextSibling;
    toggleDiv.classList.toggle("hidden")
}




//--------------------------------------------ANVÄNDAREN KAN LÄGGA TILL EGET NAMN PÅ LISTA---------------------------------------------------


// funktion för ändra namn på listan
function changeListName(target) {
    let input = document.createElement("input");
    input.type = "placeholder";
    input.className = "input-design";
    input.addEventListener('change', saveNewListName);
    let parent = target.srcElement.parentElement;
    parent.replaceChild(input, target.srcElement);
}



// async funktion för att spara nytt namn i api:et och återställa utseende
async function saveNewListName(target) {
    const newListName = target.srcElement.value;
    const listId = target.srcElement.parentElement.id;
    await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${listId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            listname: newListName,
        }),
    });

    // återställ till original
    let h2 = document.createElement("h2");
    h2.addEventListener('click', changeListName);
    h2.innerHTML = newListName;
    let parent = target.srcElement.parentElement;
    parent.replaceChild(h2, target.srcElement);
}

