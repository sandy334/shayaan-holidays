"use client";

import { useId, useState } from "react";
import { Calculator, Info, Snowflake, Wind } from "lucide-react";
import { pricing, vehicle, type RateId } from "@/config/site";
import { estimateFare, formatINR, getRate, whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

const MAX_KM = 10000;
const MAX_DAYS = 60;
const presets = [100, 250, 500];

function toNumber(value: string, max: number): number {
  const n = Number.parseFloat(value);
  if (!Number.isFinite(n) || n < 0) return 0;
  return Math.min(n, max);
}

export function FareEstimator() {
  const id = useId();
  const [distance, setDistance] = useState("100");
  const [days, setDays] = useState("1");
  const [rateId, setRateId] = useState<RateId>(pricing.rates[0].id);

  const km = toNumber(distance, MAX_KM);
  const dayCount = Math.round(toNumber(days, MAX_DAYS));
  const rate = getRate(rateId);
  const { distanceFare, bata, total } = estimateFare(km, rateId, dayCount);
  const hasInput = km > 0;

  const enquiryMessage = [
    "Hello Shayaan Holidays! I used the fare estimator on your website.",
    "",
    `Vehicle: ${vehicle.name} (${vehicle.configuration})`,
    `Option: ${rate.label} (₹${rate.perKm}/km)`,
    `Estimated distance: ${km} km`,
    `Days: ${dayCount}`,
    `Estimated fare based on distance: ${formatINR(distanceFare)}`,
    `${pricing.driverBata.label}: ${formatINR(bata)}`,
    `Estimated total: ${formatINR(total)}`,
    "",
    "Please confirm availability and the final quotation.",
  ].join("\n");

  return (
    <div
      data-reveal
      className="mx-auto mt-16 grid max-w-5xl overflow-hidden rounded-[2rem] bg-white text-ink shadow-[0_40px_80px_-40px_rgb(0_0_0/0.6)] lg:grid-cols-5"
    >
      <form className="p-6 sm:p-10 lg:col-span-3" onSubmit={(e) => e.preventDefault()} aria-labelledby={`${id}-title`}>
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-950 text-gold">
            <Calculator className="h-5 w-5" aria-hidden="true" />
          </span>
          <h3 id={`${id}-title`} className="text-display-md text-navy-950">
            Trip cost estimator
          </h3>
        </div>
        <p className="mt-3 text-sm text-ink/70">Enter your approximate distance to see an instant estimate.</p>

        <div className="mt-8">
          <label htmlFor={`${id}-km`} className="text-sm font-semibold text-navy-950">
            Estimated distance
          </label>
          <div className="mt-2 flex items-center rounded-xl border border-navy-900/15 bg-mist transition-colors focus-within:border-gold focus-within:ring-2 focus-within:ring-gold/30">
            <input
              id={`${id}-km`}
              type="number"
              inputMode="decimal"
              min={0}
              max={MAX_KM}
              step={1}
              value={distance}
              onChange={(e) => setDistance(e.target.value)}
              className="w-full bg-transparent px-4 py-3.5 text-lg font-semibold text-navy-950 outline-none"
              aria-describedby={`${id}-km-hint`}
            />
            <span className="pr-4 text-sm font-semibold text-ink/60">km</span>
          </div>
          <div className="mt-3 flex flex-wrap gap-2" id={`${id}-km-hint`}>
            <span className="sr-only">Quick distances:</span>
            {presets.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setDistance(String(p))}
                aria-pressed={km === p}
                className={`min-h-9 rounded-full border px-3.5 text-xs font-semibold transition-colors ${
                  km === p
                    ? "border-navy-900 bg-navy-900 text-white"
                    : "border-navy-900/15 text-navy-900 hover:border-navy-900/40"
                }`}
              >
                {p} km
              </button>
            ))}
          </div>
        </div>

        <fieldset className="mt-7">
          <legend className="text-sm font-semibold text-navy-950">Travel option</legend>
          <div className="mt-2 grid grid-cols-2 gap-3">
            {pricing.rates.map((r) => {
              const OptionIcon = r.id === "ac" ? Snowflake : Wind;
              const checked = r.id === rateId;
              return (
                <label
                  key={r.id}
                  className={`relative flex cursor-pointer flex-col gap-1 rounded-xl border p-4 transition-colors focus-within:ring-2 focus-within:ring-gold/40 ${
                    checked ? "border-gold bg-gold/10" : "border-navy-900/15 hover:border-navy-900/35"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-rate`}
                    value={r.id}
                    checked={checked}
                    onChange={() => setRateId(r.id)}
                    className="sr-only"
                  />
                  <span className="flex items-center gap-2 font-semibold text-navy-950">
                    <OptionIcon className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                    {r.label}
                  </span>
                  <span className="text-sm text-ink/70">₹{r.perKm} / km</span>
                </label>
              );
            })}
          </div>
        </fieldset>

        <div className="mt-7">
          <label htmlFor={`${id}-days`} className="text-sm font-semibold text-navy-950">
            Number of days <span className="font-normal text-ink/60">(for driver bata)</span>
          </label>
          <input
            id={`${id}-days`}
            type="number"
            inputMode="numeric"
            min={1}
            max={MAX_DAYS}
            step={1}
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className="mt-2 w-full rounded-xl border border-navy-900/15 bg-mist px-4 py-3.5 text-lg font-semibold text-navy-950 outline-none transition-colors focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </div>
      </form>

      <div className="relative flex flex-col bg-navy-900 p-6 text-white sm:p-10 lg:col-span-2">
        <div aria-live="polite" aria-atomic="true">
          <p className="eyebrow text-gold">Estimated fare based on distance</p>
          <p className="mt-3 font-display text-[clamp(2.5rem,2rem+2vw,3.4rem)] font-semibold leading-none text-gold-light">
            {formatINR(distanceFare)}
          </p>
          <p className="mt-2 text-sm text-white/70">
            {hasInput ? `${km.toLocaleString("en-IN")} km × ₹${rate.perKm}/km (${rate.label})` : "Enter a distance to begin"}
          </p>

          <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-white/70">Distance fare</dt>
              <dd className="font-semibold">{formatINR(distanceFare)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-white/70">
                {pricing.driverBata.label} ({dayCount} × {formatINR(pricing.driverBata.amount)})
              </dt>
              <dd className="font-semibold">{formatINR(bata)}</dd>
            </div>
            <div className="flex justify-between gap-4 border-t border-white/15 pt-3 text-base">
              <dt className="font-semibold">Estimated total</dt>
              <dd className="font-bold text-gold-light">{formatINR(total)}</dd>
            </div>
          </dl>
        </div>

        <p className="mt-6 flex gap-2 text-xs leading-relaxed text-white/65">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
          This is an estimate covering distance and driver bata only — not a confirmed booking. Any other charges and
          the final quotation must be confirmed with Shayaan Holidays.
        </p>

        <a
          href={whatsappUrl(enquiryMessage)}
          target="_blank"
          rel="noopener noreferrer"
          aria-disabled={!hasInput}
          tabIndex={hasInput ? undefined : -1}
          onClick={(e) => !hasInput && e.preventDefault()}
          className={`btn btn-whatsapp mt-8 w-full ${hasInput ? "" : "pointer-events-none opacity-50"}`}
        >
          <WhatsAppIcon className="h-5 w-5" />
          Enquire with this estimate
        </a>
      </div>
    </div>
  );
}
