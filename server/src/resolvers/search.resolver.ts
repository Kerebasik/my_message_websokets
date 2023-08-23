import { Resolver, Args, Query } from '@nestjs/graphql';
import { SearchService } from '../services/search.service';
import { SearchResultsOutput } from '../outputs/search-results.output';

@Resolver()
export class SearchResolver {
  constructor(private searchService: SearchService) {}

  @Query(() => [SearchResultsOutput])
  async findAllBySearchQuery(@Args('query') query: string) {
    return this.searchService.findAllBySearchQuery(query);
  }
}
