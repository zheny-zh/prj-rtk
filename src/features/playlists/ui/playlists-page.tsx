import {
  useDeletePlaylistsMutation,
  useFetchPlaylistsQuery,
} from "@/features/playlists/api/playlistsApi";
import s from "./playlists-page.module.css";
import { CreatePlaylistForm } from "@/features/playlists/ui/create-playlist-form";
import { useState } from "react";
import { useForm } from "react-hook-form";
import type {
  PlaylistData,
  UpdatePlaylistArgs,
} from "@/features/playlists/api/playlistsApi.types";
import { PlaylistsItem } from "@/features/playlists/ui/playlists-item/playlists-item";
import { EditPlaylistForm } from "@/features/playlists/ui/edit-playlist-form/edit-playlist-form";

export const PlaylistsPage = () => {
  const [playlistId, setPlaylistId] = useState<string | null>(null);
  const { register, handleSubmit, reset } = useForm<UpdatePlaylistArgs>();

  const { data } = useFetchPlaylistsQuery({});
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
    <div className={s.container}>
      <h1>Playlists page</h1>
      <CreatePlaylistForm />
      <div className={s.items}>
        {data?.data.map((playlist) => {
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
    </div>
  );
};
