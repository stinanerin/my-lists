//hämtar paragraf från account.html
let userFullName = document.getElementById("userFullName");


//hämtar objekt för inloggad användare från local storage 
//är detta en if sats? Förstår ej riktigt vad den gör pga är ej insatt i local, kopierade från list.js 
//tänker att jag borde kunna använda den redan sparade variabeln egentligen? Får dock ej tag på den.
let sigUserObj = localStorage.getItem("signedInUser") ? JSON.parse(localStorage.getItem("signedInUser")) : [];
//spar ner användarens namn i variabel
const sigUserFullName = sigUserObj.fullName;


//ändrar texten i paragraf på account.html
userFullName.innerText = sigUserFullName;