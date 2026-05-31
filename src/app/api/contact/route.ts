import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if email configuration exists
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      return NextResponse.json(
        { 
          error: "Email configuration missing", 
          details: "EMAIL_USER and EMAIL_PASS environment variables are not set." 
        }, 
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.EMAIL_PORT) || 465,
      secure: process.env.EMAIL_SECURE !== "false", // default to true (SSL)
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"${name}" <${process.env.EMAIL_USER}>`,
      to: process.env.RECEIVER_EMAIL || process.env.EMAIL_USER,
      subject: `Portfolio Inquiry: Message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h2 style="color: #2563eb; border-bottom: 1px solid #eee; padding-bottom: 10px;">New Portfolio Inquiry</h2>
          <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
          <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
          <div style="margin-top: 20px; padding: 15px; background: #f9f9f9; border-radius: 5px; color: #444;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #9ca3af;">This message was sent from your portfolio contact form.</p>
        </div>
      `,
      replyTo: email,
    };

    return NextResponse.json({ success: true, message: "Email sent successfully" });
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Contact API error:", err);
    return NextResponse.json(
      { error: "Failed to send email", details: err.message }, 
      { status: 500 }
    );
  }
}
