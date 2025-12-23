import {
  GeometricPattern,
  OrganicBlob,
  WavyLines,
} from "../illustrations/AbstractShapes";
import { cn } from "@origini/libs/utils";
import Link from "next/link";

interface ContentCardProps {
  title: string;
  href: string;
  category?: string;
  description?: string;
  tags?: string[];
  date?: string;
  color?:
    | "ivory"
    | "oat"
    | "cream"
    | "cactus"
    | "sage"
    | "lavender"
    | "terracotta"
    | "coral"
    | "sand"
    | "sky"
    | "mist"
    | "clay"
    | "blush"
    | "mint"
    | "slate"
    | "orange"
    | "amber"
    | "white";
  illustration?: "wavy" | "geometric" | "blob" | "none";
  className?: string;
  featured?: boolean;
}

const colorClasses = {
  ivory: "bg-ivory text-neutral-900",
  oat: "bg-oat-light text-neutral-900",
  cream: "bg-cream text-neutral-900",
  cactus: "bg-cactus-light text-neutral-900",
  sage: "bg-sage-light text-neutral-900",
  lavender: "bg-lavender-light text-neutral-900",
  terracotta: "bg-terracotta-light text-neutral-900",
  coral: "bg-coral-light text-neutral-900",

  // đậm hơn (still classy)
  sand: "bg-sand text-neutral-900", // be rõ hơn, editorial
  sky: "bg-sky-200 text-neutral-900", // xanh trời rõ màu hơn
  mist: "bg-slate-200 text-neutral-900", // xám xanh, techy
  clay: "bg-clay text-neutral-900", // nâu đất rõ, ấm
  blush: "bg-rose-200 text-neutral-900", // hồng rõ nhưng không gắt
  mint: "bg-emerald-200 text-neutral-900", // mint đậm, modern
  slate: "bg-slate-200 text-neutral-900", // neutral nhưng chắc
  orange: "bg-orange-100/50 text-neutral-900", // cam nhẹ, energetic
  amber: "bg-amber-100/50 text-neutral-900", // vàng nhẹ, cheerful

  white:
    "border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300",
};

const illustrationColorClasses = {
  ivory: "text-neutral-400",
  oat: "text-neutral-400",
  cream: "text-neutral-400",

  cactus: "text-cactus",
  sage: "text-sage",
  lavender: "text-lavender",
  terracotta: "text-terracotta",
  coral: "text-coral",

  sand: "text-neutral-500", // neutral đậm hơn, vẫn editorial
  sky: "text-sky-500", // xanh trời rõ màu
  mist: "text-slate-600", // xám xanh đậm, tech vibe
  clay: "text-clay-600", // nâu đất rõ, cozy
  blush: "text-rose-500", // hồng rõ hơn nhưng vẫn mềm
  mint: "text-emerald-500", // mint đậm, modern
  slate: "text-slate-600", // neutral chắc tay
  orange: "text-orange-500", // cam rõ, energetic
  amber: "text-amber-500", // vàng rõ, cheerful

  white: "text-neutral-400",
};

const illustrations = {
  wavy: WavyLines,
  geometric: GeometricPattern,
  blob: OrganicBlob,
  none: null,
};

const titleSizeClasses = {
  featured: "text-2xl md:text-3xl",
  default: "text-xl md:text-2xl",
};

const descriptionSizeClasses = {
  featured: "text-base md:text-lg",
  default: "text-sm",
};

export function ContentCard({
  title,
  href,
  category,
  description,
  tags,
  date,
  color,
  illustration = "none",
  className,
  featured = false,
}: ContentCardProps) {
  const IllustrationComponent = illustrations[illustration];
  const isExternal = href.startsWith("http");

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md",
        color && colorClasses[color],
        featured && "sm:col-span-2 lg:col-span-2",
        className,
      )}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col gap-3",
          !color || color === "white" ? "min-h-[120px]" : "min-h-[200px]",
        )}
      >
        {category && (
          <div className="inline-flex items-center">
            <span className="rounded-full bg-white/70 px-3 py-1 text-xs font-medium uppercase tracking-wide">
              {category}
            </span>
          </div>
        )}

        <h3
          className={cn(
            "font-serif font-bold leading-snug",
            featured ? titleSizeClasses.featured : titleSizeClasses.default,
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              "line-clamp-3 leading-relaxed text-neutral-700",
              featured
                ? descriptionSizeClasses.featured
                : descriptionSizeClasses.default,
            )}
          >
            {description}
          </p>
        )}

        <div className="mt-auto flex flex-col gap-2">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-white/70 px-2.5 py-0.5 text-xs font-medium text-neutral-700"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {date && (
            <time className="text-xs font-medium text-neutral-600">{date}</time>
          )}
        </div>
      </div>

      {IllustrationComponent && (
        <div className="absolute bottom-0 right-0 h-32 w-32 opacity-20 transition-opacity group-hover:opacity-30">
          <IllustrationComponent
            className={cn(
              "h-full w-full",
              color && illustrationColorClasses[color],
            )}
          />
        </div>
      )}
    </Link>
  );
}
