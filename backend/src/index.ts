import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt'
import { userRouter} from './routes/user/user';
import { blogRouter} from './routes/blog/blog';


const app = new Hono<{
  Bindings:{
    DATABASE_URL: string
    JWT_SECRET: string
  }
}>()

app.get('/', (c) => {
  
  return c.text('Hello Hono!')
  
}) 
app.route("api/v1/user",userRouter);
app.route("api/v1/blog",blogRouter);	

export default app
