import { Video, Media, getHtmlSource } from "../utils";

export default async function parseInstagram() {
  const data: Video[] = [];
  // Seems like getting the refreshed source page is not enough
  const htmlSource = await getHtmlSource();

  htmlSource
    .match(/(?<="(url)":")([^"]+?\.mp4[^"]+?)(?=")/g)
    ?.map((url) => url.replace(/\\u0025/g, "%").replace(/\//g, ""))
    .forEach((src) => data.push({ src, type: Media.mp4 }));

  return data;
}
