import { Route, Routes } from "react-router";
import { MainPage } from "@/app/ui/main-page/main-page";
import { PlaylistsPage } from "@/features/playlists/ui/playlists-page";
import { TracksPage } from "@/features/tracks/ui/tracks-page";
import { ProfilePage } from "@/features/auth/ui/profile-page/profile-page";
import { PageNotFound } from "@/common/components";
import { Path } from "@/common/routing/path";

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.Playlists} element={<PlaylistsPage />} />
    <Route path={Path.Tracks} element={<TracksPage />} />
    <Route path={Path.Profile} element={<ProfilePage />} />
    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
);
