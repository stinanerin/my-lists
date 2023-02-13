/* Immediately-invoked Function Expressions */
(function() {

    //---------------------------------------------------LOG IN---------------------------------------------------
    const loginForm = document.querySelector('#loginForm');
    
    // Submit-EventListener på form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hämtar valuet från users inlogg-försök
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

            //todo! Vad händer vid lyckat inlogg


        } else {

            // Annars körs denna kod
            console.log("login not ok");

            //todo! Vad händer vid misslyckat inlogg
        }

        
    }

    //-------------------------------------------------REGISTER USER---------------------------------------------------
    



})()


