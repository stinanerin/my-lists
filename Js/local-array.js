// --------------------------------------------Globala Local storage Funktioner ---------------------------------------------------



// Funktion som tar emot valfri key(sträng) som argument och hämtar från local storage
const getitem = key => JSON.parse(localStorage.getItem(key));

// console.log(getitem("registeredUsers"));

// console.log(getitem("signedInUser"));


// Funktion för att uppdatera local storage
// Tar emot en key(stärng) och ett value
const setItem = (key, value) => localStorage.setItem(key, JSON.stringify(value));


// Hittar inloggade anv. i reggade-användaren arrayen
const findActiveUserInRegUsers = regUser => regUser.email === sigUser.email;



// --------------------------------------------Uppdaterar Local storage Array med ID:n---------------------------------------------------


// Funktion för att uppdatera varje användares lista med vederbörandes egna listor
// Tar emot varje nytt list-id som en anv skapar
function updateUserListArr(id) {

    
    // Hämtar alla reggade användare
    let regArr = getitem("registeredUsers");
    
    // Hämtar inloggad användare
    let sigUser = getitem("signedInUser")
    

    // Hittar inloggade användarens lista
    const activeUserListArr = regArr.find(findActiveUserInRegUsers).userList ;

    // Pushar in nya list-ID:et
    activeUserListArr.push(id)
    
    // Uppdaterar inloggade anv med den senaste versionen av arrayen med list-ID:n
    sigUser.userList = activeUserListArr
    
    // Uppdaterar den inloggade användarens anv-objekt i local sotrage array med reggade användare 
    // Genom att hitta aktiva anv igen, peka på dess array med list-id:n 
    // Och sätta den till den den precis uppdaterade userList arrayen för inloggade anv-objektet
    regArr.find(findActiveUserInRegUsers).userList = [...sigUser.userList]


    // Uppdaterar local storage med nya listan med ID:n
    setItem("signedInUser", sigUser);


    // Uppdaterar local storage array med registrerade användare med nya userlist av id:n
    setItem("registeredUsers", regArr);

}



