import { NextRequest, NextResponse } from "next/server";
import { generateHTML } from "../utils/htmlTemplate";
import puppeteer from "puppeteer-core";
import Chromium from "chrome-aws-lambda";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const html = generateHTML(body);

  const browser = await puppeteer.launch({
    args: Chromium.args,
    executablePath: await Chromium.executablePath,
    headless: Chromium.headless,
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: "networkidle0" });

  const pdfBuffer = await page.pdf({ format: "a4" });
  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename=SaleDeed.pdf`,
    },
  });
}