import { sanitizeHtml } from "./sanitizer";
import { ParsedRequest } from "./types";
const twemoji = require("twemoji");
const twOptions = { folder: "svg", ext: ".svg" };
const emojify = (text: string) => twemoji.parse(text, twOptions);

function getCss() {
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
        padding: 62px;
        background: white;
    }

    .card {
        font-family: 'Noto Sans JP', sans-serif;
        display: flex;
        flex-direction: column;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        border: solid 2px #aaa;
        border-radius: 12px;
        padding: 24px;
        color: #222;
    }
    
    .title {
        display: grid;
        place-content: center;
        flex: 1;
        font-size: ${60}px;
        font-weight: bold;
        line-height: 1.4;
    }
    
    .footer {
        display: flex;
        align-items: center;
    }

    .author {
        flex: 1;
        font-weight: semibold;
        font-size: 28px;
    }
    
    .service {
        display: flex;
        gap: 8px;
        align-items: center;
        font-weight: bold;
        font-size: 36px;
    }

    .logo {
        max-height: 36px;
    }
    `;
}

export function getHtml(parsedReq: ParsedRequest) {
  const { text, author, logo, service } = parsedReq;
  return `<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Generated Image</title>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&display=swap" rel="stylesheet">
        <style>
            ${getCss()}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="title">${emojify(sanitizeHtml(text))}</div>
                <div class="footer">
                    <div class="author">${author ? author : ""}</div>
                    ${
                      service && logo
                        ? `
                    <div class="service">
                        <img src="${logo}" class="logo"/>
                        <span>${service}</span>
                    </div>
                    `
                        : ""
                    }
                </div>
            </div>
        </div>
    </body>
</html>`;
}
