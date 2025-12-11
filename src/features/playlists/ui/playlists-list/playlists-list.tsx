import { EditPlaylistForm } from "@/features/playlists/ui/edit-playlist-form/edit-playlist-form";
import { PlaylistsItem } from "@/features/playlists/ui/playlists-item/playlists-item";
import { useForm } from "react-hook-form";
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types";
import { useState } from "react";
import { useDeletePlaylistsMutation } from "@/features/playlists/api/playlistsApi";
import s from "./playlists-list.module.css";

type Props = {
  playlists: PlaylistData[];
  isPlaylistLoading: boolean;
};

export const PlaylistsList = ({ playlists, isPlaylistLoading }: Props) => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);

  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const [deletePlaylist] = useDeletePlaylistsMutation();

  const deletePlaylistHandler = (playlistId: string) => {
    if (confirm("Are you sure you want to delete the playlist?")) {
      deletePlaylist(playlistId);
    }
  };

  const editPlaylistHandler = (playlist: PlaylistData | null) => {
    if (playlist) {
      setPlaylistId(playlist.id);
      reset({
        title: playlist.attributes.title,
        description: playlist.attributes.description,
        tagIds: playlist.attributes.tags.map((t) => t.id),
      });
    } else {
      setPlaylistId(null);
    }
  };

  return (
    <div className={s.items}>
      {!playlists.length && !isPlaylistLoading && <h2>Playlists not found</h2>}
      {playlists.map((playlist) => {
        const isEditing = playlistId === playlist.id;

        return (
          <div className={s.item} key={playlist.id}>
            {isEditing ? (
              <EditPlaylistForm
                playlistId={playlistId}
                setPlaylistId={setPlaylistId}
                editPlaylist={editPlaylistHandler}
                register={register}
                handleSubmit={handleSubmit}
              />
            ) : (
              <PlaylistsItem
                playlist={playlist}
                deleteHandler={deletePlaylistHandler}
                editHandler={editPlaylistHandler}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
