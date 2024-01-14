import { Video, extractUrl } from "./utils";

import parseGeneric from "./sites/generic";
import parseFacebook from "./sites/facebook";
import parseTiktok from "./sites/tiktok";
import parseTwitter from "./sites/twitter";
import parseInstagram from "./sites/instagram";

const SITE_PARSER = {
  "www.facebook.com": parseFacebook,
  "www.tiktok.com": parseTiktok,
  "twitter.com": parseTwitter,
  "www.instagram.com": parseInstagram,
};

type Site = keyof typeof SITE_PARSER;

const isSite = (url: string): url is Site => url in SITE_PARSER;

const getParser = (
  tab: chrome.tabs.Tab
): (() => Video[] | Promise<Video[]>) => {
  const url = extractUrl(tab.url);
  return isSite(url) ? SITE_PARSER[url] : parseGeneric;
};

export { getParser, Site };
