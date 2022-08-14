import { IncomingMessage, ServerResponse } from "http";
import { getArticleCardHtml } from "../_lib/article/card";
import handleRequest from "../_lib/handle-request";
import { parseRequest } from "../_lib/article/parser";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const html = getArticleCardHtml(parseRequest(req));
  await handleRequest(req, res, html);
}
