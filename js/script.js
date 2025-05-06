{
    let tasks = [];
    let hideCompleted = false;

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
            done: false,
        });
        render();
    };

    const removeTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const completeAllTasks = () => {
        tasks = tasks.map(task => ({
            ...task,
            done: true,
        }));
        render();
    };

    const toggleHideCompleted = () => {
        hideCompleted = !hideCompleted;
        render();
    };

    const bindEvents = () => {
        const removeButtons = document.querySelectorAll(".js-removeTaskButton");
        removeButtons.forEach((button, index) => {
            button.addEventListener("click", () => removeTask(index));
        });

        const toggleDoneButtons = document.querySelectorAll(".js-isTaskDoneButton");
        toggleDoneButtons.forEach((button, index) => {
            button.addEventListener("click", () => toggleTaskDone(index));
        });

        const toggleCompletedButton = document.querySelector(".js-toggleCompleted");
        toggleCompletedButton.addEventListener("click", toggleHideCompleted);

        const completeAllButton = document.querySelector(".js-completeAll");
        completeAllButton.addEventListener("click", completeAllTasks);
    };

    const render = () => {
        const taskListElement = document.querySelector(".js-tasksList");
        let htmlString = "";

        tasks.forEach((task, index) => {
            if (hideCompleted && task.done) return;

            htmlString += `
            <li class="tasksList__taskItem"> 
                <button 
                    class="tasksList__taskButton${task.done ? " tasksList__taskButton--done" : ""} js-isTaskDoneButton" 
                    data-index="${index}"
                >
                    ${task.done ? "✓" : ""}
                </button>
                <span class="tasksList__taskContent${task.done ? " tasksList__taskContent--done" : ""}">
                    ${task.content}
                </span>                
                <button class="tasksList__taskButton--remove js-removeTaskButton" data-index="${index}">🗑</button>
            </li>
        `;
        
        });

        taskListElement.innerHTML = htmlString;

        const toggleCompletedButton = document.querySelector(".js-toggleCompleted");
        toggleCompletedButton.textContent = hideCompleted ? "Pokaż ukończone" : "Ukryj ukończone";

        const completeAllButton = document.querySelector(".js-completeAll");
        completeAllButton.disabled = tasks.every(task => task.done);

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskElement = document.querySelector(".js-newTask");
        const newTaskContent = newTaskElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            newTaskElement.value = "";
        }

        newTaskElement.focus();
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };

    init();
}
