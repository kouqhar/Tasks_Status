# Flexxter Tasks

Fetches the list of tasks from a server and enable the user to check or uncheck these tasks.

## Installation

Run the following command to install dependencies after cloning the repo.

```
npm install
```

## Note

- To toggle between **single**[0] or **multiple**[1] tasks, in the file `assets/js/default.js` on line **`45`**.

```javascript
const tasksToDisplay = ["single", "multiple"][0]; // Single
const tasksToDisplay = ["single", "multiple"][1]; // Multiple
```

- To **Run** our application **uncomment** lines **`102`** and **`103`** both functions in the file path `assets/js/default.js`

```javascript
getTasks();
renderTasks();
```

and open project with live server or `index.html`

- To **TEST** our application using **jasmine**, **comment** out lines **`102`** and **`103`** both functions in the file path `assets/js/default.js`

```javascript
/*
    getTasks();
    renderTasks();
*/
```

and navigate to the _project dir in the terminal_ and run the following code.

```javascript
npm run test
```

#### Test Cases

File path `spec/tasks.spec.js`

1. **Database should respond with** <br/>
   a. a single task; <br/>
   b. multiple tasks; <br/>

2. **Get completed and uncompleted number of tasks-** <br/>
   a. Completed; <br/>
   b. Uncompleted; <br/>

### License

Task_status is [MIT licensed](./LICENSE).
