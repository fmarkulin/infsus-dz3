"use client"
import React, { useState } from "react"
import axios from "axios"

const StartProcess = () => {
	const [category, setCategory] = useState({ name: "", description: "" })
	const [organization, setOrganization] = useState({ name: "" })
	const [entry, setEntry] = useState({
		title: "",
		category: "",
		content: "",
		organization: "",
		perpetrators: "",
		witnesses: "",
	})

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	) => {
		const { name, value, dataset } = e.target
		const type = dataset.type

		if (type === "category") {
			setCategory({ ...category, [name]: value })
		} else if (type === "organization") {
			setOrganization({ ...organization, [name]: value })
		} else if (type === "entry") {
			setEntry({ ...entry, [name]: value })
		}
	}

	const startProcess = async () => {
		try {
			// Kreiranje kategorije
			await axios.post("/api/categories", category)
			alert("Category created")

			// Kreiranje organizacije
			await axios.post("/api/organizations", organization)
			alert("Organization created")

			// Kreiranje zapisa o mobbingu
			await axios.post("/api/entries", entry)
			alert("Entry created")

			// Pokretanje BPMN procesa
			const response = await axios.post("/api/start-process")
			alert("Process started: " + response.data.message)
		} catch (error) {
			console.error("There was an error starting the process!", error)
		}
	}

	return (
		<div>
			<h1>Start Mobbing Dnevnik Process</h1>

			<h2>Category</h2>
			<input
				type="text"
				name="name"
				placeholder="Category Name"
				value={category.name}
				data-type="category"
				onChange={handleInputChange}
			/>
			<textarea
				name="description"
				placeholder="Category Description"
				value={category.description}
				data-type="category"
				onChange={handleInputChange}
			/>

			<h2>Organization</h2>
			<input
				type="text"
				name="name"
				placeholder="Organization Name"
				value={organization.name}
				data-type="organization"
				onChange={handleInputChange}
			/>

			<h2>Entry</h2>
			<input
				type="text"
				name="title"
				placeholder="Entry Title"
				value={entry.title}
				data-type="entry"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="category"
				placeholder="Entry Category"
				value={entry.category}
				data-type="entry"
				onChange={handleInputChange}
			/>
			<textarea
				name="content"
				placeholder="Entry Content"
				value={entry.content}
				data-type="entry"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="organization"
				placeholder="Entry Organization"
				value={entry.organization}
				data-type="entry"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="perpetrators"
				placeholder="Perpetrators"
				value={entry.perpetrators}
				data-type="entry"
				onChange={handleInputChange}
			/>
			<input
				type="text"
				name="witnesses"
				placeholder="Witnesses"
				value={entry.witnesses}
				data-type="entry"
				onChange={handleInputChange}
			/>

			<button onClick={startProcess}>Start Process</button>
		</div>
	)
}

export default StartProcess
