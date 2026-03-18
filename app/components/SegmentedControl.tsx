"use client";

import { useMemo } from "react";

type SegmentedOption = {
  key: string;
  label: string;
  disabled?: boolean;
};

type Props = {
  options: SegmentedOption[];
  activeKey: string;
  onChange: (key: string) => void;
  className?: string;
  ariaLabel?: string;
};

export default function SegmentedControl({ options, activeKey, onChange, className = "", ariaLabel }: Props) {
  const activeIndex = useMemo(() => {
    const idx = options.findIndex((option) => option.key === activeKey);
    return idx >= 0 ? idx : 0;
  }, [activeKey, options]);

  return (
    <div className={`segmentedControl ${className}`.trim()} role="tablist" aria-label={ariaLabel}>
      <div
        className="segmentedThumb"
        aria-hidden="true"
        style={{
          width: `${100 / Math.max(options.length, 1)}%`,
          transform: `translateX(${activeIndex * 100}%)`,
        }}
      />
      {options.map((option) => {
        const active = option.key === activeKey;
        return (
          <button
            key={option.key}
            type="button"
            role="tab"
            aria-selected={active}
            disabled={option.disabled}
            data-active={active ? "true" : "false"}
            className="segmentedButton"
            onClick={() => {
              if (!option.disabled && option.key !== activeKey) onChange(option.key);
            }}
          >
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
