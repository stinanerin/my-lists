/* Immediately-invoked Function Expressions */
(function() {


    const loginForm = document.querySelector('#loginForm');
    
    // Submit-EventListener på form
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Hämtar valuet från users inlogg-försök
        const loginEmail = document.querySelector('#loginEmail').value;
        const loginPWD = document.querySelector('#loginPWD').value;


    });



})()


