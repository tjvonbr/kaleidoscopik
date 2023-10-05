import { TNL } from "tnl-midjourney-api";

export const tnl = new TNL(process.env.NEXT_LEG_API_KEY || "");
