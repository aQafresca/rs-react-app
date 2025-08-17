import z from 'zod';

export const CharacterSchema = z.object({
  id: z.number(),
  name: z.string(),
  status: z.string(),
  species: z.string(),
  gender: z.string(),
  image: z.string(),
  origin: z.object({
    name: z.string(),
    url: z.string(),
  }),
  location: z.object({
    name: z.string(),
    url: z.string(),
  }),
});

export const InfoSchema = z.object({
  count: z.number(),
  pages: z.number(),
  next: z.string().nullable(),
  prev: z.string().nullable(),
});

export const ApiResponseSchema = z.object({
  info: InfoSchema,
  results: z.array(CharacterSchema),
});

export type TCharacter = z.infer<typeof CharacterSchema>;
export type TApiResponse = z.infer<typeof ApiResponseSchema>;
