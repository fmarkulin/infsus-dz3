"use server";

import { client } from "./client";

// subscribe to the topic: 'check_name'
client.subscribe("check_name", async function ({ task, taskService }) {
  const variables = task.variables.getAll();
  console.log("Received task: ", task);
  console.log("with variables: ", variables);
  // const caller_id = task.variables.get("name");
  // const outcome = handle_call_with_id(caller_id);
  // complete the task
  // await taskService.complete(task);
});
