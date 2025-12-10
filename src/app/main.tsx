import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { App } from "./ui/app/app.tsx";
import { Provider } from "react-redux";
import { store } from "@/app/model/store";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
);
