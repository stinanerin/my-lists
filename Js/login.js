/* Immediately-invoked Function Expressions */
(function() {

    //---------------------------------------------------LOG IN---------------------------------------------------
    const loginForm = document.querySelector('#loginForm');
    let registerUserForm;
    
    // Submit-EventListener på form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hämtar valuet från userns inlogg-försök
        const loginEmail = document.querySelector('#loginEmail').value;
        const loginPWD = document.querySelector('#loginPWD').value;

        // Skickar in till validera login funktion
        loginValidation(loginEmail,loginPWD)

    });

    function loginValidation(email, password) {

        // Hämta arr från local med alla reggade anv-objekt
        const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers"));

        console.log(registeredUsers);

        // Villkor för find()-metod
        // Hitta det anv objekt som har samma email och lösen som anv. input
        const validateUser = user => user.email === email && user.password === password;

        // find() Retunerar det första arr-elementet som uppfyller villkor, i vårt fall ett anv-obj - annars undefined
        console.log(registeredUsers.find(validateUser));
        
        // find() Retunerar det första arr-elementet som uppfyller villkor - annars undefined
        if(registeredUsers.find(validateUser)) {
            // Om det finns en match körs denna kod
            console.log("login ok");

            // Spara anv-obj till den inloggade anv i user-variabel
            const user = registeredUsers.find(validateUser);
            console.log(user);

            // Spara det inloggade anv-obj i local storage
            // Under signedInUser
            localStorage.setItem("signedInUser", JSON.stringify(user))

            //todo! Slussa anv vidare vid lyckat inlogg

        } else {

            // Annars körs denna kod
            console.log("login not ok");

            //todo! Vad händer vid misslyckat inlogg?

        }        
    }
    //--------------------------------------------RENDER REGISTER NEW USER VIEW---------------------------------------------------

    const registerUserLink  = document.querySelector('#registerUserLink');

    registerUserLink.addEventListener("click", () => {

        // Hämtar contianer för login resp. register form och togglar klassen "hide" som sätter de till display:none respektive display:block ebroende på utgångsläge
        document.querySelector(".register-form-container").classList.toggle("hidden");

        document.querySelector('.log-in-form-container').classList.toggle("hidden");
        
    })
    
    //--------------------------------------------REGISTER NEW USER---------------------------------------------------
    
    // Om en user existerar i local - Hämta datan och assigna till userArr
    // Om user ej existerar i local - assigna tom arr till userArr
    let userArr = localStorage.getItem("registeredUsers") ? JSON.parse(localStorage.getItem("registeredUsers")) : [];
    console.log("userArr", userArr);
    // console.log("userArr", userArr[0].password);
    
    registerUserForm = document.querySelector('#registerUser');
    console.log(registerUserForm);

    
    // Submit-EventListener på form
    
    registerUserForm && registerUserForm.addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("We inside addeventlistener");


        // Hämtar valuet från users inlogg-försök
        const fullName = document.querySelector('#FLName').value;
        console.log(fullName);

        const email = document.querySelector('#email').value;
        console.log(email);

        const PWD = document.querySelector('#PWD').value;
        console.log(PWD);
    
        // Villkor för every()-metod Kollar så anv. email ej är samma som en redan reggad anv.
        const checkUser = user => user.email !== email;

        // every() retunerar true / false
        console.log(userArr.every(checkUser));

        if(userArr.every(checkUser)) {

            // Om user email ej finns reggad sedan tidigare --> Skapa ny user i local storage
            createUser(fullName, email, PWD)

        } else {

            //todo! Något felmeddelande mot användare måste vi displaya
            console.log("mejlen finns redan reggad");

        } 

    });

    function createUser (fullName, email, PWD) {
        console.log("We are in create user func");

        // Skapar anv-obj med anv-input
        const userObj = {
    
            fullName: fullName,
            email: email,
            password: PWD,
    
        }
        
        // Pushar in den nya anv till userArr
        userArr.push(userObj);
    
        console.log(userArr);
    
        // Lagrar uppdaterade userArr i local storage
        localStorage.setItem("registeredUsers", JSON.stringify(userArr));
    
        // Sätter användaren som "inloggad" i local storage
        localStorage.setItem("signedInUser", JSON.stringify(userObj));
    
        //todo! Här måste anändaren komma till list.html - ej fixat
               
    }

    

})()

