"use client";

import { useMarket } from "@/lib/hooks/useMarket";
import { AvailableMarket } from "@/lib/get-available-markets";
import { MarketCardSimpleUi } from "./market-card-simple-ui";
import { MarketData } from "@/lib/types/market";
import { usePlaceBet } from "@/lib/hooks/usePlaceBet";
import { useSubmitVote } from "@/lib/hooks/useSubmitVote";
import { useFilter } from "@/lib/atoms/useFilter";

interface MarketCardProps {
  availableMarket: AvailableMarket;
  initialMarketData?: MarketData;
}

export const MarketCard: React.FC<MarketCardProps> = ({
  availableMarket,
  initialMarketData,
}) => {
  const { marketData } = useMarket(availableMarket, 3000, initialMarketData);
  const { placeBet } = usePlaceBet();
  const { submitVote } = useSubmitVote();
  const { filter } = useFilter("markets");

  const onPlaceBet = async (betUp: boolean, amount: number) => {
    if (marketData) {
      await placeBet(marketData, betUp, amount);
    }
  };

  const onVote = async (isVoteUp: boolean) => {
    if (marketData) {
      await submitVote(marketData, isVoteUp);
    }
  };

  const showMarketCard =
    !marketData?.tradingPair.one ||
    !filter ||
    filter.length === 0 ||
    filter.includes(marketData.tradingPair.one);

  return (
    <>
      {showMarketCard && (
        <MarketCardSimpleUi
          address={marketData?.address ?? "1337"}
          minBet={marketData?.minBet ?? 1337}
          betCloseTime={marketData?.startTime ?? 1336}
          resolveTime={marketData?.endTime ?? 1337}
          tradingPair={marketData?.tradingPair ?? { one: "APT", two: "USD" }}
          upVotesSum={marketData?.upVotesSum ?? 1337}
          downVotesSum={marketData?.downVotesSum ?? 1337}
          upWinFactor={marketData?.upWinFactor ?? 1337}
          downWinFactor={marketData?.downWinFactor ?? 1337}
          upBetsSum={marketData?.upBetsSum ?? 1337}
          downBetsSum={marketData?.downBetsSum ?? 1337}
          upBetsCount={marketData?.upBets.size ?? 1337}
          downBetsCount={marketData?.downBets.size ?? 1337}
          onPlaceBet={onPlaceBet}
          onVote={onVote}
        />
      )}
    </>
  );
};
