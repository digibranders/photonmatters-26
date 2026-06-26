import {
  FileText,
  Wallet,
  Gauge,
  HandCoins,
  Scale,
  BellRing,
  Megaphone,
  PhoneCall,
  Landmark,
  Building2,
  RadioTower,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

/** Registry of icons referenced by string name in the content/data layer. */
const ICONS: Record<string, LucideIcon> = {
  FileText,
  Wallet,
  Gauge,
  HandCoins,
  Scale,
  BellRing,
  Megaphone,
  PhoneCall,
  Landmark,
  Building2,
  RadioTower,
  Sparkles,
};

/** Resolve a Lucide icon by name, falling back to Sparkles if unknown. */
export function getIcon(name: string): LucideIcon {
  return ICONS[name] ?? Sparkles;
}
