type HeroIconName =
  | "badge-check"
  | "check"
  | "x"
  | "chevron-left"
  | "chevron-right"
  | "sun"
  | "moon"
  | "menu"
  | "eye"
  | "eye-off";

type IconMap = {
  [P in HeroIconName]: (strokeWidth: number) => JSX.Element;
};

const iconMap: IconMap = {
  "badge-check"(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
      />
    );
  },
  check(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M5 13l4 4L19 7"
      />
    );
  },
  x(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M6 18L18 6M6 6l12 12"
      />
    );
  },
  "chevron-left"(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M15 19l-7-7 7-7"
      />
    );
  },
  "chevron-right"(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M9 5l7 7-7 7"
      />
    );
  },
  sun(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    );
  },
  moon(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    );
  },
  menu(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M4 6h16M4 12h16M4 18h16"
      />
    );
  },
  eye(strokeWidth = 2) {
    return (
      <>
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
        />
      </>
    );
  },
  "eye-off"(strokeWidth = 2) {
    return (
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={strokeWidth}
        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
      />
    );
  },
};

type HeroIconProps = {
  name: HeroIconName;
  className?: string;
  strokeWidth?: number;
  fill?: "none" | "currentColor";
};

const HeroIcon = ({
  name,
  className = "",
  strokeWidth = 2,
  fill = "none",
}: HeroIconProps) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill}
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      {iconMap[name](strokeWidth)}
    </svg>
  );
};

export default HeroIcon;
