import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { Group } from '../schemas/group.schema';
import { CreateGroupInput } from '../inputs/create-group.input';
import { AddUserToGroupInput } from '../inputs/add-user-to-group.input';
import { Post } from '../schemas/post.schema';
import { PostService } from '../services/post.service';
import { CreatePostInput } from '../inputs/create-post.input';
import { CreateMessageInput } from '../inputs/create-message.input';

@Resolver(()=> Post)
export class PostResolver {
  constructor(private postService: PostService) {}

  @Mutation(() => Post)
  async createPost(@Args('createPostInput') post: CreatePostInput) {
    return this.postService.createPost(post);
  }

  @Mutation(() => Post)
  async addCommentToPost(@Args('addCommentToPostInput') addCommentToPostInput: CreateMessageInput) {
    return this.postService.addCommentToPost(addCommentToPostInput);
  }
}
