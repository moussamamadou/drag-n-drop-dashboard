import { GetServerSideProps } from "next";
import type { AppProps } from "next/app";
import { resetServerContext } from "react-beautiful-dnd";
import DataContext from "../components/DataContext";
import DnDContext from "../components/DnDContext";
import Props from "../Interface";
import "../styles/index.css";

function SafeHydrate({ children }: Props) {
  return (
    <div suppressHydrationWarning>
      {typeof window === "undefined" ? null : children}
    </div>
  );
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SafeHydrate>
      <DataContext>
        <DnDContext>
          <Component {...pageProps} />
        </DnDContext>
      </DataContext>
    </SafeHydrate>
  );
}
// export const getServerSideProps: GetServerSideProps = async ({ query }) => {
//   resetServerContext(); // <-- CALL RESET SERVER CONTEXT, SERVER SIDE

//   return { props: { data: [] } };
// };
export default MyApp;
