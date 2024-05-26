import { test, expect } from "@playwright/test"

test.describe("Full Flow Test", () => {
	const organization = {
		name: `Test Organization ${Date.now()}`,
	}

	const category = {
		name: `Test Category ${Date.now()}`,
		description: `Test description`,
	}

	const entry = {
		title: `Test Entry ${Date.now()}`,
		category: category.name,
		content: `Test content`,
		organization: organization.name,
		perpetrators: `Perpetrator ${new Date().getMinutes()}. Perpetrator ${
			new Date().getMinutes() + 1
		}`,
		witnesses: `Witness ${new Date().getHours()}, Witness ${
			new Date().getHours() + 1
		}`,
	}

	test("should create and verify organization, category, and entry", async ({
		page,
	}) => {
		// Create and verify organization
		await page.goto("/organizations")
		await page.click("button:has(svg.lucide-plus)")
		await page.fill('input[name="name"]', organization.name)
		await page.click('button[type="submit"]')
		await expect(page.locator(`text=${organization.name}`)).toBeVisible()

		// Create and verify category
		await page.goto("/categories")
		await page.click("button:has(svg.lucide-plus)")
		await page.fill('input[name="name"]', category.name)
		await page.fill('input[name="description"]', category.description)
		await page.click('button[type="submit"]')
		await expect(page.locator(`text=${category.name}`)).toBeVisible()

		// Create and verify entry
		await page.goto("/entries")
		await page.click("button:has(svg.lucide-plus)")
		await page.fill('input[name="title"]', entry.title)

		await page.locator("select").first().selectOption({
			label: category.name,
		})

		await page.fill('textarea[name="content"]', entry.content)

		await page.locator("select").last().selectOption({
			label: organization.name,
		})

		await page.fill('input[name="perpetrators"]', entry.perpetrators)
		await page.fill('input[name="witnesses"]', entry.witnesses)
		await page.click('button[type="submit"]')
		await expect(page.locator(`text=${entry.title}`)).toBeVisible()

		// Clean up by deleting the created entry
		const entryRow = page.locator(`tr:has-text("${entry.title}")`)
		await entryRow.locator("button:has(svg.lucide-trash)").click()
		await expect(entryRow).not.toBeVisible()

		// Clean up by deleting the created category
		await page.goto("/categories")
		const categoryRow = page.locator(`tr:has-text("${category.name}")`)
		await categoryRow.locator("button:has(svg.lucide-trash)").click()
		await expect(categoryRow).not.toBeVisible()

		// Clean up by deleting the created organization
		await page.goto("/organizations")
		const organizationRow = page.locator(
			`tr:has-text("${organization.name}")`
		)
		await organizationRow.locator("button:has(svg.lucide-trash)").click()
		await expect(organizationRow).not.toBeVisible()
	})
})
