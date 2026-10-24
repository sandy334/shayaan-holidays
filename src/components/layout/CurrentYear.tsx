"use client";

import { useEffect, useState } from "react";

/** Renders the build year, then corrects to the visitor's current year. */
export function CurrentYear({ fallback }: { fallback: number }) {
  const [year, setYear] = useState(fallback);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return <>{year}</>;
}
