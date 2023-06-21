import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SWRConfig } from "swr";

const { chains, publicClient } = configureChains(
  [polygonMumbai],
  [publicProvider()]
);
import AppWrapper from "@/context/StateContext";
import { LensConfig, development } from "@lens-protocol/react-web";
import { bindings as wagmiBindings } from "@lens-protocol/wagmi";
import { LensProvider } from "@lens-protocol/react-web";

const lensConfig = {
  bindings: wagmiBindings(),
  environment: development,
};

const { connectors } = getDefaultWallets({
  appName: "SuperLens",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});
export default function App({ Component, pageProps }) {
  return (
    <AppWrapper>
      <WagmiConfig config={wagmiConfig}>
        <RainbowKitProvider
          chains={chains}
          theme={lightTheme({
            accentColor: "#54B435",
            accentColorForeground: "white",
            borderRadius: "large",
            fontStack: "system",
            overlayBlur: "small",
          })}
        >
          {" "}
          <LensProvider config={lensConfig}>
            <SWRConfig
              value={{
                fetcher: (resource, init) =>
                  fetch(resource, init).then((res) => res.json()),
              }}
            >
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SWRConfig>
          </LensProvider>
        </RainbowKitProvider>
      </WagmiConfig>
    </AppWrapper>
  );
}
