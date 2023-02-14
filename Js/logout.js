//-------------------------------------------------LOG OUT---------------------------------------------------

// Ge alla knappar som ska rensa signend in user i local storage #logoutBtn som id
const logoutBtn = document.querySelector("#logoutBtn");
console.log(logoutBtn);

logoutBtn && logoutBtn.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.removeItem("signedInUser");

    //todo! Byt vy till inloggnignsvyn

});