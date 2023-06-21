import "@rainbow-me/rainbowkit/styles.css";
import "@/styles/globals.css";
import Layout from "@/components/Layout/Layout";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { polygon } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SWRConfig } from "swr";

const { chains, publicClient } = configureChains([polygon], [publicProvider()]);
import AppWrapper from "@/context/StateContext";

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
        </RainbowKitProvider>
      </WagmiConfig>
    </AppWrapper>
  );
}
