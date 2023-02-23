
//--------------------------------------------SKRIVER UT ANVÄNDARENS NAMN PÅ ACCOUNT.HTML---------------------------------------------------


//hämtar objekt för inloggad användare från local storage 
//är detta en if sats? Förstår ej riktigt vad den gör pga är ej insatt i local, kopierade från list.js 
//tänker att jag borde kunna använda den redan sparade variabeln egentligen? Får dock ej tag på den.
let sigUserObj = localStorage.getItem("signedInUser") ? JSON.parse(localStorage.getItem("signedInUser")) : [];
//spar ner användarens namn i variabel
const sigUserFullName = sigUserObj.fullName;


//hämtar paragraf från account.html
if (document.getElementById("userFullName")) {
    let userFullName = document.getElementById("userFullName");
    //ändrar texten i paragraf på account.html
    userFullName.innerText = capitalizeFirstLetter(sigUserFullName);
    
    
    //sätter stor bokstav på förnamnet
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

