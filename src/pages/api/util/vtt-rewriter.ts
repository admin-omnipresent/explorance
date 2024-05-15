import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url = req.query?.url;

  if (typeof url !== "string" || !url) {
    return res.status(400).json({ error: "Missing valid VTT file URL" });
  }

  try {
    const originalResponse = await fetch(url);
    const text = await originalResponse.text();

    // Add "WEBVTT" and blank line
    const fixedText = text.includes("WEBVTT") ? text : "WEBVTT\n\n${text}";

    res.setHeader("Content-Type", "text/vtt");
    return res.status(200).send(fixedText);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to rewrite VTT file" });
  }
}
