import { AssemblyAI } from "assemblyai";
import { env } from "~/env.mjs";

const assemblyAIClient = new AssemblyAI({
  apiKey: env.ASSEMBLY_AI_API_KEY,
});

export default assemblyAIClient;
