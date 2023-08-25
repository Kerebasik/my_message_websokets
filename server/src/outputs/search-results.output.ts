import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SearchResultsOutput {
  @Field()
  _id: string;
}
