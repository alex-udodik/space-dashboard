import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow the LAN address to load /_next/* dev resources (HMR + JS chunks).
  // Without this, opening the app via the network IP in dev fails to hydrate,
  // leaving buttons unresponsive. Add other dev hosts here as needed.
  allowedDevOrigins: ["192.168.1.6"],
};

export default nextConfig;
