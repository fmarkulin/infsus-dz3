import { Client, logger, Variables } from "camunda-external-task-client-js"
import { checkCategoryName } from "@/data/categories"

// configuration for the Client:
//  - 'baseUrl': url to the Process Engine
//  - 'logger': utility to automatically log important events
const config = {
	baseUrl: "http://localhost:8080/engine-rest",
	use: logger,
}

// create a Client instance with custom configuration
const client = new Client(config)

client.subscribe("check_name", async function ({ task, taskService }) {
	const name = task.variables.get("name")
	const exists = await checkCategoryName(name)
	const unique = !exists
	console.log("Name is unique: ", unique)

	try {
		console.log("Setting uniqueName variable...")
		const processVariables = new Variables()
		processVariables.set("uniqueName", unique)

		console.log("Completing task with uniqueName variable...")
		await taskService.complete(task, processVariables)
		console.log("Task completed successfully.")
	} catch (error) {
		console.error("Failed to complete task:", error)
	}
})

client.subscribe("add_category", async function ({ task, taskService }) {
	const variables = task.variables.getAll()
	console.log("Add category task:")
	console.log("Received task: ", task)
	console.log("with variables: ", variables)
	// const caller_id = task.variables.get("name");
	// const outcome = handle_call_with_id(caller_id);
	// complete the task
	await taskService.complete(task)
})
