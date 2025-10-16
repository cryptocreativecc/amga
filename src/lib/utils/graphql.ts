import { GraphQLClient } from 'graphql-request';

const WORDPRESS_GRAPHQL_URL = 'https://wordpress.codemash.dev/graphql';

export const graphqlClient = new GraphQLClient(WORDPRESS_GRAPHQL_URL);

// Types for WordPress GraphQL responses
export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  categories?: {
    nodes: Category[];
  };
  featuredImage?: {
    node: {
      sourceUrl: string;
      altText: string;
    };
  };
}

export interface PostsResponse {
  posts: {
    nodes: Post[];
  };
}

export interface PostResponse {
  post: Post;
}

// GraphQL queries
export const GET_POSTS_QUERY = `
  query GetPosts {
    posts {
      nodes {
        id
        title
        slug
        date
        excerpt
        categories {
          nodes {
            id
            name
            slug
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
      }
    }
  }
`;

export const GET_POST_BY_SLUG_QUERY = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      slug
      date
      content
      excerpt
      categories {
        nodes {
          id
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

// API functions
export async function getPosts(): Promise<Post[]> {
  try {
    const data: PostsResponse = await graphqlClient.request(GET_POSTS_QUERY);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const data: PostResponse = await graphqlClient.request(GET_POST_BY_SLUG_QUERY, { slug });
    return data.post;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}
