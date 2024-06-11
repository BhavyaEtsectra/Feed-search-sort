import { PostService } from '../services/postService';

describe('PostService', () => {
  let postService: PostService;

  beforeEach(() => {
    postService = new PostService();
  });

  test('searchPosts should return filtered results', () => {
    const results = postService.searchPosts('king', 'name', 'asc', 1, 10);
    expect(results.total).toBeGreaterThan(0);
  });

  test('searchPosts should handle exact match', () => {
    const results = postService.searchPosts('"Dynamic Infrastructure Designer"', 'name', 'asc', 1, 10);
    expect(results.results.length).toBe(1);
    expect(results.results[0].name).toBe('Dynamic Infrastructure Designer');
  });
});
