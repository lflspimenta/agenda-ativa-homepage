/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingIncludes: {
    "/agenda": ["./private/agenda-wedding-final.html"]
  }
};

export default nextConfig;
