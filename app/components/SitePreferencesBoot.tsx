"use client";

import { useLayoutEffect } from "react";
import { bootSitePreferencesFromStorage } from "@/lib/site-preferences";

export default function SitePreferencesBoot() {
  useLayoutEffect(() => {
    bootSitePreferencesFromStorage();
  }, []);
  return null;
}
