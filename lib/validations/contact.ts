'use client';

import { z } from "zod";
import DOMPurify from 'isomorphic-dompurify';

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .transform(str => DOMPurify.sanitize(str.trim())),

  email: z
    .string()
    .email("Invalid email address")
    .min(5, "Email must be at least 5 characters")
    .max(100, "Email must be less than 100 characters")
    .transform(str => DOMPurify.sanitize(str.toLowerCase().trim())),

  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .transform(str => DOMPurify.sanitize(str.trim())),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
