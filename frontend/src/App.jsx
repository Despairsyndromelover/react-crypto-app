import AppLayout from "./components/layout/AppLayout";
import { CryptoContextProvider } from "./contexts/crypto-context";

export default function App() {
  return (
    <CryptoContextProvider>
      <AppLayout />
    </CryptoContextProvider>
  );
}
