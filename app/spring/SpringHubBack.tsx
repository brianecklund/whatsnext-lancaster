"use client";

import { useRouter } from "next/navigation";

export default function SpringHubBack() {
  const router = useRouter();

  return (
    <div className="springHubBackBar">
      <button
        type="button"
        className="springHubBackBtn"
        onClick={() => {
          if (typeof window !== "undefined" && window.history.length > 1) {
            router.back();
            return;
          }
          router.push("/");
        }}
      >
        ← Back
      </button>
    </div>
  );
}
