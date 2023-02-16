const recProductsList = document.querySelector("#recProdContainer");

    //---------------------------------------------------Hämtar products.json fil ---------------------------------------------------
    
    const getProducts = async function() {
        // Await keyword
            // Stoppar JS.motorn att assigna värdet till response variabeln tills löftet har resolved
    
        const response = await fetch("data/products.json");
        console.log(response);
    
        //! Kanske onödigt så länge filerna finns lokalt o projektet
        if (response.status !== 200) {
            // Throw-keyword --> New error object
            // Om vi kastar ett error inuti en async funktion så blir promiset rejectat och vi hoppar ur funktionen
            throw new Error("Cannot fetch the data");
        }
    
        // .json() retunerar ett Promise - reject / resolved - Går ej att spara direkt i en variabel
            // Genom await-keyword inväntar att Promise-objektet blivit resolved
            // Lagrar sen i data-variabeln

        const data = await response.json();
        console.log(data);
    
        return data;
    
    }
    
    // Då getTodos är async så retunerar den ett promise och kommer inte servera datan - Fast vi retunerar den
        // Vi behöver .then();
    
    getProducts()
        // Om datan kan levereras ritar vi ut produkterna i DOM:en genom funktion drawRecProd(data) som vi skickar med vår produkt-utbud arr i
        .then(data => drawRecProd(data))
        //! Har bytt ut funktion för test
        // .then(data => createListAccordion(data))
        //? Annars error meddelande - ska jag ta bort?
        .catch(err => console.log("Rejected:", err.message));

    //--------------------------------------------------- Ritar ut products.json ---------------------------------------------------

    function drawRecProd(arr) {

        // Här renderas varje item från vårt produktutbud array
        // Dataattribut används för att enkelt kunna hämta valuet från icon samt h3-tagg
        arr.forEach((elem) => {
            recProductsList.innerHTML += `
            <div class="col-auto text-center ">
                <li class="rec-product" data-title="${elem.title}" data-icon="${elem.image}">
                    <i class="${elem.image}"></i>
                    <h3 class="subheading">${elem.title}</h3>
                </li>
            </div>
            `
        })
        // Initerar en addItem() funktion för varje knapp så de är sammanlänkade i JS mototns minne (tror det är så det funkar)
        addItem()
    }

    //--------- Initera Eventlistener för varje item för att sedan kunna lägga till i API Lista ---------

    function addItem() {
        console.log("Add listener")
        // Hämtar alla våra li-taggar i rec-bar för att loopa igenom och lägga till en eventListener på varje item vid klick
        const allRecProducts = document.querySelectorAll(".rec-product");
        // console.log(allRecProducts);
        allRecProducts.forEach((item) => {
            item.addEventListener("click", () => {

                // Vid varje klick på ett item tänker jag att vi kör en funktion som lägger till ny product i API:et
                // New item tar emot dataseten från addItem så vi kan putta in de i APi:et 
                newItem(item.dataset.title, item.dataset.icon)

                // Här console-loggas vilket item anv. klickat på 
                console.log(item.dataset.title);

            })
        })
    }

    //--------------------------------------------------- API funktion som lägger till klickat item i lista  ---------------------------------------------------

    // newItem() är en asynkron funktion som tar emot användarens klickade item, med titel och ikon och sparar det i API:et för at tkunna renderas senare
    async function newItem(title, icon) {
        
        console.log("we are here"); 
        
        
        // Denna funktion lägger till varor i API
        // Beroende på vilken knapp i recommended bar användaren klickat på
            // `https://nackademin-item-tracker.herokuapp.com/lists/${id}/items`,

        //todo! Här måste vi peka på anv specifika lista genom id
       
        const res = await fetch(
            `https://nackademin-item-tracker.herokuapp.com/lists/63eb95ef13a30465c1e2de98/items`,
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

        //! Förstår ej varför måste skriva så { list }
        const { list } = await res.json();

        console.log(list);

        console.log({ list });
        
    }
