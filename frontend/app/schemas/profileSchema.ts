import { z } from "zod";

export const profileSchema = z.object({
  first_name: z
    .string()
    .min(1, "First Name is required")
    .max(100, "First Name cannot exceed 100 characters"),
  last_name: z
    .string()
    .max(100, "Last Name cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  dobDay: z.string().optional().or(z.literal("")),
  dobMonth: z.string().optional().or(z.literal("")),
  dobYear: z.string().optional().or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  address_line_1: z
    .string()
    .max(255, "Address Line 1 cannot exceed 255 characters")
    .optional()
    .or(z.literal("")),
  address_line_2: z
    .string()
    .max(255, "Address Line 2 cannot exceed 255 characters")
    .optional()
    .or(z.literal("")),
  bio: z
    .string()
    .max(500, "Bio must not exceed 500 characters")
    .optional()
    .or(z.literal("")),
  public_profile: z.boolean(),
});

export type ProfileFormValues = z.infer<typeof profileSchema>;
