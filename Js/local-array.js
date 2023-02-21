
// --------------------------------------------Local storage Array med ID:n---------------------------------------------------

// Funktion för att uppdatera varje användares lista med vederbörandes egna listor
// Tar emot varje nytt list-id som en anv skapar
function updateUserListArr(id) {
    
    // Hämtar inloggade anv och reggade anv
    let regArr = JSON.parse(localStorage.getItem("registeredUsers"));
    
    let sigUser = JSON.parse(localStorage.getItem("signedInUser"));
    
    const findActiveUserInRegUsers = regUser => regUser.email === sigUser.email;

    // Hittar inloggade användarens lista
    const activeUserListArr = regArr.find(findActiveUserInRegUsers).userList ;

    // Pushar in nya list-ID:et
    activeUserListArr.push(id)
    
    // Uppdaterar inloggade anv och reggade användarens lista med ID:n
    sigUser.userList = activeUserListArr
    
    regArr.find(findActiveUserInRegUsers).userList = [...sigUser.userList]

    // Uppdaterar local storage med nya listan med ID:n
    localStorage.setItem("signedInUser", JSON.stringify(sigUser));
    localStorage.setItem("registeredUsers", JSON.stringify(regArr));

}



