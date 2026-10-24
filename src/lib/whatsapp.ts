import { links, pricing, vehicle, type Rate, type RateId } from "@/config/site";

/** Builds a wa.me link with a URL-encoded, prefilled message. */
export function whatsappUrl(message?: string): string {
  if (!message) return links.whatsapp;
  return `${links.whatsapp}?text=${encodeURIComponent(message)}`;
}

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export function formatINR(amount: number): string {
  return inr.format(amount);
}

export function getRate(id: RateId): Rate {
  return pricing.rates.find((r) => r.id === id) ?? pricing.rates[0];
}

export interface FareEstimate {
  distanceFare: number;
  bata: number;
  total: number;
}

export function estimateFare(distanceKm: number, rateId: RateId, days: number): FareEstimate {
  const distanceFare = Math.max(0, distanceKm) * getRate(rateId).perKm;
  const bata = Math.max(0, days) * pricing.driverBata.amount;
  return { distanceFare, bata, total: distanceFare + bata };
}

export const messages = {
  general: "Hello Shayaan Holidays! I would like to enquire about a trip.",
  vehicle: `Hello Shayaan Holidays! I would like to enquire about the ${vehicle.name} (${vehicle.configuration}). Please share availability.`,
  service: (title: string) =>
    `Hello Shayaan Holidays! I would like to enquire about ${title.toLowerCase()}. Please share availability and a quotation.`,
  destination: (name: string) =>
    `Hello Shayaan Holidays! I'm planning a trip to ${name} and would like to enquire about the ${vehicle.name}. Please share availability and a quotation.`,
  rate: (rate: Rate) =>
    `Hello Shayaan Holidays! I would like to book the ${vehicle.name} (${vehicle.configuration}) — ${rate.label} at ₹${rate.perKm}/km. Please share availability.`,
};
