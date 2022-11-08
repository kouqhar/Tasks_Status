const tasksContainer = document.querySelector("#tasks");
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const tasksStatisticsDom = document.querySelector("header #stats");
let tasksArr = [];

// Fetch data from api
const fetchTasks = async () => {
  try {
    const taskUrl = await fetch("https://dummyjson.com/todos");
    const taskResponse = await taskUrl.json();
    return taskResponse.todos;
  } catch (err) {
    console.log(err.message);
  }
};

// Generate single and random task
const singleTask = (tasks) => {
  const generateRandomNumber = Math.floor(Math.random() * (tasks.length - 1));
  return tasks[generateRandomNumber];
};

// Generate multiple tasks
const multipleTasks = async () => await fetchTasks();

// Save to localStorage (dummy db)
const saveToDummyDb = (dbName, dbArr) => {
  localStorage.setItem(dbName, JSON.stringify(dbArr));
  location.reload();
};

// Create custom required task properties
const createTask = ({ completed, userId, todo, id }) => {
  const splitTodo = todo.split(" ");
  const title = `${[splitTodo[0], splitTodo[1]].join(" ")} . . .`;
  return {
    id,
    title,
    projectId: userId,
    description: todo,
    checked: completed,
  };
};

// Set number of task to multiple by default
const tasksToDisplay = localStorage.getItem("taskSelectionDom") || "multiple";
const previousTasksDisplayed = localStorage.getItem("taskSelection");

const loadData = (tasks) => {
  if (tasksToDisplay.toLowerCase() === "single".toLowerCase()) {
    const task = singleTask(tasks);
    tasksArr = [createTask(task)];
  } else tasksArr = tasks.map((task) => createTask(task));
};

const getTasks = async () => {
  try {
    let tasks = await multipleTasks();

    // If no tasks in Db dummyDb(localStorage), create tasks and store , else
    // Use tasks from db
    if (storedTasks !== null) {
      if (tasksToDisplay !== previousTasksDisplayed) {
        loadData(tasks);
        saveToDummyDb("tasks", tasksArr);
      }
    } else {
      loadData(tasks);
      saveToDummyDb("tasks", tasksArr);
    }
    localStorage.setItem("taskSelection", tasksToDisplay);
  } catch (err) {
    console.log(err);
  }
};

// Render tasks from localStorage (dummy db "/GET")
const renderTasks = () => {
  storedTasks.forEach(({ id, title, projectId, description, checked }) => {
    const imgStr = checked
      ? "./assets/images/check.svg"
      : "./assets/images/uncheck.png";
    const htmlStr = `
    <article class="task_container" data-id=${id} data-projectId=${projectId}>
      <div class="task_container__status">
        <img src=${imgStr} alt="completed" />
        </div>
      <div class="task_container__details">
        <h2>${title}</h2>
        <p>${description}</p>
      </div>
      <div class="task_container__arrow">
        <img src="./assets/images/right-arrow.svg" alt="arrow forward" />
      </div>
    </article>
    `;

    // Render statistics and all tasks to the DOM
    const completedTasks = storedTasks.filter(({ checked }) => checked).length;
    tasksStatisticsDom.textContent = `${completedTasks} / ${storedTasks.length}`;
    tasksContainer.insertAdjacentHTML("beforeend", htmlStr);
  });
};

/* ********** COMMENT BELOW FUNCTIONS TO RUN TEST ********* */
/* ********** UN-COMMENT BELOW FUNCTIONS TO RUN APPLICATION ********* */

getTasks();
renderTasks();

/* *************************** END OF COMMENT ***************** */

// Query all task_container class in tasks wrapper, also,
// Listen to individual click event if task is on the page
const tasksDOM = document.querySelectorAll("#tasks .task_container");
if (tasksDOM !== null) {
  tasksDOM.forEach((task, index) => {
    task.addEventListener("click", () => {
      let taskId = tasksDOM[index].dataset["id"];

      tasksArr = [...storedTasks];
      if (tasksArr[index].id === Number(taskId))
        tasksArr[index].checked = !storedTasks[index].checked;

      // POST tasks to localStorage (dummy db "/Save")
      saveToDummyDb("tasks", tasksArr);
    });
  });
}

// Listen to change on the number of tasks to display
const tasksToDisplayDropdown = document.querySelector("#tasks_options");
if (tasksToDisplayDropdown !== null) {
  tasksToDisplayDropdown.value = previousTasksDisplayed;
  tasksToDisplayDropdown.addEventListener("change", (e) => {
    const dropdownValue = e.target.value;
    localStorage.setItem("taskSelectionDom", dropdownValue);
    location.reload();
  });
}

// For unit testing only!!!
const statusTestTask = async () => {
  const tasks = await fetchTasks();
  const tasksLength = tasks.length;
  const completedTasks = tasks.filter(({ completed }) => completed).length;
  const unCompletedTasks = tasks.filter(({ completed }) => !completed).length;
  return { tasksLength, completedTasks, unCompletedTasks };
};

const singleTestTask = async () => {
  const tasks = await fetchTasks();
  return [singleTask(tasks)];
};
