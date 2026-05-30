import { z } from 'zod/v4'

export const workFrontmatterSchema = z.object({
  slug: z.string(),
  title: z.string(),
  subtitle: z.string(),
  year: z.string(),
  client: z.string(),
  type: z.string(),
  tags: z.array(z.string()),
  role: z.string(),
  featured: z.boolean().default(false),
  featuredOrder: z.number().optional(),
  thumbnailImage: z.string().optional(),
  heroImage: z.string().optional(),
  galleryImages: z.array(z.string()).default([]),
  galleryLayout: z.enum(['pattern', 'full', 'mobile']).default('pattern'),
  galleryRowPattern: z.array(z.number()).optional(),
  galleryMobileIndices: z.array(z.number()).optional(),
  galleryTheme: z.enum(['dark', 'light']).default('dark'),
  externalUrl: z.string().optional(),
})

export const profileFrontmatterSchema = z.object({
  name: z.string(),
  title: z.string(),
  location: z.string(),
  coordinates: z.string(),
  email: z.string(),
  phone: z.string().optional(),
  availability: z.enum(['available', 'unavailable', 'limited']),
  socialLinks: z.array(
    z.object({
      label: z.string(),
      url: z.string(),
    })
  ),
  services: z.array(z.string()),
  experience: z.array(
    z.object({
      period: z.string(),
      role: z.string(),
      company: z.string(),
      location: z.string().optional(),
      description: z.union([z.string(), z.array(z.string())]).optional(),
    })
  ),
  clients: z.array(z.string()).default([]),
  recognition: z.array(
    z.object({
      title: z.string(),
      org: z.string(),
      year: z.string().optional(),
    })
  ).default([]),
  skills: z.object({
    summary: z.string(),
    items: z.array(z.string()),
    tools: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }).optional(),
  homeIntro: z.array(z.string()).optional(),
  tagline: z.string().optional(),
  availability_label: z.string().optional(),
})

export type WorkFrontmatter = z.infer<typeof workFrontmatterSchema>
export type ProfileFrontmatter = z.infer<typeof profileFrontmatterSchema>
