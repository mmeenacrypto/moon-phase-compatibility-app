import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const compatibilityResults = pgTable("compatibility_results", {
  id: serial("id").primaryKey(),
  person1Type: text("person1_type").notNull(), // 'date' or 'celebrity'
  person1Value: text("person1_value").notNull(), // date string or celebrity slug
  person2Type: text("person2_type").notNull(),
  person2Value: text("person2_value").notNull(),
  compatibilityScore: integer("compatibility_score").notNull(),
  person1MoonPhase: text("person1_moon_phase").notNull(),
  person1ZodiacSign: text("person1_zodiac_sign").notNull(),
  person2MoonPhase: text("person2_moon_phase").notNull(),
  person2ZodiacSign: text("person2_zodiac_sign").notNull(),
  shareUrl: text("share_url").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCompatibilityResultSchema = createInsertSchema(compatibilityResults).omit({
  id: true,
});

export const compatibilityRequestSchema = z.object({
  person1Type: z.enum(['date', 'celebrity']),
  person1Value: z.string(),
  person2Type: z.enum(['date', 'celebrity']),
  person2Value: z.string(),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type CompatibilityResult = typeof compatibilityResults.$inferSelect;
export type InsertCompatibilityResult = z.infer<typeof insertCompatibilityResultSchema>;
export type CompatibilityRequest = z.infer<typeof compatibilityRequestSchema>;
