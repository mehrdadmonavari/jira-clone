"use server";

import { createAdminClient } from "@/lib/appwrite";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { OAuthProvider } from "node-appwrite";

export async function signUpWithGithub() {
   const { account } = await createAdminClient();

   const origin = headers().get("origin");
   // const successUrl = `http://localhost:3000/oauth/`;
   // const failureUrl = `http://localhost:3000/oauth/`;
   console.log('====================================');
   console.log("origin: " + origin);
   console.log('====================================');
   const redirectUrl = await account.createOAuth2Token(
      OAuthProvider.Github,
      `${origin}/oauth`,
      `${origin}/sign-up`
   );
   // const redirectUrl = await account.createOAuth2Token(
   //    OAuthProvider.Github,
   //    successUrl,
   //    failureUrl
   // );
   return redirect(redirectUrl);
}
