"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { organizationSubmit, organizationUpdate } from "@/lib/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Organization } from "@/global";

interface EditOrganizationFormProps {
  closeRef?: React.RefObject<HTMLButtonElement>;
  organization: Organization;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
});

export default function EditOrganizationForm({
  closeRef,
  organization,
}: EditOrganizationFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: organization.name,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatePromise = organizationUpdate(organization.id, values);
      toast.promise(updatePromise, {
        loading: "Adding organization...",
        success: "Organization added!",
        error: "Failed to add organization",
      });
      await updatePromise;
      form.reset();
      closeRef?.current?.click();
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} className="w-[250px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit edit</Button>
      </form>
    </Form>
  );
}
