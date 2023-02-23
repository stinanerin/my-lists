
//--------------------------------------------Funktion som ändrar antal i item-text under rubrik--------------------------------------------

/*
simpel räknare som körs inuti newItem(). när en ny vara läggs till i API
så uppdateras "x items" under rubrik i listan där den nya varan lags till 
tar emot:
- html elementet (som hämtats inuti addItem())
- listan som item läggs till i 
*/

function changeItemCounterText(pElement, itemList) {
    /* 
    Vad behövs? 
    - hämta p-elementet 
        - träffa element i rätt lista
    - listans fullständiga längd


    vad ska göras?
    - ändra innerHTML eller text i p-elementet


    när ska ändringen göras? 
    - varje gång något läggs till eller tas bort ur en lista via API
    */
    
    pElement.innerHTML = `${itemList.length} items`
}