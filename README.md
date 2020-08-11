# Gh Replicant

This application consists of a reproduction of the user search in Github. It is a very simplified version with a very similar styling. The running demo can be checked [here](https://carniatto.github.io/gh-replicant)

## - Design decisions

### 1. **Nx workspace**

Use Nx workspace for better tooling for building and generating code. This monorepo approach is also my personal preference in terms of code structuring, having features as lazy loaded angular libs.

### 2. **Normalize.css**

Use normalize.css to make it consistent cross-browser base styling. Also there is not other css framework in place, since I decided to replicate as much as possible the styling from Github and doing so manually was more practical.

### 3. **NGXS for state management**

The use of a state management here might be overkill. However, this solution is ready to be scaled up. NGXS gives little boiler plate leveraging typescript decorators and allowing the states to be composed as features are added.

### 4. **Implement e2e tests**

I've opted to implement e2e tests to assure the minimal requirements are satisfied before working in more features that were not specified.

## - Possible improvements

1. Treat query timeout on GH REST API ([link](https://developer.github.com/changes/2014-04-07-understanding-search-results-and-potential-timeouts/))
1. Add unit testing
1. Add translation
1. Caching user details
1. Refactor the styles to be more reusable
1. Saving the search parameters in query-params in the url

## - Limitations

1. The open GH REST API `/search/user?q=query` does not expose the follower/following count or location. Therefore was needed to iterate on the results from this call and fetch more details for each user.

1. The open GH REST API has a [rate limit](https://docs.github.com/en/rest/reference/rate-limit) of 10 searches per minute which can be limiting if the user paginates very quickly. This could be improved by fetching more pages at once and doing a mixed pagination in memory and on the server.

1. The open GH REST API only allow access to the first 1000 results of a search. Since the results per page is fixed and equal to 10, the total of pages will always be 100 or less even if there are more results.

## - Development / deployment

To run this project locally clone this repository and run `yarn install` to install all dependencies.

1. To start thee development service run `nx serve userSeeker`
1. To run the e2e tests run `nx e2e userSeeker`
1. To check the dependency graph run `nx dep-graph`
1. To build for production and deploy to gh-pages run `ng deploy --base-href=/gh-replicant/`
