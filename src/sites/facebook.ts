import { Video, Media } from "../utils";

export default function parseFacebook() {
  const data: Video[] = [];

  const htmlSource = document.getElementsByTagName("html")[0].innerHTML;

  htmlSource
    // FB splits its content, so it would be great if we could
    // merge them and provide a download link
    // .match(/(https?:\\\/\\\/[^"]*.mp4[^"]*)/g)
    .match(/(?<="(browser_native_hd_url|browser_native_sd_url)":")(.+?)(?=")/g)
    ?.map((url) => url.replace(/\\u0025/g, "%").replace(/\//g, ""))
    .forEach((src) => data.push({ src, type: Media.mp4 }));

  return data;
}
