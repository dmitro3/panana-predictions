import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { MarketType, MessageKind } from "./types/market";
import { Duration } from "luxon";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function addEllipsis(str: string, startChars = 6, endChars = 4) {
  return (
    str.substring(0, startChars) + "..." + str.substring(str.length - endChars)
  );
}

export function calculateWinFactors(
  upBetsCount: number,
  downBetsCount: number,
  fee: number
): { upWinFactor: number; downWinFactor: number } {
  const totalBets = upBetsCount + downBetsCount;

  const upWinFactor =
    ((totalBets === 0 ? 1 : totalBets) / (upBetsCount + 1)) * (1 - fee) * 2;
  const downWinFactor =
    ((totalBets === 0 ? 1 : totalBets) / (downBetsCount + 1)) * (1 - fee) * 2;

  return { upWinFactor, downWinFactor };
}

export function calculateUserWin(
  upWinFactor: number,
  downWinFactor: number,
  upBetsSum: number,
  downBetsSum: number,
  userBetAmount: number,
  isUp: boolean
): number {
  if (isUp) {
    const potentialBetSum = upBetsSum + userBetAmount;
    const totalUpPotentialWinnings = upWinFactor * potentialBetSum;
    const userShare = userBetAmount / potentialBetSum;
    const userPotentialWin = totalUpPotentialWinnings * userShare;
    return userPotentialWin;
  } else {
    const potentialBetSum = downBetsSum + userBetAmount;
    const totalDownPotentialWinnings = downWinFactor * potentialBetSum;
    const userShare = userBetAmount / potentialBetSum;
    const userPotentialWin = totalDownPotentialWinnings * userShare;
    return userPotentialWin;
  }
}

export function extractAsset(input: string): MarketType {
  const parts = input.split("::");
  if (parts.length !== 3) {
    throw new Error("cannot extract asset");
  }
  return parts.pop() as MarketType;
}

export function formatAptPrice(price: number): string {
  return (price / 10 ** 9).toFixed(3);
}

export const formatTime = (seconds: number): string => {
  const duration = Duration.fromObject({ seconds });
  const durationWithoutDays = Duration.fromObject({
    seconds: seconds % (60 * 60 * 24),
  });

  const durationHourString = durationWithoutDays.toFormat("hh:mm:ss");
  return Math.floor(duration.as("days")) > 0
    ? `${duration.toFormat("dd")} days ${durationHourString}`
    : durationHourString;
};

export function getMessageByKind(messageKind: MessageKind): string {
  switch (messageKind) {
    case MessageKind.FIVE_MINUTES_BEFORE_BET_CLOSE:
      return "Five minutes before bet closing";
    case MessageKind.FIVE_MINUTES_BEFORE_MARKET_END:
      return "Five minutes before market ending";
  }
}

export function escapeMarkdownV2(text: string) {
  return text.replace(/([_*\[\]()~`>#+\-=|{}.!\\])/g, "\\$1");
}
