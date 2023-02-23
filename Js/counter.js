
//--------------------------------------------Funktion som ändrar antal i item-text under rubrik--------------------------------------------

/*
simpel räknare som körs inuti newItem() 
när en ny vara läggs till i API eller tas bort från API
så uppdateras "x items" under rubrik i listan som ändrats
funktionen tar emot:
- html elementet som ska ändras
- listan som item läggs till i 
*/

function changeItemCounterText(pElement, itemList) {

    pElement.innerHTML = `${itemList.length} items`
}