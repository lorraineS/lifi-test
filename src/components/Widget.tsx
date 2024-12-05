"use client";

import {
  ChainType,
  CoinKey,
  ContractCall,
  DisabledUI,
  HiddenUI,
  ItemPrice,
  LiFiWidget,
  WidgetConfig,
} from "@lifi/widget";
import { useMemo } from "react";

const depositAddress = "0xdde759c7cf032b1d0e633a7e9cfa6653d1911a22";
const depositAmount = BigInt(10000);

export const contractTool = {
  logoURI:
    "https://github.com/lifinance/widget/assets/18644653/eb043a91-18ba-4da7-91c4-029a53a25989",
  name: "Immutable",
};

const contractCalls: ContractCall[] = [];

export const Widget = () => {
  const widgetConfig: WidgetConfig = useMemo(() => {
    const baseConfig: WidgetConfig = {
      toAddress: {
        ...contractTool,
        address: depositAddress,
        chainType: ChainType.EVM,
      },
      subvariant: "custom",
      integrator: "fee-demo",
      // BUG?
      // If ToAddress is disabled, tokens are sent to the source wallet
      // If ToAddress is enabled, tokens are sent to the deposit address
      disabledUI: [DisabledUI.ToAddress],
      hiddenUI: [HiddenUI.Appearance, HiddenUI.Language, HiddenUI.ToAddress],
      useRecommendedRoute: true,
      theme: {
        container: {
          border: "1px solid rgb(234, 234, 234)",
          borderRadius: "16px",
        },
      },
    };
    return baseConfig;
  }, []);
  return (
    <LiFiWidget
      contractComponent={
        <ItemPrice
          token={{
            chainId: 137,
            address: "0x3c499c542cEF5E3811e1192ce70d8cC03d5c3359",
            symbol: "USDC",
            name: "USD Coin",
            decimals: 6,
            priceUSD: "1",
            coinKey: "USDC" as CoinKey,
            logoURI:
              "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
            amount: depositAmount,
          }}
          contractCalls={contractCalls}
        />
      }
      contractTool={contractTool}
      integrator={widgetConfig.integrator}
      config={widgetConfig}
    />
  );
};
