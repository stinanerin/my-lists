
/* 
KORTET: Gör en funktion som skapar en html-sträng att lägga in i li elementet : Klar!
Skapa en funktion som tar emot tre input parametrar
    - qty (Quantity)
    - name
    - icon
Denna funktion skapar ett dom element,
en kopia productListItem diven där du ersätter namn, ikon och mängd med de värden från input.
När du har skapat ditt dom element så retunera den.
*/

function productListItem(title, qty, image, isChecked, itemId, listId, ul) {

    // console.log(title, qty, image, isChecked, itemId, listId, ul);
    // skapar image placeholder med en font awesom icon class innehåll
    const imagePlaceholder = "fa-regular fa-face-sad-cry";

    // om bilden inte finns så ersätter vi image input med våran placeholder
    if (image == undefined) {
        image = imagePlaceholder;
    }

    const listItemElement = document.createElement("div");
    listItemElement.classList.add("producteItem")


    //skapar ett input element type checkbox
    let input = document.createElement("input");
    input.type = "checkbox";

    //sätter "checked" om isChecked är true
    //sätter klasslist för Fias styling
    //sätter varans id (i api) som id
    input.checked = isChecked;
    input.classList.add("doneCheckbox");
    // input.setAttribute("id", itemId);

    listItemElement.innerHTML = `
    <div class="iconTitleWrapper">
    <div class="itemIcon">
    <i class="${image}"></i> 
    </div> <h4 class="titleItems">${title}</h4> 
    </div>
    <div class="counterCheckboxWrapper">
    <div class="counter"> <i class="fa-solid fa-plus"></i> <span>${qty}</span> <i class="fa-solid fa-minus"></i> </div>`;

    //kollar om item är checked i api och appendar antingen i In progress eller i Done
    if (isChecked) {
        ul[1].appendChild(listItemElement);
    } else {
        ul[0].appendChild(listItemElement);
    }

    //appendar checkbox i listItemElement (skapat här ovan)
    listItemElement.append(input);

    //lägger en eventlistener på varje checkbox som lyssnar efter förändring
    //om man klickar i en checkbox så skickas id för listan den ligger i, samt id för själva artikeln till
    //funktion som ändrar varan till "checked" i API
    //appendar också i doneList
    input.addEventListener("change", (event) => {
        console.log("du tryckte på en checkbox")
        // console.log(listId, itemId)

        //här borde man kunna lägga någon typ av if sats för att kunna flytta tillbaka? 
        changeToCheckInAPI(listId, itemId);
        ul[1].appendChild(listItemElement);
    })

}


//funktion som ändrar checked från false till true
//skickar in id till listan som varan ligger i och id till den specifika varan
async function changeToCheckInAPI(listId, itemId) {
    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists/${listId}/items/${itemId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            checked: true,
        }),
    });
    const { list } = await res.json();
}