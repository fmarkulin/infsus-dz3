import client from "./client.js"
import axios from "axios"

// Simulirajte unos kategorije
client.subscribe("categoryTask", async ({ task, taskService }) => {
	console.log("Processing category task")

	// Pretpostavimo da su podaci poslani putem `task.variables`
	const categoryName = task.variables.get("name")
	const categoryDescription = task.variables.get("description")

	try {
		// Unos u bazu podataka ili neki servis
		await axios.post("http://localhost:3000/api/categories", {
			name: categoryName,
			description: categoryDescription,
		})
		await taskService.complete(task)
		console.log("Category task completed")
	} catch (error) {
		console.error("Error processing category task:", error)
	}
})

// Simulirajte unos organizacije
client.subscribe("organizationTask", async ({ task, taskService }) => {
	console.log("Processing organization task")

	// Pretpostavimo da su podaci poslani putem `task.variables`
	const organizationName = task.variables.get("name")

	try {
		// Unos u bazu podataka ili neki servis
		await axios.post("http://localhost:3000/api/organizations", {
			name: organizationName,
		})
		await taskService.complete(task)
		console.log("Organization task completed")
	} catch (error) {
		console.error("Error processing organization task:", error)
	}
})

// Simulirajte unos zapisa o mobbingu
client.subscribe("entryTask", async ({ task, taskService }) => {
	console.log("Processing entry task")

	// Pretpostavimo da su podaci poslani putem `task.variables`
	const title = task.variables.get("title")
	const category = task.variables.get("category")
	const content = task.variables.get("content")
	const organization = task.variables.get("organization")
	const perpetrators = task.variables.get("perpetrators")
	const witnesses = task.variables.get("witnesses")

	try {
		// Unos u bazu podataka ili neki servis
		await axios.post("http://localhost:3000/api/entries", {
			title,
			category,
			content,
			organization,
			perpetrators,
			witnesses,
		})
		await taskService.complete(task)
		console.log("Entry task completed")
	} catch (error) {
		console.error("Error processing entry task:", error)
	}
})
