// Number of tasks being fetched
describe("Database should respond with ", function () {
  it("a single task;", async function () {
    const fetchSingleTask = await singleTestTask();
    const taskLength = fetchSingleTask.length;
    expect(taskLength).toBe(1);
  });
  it("multiple tasks;", async function () {
    const fetchMultipleTasks = await multipleTasks();
    const tasksLength = fetchMultipleTasks.length;
    expect(tasksLength).toBeGreaterThan(1);
  });
});

// Get completed and uncompleted tasks
describe("Number of tasks - ", function () {
  it("Completed;", async function () {
    const { tasksLength, completedTasks, unCompletedTasks } =
      await statusTestTask();
    expect(completedTasks).toEqual(tasksLength - unCompletedTasks);
  });
  it("Uncompleted;", async function () {
    const { tasksLength, completedTasks, unCompletedTasks } =
      await statusTestTask();
    expect(unCompletedTasks).toEqual(tasksLength - completedTasks);
  });
});
