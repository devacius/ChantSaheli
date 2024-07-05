
import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt';
import { signupInput,signinInput,createBlogInput,updateBlogInput } from '../../../node_modules/@brokencoder/medium-clone-common/disc/index';
export const userRouter= new Hono<{ Bindings:{
    DATABASE_URL: string,
    JWT_SECRET: string
  },
  Variables: {
	userID:any
  }}>();
userRouter.post('/signup', async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate()); 
   
      const body = await c.req.json();
      const {success}=signupInput.safeParse(body);
      if(!success){
      try {
          const user = await prisma.user.create({
              data: {
                  email: body.email,
                  password: body.password
              }
          });
          console.log(user);
          const jwt = await sign({ id: user.id }, c.env?.JWT_SECRET);
          return c.json({ jwt });
      } catch(e) {
          c.status(403);
          return c.json({ error: "error while signing up" });
      }
    }
  })
  userRouter.post('/signin', async (c) => {
    const prisma = new PrismaClient({
          datasourceUrl: c.env?.DATABASE_URL	,
      }).$extends(withAccelerate());
  
      const body = await c.req.json();
      const {success}=signinInput.safeParse(body);
      if(!success){
      const user = await prisma.user.findUnique({
          where: {
              email: body.email,
        password: body.password,
          }
      });
  
      if (!user) {
          c.status(403);
          return c.json({ error: "user not found" });
      }
  
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    }
  
  })