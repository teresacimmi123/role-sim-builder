// GTM dataLayer helper
declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export const pushEvent = (data: Record<string, unknown>) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
};
