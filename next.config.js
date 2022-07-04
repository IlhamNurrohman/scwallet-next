module.exports = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  },
  images: {
    domains: ['res.cloudinary.com'],
    loader: 'imgix',
    path: 'https://res.cloudinary.com/dd1uwz8eu/image/upload/v1653276449/'
  },
};