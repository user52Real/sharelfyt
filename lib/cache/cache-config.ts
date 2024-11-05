import { unstable_cache } from 'next/cache';

export const CACHE_TAGS = {
  products: 'products',
  users: 'users',
  posts: 'posts',
} as const;

export async function cachedFetch<T>(
  url: string,
  tags: string[],
  revalidate: number = 3600
): Promise<T> {
  return unstable_cache(
    async () => {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`Failed to fetch: ${url}`);
      return res.json();
    },
    [url],
    {
      tags,
      revalidate,
    }
  )();
}