# Flexxter Tasks

Fetches the list of tasks from a server and enable the user to check or uncheck these tasks.

## Installation

Run the following command to install dependencies after cloning the repo.

```
npm install
```

## Note

- To toggle between _single_[0] or _multiple_[1] tasks to display, in the file `assets/js/default.js` on line `__45__`.

```javascript
const tasksToDisplay = ["single", "multiple"][0]; // Single
const tasksToDisplay = ["single", "multiple"][1]; // Multiple
```

- To **TEST** our application using **jasmine**, **comment** out lines `__102__` and `__103__` both functions in the file path `assets/js/default.js`

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

1. **Database should respond with**
   a. a single task;
   b. multiple tasks;

2. **Get completed and uncompleted number of tasks-**
   a. Completed;
   b. Uncompleted;

- To **Run** our application **uncomment** lines `__102__` and `__103__` both functions in the file path `assets/js/default.js`

```javascript
getTasks();
renderTasks();
```

and open project with live server or `index.html`

### License

React is [MIT licensed](./LICENSE).
