import { IncomingMessage, ServerResponse } from "http";
import { getScreenshot } from "./chromium";

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

export default async function handleRequest(
  _: IncomingMessage,
  res: ServerResponse,
  html: string
) {
  try {
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const file = await getScreenshot(html, "png", isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/png`);
    if (process.env.NODE_ENV === "production") {
      res.setHeader(
        "Cache-Control",
        `public, immutable, no-transform, s-maxage=31536000`
      );
    }
    res.end(file);
  } catch (e) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "text/html");
    res.end("<h1>Internal Error</h1><p>Sorry, there was a problem</p>");
    console.error(e);
  }
}
