import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./component/ui/ToastProvider";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { useEffect } from "react";
import { initEcho } from "./lib/echo";

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    initEcho(token);
  }, []);
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastProvider />
        <AppRouter />
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
