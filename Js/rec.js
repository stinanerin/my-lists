

//---------------------------------------------------Hämtar products.json fil ---------------------------------------------------

const fetchProductsJson = async function () {

    const response = await fetch("data/products.json");
    // console.log(response);

    //! Kanske onödigt så länge filerna finns lokalt
    if (response.status !== 200) {

        throw new Error("Cannot fetch the data");
    }

    // .json() retunerar ett Promise - reject / resolved - Går ej att spara direkt i en variabel
    // Inväntar att Promise-objektet blivit resolved
    const productListJson = await response.json();
    // console.log(productListJson);

    // Retunerar produkt arrayen
    return productListJson;

}

//------------------------------------------------ Renderar recommendation bar ---------------------------------------------------

function drawRecProd(listDiv, arr, id) {
    // Renderar varje item från vårt produktutbud array
    // Data-attribut används för att enkelt kunna hämta värdena

    // console.log("136",arr);

    arr.forEach((item) => {
        listDiv.innerHTML += `
        <div class="col-auto text-center ">
            <li class="rec-product" data-title="${item.title}" data-icon="${item.image}" data-listid="${id}">
               <i class="${item.image}"></i>
               <h3 class="subheading">${item.title}</h3>
            </li>
        </div>`
    })

}

//------------ Initera Eventlistener för varje item för att sedan kunna lägga till i API Lista ------------
// console.log([ul, doneUL]);
function addItem(wrapper) {
    // console.log("Add listener")

    // Hämtar alla våra li-taggar i rec-bar för att loopa igenom och lägga till en eventListener på varje item vid klick
    let allRecProducts = wrapper.querySelectorAll(".rec-product");
    console.log(allRecProducts);
    // console.log(wrapper.parentElement.nextElementSibling.nextElementSibling);

    
    
    
    allRecProducts.forEach((item) => {
        
        item.addEventListener("click", () => {
            
            
            let ul = wrapper.parentElement.nextElementSibling.nextElementSibling;
            console.log("58", ul);
        
        
            //ta bort?
            ulArray = [];
            ulArray.push(ul);

            //! Behövs denna?
            isChecked = false;
            
            // Vid varje klick på ett item tänker jag att vi kör en funktion som lägger till ny product i API:et
            // New item tar emot dataseten från addItem så vi kan putta in de i APi:et 
            newItem(item.dataset.title, item.dataset.icon, item.dataset.listid, isChecked)
            .then((list) => {
                console.log("Listobjekt",list);
                
                let itemList = list.itemList;

                console.log(itemList);

                const newItem = itemList.findLast(elem => elem)

                console.log(newItem);

                // console.log(wrapper);

                // skapa productListItem elementet med nuvarande objektet
                    productListItem(
                        newItem.title,
                        newItem.qty,
                        newItem.image,
                        newItem.checked,
                        newItem._id,
                        sigUserList._id,
                        ulArray                   
                    );
                    
                    // appenda in i ulen
            });

        })
            // Här console-loggas vilket item anv. klickat på 
            // console.log(item.dataset.title);
            //! Här console-loggas vilket id listan anv lagt till ett item på är 
            // console.log(item.dataset.listid);
    })

}

//--------------------------------------------------- API funktion som lägger till klickat item i lista  ---------------------------------------------------

// Denna funktion lägger till varor i API 
// Beroende på vilken knapp i recommended bar användaren klickat på

async function newItem(title, icon, listID, isChecked) {
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
                checked: isChecked
            }),
        }
    );

    const { list } = await res.json();
    // console.log(list);
    // console.log(list._id);
    return list
}
