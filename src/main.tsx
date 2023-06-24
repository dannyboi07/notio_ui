import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./app/store.ts";
import App from "./App.tsx";
import "./index.css";
import { ToastProvider } from "@radix-ui/react-toast";
import Toast from "./components/Toast/Toast.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <Provider store={store}>
        <ToastProvider swipeDirection="right">
            <App />
            <Toast />
        </ToastProvider>
    </Provider>,
);
