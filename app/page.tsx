import { DataTable } from "@/components/ui/DataTable";
import { getTasks } from "@/lib/camunda";
import { columns } from "./columns";

export default async function Home() {
  let tasks;
  try {
    tasks = await getTasks();
    console.log(tasks);
    for (const task of tasks) {
      console.log(task.variables);
    }
  } catch (error) {
    console.error(error);
  }

  return (
    <section className="flex flex-col gap-2 items-start">
      <h1 className="text-xl">Task List</h1>
      {tasks ? (
        <DataTable columns={columns} data={tasks} columnFilter="name" />
      ) : (
        <p>Error loading categories.</p>
      )}
    </section>
  );
}
