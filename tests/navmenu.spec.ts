import { test, expect } from "@playwright/test"

test.describe("NavMenu", () => {
	test.beforeEach(async ({ page }) => {
		await page.goto("/")
	})

	test("should render NavMenu links correctly", async ({ page }) => {
		// Check for the presence of the entries link
		const entriesLink = page.locator("text=Entries")
		await expect(entriesLink).toBeVisible()

		// Check for the presence of the categories link
		const categoriesLink = page.locator("text=Categories")
		await expect(categoriesLink).toBeVisible()

		// Check for the presence of the organizations link
		const organizationsLink = page.locator("text=Organizations")
		await expect(organizationsLink).toBeVisible()
	})
})
