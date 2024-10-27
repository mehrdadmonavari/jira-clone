import { z } from "zod";
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { signInSchema, signUpSchema } from "../schemas";

const app = new Hono()
   .post("/login", zValidator("json", signInSchema), async (c) => {
      const { email, password } = await c.req.valid("json");
      console.log("====================================");
      console.log(email, password);
      console.log("====================================");
      return c.json({ email, password });
   })
   .post("/register", zValidator("json", signUpSchema), async (c) => {
      const { name, email, password } = await c.req.valid("json");
      console.log("====================================");
      console.log(name, email, password);
      console.log("====================================");
      return c.json({ name, email, password });
   });

export default app;
