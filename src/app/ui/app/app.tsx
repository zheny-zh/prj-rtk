import { Header } from "@/common/components";
import { Routing } from "@/common/routing/routing";
import s from "./app.module.css";

export function App() {
  return (
    <>
      <Header />
      <div className={s.layout}>
        <Routing />
      </div>
    </>
  );
}
