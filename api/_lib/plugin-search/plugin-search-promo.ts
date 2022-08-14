import { faviconUrl } from "../favicon-url";
import { parseRequest } from "./parser";

type GetCssParams = {
  storeColor: string;
};

function getCss({ storeColor }: GetCssParams) {
  return `
    body {
        height: 100vh;
        display: grid;
        place-items: center;
        margin: 0;
        padding: 0;
        background: #888;
    }

    .emoji {
        height: 1em;
        width: 1em;
        margin: 0 .05em 0 .1em;
        vertical-align: -0.1em;
    }

    .container {
        display: grid;
        place-items: center;
        box-sizing: border-box;
        width: 1200px;
        height: 630px;
        padding: 36px;
        background: white;
    }

    .card {
        font-family: 'Noto Sans JP', sans-serif;
        display: grid;
        grid-template-rows: auto auto 1fr auto;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
    
    .title {
        font-size: 28px;
        font-weight: bold;
        color: #777;
        padding-bottom: 20px;
    }

    .hooray {
        width: 32px;
        height: 32px;
        transform: translateY(2px);
    }

    .product {
        font-size: 62px;
        font-weight: bold;
        line-height: 1.2;
    }

    .product-name {
    }

    .brand-name {
        font-size: 0.5em;
        color: #777;
        white-space: nowrap;
    }


    .prices-container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 32px;
        place-self: center;
    }

    .prices {
        display: flex;
        flex-direction: column;
        font-weight: bold;
        text-align: end;
    }

    .previous-price {
        font-size: 36px;
    }

    .current-price {
        font-size: 68px;
        color: red;
    }

    .discount {
        font-size: 28px;
        padding: 0 28px;
        background-color: #FFD4D4;
        color: red;
        border: 2px solid #FF4848;
        border-radius: 9999px;
        font-weight: bold;
    }
    
    .footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .store {
        display: flex;
        align-items: center;
        font-size: 28px;
        font-weight: bold;
        padding: 6px 26px;
        background-color: ${storeColor};
        border-radius: 9999px;
        color: white;
        gap: 8px;
    }

    .store-favicon {
        width: 32px;
        height: 32px;
        border-radius: 9999px;
        transform: translateX(-8px);
    }

    .on-sale {
        font-size: 16px;
        margin-left: 2px;
        margin-top: 8px;
    }
    
    .logo {
        max-height: 60px;
    }
    `;
}

export function getPluginSearchPromoHtml(
  parsedReq: ReturnType<typeof parseRequest>
) {
  const {
    brandName,
    currentPrice,
    discountRate,
    previousPrice,
    productName,
    storeName,
    storeColor,
    storeUrl,
  } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
            ${getCss({ storeColor })}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="title">
                    <span>値下げを検知しました</span>
                    <img class="hooray" src="/plugin-search/hooray.png"/>
                </div>
                <div class="product">
                    <span class="product-name">${productName}</span>
                    <span class="brand-name">by ${brandName}</span>
                </div>
                <div class="prices-container">
                    <div class="prices">
                        <s class="previous-price">${previousPrice}</s>
                        <div class="current-price">${currentPrice}</div>
                    </div>
                    <div class="discount">
                        前日比 ${discountRate} % OFF！
                    </div>
                </div>
                <div class="footer">
                    <div class="store">
                        <img class="store-favicon" src="${faviconUrl(
                          storeUrl
                        )}"/>
                        <span>${storeName}</span>
                        <span class="on-sale">で販売中</span>
                    </div>
                    <img src="/plugin-search/logo.png" class="logo"/>
                </div>
            </div>
        </div>
    </body>
</html>`;
}
