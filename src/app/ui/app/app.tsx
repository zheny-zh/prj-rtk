import { ToastContainer } from "react-toastify";
import { Header, LinearProgress } from "@/common/components";
import { Routing } from "@/common/routing/routing";
import s from "./app.module.css";
import { useGlobalLoading } from "@/common/hooks";

export function App() {
  const globalLoading = useGlobalLoading();

  return (
    <>
      <Header />
      {globalLoading && <LinearProgress />}
      <div className={s.layout}>
        <Routing />
      </div>
      <ToastContainer />
    </>
  );
}
