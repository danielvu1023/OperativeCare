import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout";
import { AlertProvider } from "@/contexts/AlertContext";
import { RoleProvider } from "@/contexts/RoleContext";
import { AlertActionsProvider } from "@/contexts/AlertActionsContext";
import { VitalsProvider } from "@/contexts/VitalsContext";
import AlertGenerator from "@/components/AlertGenerator";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <RoleProvider>
      <AlertProvider>
        <AlertActionsProvider>
          <VitalsProvider>
            <AlertGenerator />
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </VitalsProvider>
        </AlertActionsProvider>
      </AlertProvider>
    </RoleProvider>
  );
}
