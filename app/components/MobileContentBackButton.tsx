"use client";

type Props = {
  onBack: () => void;
  label?: string;
};

export default function MobileContentBackButton({ onBack, label = "Back" }: Props) {
  return (
    <button type="button" className="mobileContentBackBtn" onClick={onBack}>
      <span className="mobileContentBackBtn__arrow" aria-hidden>
        ←
      </span>
      {label}
    </button>
  );
}
