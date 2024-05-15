import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "../trpc";
import assemblyAIClient from "~/lib/assemblyAI";

export const assemblyAIRouter = createTRPCRouter({
  sendChatQuery: publicProcedure
    .input(z.object({ query: z.string(), transcription_id: z.string() }))
    .mutation(async ({ input }) => {
      const user_query = input.query;
      const transcription_id = input.transcription_id;
      const { response } = await assemblyAIClient.lemur.task({
        transcript_ids: [transcription_id],
        prompt: user_query,
      });

      return {
        LeMUR_response: response,
      };
    }),
});
