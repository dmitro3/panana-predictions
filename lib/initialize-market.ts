import { DateTime } from "luxon";
import { getMarketRessource } from "./get-market-ressource";
import { AvailableMarket } from "./get-available-markets";
import { calculateWinFactors } from "./utils";
import { Address, MarketData } from "@/lib/types/market";

export const initializeMarket = async (
  availableMarket: AvailableMarket
): Promise<MarketData> => {
  const market = await getMarketRessource(availableMarket);

  const creator = market.creator as Address;
  const startPrice = Number(market.start_price);
  const startTime = Number(market.start_time);
  const endTime = Number(market.end_time);
  const minBet = Number(market.min_bet);
  const upBetsSum = Number(market.up_bets_sum);
  const downBetsSum = Number(market.down_bets_sum);
  const fee = Number(market.fee.numerator) / Number(market.fee.denominator);
  const priceUp = market.price_up.vec[0];
  const priceDelta =
    Number(market.price_delta.numerator) /
    Number(market.price_delta.denominator);

  const upBets = new Map<Address, number>(
    market.up_bets.data.map((bet) => [bet.key as Address, Number(bet.value)])
  );
  const downBets = new Map<Address, number>(
    market.down_bets.data.map((bet) => [bet.key as Address, Number(bet.value)])
  );

  const userVotes = new Map<Address, boolean>(
    market.user_votes.data.map((vote) => [vote.key as Address, vote.value])
  );

  const upVotesSum = Number(market.up_votes_sum);
  const downVotesSum = Number(market.down_votes_sum);

  const name = `${priceDelta > 0 ? priceDelta : ""}% ${
    priceUp ? "Up" : "Down"
  } ${availableMarket.type}/USD by ${DateTime.fromSeconds(
    endTime
  ).toLocaleString()}`;

  const tradingPair = {
    one: availableMarket.type,
    two: "USD",
  };

  const { upWinFactor, downWinFactor } = calculateWinFactors(
    upBets.size,
    downBets.size,
    fee
  );

  const newMarketData: MarketData = {
    name,
    address: availableMarket.address,
    tradingPair,
    creator,
    startPrice,
    startTime,
    endTime,
    minBet,
    upBetsSum,
    downBetsSum,
    fee,
    priceUp,
    priceDelta,
    upBets,
    downBets,
    userVotes,
    upVotesSum,
    downVotesSum,
    upWinFactor,
    downWinFactor,
  };

  return newMarketData;
};