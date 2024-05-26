import { test, expect } from "@playwright/test"
import { formSchema } from "@/components/AddCategoryForm"

test.describe("validateCategoryForm", () => {
	const validData = {
		name: "Category",
		description: "Category description",
	}

	test("should validate valid data", async () => {
		const result = formSchema.safeParse(validData)
		expect(result.success).toBe(true)
	})

	test("should validate empty description", async () => {
		const result = formSchema.safeParse({
			...validData,
			description: "",
		})
		expect(result.success).toBe(true)
	})

	test("should invalidate empty name", async () => {
		const result = formSchema.safeParse({
			...validData,
			name: "",
		})
		expect(result.success).toBe(false)
	})
})
