import { NextApiRequest, NextApiResponse } from "next"
import { setEntry } from "@/data/firestore"
import dayjs from "dayjs"
import { JournalEntry } from "@/global"

export default async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === "POST") {
		const {
			title,
			category,
			content,
			organization,
			perpetrators,
			witnesses,
		} = req.body

		const data: Omit<JournalEntry, "category" | "organization"> & {
			category: string
			organization: string
		} = {
			attachments: [],
			title,
			category,
			content,
			organization,
			perpetrators,
			witnesses,
			id: "asdf1234",
			uid: "asdf1234",
			createTimestamp: dayjs().toISOString(),
		}

		// Save entry to database
		await setEntry(data)

		res.status(201).json({ message: "Entry created" })
	} else {
		res.status(405).json({ error: "Method not allowed" })
	}
}
