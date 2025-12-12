import type { TrackData } from "@/features/tracks/api/tracks-api.types";
import s from "./tracks-list.module.css";

type Props = {
  track: TrackData[];
};

export const TracksList = ({ track }: Props) => (
  <div className={s.list}>
    {track.map((track) => {
      const { title, user, attachments } = track.attributes;

      return (
        <div key={track.id} className={s.item}>
          <div>
            <p>Title: {title}</p>
            <p>Name: {user.name}</p>
          </div>
          {attachments.length ? (
            <audio controls src={attachments[0].url} />
          ) : (
            "нет файла"
          )}
        </div>
      );
    })}
  </div>
);
