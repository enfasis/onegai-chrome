<p align="center">
    <img src="/public/icon.png" width="40" />
</p>
<h1 align="center">
Onegai
</h1>

Onegai is web scrapper to get video shareable-url's.

## Quick start

You can download it [here](https://chrome.google.com/webstore/detail/onegai/acbmjkomealeeegoigmkfebmgcmmgmgfk).

### Instruccions

1. Click on the extension icon or press `Ctrl+Shift+F`.
2. Wait for your videos to show or download.

## Development

This project only aims to retrieve shareable-url's, so every site must have a different file to parse urls.

1. Build the extension
```sh
pnpm build
```
2. Load the unpacked `/dist` in the `chrome://extensions` tab
