const tasksContainer = document.querySelector("#tasks");
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
const tasksStatisticsDom = document.querySelector("header #stats");
let tasksArr = [];

// Fetch data from api
const fetchTasks = async () => {
  const taskUrl = await fetch("https://dummyjson.com/todos");
  const taskResponse = await taskUrl.json();
  return taskResponse.todos;
};

// Generate a single random task
const singleTask = async (tasks) => {
  const tasksLength = tasks.length - 1;
  const generateRandomNumber = Math.floor(
    Math.random() * (tasksLength - 0) // Zero because array is 0 based index
  );
  return tasks[generateRandomNumber];
};

// Generate multiple tasks
const multipleTasks = async () => await fetchTasks();

// Save to localStorage (dummy db)
const saveToDummyDb = (dbName, dbArr) => {
  localStorage.removeItem(dbName);
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

const tasksToDisplay = ["single", "multiple"][1];
const loadData = async (tasks) => {
  if (tasksToDisplay.toLowerCase() === "single".toLowerCase()) {
    const task = await singleTask(tasks);
    tasksArr = [createTask(task)];
  } else tasksArr = tasks.map((task) => createTask(task));
};

const getTasks = async () => {
  let tasks = await multipleTasks();

  // If no tasks in Db dummyDb(localStorage), create tasks and store , else
  // Use tasks from db
  if (storedTasks !== null) {
    const previousTasksDisplayed = localStorage.getItem("taskSelection");
    if (tasksToDisplay !== previousTasksDisplayed) {
      await loadData(tasks);
      saveToDummyDb("tasks", tasksArr);
    }
  } else {
    await loadData(tasks);
    saveToDummyDb("tasks", tasksArr);
  }
  localStorage.setItem("taskSelection", tasksToDisplay);
};

// Render tasks from localStorage (dummy db "/GET")
const renderTasks = () => {
  tasksContainer.innerHTML = "";
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

getTasks();
renderTasks();

/* *************************** END OF COMMENT ***************** */

// Query all task_container class in tasks wrapper, also,
// Listen to individual click event if task is on the page
const tasksDOM = document.querySelectorAll("#tasks .task_container");
if (tasksDOM !== null) {
  tasksDOM.forEach((task) => {
    task.addEventListener("click", function (e) {
      let taskId;

      if (e.target !== this)
        taskId = e.target.parentNode.parentElement.dataset["id"];
      else taskId = e.target.dataset["id"];

      tasksArr = storedTasks.map((task) => {
        if (task.id === Number(taskId))
          return { ...task, checked: !task.checked };
        else return task;
      });

      // POST tasks to localStorage (dummy db "/Save")
      saveToDummyDb("tasks", tasksArr);
    });
  });
}

// For unit testing only!!!
const statusTestTask = async () => {
  const tasks = await fetchTasks();
  const tasksLength = tasks.length;
  const completedTasks = tasks.filter(({ completed }) => completed).length;
  const inCompletedTasks = tasks.filter(({ completed }) => !completed).length;
  return { tasksLength, completedTasks, inCompletedTasks };
};

const singleTestTask = async () => {
  const tasks = await fetchTasks();
  const task = await singleTask(tasks);
  return [task];
};
