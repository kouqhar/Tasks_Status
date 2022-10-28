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
    const { tasksLength, completedTasks, inCompletedTasks } =
      await statusTestTask();
    expect(completedTasks).toEqual(tasksLength - inCompletedTasks);
  });
  it("Uncompleted;", async function () {
    const { tasksLength, completedTasks, inCompletedTasks } =
      await statusTestTask();
    expect(inCompletedTasks).toEqual(tasksLength - completedTasks);
  });
});
