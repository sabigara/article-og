import { IncomingMessage, ServerResponse } from "http";
import { parseRequest } from "./parser";
import { getScreenshot } from "./chromium";
import { ParsedRequest } from "./types";

const isDev = !process.env.AWS_REGION;
const isHtmlDebug = process.env.OG_HTML_DEBUG === "1";

export default async function handleRequest(
  req: IncomingMessage,
  res: ServerResponse,
  getHtml: (parsedReq: ParsedRequest) => string
) {
  try {
    const parsedReq = parseRequest(req);
    const html = getHtml(parsedReq);
    if (isHtmlDebug) {
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      return;
    }
    const { fileType } = parsedReq;
    const file = await getScreenshot(html, fileType, isDev);
    res.statusCode = 200;
    res.setHeader("Content-Type", `image/${fileType}`);
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
