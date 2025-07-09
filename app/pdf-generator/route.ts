import { NextRequest, NextResponse } from 'next/server';
import { generateHTML } from '../utils/htmlTemplate';
import puppeteer from 'puppeteer';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const html = generateHTML(body);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox'],
  });
  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4' });
  await browser.close();

  return new NextResponse(pdfBuffer, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="SaleDeed.pdf"',
    },
  });
}