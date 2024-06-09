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
import { categorySubmit } from "@/lib/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircle } from "lucide-react";
import { checkCategoryName } from "@/data/categories";

export const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string(),
});

export default function AddCategoryForm({
  closeRef,
}: {
  closeRef?: React.RefObject<HTMLButtonElement>;
}) {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const existing = await checkCategoryName(values.name);
      if (existing) {
        form.setError("name", {
          type: "manual",
          message: "Category name already exists",
        });
        return;
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      return;
    }

    try {
      const submitPromise = categorySubmit(values);
      toast.promise(submitPromise, {
        loading: "Adding category...",
        success: "Category added!",
        error: "Failed to add category",
      });
      await submitPromise;
      form.reset();
      closeRef?.current?.click();
      router.refresh();
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <Alert variant="default">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Category name</AlertTitle>
          <AlertDescription>
            Category name must be unique and cannot be changed later.
          </AlertDescription>
        </Alert>
        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
        <Button type="submit">Add Category</Button>
      </form>
    </Form>
  );
}
