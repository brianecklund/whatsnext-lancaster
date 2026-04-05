/** Brief pulse flag for hub spotlight icons (CSS targets `[data-hub-pulse="true"]`). */
export function hubSpotlightPulse(el: HTMLElement) {
  el.dataset.hubPulse = "true";
  window.setTimeout(() => {
    delete el.dataset.hubPulse;
  }, 420);
}
