import { DataTable } from "@/components/ui/DataTable";
import { getOrganizations } from "@/data/firestore";
import { columns } from "./columns";
import AddOrganizationDialog from "@/components/AddOrganizationDialog";

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
      {organizations ? (
        <DataTable
          columns={columns}
          data={organizations}
          columnFilter="name"
          AddComponent={<AddOrganizationDialog />}
        />
      ) : (
        <p>Error loading organizations.</p>
      )}
    </section>
  );
}
