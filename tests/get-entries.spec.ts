import { getEntries } from "@/data/firestore"
import { test, expect } from "@playwright/test"

test.describe("getEntries", () => {
	test("should get all entries", async () => {
		const entries = await getEntries()
		expect(entries.length).toBeGreaterThan(0)
		console.log(entries)
	})
})
