/** @type {import('next').NextConfig} */

import withPWAInit from "next-pwa";

const withPWA = withPWAInit({
  dest: "public",
  scope: "/admin/",
  cacheStartUrl: false,
  // Keep authenticated pages and responses out of the runtime cache.
  runtimeCaching: [
    { urlPattern: ({ url }) => url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/") || url.hostname.endsWith(".supabase.co"), handler: "NetworkOnly" },
    { urlPattern: ({ request }) => ["image", "font", "style", "script"].includes(request.destination), handler: "StaleWhileRevalidate", options: { cacheName: "ergosits-assets", expiration: { maxEntries: 100, maxAgeSeconds: 604800 } } },
  ],
  disable: process.env.NODE_ENV === "development",
  buildExcludes: [/middleware-manifest.json$/],
});

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["uonnzayemmpyrnmriohl.supabase.co"],
  },
};

export default withPWA(nextConfig);