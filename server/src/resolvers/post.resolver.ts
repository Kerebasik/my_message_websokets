import { Resolver, Args, Mutation } from '@nestjs/graphql';
import { Post } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { CreatePostInput } from '../inputs/create-post.input';
import { AdminGuard } from '../guards/admin.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(()=> Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  @UseGuards(AdminGuard)
  async createPost(@Args('input') post: CreatePostInput) {
    return this.postService.createPost(post);
  }
}
