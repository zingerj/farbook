import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      fid: number;
    };
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("jwt", { token, user, account, profile, isNewUser });
      return {
        ...token,
        user,
      };
    },
    session: ({ session, token, ...props }) => {
      console.log({ session, token, ...props });
      if (!token.sub) {
        return session;
      }
      return {
        ...session,
        user: {
          fid: parseFloat(token.sub),
        },
      };
    },
  },
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      credentials: {
        fid: { label: "fid", type: "string" },
        username: { label: "username", type: "text" },
        bio: { label: "bio", type: "text" },
        display_name: { label: "displayName", type: "text" },
        pfp_url: { label: "pfpUrl", type: "text" },
        verifications: { label: "verifications", type: "text" },
        custody: { label: "custody", type: "text" },
      },
      async authorize(c) {
        // if the user calls the route with no fid, return null
        if (!c?.fid) return null;

        // populate the user object
        const user = {
          id: c.fid,
          fid: parseFloat(c.fid),
          username: c.username,
          bio: c.bio,
          display_name: c.display_name,
          pfp_url: c.pfp_url,
          verifications: c.verifications,
          custody: c.custody,
        };

        // return the user object signs them in
        return user;
      },
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
