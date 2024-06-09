import { Client, logger, Variables } from "camunda-external-task-client-js"
import { checkCategoryName, setCategory } from "@/data/categories"

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

	try {
		console.log("Setting uniqueName variable...")
		const processVariables = new Variables()
		processVariables.set("uniqueName", unique)
		console.log("uniqueName set to: ", unique)
		await taskService.complete(task, processVariables)
		console.log("Task completed successfully.")
	} catch (error) {
		console.error("Failed to complete task:", error)
	}
})

client.subscribe("add_category", async function ({ task, taskService }) {
	const name = task.variables.get("name")
	const description = task.variables.get("description")
	const category = { name, description }

	try {
		console.log("Setting category...")
		await setCategory(category)
		console.log("Category added successfully.")
		await taskService.complete(task)
		console.log("Task completed successfully.")
	} catch (error) {
		console.error("Failed to complete task:", error)
	}
})
