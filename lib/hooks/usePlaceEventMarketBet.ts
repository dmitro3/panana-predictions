import { createEntryPayload } from "@thalalabs/surf";
import { EVENT_MARKET_ABI } from "@/lib/aptos";
import { EventMarketData } from "@/lib/types/market";
import { useWallet } from "@aptos-labs/wallet-adapter-react";

export const usePlaceEventMarketBet = () => {
  const { account, signAndSubmitTransaction } = useWallet();

  const placeBet = async (
    eventMarketData: EventMarketData,
    selectedAnswerIdx: number,
    amount: number
  ): Promise<boolean> => {
    if (!account || !eventMarketData) return false;

    try {
      const payload = createEntryPayload(EVENT_MARKET_ABI, {
        function: "place_bet",
        typeArguments: [
          `${EVENT_MARKET_ABI.address}::event_category::Sports`,
        ],
        functionArguments: [eventMarketData.address, selectedAnswerIdx, amount.toString()],
      });

      const transactionResponse = await signAndSubmitTransaction({
        sender: account.address,
        data: payload,
      });

      // const transactionResponse = await signAndSubmitTransaction({
      //   sender: account.address,
      //   data: payload,
      // });

      // const committedTransactionResponse = await aptos.waitForTransaction({
      //   transactionHash: transactionResponse.hash,
      // });
      return true;
    } catch (error: any) {
      console.error("Transaction failed:", error);
      return false;
    }
  };

  return { placeBet };
};