import "tailwindcss/tailwind.css";
import type { AppProps } from "next/app";
import UserContextProvider from "context/userContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
