import 'server-only';

import {
  HeaderNavQuery,
  HeroQuery,
  LogoWallQuery,
  CustomerPostQuery,
} from '@/types';
import { contentGQLQuery } from './fetch';

export const getSlugsForPosts = async () => {
  const query = `
    {
        customerPostCollection {
          items {
            slug
            }
          }
        }
    `;

  const data = await contentGQLQuery<{
    customerPostCollection: {
      items: { slug: string }[];
    };
  }>({ query });

  if (!data) {
    throw new Error('oops');
  }
  return data;
};

export const getContentForCustomerPost = async (slug: string) => {
  const query = `#graphql
      query CustomerPostCollection($where: CustomerPostFilter) {
        customerPostCollection(where: $where) {
          items {
            title
            slug
            customer {
              logo {
                url
                width
                height
                title
              }
              name
            }
            body {
              json
            }
          }
        }
      }
    `;

  const data = await contentGQLQuery<CustomerPostQuery>({
    query,
    variables: {
      where: {
        slug,
      },
    },
  });

  if (
    !data ||
    !data.customerPostCollection ||
    data.customerPostCollection.items.length === 0
  ) {
    console.error(`No customer post found for slug: ${slug}`);
    throw new Error(`No customer post found for slug: ${slug}`);
  }

  return data.customerPostCollection.items[0];
};

export const getContentForHeaderNav = async () => {
  const query = `#graphql
        query NavigationCollection($where: NavigationFilter) {
            navigationCollection(where: $where) {
                items {
                name
                linksCollection {
                    items {
                    link
                    label
                    }
                }
                }
            }
            }
    
    `;
  const data = await contentGQLQuery<HeaderNavQuery>({
    query,
    variables: {
      where: {
        name: 'Header',
      },
    },
  });

  if (!data) {
    throw new Error('oops');
  }
  return data;
};

export const getContentForLogoWall = async () => {
  const query = `#graphql
    query Asset($where: AssetFilter) {
        assetCollection(where: $where) {
            items {
              width
              url
             title
              height
        }
    }
    }
  `;
  const data = await contentGQLQuery<LogoWallQuery>({
    query,
    variables: {
      where: {
        title_contains: 'client',
      },
    },
  });
  if (!data) {
    throw new Error('oops');
  }
  return data;
};

export const getContentForHero = async (isDraft = false) => {
  const query = `#graphql 
    query HeroCollection {
        heroCollection(preview: ${isDraft ? 'true' : 'false'}) {
            items {
            title
            subtitle
            preTitle
            callToActionsCollection {
                items {
                link
                label
                }
            }
}      
        }
     }
`;
  const data = await contentGQLQuery<HeroQuery>({ query, preview: isDraft });

  if (!data) {
    throw Error('oops');
  }
  return data;
};
