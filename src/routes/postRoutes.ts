import { Router } from 'express';
import { PostController } from '../controllers/postController';

const router = Router();
const postController = new PostController();

router.get('/posts', postController.getPosts);
router.get('/all-posts', postController.getAllPosts);
console.log('Route /all-posts registered');


export default router;
