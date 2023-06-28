import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { Client, Provider, cacheExchange, fetchExchange } from "urql";
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
const urqlClient = new Client({
  url: "https://api.thegraph.com/subgraphs/name/superfluid-finance/protocol-v1-mumbai",
  exchanges: [cacheExchange, fetchExchange],
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider value={urqlClient}>
      <AppWrapper>
        <WagmiConfig client={client}>
          <LensProvider config={lensConfig}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </LensProvider>
        </WagmiConfig>
      </AppWrapper>
    </Provider>
  );
}
