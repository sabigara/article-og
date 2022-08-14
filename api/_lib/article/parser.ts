import { IncomingMessage } from "http";
import { parse } from "url";
import { ParsedRequest } from "../types";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { query } = parse(req.url || "/", true);
  const { text, author, logo, service } = query || {};

  const parsedRequest: ParsedRequest = {
    text: !!text ? decodeURIComponent(text as string) : undefined,
    author: !!author ? (author as string) : undefined,
    logo: !!logo ? (logo as string) : undefined,
    service: !!service ? (service as string) : undefined,
  };
  return parsedRequest;
}
