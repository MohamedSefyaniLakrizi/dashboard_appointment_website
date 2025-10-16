import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/meeting/:path*",
        headers: [
          {
            key: "Permissions-Policy",
            value:
              "microphone=*, camera=*, speaker-selection=*, display-capture=*",
          },
          {
            key: "Cross-Origin-Embedder-Policy",
            value: "unsafe-none",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self' *.8x8.vc *.jitsi.net",
          },
        ],
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
