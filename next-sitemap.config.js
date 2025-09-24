/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://fivem-seba-stuff.github.io/docs',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  outDir: './out',
  exclude: [
    '/404',
    '/500',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: [
      'https://fivem-seba-stuff.github.io/docs/sitemap.xml',
    ],
  },
};
