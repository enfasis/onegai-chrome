import { Video, Media } from "@/Utils";

type TwitterVariant = {
  bitrate: number;
  content_type: string;
  url: string;
};

export default async function parseTwitter(): Promise<Video[]> {
  // Needs review for auth_token

  const video_id = [
    ...document.location.pathname.matchAll(/status\/(\d+)/g),
  ][0][1];

  const params = new URLSearchParams({
    cards_platform: "Web-12",
    include_cards: "1",
    include_reply_count: "1",
    include_user_entities: "0",
    tweet_mode: "extended",
  });

  return fetch(
    `https://api.twitter.com/1.1/statuses/show/${video_id}.json?${params.toString()}`,
    {
      headers: {
        Authorization:
          "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA", // Public Token I guess
      },
    }
  )
    .then((r) => r.json())
    .then(({ extended_entities: { media } }) => {
      const {
        video_info: { variants },
      } = media[0];

      const max = (variants as TwitterVariant[])
        .filter((v) => v.content_type === "video/mp4")
        .reduce((prev, current) =>
          prev.bitrate > current.bitrate ? prev : current
        );

      return [
        {
          src: max.url,
          type: Media.mp4,
        },
      ];
    });
}
