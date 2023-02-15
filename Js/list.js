console.log("hej på dig")
const createNewListBtn = document.querySelector("#createNewList");
console.log(createNewListBtn);


async function createList() {
    const listname = "Add Listname";

    const res = await fetch(`https://nackademin-item-tracker.herokuapp.com/lists`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            listname: listname,
        }),
    });
    const { list } = await res.json();
}




createNewListBtn.addEventListener("click", createList);