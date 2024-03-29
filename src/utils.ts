export const enum Media {
  mp4 = "video/mp4",
}

export type Video = {
  src: string;
  type: Media;
};

export const extractUrl = (url: string | undefined | null) =>
  url?.match(/(?<=\/\/)(.*?)(?=\/)/g)?.[0] || "";

export function createVideoElement({
  type,
  src,
}: {
  type: Media;
  src: string;
}) {
  const element = Object.assign(document.createElement("video"), {
    src,
    type,
    controls: true,
    loop: true,
    autoplay: false,
    crossOriginIsolated: true,
  });

  element.addEventListener("click", () => navigator.clipboard.writeText(src));

  return element;
}

export async function getHtmlSource(reload: boolean = false): Promise<string> {
  if (reload)
    return fetch(document.URL, { credentials: "include" }).then((r) =>
      r.text()
    );
  return new Promise((r) =>
    r(document.getElementsByTagName("html")[0].innerHTML)
  );
}
