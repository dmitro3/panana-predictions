"use client";

import { AvailableMarket } from "@/lib/get-available-markets";
import { Card } from "../ui/card";
import { EventMarketData } from "@/lib/types/market";
import { getExplorerObjectLink } from "@/lib/aptos";
import Link from "next/link";
import { useEventMarket } from '@/lib/hooks/useEventMarket';

interface EventMarketInfoProps {
  availableMarket: AvailableMarket;
  initialMarketData?: EventMarketData;
  children?: React.ReactNode;
}

export const EventMarketInfo: React.FC<EventMarketInfoProps> = ({
  availableMarket,
  initialMarketData,
  children,
}) => {
  const { marketData } = useEventMarket(availableMarket, 3000, initialMarketData);


  return (
    <div className="grid gap-4 text-xs sm:text-base">
      <div className="col-span-4 sm:col-span-2 row-span-2">
        <Card className="h-full">
          <div className="grid grid-cols-2 gap-4">
            <InfoItem
              className="col-span-2"
              label="Status"
              value={getStatusText(marketData?.accepted)}
            />
            <div>
              <dt className="font-medium text-muted-foreground">Address</dt>
              <p className="mt-1 text-ellipsis overflow-hidden">
                {marketData?.address ? (
                  <Link
                    className="underline"
                    target="_blank"
                    href={getExplorerObjectLink(marketData?.address, true)}
                  >
                    {marketData?.address}
                  </Link>
                ) : (
                  "n/a"
                )}
              </p>
            </div>

            <div>
              <dt className="font-medium text-muted-foreground">Creator</dt>
              <p className="mt-1 text-ellipsis overflow-hidden">
                {marketData?.creator ? (
                  <Link
                    className="underline"
                    target="_blank"
                    href={getExplorerObjectLink(marketData?.creator, true)}
                  >
                    {marketData?.creator}
                  </Link>
                ) : (
                  "n/a"
                )}
              </p>
            </div>
            <InfoItem
              label="Minimum Bet"
              value={`APT ${((marketData?.minBet ?? 0) / 10 ** 8).toFixed(2)}`}
            />
            <InfoItem label="Fee" value={`${(marketData?.fee ?? 0) * 100} %`} />
          </div>
        </Card>
      </div>



      {children && <div className="col-span-4 sm:col-span-3 row-span-5">{children}</div>}
    </div>
  );
};

function getStatusText(status?: boolean) {
  switch (status) {
    case undefined:
      return 'Open to vote';
    case true:
      return 'Accepted';
    case false:
      return 'Rejected';
  }
}

function InfoItem({ label, value, className }: { label: string; value: string | number, className?: string }) {
  return (
    <div className={className}>
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}