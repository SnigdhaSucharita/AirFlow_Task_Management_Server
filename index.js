let express = require("express");
let app = express();
let Port = 3000;
let cors = require("cors");

app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 }
];

function addTask(tasks, newTask) {
  tasks.push(newTask);
  return tasks;
}

app.get("/tasks/add", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let text = req.query.text;
  let priority = parseInt(req.query.priority);
  let newTask = { taskId, text, priority };
  let result = addTask(tasks, newTask);
  res.json({ tasks: result });
})

app.get("/tasks", (req, res) => {
  res.json({ tasks });
})

function sortTasksByPriorityAscending(task1, task2) {
  return task1.priority - task2.priority;
}

app.get("/tasks/sort-by-priority", (req, res) => {
  let sortedTasks = tasks.sort(sortTasksByPriorityAscending);
  res.json({ tasks: sortedTasks });
})

function updatePriority(tasks, taskId, newPriority) {
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].taskId === taskId) {
      tasks[i].priority = newPriority;
      break;
    }
  }
  return tasks;
}

app.get("/tasks/edit-priority", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let newPriority = parseInt(req.query.priority);
  let result = updatePriority(tasks, taskId, newPriority);
  res.json({ tasks: result });
})

function updateText(tasks, taskId, newText) {
  for(let i = 0; i < tasks.length; i++) {
    if(tasks[i].taskId === taskId) {
      tasks[i].text = newText;
      break;
    }
  }
  return tasks;
}

app.get("/tasks/edit-text", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let newText = req.query.text;
  let result = updateText(tasks, taskId, newText);
  res.json({ tasks: result });
})

function removeTask(tasks, taskId) {
  tasks = tasks.filter(task => task.taskId !== taskId);
  return tasks;
}

app.get("/tasks/delete", (req, res) => {
  let taskId = parseInt(req.query.taskId);
  let result = removeTask(tasks, taskId);
  res.json({ tasks: result });
})

app.get("/tasks/filter-by-priority", (req, res) => {
  let priority = parseInt(req.query.priority);
  let filteredTasks = tasks.filter(task => task.priority === priority);
  res.json({ tasks: filteredTasks });
})














app.listen(Port, () => {
  console.log("Server is running on https://localhost:" + Port);
})