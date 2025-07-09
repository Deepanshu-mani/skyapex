import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";
import { generateHTML } from "../utils/htmlTemplate";

export async function POST(req: NextRequest) {
    const body = await req.json();
    const html = generateHTML(body);

    const browser = await puppeteer.launch({
        headless : true,
        args: ['--no-sandbox'],
    });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    
    const pdfBuffer = await page.pdf({format: 'A4'});
    await browser.close();

    return new NextResponse(pdfBuffer, {
        headers: {
            'Content-Type': 'application/pdf',
            'Content-Dispostion' : 'attachment; filename="SaleDeed.pdf"',
        }
    });

}