import { IncomingMessage, ServerResponse } from "http";
import { getArticleCardHtml } from "./_lib/templates/article-card";
import handleRequest from "./_lib/handle-request";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  await handleRequest(req, res, getArticleCardHtml);
}
