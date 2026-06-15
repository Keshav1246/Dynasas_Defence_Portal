const { z } = require("zod");

const createSettingsSchema = z.object({
  primaryColor: z.string().optional(),
  accentColor: z.string().optional(),
  backgroundDark: z.string().optional(),
  textColor: z.string().optional(),

  primaryLogo: z.string().optional(),
  darkLogo: z.string().optional(),
  favicon: z.string().optional(),

  headingFont: z.string().optional(),
  bodyFont: z.string().optional(),

  linkedinUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  youtubeUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  facebookUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  instagramUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),

  portalName: z.string().max(100, "Max 100 characters").optional(),
  siteName: z.string().max(100, "Max 100 characters").optional(),
  siteDescription: z.string().max(500, "Max 500 characters").optional(),
  supportEmail: z.string().email("Must be a valid email").optional().or(z.literal("")),
  supportPhone: z.string().optional(),
  
  defaultLanguage: z.string().optional(),
  timezone: z.string().optional(),
  maintenanceMode: z.boolean().optional()
});

const updateSettingsSchema = createSettingsSchema.partial();

module.exports = {
  createSettingsSchema,
  updateSettingsSchema
};
