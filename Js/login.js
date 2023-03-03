/* Immediately-invoked Function Expression */

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
        const registeredUsers = getitem("registeredUsers");

        // Villkor för find()-metod
        // Hitta det anv objekt som har samma email och lösen som anv. input
        const validateUser = user => user.email === email && user.password === password;
      
        // find() Retunerar det första arr-elementet som uppfyller villkor - annars undefined
        if(registeredUsers && registeredUsers.find(validateUser)) {

            // Spara anv-obj till den inloggade anv i user-variabel
            const user = registeredUsers.find(validateUser);

            // Spara det inloggade anv-obj i local storage
            setItem("signedInUser", user);

            // Slussar anv vidare till list.html
            redirectUser("list.html")   
        } else {
            // Annars körs denna kod
            document.querySelector(".login-alert-container").innerHTML = `
            <div class="alert alert-danger container mt-2" role="alert">
                <div class="row">
                    <div class="col-auto">
                        <i class="fa-solid fa-triangle-exclamation"></i>
                    </div>
                    <div class="col">
                        <span>Invalid email or password</span>
                    </div>
                </div>
            </div>`

        }        
    }

    //-------------------------------------------- RENDER LOGIN USER VIEW ---------------------------------------------------
    
    const loginUserLink  = document.querySelector('#loginUserLink');
    const registerUserLink  = document.querySelector('#registerUserLink');
    const registerContainer = document.querySelector(".register-form-container")
    const loginContainer =  document.querySelector(".log-in-form-container")

    loginUserLink.addEventListener("click", () => {
        
        registerContainer.classList.toggle("hide");
        loginContainer.classList.toggle("hide");
        
    })
    
    //-------------------------------------------- RENDER REGISTER NEW USER VIEW ---------------------------------------------------

    registerUserLink.addEventListener("click", () => {
        
        registerContainer.classList.toggle("hide");
        loginContainer.classList.toggle("hide");
        
    })
    
    //--------------------------------------------REGISTER NEW USER---------------------------------------------------
    
    const PWDFeedback = document.querySelector(".password-feedback")
    const emailAlert = document.querySelector(".reg-alert-container")
    registerUserForm = document.querySelector('#registerUser');

    // Om en user existerar i local - Hämta datan och assigna till userArr
    // Om user ej existerar i local - assigna tom arr till userArr
    let userArr = getitem("registeredUsers") ? getitem("registeredUsers") : [];
    
    registerUserForm && registerUserForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Hämtar userns inlogg-försök
        const fullName = document.querySelector('#FLName').value;
        const email = document.querySelector('#email');
        const PWD = document.querySelector('#PWD');
        const confPWD = document.querySelector('#confPWD');

        // Villkor för every()-metod Kollar så anv. email ej är samma som en redan reggad anv.
        const checkUniqueUser = user => user.email !== email.value;

        // Om user email ej finns reggad sedan tidigare och lösen matchar varandra --> Skapa ny user i local storage
        if(userArr.every(checkUniqueUser) && PWD.value === confPWD.value) {
            createUser(fullName, email.value, PWD.value);
            console.log("första if-sats");

        // Annars om mejl redan finns reggad och lösen ej matchar
        } else if (!userArr.every(checkUniqueUser) && PWD.value !== confPWD.value) {
            email.classList.add("error");
            confPWD.classList.add("error");
            PWD.classList.add("error");

            emailAlert.classList.remove("hide");
            PWDFeedback.classList.remove("hide");

        // Annars om mejl redan finns reggad - dvs ej unik
        } else if(!userArr.every(checkUniqueUser)) {

            if(PWDFeedback.style.display = "block" || PWDFeedback.style.display === "block") {
                PWDFeedback.classList.add("hide")
                PWD.classList.remove("error")
                confPWD.classList.remove("error")
            }
            email.classList.add("error");
            emailAlert.classList.remove("hide");

        // Annars om lösen ej matchar
        } else { 

            if(emailAlert.style.display = "block" || emailAlert.style.display === "block" ) {
                emailAlert.classList.add("hide")
                email.classList.remove("error")
            }

            confPWD.classList.add("error");
            PWD.classList.add("error");
            PWDFeedback.classList.remove("hide")

        }
    });

    function createUser (fullName, email, PWD) {

        // Skapar anv-obj med anv-input
        const userObj = {
    
            fullName: fullName,
            email: email,
            password: PWD,
            userList: [],
    
        }
        
        // Pushar in den nya anv till userArr
        userArr.push(userObj);

        // Lagrar userArr i local storage & sätter användaren som "inloggad" i local storage
        setItem("registeredUsers", userArr);
        setItem("signedInUser", userObj);
        
        // Slussar anv vidare till list.html
        redirectUser("list.html")
    }
})()