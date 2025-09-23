const basePath = `/memory-game`;

const nextConfig = {
  output: 'export',
  basePath: basePath,
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;
