import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { Icon, type IconName } from "./Icon";

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8", className)}>{children}</div>;
}

type Tone = "white" | "muted" | "dark";

/**
 * "muted" läuft oben und unten weich in Weiß aus – so entstehen zwischen den
 * Sektionen keine harten Kanten, sondern fließende Übergänge.
 */
const toneClasses: Record<Tone, string> = {
  white: "bg-white",
  muted: "bg-[linear-gradient(to_bottom,#fff_0%,var(--color-surface)_18%,var(--color-surface)_82%,#fff_100%)]",
  dark: "bg-primary-900 text-white",
};

export function Section({
  id,
  tone = "white",
  className,
  children,
  labelledBy,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
  labelledBy?: string;
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn("py-12 sm:py-14 lg:py-16", toneClasses[tone], className)}>
      <Container>{children}</Container>
    </section>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  id: string;
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className={cn("text-sm font-semibold uppercase tracking-[0.14em]", dark ? "text-accent-300" : "text-brand")}>
          {eyebrow}
        </p>
      )}
      <h2
        id={id}
        className={cn(
          "mt-3 text-3xl font-bold tracking-tight text-balance sm:text-4xl",
          dark ? "text-white" : "text-ink",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p className={cn("mt-4 text-lg leading-relaxed text-pretty", dark ? "text-white/90" : "text-ink-muted")}>{intro}</p>
      )}
    </div>
  );
}

type ButtonVariant = "primary" | "secondary" | "outline" | "outlineLight" | "ghostLight" | "black";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary: "bg-accent-600 text-white hover:bg-accent-700 shadow-sm shadow-accent-900/20",
  secondary: "bg-primary-900 text-white hover:bg-primary-800",
  outline: "border border-brand/20 bg-white text-ink hover:border-brand/40 hover:bg-surface",
  outlineLight: "border border-white/30 text-white hover:bg-white/10 hover:border-white/50",
  black: "bg-black text-white hover:bg-neutral-800 shadow-sm",
  ghostLight: "bg-white text-brand hover:bg-slate-100",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "min-h-11 px-5 text-[0.95rem]",
  lg: "min-h-13 px-6 text-base",
};

export function buttonClasses(variant: ButtonVariant = "primary", size: ButtonSize = "md", className?: string) {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-lg font-semibold transition-colors duration-200",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );
}

type ButtonLinkProps = Omit<ComponentProps<typeof Link>, "className"> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: IconName;
  className?: string;
};

export function ButtonLink({ variant, size, icon, className, children, ...props }: ButtonLinkProps) {
  return (
    <Link className={buttonClasses(variant, size, className)} {...props}>
      {icon && <Icon name={icon} size={20} />}
      {children}
    </Link>
  );
}

export function IconBadge({ name, dark = false, className }: { name: IconName; dark?: boolean; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-12 shrink-0 items-center justify-center rounded-xl",
        dark ? "bg-white/10 text-accent-300" : "bg-accent-50 text-accent-700",
        className,
      )}
    >
      <Icon name={name} size={24} />
    </span>
  );
}
