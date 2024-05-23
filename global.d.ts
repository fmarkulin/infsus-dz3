import { string } from "zod";

declare type JournalCategory = {
  name: string;
  description: string;
};

declare type Organization = {
  id: string;
  name: string;
};

declare type JournalEntry = {
  id: string;
  attachments: string[];
  category: JournalCategory;
  content: string;
  createTimestamp: string;
  organization: Organization;
  perpetrators: string[];
  title: string;
  uid: string;
  witnesses: string[];
};
