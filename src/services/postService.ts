import { Post } from '../models/Post';
import * as mockData from '../data/mock_data.json';
import { fileURLToPath } from 'url';

export class PostService {
  private posts: Post[] = (mockData as any).default;

  searchPosts(query: string, sortField: keyof Post, sortOrder: 'asc' | 'desc', page: number, pageSize: number): { results: Post[], total: number } {
    let filteredPosts = this.posts;

    // Implement search logic
    if (query) {
      if (query.startsWith('"') && query.endsWith('"')) {
        // Handle exact match (case-insensitive)
        const exactQuery = query.slice(1, -1).toLowerCase();
        filteredPosts = filteredPosts.filter((post) => 
          post.name.toLowerCase().includes(exactQuery) ||
          post.description.toLowerCase().includes(exactQuery)
        );
      } else {
        // Handle partial match (case-insensitive)
        const lowerQuery = query.toLowerCase();
        filteredPosts = this.filterPartialMatch(lowerQuery, filteredPosts);
      }
    }

    // Implement sort logic
    filteredPosts.sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    // Implement pagination
    const total = filteredPosts.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedPosts = filteredPosts.slice(startIndex, startIndex + pageSize);

    return { results: paginatedPosts, total };
  }

  // New method to return all posts
  getAllPosts(): Post[] {
    return this.posts;
  }

  // Function for partial match
  filterPartialMatch = (query: string, posts: Post[]): Post[] => {
    const results: Post[] = [];
    for (const post of posts) {
      if (
        post.name.toLowerCase().includes(query) ||
        post.description.toLowerCase().includes(query)
      ) {
        results.push(post);
      }
    }
    return results;
  };
}