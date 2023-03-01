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

        // console.log(registeredUsers);

        // Villkor för find()-metod
        // Hitta det anv objekt som har samma email och lösen som anv. input
        const validateUser = user => user.email === email && user.password === password;

        // find() Retunerar det första arr-elementet som uppfyller villkor, i vårt fall ett anv-obj - annars undefined
        // console.log(registeredUsers.find(validateUser));
        
        // find() Retunerar det första arr-elementet som uppfyller villkor - annars undefined
        if(registeredUsers && registeredUsers.find(validateUser)) {
            // Om det finns en match körs denna kod
            // console.log("login ok");

            // Spara anv-obj till den inloggade anv i user-variabel
            const user = registeredUsers.find(validateUser);
            // console.log(user);

            // Spara det inloggade anv-obj i local storage
            // Under signedInUser
            setItem("signedInUser", user);


            // Slussar anv vidare till list.html
            redirectUser("list.html")            

        } else {

            // Annars körs denna kod
            // console.log("login not ok");

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

    loginUserLink.addEventListener("click", () => {
        
        // Hämtar contianer för login resp. register form och togglar klassen "hide" som sätter de till display:none respektive display:block ebroende på utgångsläge
        document.querySelector(".register-form-container").classList.toggle("hide");
        
        document.querySelector(".log-in-form-container").classList.toggle("hide");
        
    })
    
    //-------------------------------------------- RENDER REGISTER NEW USER VIEW ---------------------------------------------------

    const registerUserLink  = document.querySelector('#registerUserLink');
    
    registerUserLink.addEventListener("click", () => {
        
        // Hämtar contianer för login resp. register form och togglar klassen "hide" som sätter de till display:none respektive display:block ebroende på utgångsläge
        document.querySelector(".register-form-container").classList.toggle("hide");
        
        document.querySelector(".log-in-form-container").classList.toggle("hide");
        
    })
    
    //--------------------------------------------REGISTER NEW USER---------------------------------------------------
    
    const PWDFeedback = document.querySelector(".password-feedback")
    const emailAlert = document.querySelector(".reg-alert-container")

    // Om en user existerar i local - Hämta datan och assigna till userArr
    // Om user ej existerar i local - assigna tom arr till userArr
    let userArr = getitem("registeredUsers") ? getitem("registeredUsers") : [];
    // console.log("userArr", userArr);
    // console.log("userArr", userArr[0].password);
    
    registerUserForm = document.querySelector('#registerUser');
    // console.log(registerUserForm);
   
    // Submit-EventListener på form

    registerUserForm && registerUserForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Hämtar userns inlogg-försök
        const fullName = document.querySelector('#FLName').value;
        // console.log(fullName);

        const email = document.querySelector('#email');
        // console.log(email.value);

        const PWD = document.querySelector('#PWD');
        // console.log(PWD.value);
        
        const confPWD = document.querySelector('#confPWD');
        // console.log(confPWD.value);

        // Villkor för every()-metod Kollar så anv. email ej är samma som en redan reggad anv.
        const checkUniqueUser = user => user.email !== email.value;

        // every() retunerar true / false
        // console.log(userArr.every(checkUniqueUser));
        
        // Om user email ej finns reggad sedan tidigare
        // & lösen matchar varandra --> Skapa ny user i local storage
        if(userArr.every(checkUniqueUser) && PWD.value === confPWD.value) {

            createUser(fullName, email.value, PWD.value);

        // Annars om mejl redan finns reggad och lösen ej matchar
        } else if (!userArr.every(checkUniqueUser) && PWD.value !== confPWD.value) {

            // console.log("mejlen finns redan reggad och lösen matchar ej");

            email.classList.add("error");
            confPWD.classList.add("error");
            PWD.classList.add("error");

            emailAlert.classList.remove("hide");
           
            PWDFeedback.classList.remove("hide");

        // Annars om mejl redan finns reggad - dvs ej unik
        } else if(!userArr.every(checkUniqueUser)) {

            // console.log("mejlen finns redan reggad");

            if(PWDFeedback.style.display = "block") {
                PWDFeedback.classList.add("hide")
                PWD.classList.remove("error")
                confPWD.classList.remove("error")
            }

            email.classList.add("error");

            emailAlert.classList.remove("hide");

        // Annars om lösen ej matchar
        } else {

            // console.log("lösen matchar ej");

            if( emailAlert.style.display = "block") {
                emailAlert.classList.add("hide")
                email.classList.remove("error")
            }
        
            confPWD.classList.add("error");
            PWD.classList.add("error");

            PWDFeedback.classList.remove("hide")
        }

    });

    function createUser (fullName, email, PWD) {
        // console.log("We are in create user func");

        // Skapar anv-obj med anv-input
        const userObj = {
    
            fullName: fullName,
            email: email,
            password: PWD,
            userList: [],
    
        }
        
        // Pushar in den nya anv till userArr
        userArr.push(userObj);
    
        // console.log(userArr);


        // Lagrar uppdaterade userArr i local storage
        setItem("registeredUsers", userArr);
        
        // Sätter användaren som "inloggad" i local storage
        setItem("signedInUser", userObj);
        
        // Slussar anv vidare till list.html
        redirectUser("list.html")            

    }
})()