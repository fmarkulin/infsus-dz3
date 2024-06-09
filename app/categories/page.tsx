import { DataTable } from "@/components/ui/DataTable";
import { columns } from "./columns";
import AddCategoryDialog from "@/components/AddCategoryDialog";
import { getCategories } from "@/data/categories";

export default async function CategoriesPage() {
  let categories;
  try {
    categories = await getCategories();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col gap-2 items-start">
      <h1 className="text-xl">Categories</h1>
      {categories ? (
        <DataTable
          columns={columns}
          data={categories}
          columnFilter="name"
          AddComponent={<AddCategoryDialog />}
        />
      ) : (
        <p>Error loading categories.</p>
      )}
    </section>
  );
}
