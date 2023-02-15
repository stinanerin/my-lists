const recProductsList = document.querySelector("#recProdContainer")


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
        // Om datan kan levereras ritar vi ut produkterna i DOM:en 
        .then(data => drawRecProd(data))
        .catch(err => console.log("Rejected:", err.message));

    //--------------------------------------------------- Ritar ut products.json ---------------------------------------------------

    function drawRecProd(arr) {

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
        
        // Initerar en addItem funktion för varje knapp så de är sammanlänkade i JS mototrns minne(tror det är så det funkar)
        addItem()
        // Flytta ut sen

    }
    //--------------------------------------------------- Initera Eventlistener för varje item för att sedan kunna lägga till i API Lista  ---------------------------------------------------

    //! Ej klar - newItem-funktion funegrar ej
    //! Samt hur ska vi peka på ikon + titel från den klickade li-taggen
    function addItem() {

        console.log('Add listener')

        const allRecProducts = document.querySelectorAll(".rec-product");
        // console.log(allRecProducts);

        allRecProducts.forEach((item, index) => {

            item.addEventListener("click", () => {

                newItem(item.dataset.title, item.dataset.icon)
                // Här tänker jag att vi kör funktion som lägger till ny product i api:et men ni kan ändra

                console.log("clicked");
                console.log(item.dataset.title);
                console.log(index);

            })
        })

    }

    //--------------------------------------------------- API funktion som lägger till klickat item i lista  ---------------------------------------------------

    //! OBS! Denna del funkar ej
    async function newItem() {
        
        console.log("we are here");
        
        //fetch() funkar ej
        const res = await fetch(
          `https://nackademin-item-tracker.herokuapp.com/lists/63eb9b5813a30465c1e2de99/items`,
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

        //! Förstår ej varför måste skriva så { }
        const { list } = await res.json();

        console.log(list);

        console.log({list});
        
    }