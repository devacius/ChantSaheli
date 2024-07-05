import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign,verify,decode } from 'hono/jwt';
import { Hono } from 'hono';
import { signupInput,signinInput,createBlogInput,updateBlogInput } from '@brokencoder/medium-clone-common/disc/index';

export const blogRouter = new Hono<{
    Bindings:{
        DATABASE_URL: string,
        JWT_SECRET: string
      },
      Variables: {
        userID:any
      }}>();

      blogRouter.use("/*",async (c,next)=>{
        const token=c.req.header('Authorization') || "";
        
        const user=await verify(token,c.env.JWT_SECRET);
        if(!user){
          c.status(403);
          return c.json({error:'unauthorized'})
        }
        console.log(user.id);
        c.set('userID',user.id);
        await next();
      });

      blogRouter.post('/',async (c)=>{
      const body= await c.req.json();
      const {success}=createBlogInput.safeParse(body);
      if(!success){
      const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const userid=c.get('userID');
        const blog=await prisma.post.create({
            data:{
                title:body.title,
                content:body.content,
                authorId:userid,
            }
      });

       return c.json({
        id:blog.id,
       })
      }
    })
    blogRouter.put('/',async (c)=>{
      const body= await c.req.json();
      const {success}=updateBlogInput.safeParse(body);
      if(!success){
      const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const blog=await prisma.post.update({
          where:{
            id:body.id
          },
            data:{
                title:body.title,
                content:body.content,
                
            }
      });
    }

    })
    blogRouter.get('/bulk',async (c)=>{
      const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        const blog=await prisma.post.findMany();
        return c.json(blog);
    })
    blogRouter.get('/:id',async (c)=>{
      const blogid=c.req.param('id');
      console.log(blogid);
      const prisma= new PrismaClient({
        datasourceUrl:c.env?.DATABASE_URL,
        }).$extends(withAccelerate());
        try{
          const blog=await prisma.post.findUnique({
            where:{
              id:blogid,
            }
           
        });
        return c.json(blog);
        }catch(e){
          c.status(411);
          return c.json({error:'not found'})
        }
        
    })

    //* Pagination - limit and offset
