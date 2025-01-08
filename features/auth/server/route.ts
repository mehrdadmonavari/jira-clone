import { Hono } from "hono";
import { deleteCookie, setCookie } from "hono/cookie";
import { zValidator } from "@hono/zod-validator";
import { ID } from "node-appwrite";
import { createAdminClient } from "@/lib/appwrite";
import { sessionMiddleware } from "@/lib/session-middleware";
import { signInSchema, signUpSchema } from "../schemas";
import { AUTH_COOKIE } from "../constants";

const app = new Hono()
   .get("/current", sessionMiddleware, async (c) => {
      const user = c.get("user");

      return c.json({ data: user });
   })
   .post("/login", zValidator("json", signInSchema), async (c) => {
      const { email, password } = await c.req.valid("json");
      const { account } = createAdminClient();

      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
         path: "/",
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true });
   })
   .post("/register", zValidator("json", signUpSchema), async (c) => {
      const { name, email, password } = await c.req.valid("json");
      const { account } = await createAdminClient();

      await account.create(ID.unique(), email, password, name);
      const session = await account.createEmailPasswordSession(email, password);

      setCookie(c, AUTH_COOKIE, session.secret, {
         path: "/",
         httpOnly: true,
         secure: true,
         sameSite: "strict",
         maxAge: 60 * 60 * 24 * 30,
      });

      return c.json({ success: true });
   })
   .post("/logout", sessionMiddleware, async (c) => {
      const account = c.get("account");

      deleteCookie(c, AUTH_COOKIE);
      await account.deleteSession("current");

      return c.json({ success: true });
   });

export default app;
