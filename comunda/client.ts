import { Client, logger } from "camunda-external-task-client-js";

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
  baseUrl: "http://localhost:8080/engine-rest",
  use: logger,
};

// create a Client instance with custom configuration
const client = new Client(config);
client.subscribe("check_name", async function ({ task, taskService }) {
  const variables = task.variables.getAll();
  console.log("Received task: ", task);
  console.log("with variables: ", variables);
  // const caller_id = task.variables.get("name");
  // const outcome = handle_call_with_id(caller_id);
  // complete the task
  // await taskService.complete(task);
});
