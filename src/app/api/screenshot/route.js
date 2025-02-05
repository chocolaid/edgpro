import puppeteer from 'puppeteer';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');


  if (!url) {
    return new Response('URL parameter is required', { status: 400 });
  }

  try {
    const browser = await puppeteer.launch({
      headless: 'new',
    });
    const page = await browser.newPage();
    
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 2,
    });

    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 100,
      fullPage: false,
    });

    await browser.close();

    return new Response(screenshot, {
      headers: {
        'Content-Type': 'image/jpeg',
      },
    });
  } catch (error) {
    return new Response('Error generating screenshot', { status: 500 });
  }
} 