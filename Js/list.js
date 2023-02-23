

//--------------------------------------------Hämta användarens list-IDn från local storage---------------------------------------------------


let sigUser = getitem("signedInUser") ? getitem("signedInUser") : [];
const sigUserList = sigUser.userList;

console.log(getitem("signedInUser"));
console.log("sigUserList, användarens sparade list-id:n", sigUserList);




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
    const ul = createListAccordion(sigUserObject, recProductList);
    // console.log("69", ul);


    // hänmta itemList/varor ifrån data från apiet
    const itemList = sigUserObject.itemList;



    // loopa igenon varorna och skickar in dem i productListItem (skriver ut listorna med varor)
    itemList.forEach((listItemObject) => {
        // skapa productListItem elementet med nuvarande objektet
        productListItem(listItemObject, ul, sigUserObject._id);

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
    let listLength = userListObj.itemList.length;
    let listID = userListObj._id;

    // huvuddiv för accorian och accordian-open
    let wrapperDiv = document.createElement('div');
    wrapperDiv.classList.add("wrapperDiv");
    listsContainer.append(wrapperDiv);

    //huvuddiven som allt ska ligga i
    let div = document.createElement("div");
    div.classList.add("list-accordion", "d-flex", "justify-content-between", "mt-4", "p-3", "shadow");
    wrapperDiv.append(div);

    //bilden 
    let image = document.createElement("img");
    image.setAttribute("class", "img-fluid image");
    image.setAttribute("src", "images/giorgio-trovato-fczCr7MdE7U-unsplash.jpg")

    //osynlig div att lägga textelementen i (för flex/layout) 
    let textWrapper = document.createElement("div");
    textWrapper.classList.add("d-flex", "flex-grow-1", "ms-3", "justify-content-between");

    div.append(image, textWrapper);

    let divText = document.createElement("div");
    divText.id = listID;
    textWrapper.append(divText);

    // Skapar listans rubrik och undertext
    let h2Element = document.createElement('h2');
    h2Element.addEventListener('click', changeListName);
    h2Element.innerHTML = `${listName}`;
    let pElement = document.createElement('p');
    pElement.className = "text-secondary text-start pElement";
    pElement.innerHTML = `${listLength} items`;
    divText.appendChild(h2Element);
    divText.appendChild(pElement);

    //skapar en osynlig div att lägga trashcan och toggelknapp i (för flex/layout) 
    let buttonDiv = document.createElement("div");
    buttonDiv.classList.add("d-flex", "flex-column", "justify-content-between")
    div.append(buttonDiv);


    //trashcan
    let trashBtn = document.createElement("button");
    trashBtn.classList.add("align-self-start", "border-0", "bg-transparent", "deleteListBtn");
    // sätter id för trashBtn till samma id som listan
    trashBtn.setAttribute('id', listID);
    trashBtn.innerHTML = `<i class="fa-regular fa-trash-can"></i>`;
    buttonDiv.append(trashBtn);

    //pil-knapp som togglar div
    let toggleBtn = document.createElement("button");
    toggleBtn.classList.add("align-self-end", "rounded", "border", "border-secondary", "toggleBtn")
    toggleBtn.innerHTML = `<i class="fa-solid fa-angle-down"></i>`;
    buttonDiv.append(toggleBtn);


    //diven som togglar mellan synlig och osynlig
    let toggleDiv = document.createElement("div");
    toggleDiv.classList.add("list-accordian-open", "hidden", "shadow");
    wrapperDiv.append(toggleDiv);

    //lägger till eventlistener på toggle-knapp som anropar funktion
    toggleBtn.addEventListener("click", toggleArrow);


    // Skapar listorna som varorna ska appendas i, samt rubriker
    let ul = document.createElement("ul");
    ul.classList.add("progressList");

    let progressListTitle = document.createElement("h3");
    progressListTitle.classList.add("inListHeading")
    progressListTitle.innerText = "In Progress";

    let doneUL = document.createElement("ul");
    doneUL.classList.add("doneList");

    let doneListTitle = document.createElement("h3");
    doneListTitle.classList.add("inListHeading");
    doneListTitle.innerText = "Done";


    // RecommendationBar
    let recommendationUL = document.createElement("ul");
    recommendationUL.classList.add("recommendationUl")

    toggleDiv.append(recommendationUL, progressListTitle, ul, doneListTitle, doneUL);

    let h2 = document.createElement("h2");
    h2.classList.add("subheading")
    h2.innerText = "Recommended for you";

    let divRecomendationBar = document.createElement("div");
    divRecomendationBar.classList.add("recProdContainer", "d-flex", "justify-content-between", "p-3");

    recommendationUL.append(h2, divRecomendationBar)

    // console.log("rad152",recProductList);




    // ---------------------Funktioner som körs inne i accordion-funktion--------------------------


    // Renderar en redommendation bar till varje list-accordion
    drawRecProd(divRecomendationBar, recProductList, listID);

    // Initerar addItem() för varje recommendation bar 
    addItem(wrapperDiv);



    // Funktion som ska ta bort listan från DOM:em, local storage och API:et (ej klar)
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
                    console.log(deleteID);
                    
                    // Raderar id från local storage
                    deleteIDLocalStorage(deleteID)



                    
                    // ta bort listan från API
                    async function deleteListFromAPI() {

                        const res = await fetch(
                            `https://nackademin-item-tracker.herokuapp.com/lists/${deleteID}`,
                            {
                                method: "DELETE",
                            }
                        );
                    }
                    deleteListFromAPI()

                }
            });
        });
    });

    trashList();

    //returnerar progress listan och done listan så att dessa kan användas utanför funktionen
    return [ul, doneUL];
}





//--------------------------------------------TOGGLA ACCORDION STÄNGD/ÖPPEN-----------------------------------------------------------------


//funktion som togglar div i accordion (den utfällda delen) mellan hidden och ej hidden
function toggleArrow(event) {
    let toggleDiv = event.target.parentElement.parentElement.nextSibling;
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

