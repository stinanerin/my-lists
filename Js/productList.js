
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

function productListItem(title, qty, image, isChecked, ul) {
    console.log(isChecked)
    
    // console.log(title, qty, image);
    // skapar image placeholder med en font awesom icon class innehåll
    const imagePlaceholder = "fa-regular fa-face-sad-cry";

    // om bilden inte finns så ersätter vi image input med våran placeholder
    if (image == undefined) {
        image = imagePlaceholder;
    }

    const listItemElement = document.createElement("div");
    // const checkbox = document.createElement("input")
    // checkbox.type = "checkbox";

    // console.log(checkbox)
    // console.log("ul", ul)
    

    
    listItemElement.innerHTML = `<div class="producteItem"> <div class="iconTitleWrapper"> <div class="itemIcon"> <i class="${image}"></i> </div> <h4 class="titleItems">${title}</h4> </div> <div class="counterCheckboxWrapper"> <div class="counter"> <i class="fa-solid fa-plus"></i> <span>${qty}</span> <i class="fa-solid fa-minus"></i> </div><input type="checkbox" name="doneCheckbox" class="doneCheckbox" id="doneCheckbox" ${isChecked ? "checked" : " "}/></div> </div>`;
    ul.appendChild(listItemElement);
    // let counterCheckboxWrapper = document.querySelector(".counterCheckboxWrapper")
    // counterCheckboxWrapper.innerHTML += checkbox;
    // console.log(counterCheckboxWrapper)

    // return listItemElement;
}