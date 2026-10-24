"use client";

import { useEffect, useId, useRef, useState } from "react";
import { CheckCircle2, Loader2, RotateCcw, ShieldCheck } from "lucide-react";
import { pricing, vehicle } from "@/config/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";

type FieldName =
  | "name"
  | "phone"
  | "pickup"
  | "destination"
  | "travelDate"
  | "returnDate"
  | "passengers"
  | "acPreference"
  | "requirements";

type Values = Record<FieldName, string>;
type Errors = Partial<Record<FieldName, string>>;

const initialValues: Values = {
  name: "",
  phone: "",
  pickup: "",
  destination: "",
  travelDate: "",
  returnDate: "",
  passengers: "",
  acPreference: "",
  requirements: "",
};

const fieldOrder: FieldName[] = ["name", "phone", "pickup", "destination", "travelDate", "returnDate", "passengers"];

function isValidPhone(raw: string): boolean {
  const compact = raw.replace(/[\s\-().]/g, "");
  // Indian mobile (optionally prefixed with +91, 91 or 0), or any E.164 international number.
  return /^(\+?91|0)?[6-9]\d{9}$/.test(compact) || /^\+[1-9]\d{7,14}$/.test(compact);
}

function todayISO(): string {
  const d = new Date();
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().slice(0, 10);
}

function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(y, m - 1, d));
}

function validate(values: Values, today: string): Errors {
  const errors: Errors = {};
  if (values.name.trim().length < 2) errors.name = "Please enter your name.";
  if (!values.phone.trim()) errors.phone = "Please enter a contact number.";
  else if (!isValidPhone(values.phone))
    errors.phone = "Enter a valid 10-digit mobile number, or an international number starting with +.";
  if (!values.pickup.trim()) errors.pickup = "Please enter a pickup location.";
  if (!values.destination.trim()) errors.destination = "Please enter your destination.";
  if (!values.travelDate) errors.travelDate = "Please choose a travel date.";
  else if (today && values.travelDate < today) errors.travelDate = "Travel date can't be in the past.";
  if (values.returnDate && values.travelDate && values.returnDate < values.travelDate)
    errors.returnDate = "Return date must be on or after the travel date.";
  const pax = Number(values.passengers);
  if (!values.passengers) errors.passengers = "Please enter the number of passengers.";
  else if (!Number.isInteger(pax) || pax < 1) errors.passengers = "Enter a whole number of at least 1.";
  else if (pax > vehicle.seats)
    errors.passengers = `Our ${vehicle.name} seats up to ${vehicle.seats}. For larger groups, enter ${vehicle.seats} and mention your group size in the requirements.`;
  return errors;
}

function buildMessage(v: Values): string {
  const lines = [
    "Hello Shayaan Holidays! I would like to enquire about a trip.",
    "",
    `Name: ${v.name.trim()}`,
    `Phone: ${v.phone.trim()}`,
    `Pickup: ${v.pickup.trim()}`,
    `Destination: ${v.destination.trim()}`,
    `Travel Date: ${formatDate(v.travelDate)}`,
  ];
  if (v.returnDate) lines.push(`Return Date: ${formatDate(v.returnDate)}`);
  lines.push(`Passengers: ${v.passengers}`);
  if (v.acPreference) lines.push(`AC Preference: ${v.acPreference}`);
  if (v.requirements.trim()) lines.push(`Requirements: ${v.requirements.trim()}`);
  lines.push("", "Please share availability and a quotation.");
  return lines.join("\n");
}

function FieldLabel({ htmlFor, children, optional }: { htmlFor: string; children: React.ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="text-sm font-semibold text-navy-950">
      {children}
      {optional ? (
        <span className="ml-1 font-normal text-ink/55">(optional)</span>
      ) : (
        <span className="text-red-700" aria-hidden="true">
          {" "}
          *
        </span>
      )}
    </label>
  );
}

