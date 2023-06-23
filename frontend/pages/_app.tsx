import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import {
  LensProvider,
  LensConfig,
  production,
  development,
} from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout/Layout";
import AppWrapper from "@/context/StateContext";

const inter = Inter({ subsets: ["latin"] });

const { provider, webSocketProvider } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);

const client = createClient({
  autoConnect: true,
  provider,
  webSocketProvider,
});

const lensConfig: LensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <WagmiConfig client={client}>
        <LensProvider config={lensConfig}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </LensProvider>
      </WagmiConfig>
    </AppWrapper>
  );
}
