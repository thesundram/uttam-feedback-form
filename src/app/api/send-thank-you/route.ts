import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";
import dns from "dns";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body || typeof body !== "object" || Array.isArray(body)) {
      return NextResponse.json({ error: "Please provide valid email details." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim().slice(0, 100) : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    if (!name) return NextResponse.json({ error: "Name is required." }, { status: 400 });
    if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Please provide a valid email address." }, { status: 400 });
    }

    const host = process.env.SMTP_HOST;
    const username = process.env.SMTP_USER;
    const password = process.env.SMTP_PASS;
    const senderEmail = process.env.SMTP_FROM_EMAIL || username || "";
    const port = Number(process.env.SMTP_PORT || 587);
    const secureSetting = process.env.SMTP_SECURE?.toLowerCase();
    const missingSettings = [
      !host && "SMTP_HOST",
      !username && "SMTP_USER",
      !password && "SMTP_PASS",
      !senderEmail && "SMTP_FROM_EMAIL or SMTP_USER",
    ].filter((setting): setting is string => Boolean(setting));
    if (missingSettings.length || !Number.isInteger(port) || port < 1 || port > 65535) {
      console.error("Thank-you email was not sent because SMTP settings are missing or invalid.", {
        missingSettings,
        invalidPort: !Number.isInteger(port) || port < 1 || port > 65535,
      });
      return NextResponse.json({ emailSent: false });
    }
    if (secureSetting && secureSetting !== "true" && secureSetting !== "false") {
      console.error("Thank-you email was not sent because SMTP_SECURE must be true or false.");
      return NextResponse.json({ emailSent: false });
    }

    if (!host || !username || !password || !senderEmail) {
      return NextResponse.json({ emailSent: false });
    }

    let resolvedHost: string = host;
    try {
      const lookupResult = await dns.promises.lookup(host);
      if (lookupResult?.address) {
        resolvedHost = lookupResult.address;
      }
    } catch {
      // Fallback to original host string if lookup fails
    }

    const transporter = nodemailer.createTransport({
      host: resolvedHost,
      port,
      secure: secureSetting ? secureSetting === "true" : port === 465,
      auth: { user: username, pass: password },
      tls: {
        servername: host,
      },
      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 15000,
    });

    const logoPath = path.join(process.cwd(), "public", "UttamLogo.png");
    const attachments = fs.existsSync(logoPath)
      ? [
        {
          filename: "UttamLogo.png",
          path: logoPath,
          cid: "uttamLogo",
        },
      ]
      : [];

    await transporter.sendMail({
      from: { name: "Uttam Galva Innovative Solutions", address: senderEmail },
      to: email,
      subject: "Thank you for sharing your feedback",
      text: `Hello ${name},\n\nThank you for visiting Uttam Galva Innovative Solutions at Steel Construction Expo Asia 2026 (Stall 608) and sharing your feedback. We appreciate your time and insights.\n\nWarm regards,\nUttam Galva Innovative Solutions Pvt Ltd Team\nhttps://uttamgalvainnovativesolutions.ai`,
      attachments,
      html: `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#10233f">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0">Thank you for visiting Uttam Galva Innovative Solutions at Steel Construction Expo Asia 2026.</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f1f5f9;padding:32px 12px">
      <tr><td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;width:100%;background:#fff;border-radius:16px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08)">
          <tr><td align="center" style="background:linear-gradient(135deg, #071a35 0%, #0d2854 100%);padding:26px 24px;border-bottom:3px solid #ffc928;text-align:center">
            <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin:0 auto;text-align:left">
              <tr>
                <td style="vertical-align:middle;padding-right:14px">
                  <div style="width:48px;height:48px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,201,40,0.35);border-radius:10px;text-align:center;line-height:48px">
                    <img src="cid:uttamLogo" alt="Uttam Galva Logo" width="36" height="36" style="display:inline-block;vertical-align:middle;width:36px;height:36px;object-fit:contain;border:0" />
                  </div>
                </td>
                <td style="vertical-align:middle">
                  <div style="color:#ffffff;font-size:18px;font-weight:800;letter-spacing:0.5px;line-height:1.2;font-family:Arial,Helvetica,sans-serif">Uttam Galva Innovative Solutions</div>
                  <div style="margin-top:5px;color:#ffc928;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;font-family:Arial,Helvetica,sans-serif">Steel Construction Expo Asia 2026</div>
                </td>
              </tr>
            </table>
          </td></tr>
          <tr><td style="padding:36px 32px">
            <p style="margin:0 0 12px;color:#a36b00;font-size:12px;font-weight:bold;letter-spacing:1.5px">THANK YOU</p>
            <h1 style="margin:0 0 18px;color:#10233f;font-size:26px;line-height:1.25">Thank you, ${escapeHtml(name)}.</h1>
            <p style="margin:0;color:#475569;font-size:16px;line-height:1.7">Thank you for visiting our stall (Stall 608) and sharing your feedback. Your time and insights help us keep building smarter steel solutions.</p>
            <div style="margin-top:28px;padding:18px 20px;border-left:4px solid #ffc928;background:#f8fafc;border-radius:0 8px 8px 0">
              <p style="margin:0;color:#10233f;font-size:14px;font-weight:bold">Engineering Steel Intelligence.</p>
              <p style="margin:6px 0 0;color:#64748b;font-size:13px;line-height:1.6">We appreciate you being part of the conversation.</p>
            </div>
          </td></tr>
          <tr><td align="center" style="background:#071a35;padding:26px 32px;color:#b9c5d5;font-size:12px;line-height:1.6;border-top:1px solid rgba(255,255,255,0.08);text-align:center">
            <p style="margin:0;color:#ffffff;font-size:14px;font-weight:bold;letter-spacing:0.5px">Uttam Galva Innovative Solutions Pvt Ltd</p>
            <p style="margin:4px 0 0;color:#ffc928;font-size:11px;font-weight:bold;letter-spacing:1px;text-transform:uppercase">Steel Construction Expo Asia 2026 · Stall 608 · Mumbai</p>
            <p style="margin:10px 0 0;color:#94a3b8;font-size:12px">
              <strong style="color:#ffffff">Email:</strong> <a href="mailto:connect@uttamgalva.in" style="color:#dbe5f1;text-decoration:none">connect@uttamgalva.in</a>
            </p>
            <div style="margin:14px auto 0;height:1px;width:100px;background:rgba(255,255,255,0.12)"></div>
            <p style="margin:14px 0 0;color:#64748b;font-size:11px;line-height:1.6">
              © 2026 <a href="https://uttamgalvainnovativesolutions.ai" target="_blank" rel="noopener noreferrer" style="color:#ffc928;text-decoration:none;font-weight:bold">Uttam Galva Innovative Solutions Pvt Ltd</a>. Engineering Steel Intelligence. All rights reserved.
            </p>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </body>
</html>`,
    });

    return NextResponse.json({ emailSent: true });
  } catch (mailError) {
    const details = mailError instanceof Error
      ? {
        message: mailError.message,
        code: "code" in mailError && typeof mailError.code === "string" ? mailError.code : undefined,
        responseCode: "responseCode" in mailError && typeof mailError.responseCode === "number" ? mailError.responseCode : undefined,
        command: "command" in mailError && typeof mailError.command === "string" ? mailError.command : undefined,
      }
      : { message: String(mailError) };
    const safeMessage = details.message
      .split(process.env.SMTP_PASS || "\u0000").join("[redacted]")
      .split(process.env.SMTP_USER || "\u0000").join("[redacted]");
    console.error("Thank-you email delivery failed.", { ...details, message: safeMessage });
    return NextResponse.json({ emailSent: false });
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character];
  });
}
