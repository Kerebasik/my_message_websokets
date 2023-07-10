import { Group } from '../schemas/group.schema';
import { Post } from '../schemas/post.schema';

type GroupBox = {
  value: Group
}

type PostBox = {
  value: Post
}

export type ReceiverType = GroupBox | PostBox