const searchBox = document.getElementById("btn")
const listItems = document.getElementById("list")
function addingTask() {
    if (searchBox.value === '') {
        alert("You must write your task")
    }
    else {
        if (!document.getElementById("taskHeading")) {
            const heading = document.createElement("h2");
            heading.id = "taskHeading";
            heading.innerHTML = "Tasks";
            listItems.prepend(heading); // Use prepend to add it at the top
        }

        let li = document.createElement("li")
        li.innerHTML = searchBox.value
        listItems.appendChild(li)
        let span = document.createElement("span")
        span.innerHTML= "\u00d7"
        li.appendChild(span)
        


    }
    searchBox.value=""
    saveData()
}

listItems.addEventListener("click",function(func){
    if(func.target.tagName === "LI"){
        func.target.classList.toggle("checked")
        saveData()
    }
    else if(func.target.tagName ==="SPAN"){
        func.target.parentElement.remove()
        saveData()
    }
})
function saveData(){
    localStorage.setItem("data",listItems.innerHTML)
}
function showingTask(){
    listItems.innerHTML = localStorage.getItem("data")
}
showingTask()
