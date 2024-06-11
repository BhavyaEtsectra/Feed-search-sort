import { Request, Response } from 'express';
import { PostService } from '../services/postService';
import { Post } from '../models/Post';

export class PostController {
  private postService = new PostService();

  getPosts = (req: Request, res: Response): void => {
    console.log('getPosts called');
    const { query, sortField, sortOrder, page, pageSize } = req.query;
    const results = this.postService.searchPosts(
      query as string,
      (sortField as keyof Post) || 'name',
      (sortOrder as 'asc' | 'desc') || 'asc',
      Number(page) || 1,
      Number(pageSize) || 10
    );
    res.json(results);
  };

  // Ensure this method is implemented
  getAllPosts = (req: Request, res: Response): void => {
    console.log('getAllPosts called');
    const posts = this.postService.getAllPosts();
    res.json(posts);
  };
  
}


