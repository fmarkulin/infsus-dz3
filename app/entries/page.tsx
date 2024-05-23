import { DataTable } from "@/components/ui/DataTable";
import { getCategories, getEntries, getOrganizations } from "@/data/firestore";
import { columns } from "./columns";
import AddEntryDialog from "@/components/AddEntryDialog";

export default async function EntriesPage() {
  let entries;
  try {
    entries = await getEntries();
  } catch (error) {
    console.error(error);
  }

  let categories;
  try {
    categories = await getCategories();
  } catch (error) {
    console.error(error);
  }

  let organizations;
  try {
    organizations = await getOrganizations();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col gap-2 items-start">
      <h1 className="text-xl">Entries</h1>
      {entries && categories && organizations ? (
        <DataTable
          columns={columns}
          data={entries}
          columnFilter="title"
          AddComponent={
            <AddEntryDialog
              categories={categories}
              organizations={organizations}
            />
          }
        />
      ) : (
        <p>Error loading entries.</p>
      )}
    </section>
  );
}
