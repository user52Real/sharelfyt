import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import { withRateLimit  } from "@/lib/rate-limit";
import { cors } from '@/lib/cors'
import { APIError } from "@/lib/error-handling/api-error";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces")
    .transform((str) => str.trim()),
  email: z
    .string()
    .email("Invalid email address")
    .max(100, "Email must be less than 100 characters")
    .transform((str) => str.toLowerCase().trim()),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .transform((str) => str.trim()),
});

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  return withRateLimit(request, async () => {
    try {
      // Apply CORS
      const corsResponse = await cors(
        request,
        new NextResponse(),
        ['POST'],
        process.env.ALLOWED_ORIGINS?.split(',') ?? []
      )
      
      if (corsResponse) return corsResponse;

      const body = await request.json()
      const result = contactSchema.safeParse(body)

      if (!result.success) {
        throw APIError.BadRequest('Invalid input', result.error.flatten().fieldErrors);
      }

      const { name, email, message } = result.data

      const data = await resend.emails.send({
        from: 'ShareFlyt <no-reply@shareflyt.com>',
        to: [process.env.CONTACT_EMAIL!],
        subject: `New Contact Form Submission from ${name}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      })

      return NextResponse.json({ success: true, data })
    } catch (error) {
      throw APIError.Internal('Failed to send email');
    }
  })
}