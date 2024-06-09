"use server";

import axios from "axios";

export const getTasks = async () => {
  const response = await axios.get("http://localhost:8080/engine-rest/task");
  const tasksWithoutVariables = response.data;
  const tasks = [];
  for (const task of tasksWithoutVariables) {
    const variablesResponse = await axios.get(
      `http://localhost:8080/engine-rest/task/${task.id}/form-variables`
    );
    const variables = variablesResponse.data;
    tasks.push({ ...task, variables });
  }
  return tasks;
};