export function EnquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [today, setToday] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "sent">("idle");
  const [sentUrl, setSentUrl] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Computed on the client so the date floor matches the visitor's timezone.
  useEffect(() => setToday(todayISO()), []);

  useEffect(() => {
    if (status === "sent") statusRef.current?.focus();
  }, [status]);

  const fieldId = (name: FieldName) => `${id}-${name}`;
  const errorId = (name: FieldName) => `${id}-${name}-error`;
  const showError = (name: FieldName) => Boolean(errors[name] && touched[name]);

  function update(name: FieldName, value: string) {
    const next = { ...values, [name]: value };
    setValues(next);
    if (touched[name] || errors[name]) setErrors(validate(next, today));
  }

  function blur(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validate(values, today));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;

    const found = validate(values, today);
    setErrors(found);
    setTouched(Object.fromEntries(fieldOrder.map((f) => [f, true])));
    const firstInvalid = fieldOrder.find((f) => found[f]);
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus();
      return;
    }

    setStatus("submitting");
    const url = whatsappUrl(buildMessage(values));
    setSentUrl(url);
    const win = window.open(url, "_blank");
    if (win) win.opener = null;
    else window.location.href = url;
    // Brief hold prevents accidental double submissions.
    window.setTimeout(() => setStatus("sent"), 600);
  }

  function reset() {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setStatus("idle");
  }

  const fieldProps = (name: FieldName, required = true) => ({
    id: fieldId(name),
    name,
    value: values[name],
    required,
    "aria-required": required,
    "aria-invalid": showError(name),
    "aria-describedby": showError(name) ? errorId(name) : undefined,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      update(name, e.target.value),
    onBlur: () => blur(name),
    className: `mt-2 w-full rounded-xl border bg-mist px-4 py-3.5 text-base text-navy-950 outline-none transition-[border-color,box-shadow] placeholder:text-ink/40 focus:bg-white focus:ring-2 ${
      showError(name)
        ? "border-red-600 focus:border-red-600 focus:ring-red-600/20"
        : "border-navy-900/15 focus:border-gold focus:ring-gold/30"
    }`,
  });

  const errorText = (name: FieldName) =>
    showError(name) ? (
      <p id={errorId(name)} className="mt-1.5 text-sm font-medium text-red-700">
        {errors[name]}
      </p>
    ) : null;

  if (status === "sent") {
    return (
      <div
        ref={statusRef}
        tabIndex={-1}
        role="status"
        className="flex flex-col items-start rounded-[1.75rem] bg-white p-7 shadow-[0_40px_80px_-40px_rgb(7_27_58/0.45)] outline-none sm:p-10"
      >
        <CheckCircle2 className="h-12 w-12 text-whatsapp" aria-hidden="true" />
        <h3 className="text-display-md mt-5 text-navy-950">Your enquiry is opening in WhatsApp</h3>
        <p className="mt-4 text-base leading-relaxed text-ink/80">
          We&apos;ve prepared a message with your trip details. Review it in WhatsApp and tap send to reach Shayaan
          Holidays.
        </p>
        <p className="mt-3 rounded-xl bg-gold/10 px-4 py-3 text-sm leading-relaxed text-navy-900">
          <strong>Please note:</strong> this is an enquiry, not a confirmed booking. Availability, the final quotation
          and booking details will be confirmed directly with you.
        </p>
        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a href={sentUrl} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <WhatsAppIcon className="h-5 w-5" />
            Open WhatsApp again
          </a>
          <button type="button" onClick={reset} className="btn btn-outline-navy">
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            New enquiry
          </button>
        </div>
      </div>
    );
  }

  const errorCount = fieldOrder.filter(showError).length;

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-label="Trip enquiry form"
      className="rounded-[1.75rem] bg-white p-6 shadow-[0_40px_80px_-40px_rgb(7_27_58/0.45)] sm:p-10"
    >
      <p className="sr-only" aria-live="polite">
        {errorCount > 0 ? `${errorCount} field${errorCount > 1 ? "s need" : " needs"} attention.` : ""}
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <FieldLabel htmlFor={fieldId("name")}>Your name</FieldLabel>
          <input {...fieldProps("name")} type="text" autoComplete="name" placeholder="Full name" />
          {errorText("name")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("phone")}>Contact number</FieldLabel>
          <input {...fieldProps("phone")} type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210" />
          {errorText("phone")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("pickup")}>Pickup location</FieldLabel>
          <input {...fieldProps("pickup")} type="text" autoComplete="address-level2" placeholder="City or area" />
          {errorText("pickup")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("destination")}>Destination</FieldLabel>
          <input {...fieldProps("destination")} type="text" placeholder="Where are you headed?" />
          {errorText("destination")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("travelDate")}>Travel date</FieldLabel>
          <input {...fieldProps("travelDate")} type="date" min={today || undefined} />
          {errorText("travelDate")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("returnDate")} optional>
            Return date
          </FieldLabel>
          <input {...fieldProps("returnDate", false)} type="date" min={values.travelDate || today || undefined} />
          {errorText("returnDate")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("passengers")}>Number of passengers</FieldLabel>
          <input
            {...fieldProps("passengers")}
            type="number"
            inputMode="numeric"
            min={1}
            max={vehicle.seats}
            step={1}
            placeholder={`1 – ${vehicle.seats}`}
          />
          {errorText("passengers")}
        </div>
        <div>
          <FieldLabel htmlFor={fieldId("acPreference")} optional>
            AC preference
          </FieldLabel>
          <select {...fieldProps("acPreference", false)}>
            <option value="">No preference</option>
            {pricing.rates.map((r) => (
              <option key={r.id} value={`${r.label} (₹${r.perKm}/km)`}>
                {r.label} — ₹{r.perKm}/km
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <FieldLabel htmlFor={fieldId("requirements")} optional>
            Additional requirements
          </FieldLabel>
          <textarea
            {...fieldProps("requirements", false)}
            rows={4}
            placeholder="Stops along the way, luggage, pickup time, anything else we should know…"
          />
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="flex max-w-sm gap-2 text-xs leading-relaxed text-ink/65">
          <ShieldCheck className="h-4 w-4 shrink-0 text-gold-deep" aria-hidden="true" />
          Your details aren&apos;t stored on this website — they&apos;re placed in a WhatsApp message you can review
          before sending.
        </p>
        <button type="submit" disabled={status === "submitting"} className="btn btn-whatsapp shrink-0">
          {status === "submitting" ? (
            <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
          ) : (
            <WhatsAppIcon className="h-5 w-5" />
          )}
          {status === "submitting" ? "Opening WhatsApp…" : "Send Enquiry on WhatsApp"}
        </button>
      </div>
    </form>
  );
}
