
    //---------------------------------------------------Hämtar products.json fil ---------------------------------------------------
    
    const fetchProductsJson = async function() {
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
        const productListJson = await response.json();
        console.log(productListJson);
    
        return productListJson;
    
    }

    //--------- Initera Eventlistener för varje item för att sedan kunna lägga till i API Lista ---------

    function addItem(wrapper) {
        console.log("Add listener")
         // Hämtar alla våra li-taggar i rec-bar för att loopa igenom och lägga till en eventListener på varje item vid klick
        let allRecProducts = wrapper.querySelectorAll(".rec-product");
        // console.log(allRecProducts);

        allRecProducts.forEach((item) => {
            
            item.addEventListener("click", () => {
                
                // Vid varje klick på ett item tänker jag att vi kör en funktion som lägger till ny product i API:et
                // New item tar emot dataseten från addItem så vi kan putta in de i APi:et 
                newItem(item.dataset.title, item.dataset.icon, item.dataset.listid)
                
                // Här console-loggas vilket item anv. klickat på 
                console.log(item.dataset.title);
                // Här console-loggas vilket id listan anv lagt till ett item på är 
                console.log(item.dataset.listid);
            })
        })
    }

    //--------------------------------------------------- API funktion som lägger till klickat item i lista  ---------------------------------------------------

    // newItem() är en asynkron funktion som tar emot användarens klickade item, med titel och ikon och sparar det i API:et för at tkunna renderas senare
    async function newItem(title, icon, listID) {
    
        // Denna funktion lägger till varor i API
        // Beroende på vilken knapp i recommended bar användaren klickat på
            // `https://nackademin-item-tracker.herokuapp.com/lists/${id}/items`,

        //todo! Här måste vi peka på anv specifika lista genom id
       
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

        //! Förstår ej varför måste skriva så { list }
        const { list } = await res.json();
        console.log(list);
        console.log(list._id);

    }
