// import { MarketCard } from "./market-card";
import { AvailableMarket } from "@/lib/get-available-markets";
import { getMarketObjects } from "@/lib/get-market-objects";
import { MarketCardSimpleUi } from "./market-card-simple-ui";

export interface MarketOrganizerProps {
  markets: AvailableMarket[];
}

export async function MarketOrganizer({ markets }: MarketOrganizerProps) {
  const marketObjects = await getMarketObjects(markets);
  console.log("marketObjects 💯", marketObjects);

  return (
    <div className="flex flex-col content-start">
      {marketObjects.map((marketObject, index) => (
        <MarketCardSimpleUi
          key={`${marketObject.creator}-${index}`}
          tradingPair={marketObject.tradingPair}
        />
      ))}
    </div>
  );
}
