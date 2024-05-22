import AddOrganizationForm from "@/components/AddOrganizationForm";
import { DataTable } from "@/components/ui/DataTable";
import { getOrganizations } from "@/data/firestore";
import { columns } from "./columns";

export default async function OrganizationsPage() {
  let organizations;
  try {
    organizations = await getOrganizations();
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col gap-2 items-start">
      <h1 className="text-xl">Organizations</h1>
      <AddOrganizationForm />
      {organizations ? (
        <DataTable columns={columns} data={organizations} />
      ) : (
        <p>Error loading organizations.</p>
      )}
    </section>
  );
}
