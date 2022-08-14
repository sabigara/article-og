import { IncomingMessage, ServerResponse } from "http";
import { getPluginSearchPromoHtml } from "../_lib/plugin-search/plugin-search-promo";
import handleRequest from "../_lib/handle-request";
import { parseRequest } from "../_lib/plugin-search/parser";

export default async function handler(
  req: IncomingMessage,
  res: ServerResponse
) {
  const html = getPluginSearchPromoHtml(parseRequest(req));
  await handleRequest(req, res, html);
}
