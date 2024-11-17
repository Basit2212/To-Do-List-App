const searchBox = document.getElementById("btn");
const listItems = document.getElementById("list");

function addingTask() {
    if (searchBox.value === '') {
        alert("You must write your task");
    } else {
        // Add task to the list
        let li = document.createElement("li");
        li.innerHTML = searchBox.value;
        listItems.appendChild(li);

        // Add delete button to task
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // Close button
        li.appendChild(span);

        checkAndAddHeading(); // Ensure heading exists
    }
    searchBox.value = ""; // Clear input
    saveData();
}

listItems.addEventListener("click", function (func) {
    if (func.target.tagName === "LI") {
        // Toggle 'checked' class for tasks
        func.target.classList.toggle("checked");
        saveData();
    } else if (func.target.tagName === "SPAN") {
        // Remove task
        func.target.parentElement.remove();
        saveData();
        checkAndRemoveHeading(); // Check if the heading needs to be removed
    }
});

function saveData() {
    // Save only the task items (excluding the heading)
    const tasks = Array.from(listItems.querySelectorAll("li"));
    localStorage.setItem("data", tasks.map(task => task.outerHTML).join(""));
}

function showingTask() {
    const savedData = localStorage.getItem("data");
    if (savedData) {
        listItems.innerHTML = savedData; // Restore tasks
    }
    checkAndAddHeading(); // Add heading if tasks exist
}

function checkAndAddHeading() {
    // Add heading if tasks exist and the heading is not already present
    if (listItems.querySelectorAll("li").length > 0 && !document.getElementById("taskHeading")) {
        const heading = document.createElement("h2");
        heading.id = "taskHeading";
        heading.innerHTML = "Tasks";
        listItems.prepend(heading); // Add heading at the top
    }
}

function checkAndRemoveHeading() {
    // Remove heading if there are no tasks left
    if (listItems.querySelectorAll("li").length === 0) {
        const heading = document.getElementById("taskHeading");
        if (heading) {
            heading.remove(); // Remove the heading if it exists
        }
    }
}

// Load saved tasks on page load
showingTask();
