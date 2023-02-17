let Lina = (() => {
    let deleteListBtn = document.querySelectorAll(".deleteListBtn");
    console.log(deleteListBtn)

    deleteListBtn.forEach(trashcan => {
        console.log(trashcan, "Lina");
        trashcan.addEventListener("click", () => {
            // ta bort listan i local storage
            // ta bort listan i API:et
            // ta bort från DOM:en
        });
    });

});