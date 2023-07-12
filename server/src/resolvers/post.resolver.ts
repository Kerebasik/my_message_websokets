import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Post } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { CreatePostInput } from '../inputs/create-post.input';

@Resolver(()=> Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') post: CreatePostInput) {
    return this.postService.createPost(post);
  }
}
