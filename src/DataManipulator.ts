import { ServerRespond } from "./DataStreamer";

const BOUND_THRESHOLD = 0.05;
export interface Row {
  // Should be the same as the schema, returned by `generateRow`
  price_abc: number;
  price_dec: number;
  ratio: number;
  timestamp: Date;
  upper_bound: number; // upper bound of the ratio
  lower_bound: number; // lower bound of the ratio
  trigger_alert: number | undefined;
}

export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) {
    const priceABC =
      (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2;
    const priceDEF =
      (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2;
    const ratio = priceABC / priceDEF;
    const upperBound = 1 + BOUND_THRESHOLD;
    const lowerBound = 1 - BOUND_THRESHOLD;
    return {
      price_abc: priceABC,
      price_dec: priceDEF,
      ratio,
      // Timestamp of the latest data point
      timestamp:
        serverResponds[0].timestamp > serverResponds[1].timestamp
          ? serverResponds[0].timestamp
          : serverResponds[1].timestamp,
      upper_bound: upperBound,
      lower_bound: lowerBound,
      trigger_alert:
        ratio > upperBound || ratio < lowerBound ? ratio : undefined,
    };
  }
}
