import { Link, NavLink } from "react-router";
import s from "./header.module.css";
import { Path } from "@/common/routing/path";
import { useGetMeQuery, useLogoutMutation } from "@/features/auth/api/auth-api";
import { Login } from "@/features/auth/ui/login/login";

const navItems = [
  { to: Path.Main, label: "Main" },
  { to: Path.Playlists, label: "Playlists" },
  { to: Path.Tracks, label: "Tracks" },
];

export const Header = () => {
  const { data, isLoading } = useGetMeQuery();
  const [logout] = useLogoutMutation();

  return (
    <header className={s.container}>
      <nav>
        <ul className={s.list}>
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `link ${isActive ? s.activeLink : ""}`
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className={s.loginContainer}>
        {isLoading && <div>Загружаем...</div>}
        {data && (
          <>
            <Link to={Path.Profile}>{data.login}</Link>
            <button onClick={() => logout()}>logout</button>
          </>
        )}
      </div>

      {!data && !isLoading && <Login />}
    </header>
  );
};
