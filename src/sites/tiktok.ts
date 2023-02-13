import { Video } from "@/Utils";

export default function parseTiktok() {
  document.querySelectorAll("video").forEach((video) => {
    fetch(video.currentSrc, { credentials: "include" })
      .then((r) => r.blob())
      .then((d) => {
        var url = window.URL.createObjectURL(d),
          anchor = document.createElement("a");
        anchor.href = url;
        anchor.download = document.location.pathname;
        anchor.click();

        window.URL.revokeObjectURL(url);
        document.removeChild(anchor);
      });
  });

  return [] as Video[];
}
