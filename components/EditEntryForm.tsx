"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { entrySubmit } from "@/lib/server";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { JournalCategory, JournalEntry, Organization } from "@/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";
import { setEntryImg } from "@/data/storage";

// max 5MB
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export default function EditEntryForm({
  closeRef,
  categories,
  organizations,
  entry,
}: {
  closeRef?: React.RefObject<HTMLButtonElement>;
  categories: JournalCategory[];
  organizations: Organization[];
  entry: JournalEntry;
}) {
  const router = useRouter();

  const formSchema = z.object({
    attachments: z
      .instanceof(FileList)
      .refine((files) => {
        for (let i = 0; i < files.length; i++) {
          console.log(i, files[i]);
          if (!ACCEPTED_IMAGE_TYPES.includes(files[i].type)) return false;
        }
        return true;
      }, "Must be a valid image.")
      .refine((files) => {
        for (let i = 0; i < files.length; i++) {
          if (files[i].size > MAX_FILE_SIZE) return false;
        }
        return true;
      }, `File size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`)
      .optional(),
    title: z.string().min(1, "Title is required"),
    category: z.string().refine((v) => categories.find((c) => c.name === v), {
      message: "Invalid category",
    }),
    content: z.string().min(1, "Content is required"),
    organization: z
      .string()
      .refine((v) => organizations.find((o) => o.id === v), {
        message: "Invalid organization",
      }),
    perpetrators: z
      .string()
      .refine(
        (v) =>
          !v.includes(",") ||
          v.split(",").every((name) => name.trim().length > 0),
        {
          message: "Invalid name(s)",
        }
      )
      .optional(),
    witnesses: z
      .string()
      .refine(
        (v) =>
          !v.includes(",") ||
          v.split(",").every((name) => name.trim().length > 0),
        {
          message: "Invalid name(s)",
        }
      )
      .optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      attachments: undefined,
      title: entry.title,
      category: entry.category.name,
      content: entry.content,
      organization: entry.organization.id,
      perpetrators: entry.perpetrators.join(", "),
      witnesses: entry.witnesses.join(", "),
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const attachments: string[] = [];
    if (values.attachments) {
      const uploadToast = toast.loading("Uploading images...");
      for (let i = 0; i < values.attachments.length; i++) {
        const file = values.attachments[i];
        try {
          const attachmentUrl = await setEntryImg(entry.id, file);
          attachments.push(attachmentUrl);
        } catch (error) {
          console.error(error);
          toast.dismiss(uploadToast);
          toast.error("Failed to upload images");
          return;
        }
      }
      toast.success("Images uploaded!", { id: uploadToast });
    }

    const newEntry: Omit<JournalEntry, "category" | "organization"> & {
      category: string;
      organization: string;
    } = {
      ...values,
      attachments: Array.from(new Set([...entry.attachments, ...attachments])),
      id: entry.id,
      uid: entry.uid,
      createTimestamp: entry.createTimestamp,
      perpetrators: values.perpetrators
        ? values.perpetrators.split(",").map((v) => v.trim())
        : [],
      witnesses: values.witnesses
        ? values.witnesses.split(",").map((v) => v.trim())
        : [],
    };

    try {
      const submitPromise = entrySubmit(newEntry);
      toast.promise(submitPromise, {
        loading: "Updating entry...",
        success: "Entry updated!",
        error: "Failed to update entry",
      });
      await submitPromise;
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
          name="attachments"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Attachments</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => {
                    field.onChange(e.target.files);
                  }}
                  accept={ACCEPTED_IMAGE_TYPES.join(", ")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input {...field} className="w-[250px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="category"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.name} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="content"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="organization"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Organization</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select organization" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {organizations.map((organization) => (
                    <SelectItem key={organization.id} value={organization.id}>
                      {organization.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="perpetrators"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perpetrators</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Separate multiple names with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="witnesses"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Witnesses</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                Separate multiple names with commas
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Edit Entry</Button>
      </form>
    </Form>
  );
}
