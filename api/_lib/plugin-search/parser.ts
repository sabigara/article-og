import { IncomingMessage } from "http";
import { parse } from "url";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { query } = parse(req.url || "/", true);
  const {
    productName,
    brandName,
    previousPrice,
    currentPrice,
    discountRate,
    storeName,
    storeColor,
    storeUrl,
  } = query || {};

  if (
    !productName ||
    !brandName ||
    !previousPrice ||
    !currentPrice ||
    !discountRate ||
    !storeName ||
    !storeColor ||
    !storeUrl
  ) {
    throw new Error("Invalid request");
  }

  const parsedRequest = {
    productName: decodeURIComponent(productName as string),
    brandName: decodeURIComponent(brandName as string),
    previousPrice: decodeURIComponent(previousPrice as string),
    currentPrice: decodeURIComponent(currentPrice as string),
    discountRate: decodeURIComponent(discountRate as string),
    storeName: decodeURIComponent(storeName as string),
    storeColor: decodeURIComponent(storeColor as string),
    storeUrl: decodeURIComponent(storeUrl as string),
  };
  return parsedRequest;
}
