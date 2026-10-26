// FixGHL line icons: 24px grid, 1.5 stroke, round caps and joins, no fills. One family only.
const paths = {
  arrow: "M5 12h14M13 6l6 6-6 6",
  arrowDown: "M12 5v14M6 13l6 6 6-6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  plus: "M12 5v14M5 12h14",
  menu: "M4 8h16M4 16h16",
  close: "M6 6l12 12M18 6L6 18",
  search: "M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20",
  calendar: "M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zM4 10h16M8 3v4M16 3v4",
  pen: "M4 20l4-1L19 8a2.1 2.1 0 0 0-3-3L5 16zM14 7l3 3",
  wrench: "M14.5 5.5a4 4 0 0 0 4.9 4.9L20 11l-9 9a2.1 2.1 0 0 1-3-3l9-9 .6.6zM14.5 5.5L16 4",
  flow: "M6 4h4v4H6zM14 16h4v4h-4zM8 8v4a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2",
  move: "M4 8h13M13 4l4 4-4 4M20 16H7M11 12l-4 4 4 4",
  layers: "M12 4l8 4-8 4-8-4zM4 12l8 4 8-4M4 16l8 4 8-4",
  plug: "M9 3v5M15 3v5M7 8h10v3a5 5 0 0 1-10 0zM12 16v5",
  page: "M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6",
  mail: "M4 6h16v12H4zM4 7l8 6 8-6",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, className = "size-5", label }: { name: IconName; className?: string; label?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={label ? undefined : true}
      role={label ? "img" : undefined}
      aria-label={label}
    >
      <path d={paths[name]} />
    </svg>
  );
}
