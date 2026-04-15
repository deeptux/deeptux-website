import { DeeptuxLogoDark } from "@/components/brand/DeeptuxLogoDark";

type Props = {
  variant?: "hero" | "nav";
  className?: string;
  /** Overrides raster mark sizing (e.g. smaller when an external “DEEPTUX” wordmark sits next to the mark) */
  markClassName?: string;
};

export function BrandLogo({
  variant = "hero",
  className = "",
  markClassName,
}: Props) {
  const nav = variant === "nav";
  const defaultNavMark =
    "h-9 w-auto max-w-[150px] object-contain object-left sm:h-10 sm:max-w-[170px]";
  return (
    <div
      className={`inline-flex shrink-0 items-center justify-center ${
        nav
          ? "h-9 min-w-0 px-0 py-0.5 sm:h-10"
          : "max-w-[min(100%,320px)] px-1 py-1 sm:max-w-[360px]"
      } ${className}`}
    >
      <DeeptuxLogoDark
        decorative={nav}
        className={
          nav
            ? markClassName ?? defaultNavMark
            : (markClassName ??
              "h-auto w-full max-h-[7.5rem] object-contain object-left sm:max-h-[8.5rem]")
        }
      />
    </div>
  );
}
