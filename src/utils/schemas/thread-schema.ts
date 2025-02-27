import { z } from 'zod';

export const createThreadSchema = z.object({
  content: z.string().max(500),
  images: z.instanceof(FileList),
});

export type CreateThreadSchemaDTO = z.infer<typeof createThreadSchema>;
