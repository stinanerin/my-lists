
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
function productListItem(listItemObject, ul, listId) {
    
    // console.log(listItemObject)

    let progressList = ul[0];
    let doneList = ul[1];
    let deleteItem = ul[2];
    
    let itemId = listItemObject._id


    let deleteX = document.createElement("button");
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
        deleteItemAPI(listId, itemId)
    })


    listItemElement.innerHTML = `
    <div class="iconTitleWrapper">
    <div class="itemIcon">
    <i class="${listItemObject.image}"></i> 
    </div> <h4 class="titleItems">${listItemObject.title}</h4> 
    </div>
    <div class="counterCheckboxWrapper">
    <div class="counter"> <i class="fa-solid fa-plus"></i> <span>${listItemObject.qty}</span> <i class="fa-solid fa-minus"></i> </div>`;

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
    
    /*
    Lägger en eventlistener på varje checkbox som lyssnar efter förändring.
    Om man klickar i en checkbox så skickas följande till funktion som ändrar varan i API:
    - id för listan den ligger i
    - id för själva artikeln
    - true eller false (beroende på state på item) 
    appendar också i ny lista och ändrar checked i html element */
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
/* Tar bort en produkt från en lista */
async function deleteItemAPI(listId, itemId){
    const res = await fetch (`https://nackademin-item-tracker.herokuapp.com/lists/${listId}/items/${itemId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const { list } = await res.json();
}

