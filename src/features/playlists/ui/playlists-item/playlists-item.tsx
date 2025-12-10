import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types";

type Props = {
  playlist: PlaylistData;
  deleteHandler: (id: string) => void;
  editHandler: (playlist: PlaylistData) => void;
};

export const PlaylistsItem = ({
  playlist,
  deleteHandler,
  editHandler,
}: Props) => {
  return (
    <div>
      <div>title: {playlist.attributes.title}</div>
      <div>description: {playlist.attributes.description}</div>
      <div>userName: {playlist.attributes.user.name}</div>
      <button onClick={() => deleteHandler(playlist.id)}>delete</button>
      <button onClick={() => editHandler(playlist)}>update</button>
    </div>
  );
};
