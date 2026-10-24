import {
  BadgeIndianRupee,
  CalendarDays,
  Luggage,
  MessageCircle,
  Route,
  Snowflake,
  Sofa,
  Users,
  Wind,
  type LucideProps,
} from "lucide-react";

const icons = {
  badge: BadgeIndianRupee,
  calendar: CalendarDays,
  luggage: Luggage,
  message: MessageCircle,
  route: Route,
  snowflake: Snowflake,
  sofa: Sofa,
  users: Users,
  wind: Wind,
} as const;

export type IconName = keyof typeof icons;

/** Resolves the icon names used in `config/site.ts` to Lucide icons. */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Component = icons[name as IconName] ?? Route;
  return <Component aria-hidden="true" strokeWidth={1.5} {...props} />;
}
