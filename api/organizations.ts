import { NextApiRequest, NextApiResponse } from "next"
import { addOrganization } from "@/data/firestore"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const { name } = req.body

		// Save organization to database
		await addOrganization({ name })

		res.status(201).json({ message: "Organization created" })
	} else {
		res.status(405).json({ error: "Method not allowed" })
	}
}
