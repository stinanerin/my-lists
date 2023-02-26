
/* 
KORTET: Gör en funktion som skapar en html-sträng att lägga in i li elementet : Klar!
Skapa en funktion som tar emot tre input parametrar
    - listitem objekt (varje varas objekt)
    - array med progress list och done list
    - listans ID
Denna funktion skapar ett dom element,
en kopia productListItem diven där du ersätter namn, ikon och mängd med de värden från input.
När du har skapat ditt dom element så retunera den.
*/



//--------------------------------------------SKRIVER UT LISTAN INUTI ACCORDION---------------------------------------------------


//skickar in listobjektet, en array som innehåller progressList och doneList, samt listans id
function productListItem(listItemObject, wrapper, listId) {

    // console.log(listItemObject)

    let progressList = wrapper.querySelector(".progressList");
    let doneList = wrapper.querySelector(".doneList");
    let pElement = wrapper.querySelector(".pElement");


    let itemId = listItemObject._id


    let deleteX = document.createElement("button");
    deleteX.classList.add("deleteX");
    deleteX.innerHTML = '<i class="fa-solid fa-xmark"></i>';

    // skapar image placeholder med en font awesom icon class innehåll
    const imagePlaceholder = "fa-regular fa-face-sad-cry";

    // om bilden inte finns så ersätter vi image input med våran placeholder
    if (listItemObject.image == undefined) {
        listItemObject.image = imagePlaceholder;
    }

    const listItemElement = document.createElement("div");
    listItemElement.classList.add("producteItem")


    //skapar ett input-element, type checkbox
    let input = document.createElement("input");
    input.type = "checkbox";


    //sätter "checked" på checkbox om isChecked är true
    //sätter klass för styling
    input.checked = listItemObject.checked;
    input.classList.add("doneCheckbox");



    /* Raderar produkten i DOMEN och via api */
    deleteX.addEventListener("click", () => {
        listItemElement.remove()
        deleteItemAPI(listId, itemId, pElement)
    })


    listItemElement.innerHTML = `
    <div class="iconTitleWrapper">
    <div class="itemIcon">
    <i class="${listItemObject.image}"></i> 
    </div> <h4 class="titleItems">${listItemObject.title}</h4> 
    </div>
    <div class="counterCheckboxWrapper">
    <div class="counter"> <i class="fa-solid fa-plus"></i> <span class="item-qty">${listItemObject.qty}</span> <i class="fa-solid fa-minus"></i> </div>`;

    // kollar om item är checked i api och appendar antingen i In progress eller i Done
    if (listItemObject.checked) {
        doneList.appendChild(listItemElement);
    }
    else {
        progressList.appendChild(listItemElement);
    }

    //appendar checkbox i listItemElement (skapat här ovan)
    listItemElement.append(input);
    listItemElement.append(deleteX);

    
    // Lägger en eventlistener på varje checkbox som lyssnar efter förändring.
    input.addEventListener("change", () => {

        // If sats för att kolla om checkboxen som användaren klickat i tillhör ett item som ligger i In Progress eller Done-lista
        // Om itemet var checkat innan användaren klickade så hamnar det i In Progress-lista och vise versa
        // Anropar även funktion som ändrar item från checked:true till checked:false i API (och och vise versa)

        if (listItemObject.checked) {
            changeToCheckInAPI(listId, itemId, false);
            progressList.appendChild(listItemElement);
            listItemObject.checked = false
        } else {
            changeToCheckInAPI(listId, itemId, true);
            doneList.appendChild(listItemElement);
            listItemObject.checked = true
        }
    })

    //-------------------------------------------- Plus knapp - QTY ---------------------------------------------------

    let increaseBtn = listItemElement.querySelector('.fa-plus');
    // console.log(increaseBtn);
    
    // Klickevent på varje items (+) knapp
    increaseBtn.addEventListener("click", (e) => {

        
        // Hämtar nuvarande kvantiteten för klickat item
        let itemQtySpan = listItemElement.querySelector('.item-qty');
        // console.log("innan ökning", itemQtySpan);
        // console.log("you clicked", listItemObject.title , e.target);
        let itemQty = +itemQtySpan.innerText;
        // console.log("innan ökning",itemQty);

        // Ökar kvaniteten med ett
        let newitemQty = ++itemQty
        // console.log("efter ökning",newitemQty);

        // Async funktion för att ändra klickat items kvantitet i API
        changeQtyAPI(listId, itemId, newitemQty, listItemObject)
        // När ändringen har gjorts i API - Förändra DOM:en genom att ta nya kvantiteten från API.et och rendera det mot användare
        .then((item) => {
    
            // console.log("vi har inväntat api ändrign",  item);
            itemQtySpan.innerText = item.qty;
            // console.log("efter ökning", itemQtySpan);

        })

    })

    //-------------------------------------------- Minus knapp - QTY ---------------------------------------------------
    let decreaseBtn = listItemElement.querySelector('.fa-minus');
    // console.log(decreaseBtn);
    
    // Klickevent på varje items (-) knapp
    decreaseBtn.addEventListener("click", (e) => {

        // Hämtar nuvarande kvantiteten för klickat item
        let itemQtySpan = listItemElement.querySelector('.item-qty');
        // console.log("innan minskning", itemQtySpan);
        // console.log("you clicked", listItemObject.title , e.target);
        let itemQty = +itemQtySpan.innerText;
        // console.log("innan minskning",itemQty);

        // Ökar kvaniteten med ett
        let newitemQty = --itemQty
        // console.log("efter minskning", newitemQty);
        
        // Om antalet är noll efter senaste minskningen --> radera itemet helt från DOM:en & API
        if(newitemQty === 0) {

            deleteItemAPI(listId, itemId, pElement)
            listItemElement.remove()

        } else {

            // Async funktion för att ändra klickat items kvantitet i API
            changeQtyAPI(listId, itemId, newitemQty, listItemObject)
            // När ändringen har gjorts i API - Förändra DOM:en genom att ta nya kvantiteten från API.et och rendera det mot användare
            .then((item) => {
        
                // console.log("vi har inväntat api ändrign",  item);
                itemQtySpan.innerText = item.qty;
                // console.log("efter minskning", itemQtySpan);
    
            })

        }



    })

}




//--------------------------------------------UPPDATERAR ITEM I API---------------------------------------------------

//funktion som ändrar checked från false till true
//skickar in id till listan som varan ligger i och id till den specifika varan
async function changeToCheckInAPI(listId, itemId, trueOrFalse) {
    // console.log("list id:", listId, "item id:", itemId)
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${listId}/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            checked: trueOrFalse,
        }),
    });
    const { list } = await res.json();
}




/* Tar bort en produkt från en lista, anropar räknare */
async function deleteItemAPI(listId, itemId, pElement) {
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${listId}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { list } = await res.json();

    changeItemCounterText(pElement, list.itemList);
}

// Ändrar kvantiteten i API för klickat item 
async function changeQtyAPI(listId, itemId, newitemQty, listItemObject) {

    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${listId}/items/${itemId}`, {
    method: "PUT",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        qty: newitemQty,
    }),
});
// Hämtar hela list-obj, för vilket item:et vi precisi uppdaterat kvantiteten för
const { list } = await res.json();

// Hittar det det list-objekt vi precis uppdaterat kvantiteten för & retunerar det för att rendera förändringen på DOM:en
// console.log(list.itemList.find(elem => elem._id === listItemObject._id).qty);
return list.itemList.find(elem => elem._id === listItemObject._id);

}