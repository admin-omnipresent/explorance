import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { r2Router } from "./routers/r2";
import { openAIRouter } from "./routers/openAI";
import { dbRouter } from "./routers/db";
import { assemblyAIRouter } from "./routers/assemblyai";

export const appRouter = createTRPCRouter({
  r2: r2Router,
  openAI: openAIRouter,
  supabaseDB: dbRouter,
  assemblyAI: assemblyAIRouter,
});

export type AppRouter = typeof appRouter;
export const createCaller = createCallerFactory(appRouter);
