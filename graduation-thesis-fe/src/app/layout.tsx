import styles from "../styles/globals.module.scss";
import { SearchProvider } from "../components/SearchContext";
import { ChakraProvider } from "@chakra-ui/react";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className={styles.app}>
          <SearchProvider>
            <ChakraProvider>{children}</ChakraProvider>
          </SearchProvider>
        </div>
      </body>
    </html>
  );
}
