import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface'

export const corsOptions: CorsOptions = {
  origin: [
    'http://local.thinhnguyen.me:5174',
    'http://localhost:5174',
    'https://thinhnvt.vercel.app',
    'https://thinhnguyen-nguyenvanthinh2000s-projects.vercel.app/',
    'https://thinhnguyen-git-dev-nguyenvanthinh2000s-projects.vercel.app/',
  ],
  methods: 'GET,POST,PATCH,DELETE',
  credentials: true,
  allowedHeaders: 'Content-Type,Authorization',
}
