// Lightweight client-side event tracking for smoke-test / fake-door measurement.
// Fires to Plausible + GTM dataLayer if present, always dispatches a CustomEvent
// and logs to console so events are verifiable in dev and on Lovable/analytics.

type TrackProps = Record<string, unknown>;

export function track(event: string, props?: TrackProps): void {
  if (typeof window === "undefined") return;

  // Plausible (if installed)
  (window as unknown as { plausible?: (e: string, o?: { props: TrackProps }) => void }).plausible?.(
    event,
    props ? { props } : undefined
  );

  // GTM / dataLayer (if present)
  (window as unknown as { dataLayer?: unknown[] }).dataLayer?.push({ event, ...props });

  // Always: custom event any listener can hook + console for verification
  window.dispatchEvent(new CustomEvent(event, { detail: props }));
  console.debug("[track]", event, props ?? {});
}
