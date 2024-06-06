import { NextApiRequest, NextApiResponse } from "next"
import { setCategory } from "@/data/firestore"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { name, description } = req.body

		// Save category to database
		await setCategory({ name, description })

		res.status(201).json({ message: "Category created" })
	} else {
		res.status(405).json({ error: "Method not allowed" })
	}
}
