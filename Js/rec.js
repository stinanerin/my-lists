

//---------------------------------------------------Hämtar products.json fil ---------------------------------------------------

const fetchProductsJson = async function () {

    const response = await fetch("data/products.json");
    // console.log(response);

    if (response.status !== 200) {

        throw new Error("Cannot fetch the data");
    }

    // .json() retunerar ett Promise - reject / resolved - Går ej att spara direkt i en variabel
    // Inväntar att Promise-objektet blivit resolved
    const productListJson = await response.json();

    // Retunerar produkt arrayen
    return productListJson;

}

//------------------------------------------------ Renderar recommendation bar ---------------------------------------------------

function drawRecProd(listDiv, arr, id) {
    // Renderar varje item från vårt produktutbud array
    // Data-attribut används för att enkelt kunna hämta värdena

    arr.forEach((item) => {
        listDiv.innerHTML += `
        <div>
            <li class="rec-product me-3" data-title="${item.title}" data-icon="${item.image}" data-listid="${id}">
               <i class="${item.image}"></i>
               <h3 class="subheading">${item.title}</h3>
            </li>
        </div>`
    })

}




//------------ Initera Eventlistener för varje item för att sedan kunna lägga till i API Lista -----------------------------------

// console.log([ul, doneUL]);
function addItem(wrapper) {
    
    // Hämtar alla våra li-taggar i rec-bar för att loopa igenom och lägga till en eventListener på varje item vid klick
    let allRecProducts = wrapper.querySelectorAll(".rec-product");
    // console.log(allRecProducts);

    
    
    allRecProducts.forEach((item) => {
        
        item.addEventListener("click", () => {
            // console.log("Add listener")
            
            let pElement = wrapper.querySelector(".pElement")
            
            // Aktuell listas progressList-UL
            let progressItemsList = wrapper.querySelector('.progressList');
            // Alla h4 taggar i progressList-UL
            let allItemsTitles = progressItemsList.querySelectorAll('.titleItems');
            // console.log(allItemsTitles);

            let allItemsTitlesArr = [...allItemsTitles]

            // Om anv. försöker lägga till en produkt den redan ahr i sin lista 
            // Öka kvantiteten av produkten användaren redan har i sin lista
            if(allItemsTitlesArr.find(elem => elem.innerText === item.dataset.title) ) {

                let itemMatch = allItemsTitlesArr.find(elem => elem.innerText === item.dataset.title)
                // console.log(itemMatch);
                
                // Hittar <span> där kvantiteten renderas
                let itemQtySpan = itemMatch.parentElement.parentElement.querySelector('.item-qty');
                let itemQty = +itemQtySpan.innerText;
                let newitemQty = ++itemQty

                // Async funktion som uppdaterar existerande items kvantitet för aktuell lista
                changeQtyAPI(item.dataset.listid, itemMatch.dataset.itemid, newitemQty)
                // Uppdaterar span i DOM:en
                itemQtySpan.innerText = newitemQty;

            } else {
                // Annars lägg till itemet i listan och API:et 
                // 

                // Vid varje klick på ett item tänker jag att vi kör en funktion som lägger till ny product i API:et
                // New item tar emot dataseten från addItem så vi kan putta in de i APi:et 
                newItem(item.dataset.title, item.dataset.icon, item.dataset.listid)
                .then((list) => {
                    // console.log(list);
                    
                    let itemList = list.itemList;
    
                    const newItem = itemList.findLast(elem => elem)
    
                    // console.log(newItem);
    
                    //när ny vara lagts till anropas funktion som ändrar antal
                    changeItemCounterText(pElement, itemList);
    
                    // skapa productListItem elementet med nuvarande objektet
                        productListItem(
                            newItem,
                            wrapper,                   
                            list._id,
                        );
                        
                });
            }




        })
            // Här console-loggas vilket item anv. klickat på 
            // console.log(item.dataset.title);
            //! Här console-loggas vilket id listan anv lagt till ett item på är 
            // console.log(item.dataset.listid);
    })

}

//--------------------------------------------------- API funktion som lägger till klickat item i lista  --------------------------------------

// Denna funktion lägger till varor i API 
// Beroende på vilken knapp i recommended bar användaren klickat på

async function newItem(title, icon, listID) {
    // Tar emot användarens klickade item, med titel och ikon och sparar det i API:et för att kunna renderas senare
    // console.log("59", isChecked);

    const res = await fetch(
        `https://nackademin-item-tracker.herokuapp.com/lists/${listID}/items`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                image: icon,
                qty: 1,
                checked: false
            }),
        }
    );

    const { list } = await res.json();
    // console.log(list);
    // console.log(list._id);
    return list
}
