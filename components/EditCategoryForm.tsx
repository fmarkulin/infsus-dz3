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
import { categoryUpdate } from "@/lib/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { JournalCategory } from "@/global";

interface EditCategoryFormProps {
  closeRef?: React.RefObject<HTMLButtonElement>;
  category: JournalCategory;
}

const formSchema = z.object({
  description: z.string(),
});

export default function EditCategoryForm({
  closeRef,
  category,
}: EditCategoryFormProps) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      description: category.description,
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const updatePromise = categoryUpdate(category.name, values);
      toast.promise(updatePromise, {
        loading: "Updating category...",
        success: "Category updated!",
        error: "Failed to update category",
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
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
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
