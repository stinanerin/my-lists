//!--------------------------------------------Local storage Array med ID:n---------------------------------------------------
 function updateUserListArr(id) {

     console.log("hej från local-array.js");
     
     let regArr = JSON.parse(localStorage.getItem("registeredUsers"));
     console.log("Reg user", regArr);
     
     let sigUser = JSON.parse(localStorage.getItem("signedInUser"));
     console.log("signed in user", sigUser);
     
     const findActiveUserInRegUsers = regUser => regUser.email === sigUser.email;
     
         
     console.log("Found it ", regArr.find(findActiveUserInRegUsers));
     
     console.log(regArr.find(findActiveUserInRegUsers).userList);
     
     const activeUserListArr = regArr.find(findActiveUserInRegUsers).userList;
     
     activeUserListArr.push(id)
     
     console.log("modifierad listarr", activeUserListArr);
     
     console.log(sigUser.userList = activeUserListArr);
     
     //! lägg till i local storage 
     
     console.log("sigUser med modifierad listArr", sigUser);
     
     
     // hur jag får in det i regArr
     regArr.find(findActiveUserInRegUsers).userList = [...sigUser.userList]
     
     console.log(regArr)
     
     // Uppdaterar local storage
     localStorage.setItem("signedInUser", JSON.stringify(sigUser));
     localStorage.setItem("registeredUsers", JSON.stringify(regArr));

 }     
