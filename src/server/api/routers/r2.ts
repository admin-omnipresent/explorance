import { ListObjectsCommand } from "@aws-sdk/client-s3";
import { R2 } from "~/lib/R2";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const r2Router = createTRPCRouter({
  fetchBucketContent: publicProcedure.query(async () => {
    const fetchBucketItems = new ListObjectsCommand({
      Bucket: "explorance-assets",
    });
    const response = await R2.send(fetchBucketItems);
    return {
      CDN_Response: response.Contents,
    };
  }),
});
