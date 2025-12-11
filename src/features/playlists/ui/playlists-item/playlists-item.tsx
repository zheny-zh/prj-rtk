import type { PlaylistData } from "@/features/playlists/api/playlistsApi.types";
import { PlaylistCover } from "@/features/playlists/ui/playlists-item/playlist-cover/playlist-cover";
import { PlaylistDescription } from "@/features/playlists/ui/playlists-item/playlist-description/playlist-description";

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
    <>
      <PlaylistCover
        playlistId={playlist.id}
        images={playlist.attributes.images}
      />
      <PlaylistDescription attributes={playlist.attributes} />
      <button onClick={() => deleteHandler(playlist.id)}>delete</button>
      <button onClick={() => editHandler(playlist)}>update</button>
    </>
  );
};
