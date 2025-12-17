import type { ChangeEvent } from "react";
import defaultCover from "@/app/assets/img/default-playlist-cover.png";
import {
  useDeletePlaylistCoverMutation,
  useUploadPlaylistCoverMutation,
} from "@/features/playlists/api/playlists-api";
import s from "./playlist-cover.module.css";
import type { Images } from "@/common/types";
import { errorToast } from "@/common/utils";

type Props = {
  playlistId: string;
  images: Images;
};

export const PlaylistCover = ({ playlistId, images }: Props) => {
  const [uploadPlaylistCover] = useUploadPlaylistCoverMutation();
  const [deletePlaylistCover] = useDeletePlaylistCoverMutation();

  const uploadCoverHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const maxSize = 1024 * 1024;
    const allowedTypes = ["image/jpeg", "image/png", "image/gif"];

    const file = event.target.files?.[0];
    if (!file) return;

    if (!allowedTypes.includes(file.type)) {
      errorToast("Неверный формат");
      return;
    }

    if (file.size > maxSize) {
      errorToast(
        `Файл превышает допустимый размер ${Math.round(maxSize / 1024)} KB`,
      );
    }

    uploadPlaylistCover({ playlistId, file });
  };

  const originImage = images.main.find((m) => m.type === "original");
  const srcUrl = originImage?.url ?? defaultCover;

  return (
    <>
      <img src={srcUrl} alt="cover" width="240px" className={s.cover} />
      <input type="file" onChange={uploadCoverHandler} accept="image/*" />
      {originImage && (
        <button onClick={() => deletePlaylistCover({ playlistId })}>
          удалить фото
        </button>
      )}
    </>
  );
};
