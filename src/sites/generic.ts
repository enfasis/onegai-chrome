import { Video, Media } from "../utils";

export default function parseGenericSite() {
  let data: Video[] = [];

  document.querySelectorAll("video").forEach((video) =>
    data.push({
      src: video.currentSrc,
      type: Media.mp4,
    })
  );

  return data;
}
