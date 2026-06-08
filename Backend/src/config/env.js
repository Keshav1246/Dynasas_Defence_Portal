const { z } = require("zod");

const envSchema = z.object({
  PORT: z.string().default("5000"),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().min(1),
  NODE_ENV: z.string().default("development"),
});

const env = envSchema.parse(process.env);

module.exports = env;