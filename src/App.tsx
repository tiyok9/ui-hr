import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ToastProvider from "./component/ui/ToastProvider";
import AppRouter from "./routes/AppRouter";
import { Provider } from "react-redux";
import { store } from "./app/store";

const queryClient = new QueryClient();

function App() {
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
