import { MetadataRoute } from 'next';
import { PROJECTS } from '@/lib/portfolio-data';
import { SERVICES } from '@/lib/services-data';

/**
 * Sitemap — generated at build time from the live route map.
 *
 * Top-level routes are listed explicitly. Portfolio case studies and
 * service detail pages are derived from the same data the pages
 * themselves read, so adding a Project or a Service automatically
 * extends the sitemap without a separate edit.
 *
 * Removed stale entries from the old Inspire PC build (`/gallery`,
 * `/warranty`, `/troubleshooting`, `/order`) — those routes were
 * deleted in the brand pivot and were 404ing crawlers.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://inspirepc.com';
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/services`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/portfolio`, lastModified, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/contact`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/quote`, lastModified, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/login`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, lastModified, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const portfolioRoutes: MetadataRoute.Sitemap = PROJECTS.map((p) => ({
    url: `${baseUrl}/portfolio/${p.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: p.featured ? 0.8 : 0.6,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${baseUrl}/services/${s.slug}`,
    lastModified,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...portfolioRoutes, ...serviceRoutes];
}
