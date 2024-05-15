import OpenAi from "openai";
import { env } from "~/env.mjs";

export const openAI = new OpenAi({ apiKey: env.OPENAI_API_KEY });
