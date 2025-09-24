import React from 'react';
import { DocsThemeConfig, useConfig } from 'nextra-theme-docs';
import { useRouter } from 'next/router';
import Search from '@components/Search';

function useHead() {
  const { asPath } = useRouter();
  const { frontMatter, title } = useConfig();
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fivem-seba-stuff.github.io/docs';
  const url = `${baseUrl}${asPath}`;
  const description = frontMatter.description || "Seba FiveM Docs Hub - Documentation for FiveM/RedM scripts and resources";

  return (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <link rel="icon" type="image/x-icon" href="/static/cox.ico" />
      <meta httpEquiv="Content-Language" content="en" />
      <meta name="description" content={description} />
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:url" content={url} />
      <meta name="og:image" content={`${baseUrl}/static/og-image.png`} />
    </>
  );
}

function useNextSeoProps() {
  const { asPath } = useRouter();
  const arr = asPath.replace(/[-_]/g, ' ').split('/');
  const category = (arr[1][0] !== '#' && arr[1]) || 'Seba FiveM Docs Hub';
  const rawTitle = arr[arr.length - 1];
  const title = /[a-z]/.test(rawTitle) && /[A-Z]/.test(rawTitle) ? rawTitle : '%s';

  return {
    titleTemplate: `${title} - ${
      rawTitle === category ? 'Documentation' : category.replace(/(^\w|\s\w)/g, (m) => m.toUpperCase())
    }`,
  };
}

const config: DocsThemeConfig = {
  logo: (
    <div
      style={{
        paddingLeft: '50px',
        lineHeight: '38px',
        fontWeight: 550,
      }}
    >
      Seba FiveM Docs Hub
    </div>
  ),
  project: {
    link: 'https://github.com/fivem-seba-stuff/docs',
  },
  chat: {
    link: 'https://discord.gg/fivem-seba-stuff',
  },
  docsRepositoryBase: 'https://github.com/fivem-seba-stuff/docs/blob/main',
  footer: {
    text: 'Seba FiveM Docs Hub - FiveM Script Documentation',
  },
  search: {
    component: <Search />,
  },
  head: useHead,
  primaryHue: { dark: 200, light: 200 },
  sidebar: {
    defaultMenuCollapseLevel: 1,
  },
  toc: {
    backToTop: true,
  },

  useNextSeoProps: useNextSeoProps,
};

export default config;
