import { NeynarAPIClient } from "@neynar/nodejs-sdk";
import { env } from "~/env";

export const neynar = new NeynarAPIClient(env.NEYNAR_API_KEY);
