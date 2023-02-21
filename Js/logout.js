
//-------------------------------------------------LOG OUT---------------------------------------------------

// Alla element som ska rensa signed in user i local storage behöver #logoutBtn som id
const logoutBtn = document.querySelector("#logoutBtn");
logoutBtn && logoutBtn.addEventListener('click', (e) => {
    localStorage.removeItem("signedInUser");
});