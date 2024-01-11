import styles from "../styles/globals.module.scss";
import { SearchProvider } from "../components/SearchContext";
import { ChakraProvider } from "@chakra-ui/react";
import '../styles/main.scss'; 
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.app}>
          <ToastContainer />
          <SearchProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </SearchProvider>
        </div>
      </body>
    </html>
  );
}
