import { Suspense } from 'react'
import { GraphQLTaggedNode, PreloadedQuery, usePreloadedQuery } from 'react-relay'

import type { SearchMovieByTitleQuery } from '../SearchMovie/__generated__/SearchMovieByTitleQuery.graphql'

type Props = {
  query: GraphQLTaggedNode,
  queryReference: PreloadedQuery<SearchMovieByTitleQuery>
}

export const SearchList = ({ queryReference, query, }: Props) => {
  const data = usePreloadedQuery(query, queryReference)

  const { searchMovieByTitle } = data

  return (
    <Suspense fallback={<h1>searching</h1>}>
      {/* {
        searchMovieByTitle?.edges?.length === 0 &&
        <option>
          any movie found
        </option>
      } */}
      {
        searchMovieByTitle?.edges?.map(edge => {
          return (
            <option
              // id="movie"
              key={edge?.node?.id}
              value={edge?.node?.id}
            >
              {edge?.node?.title}
            </option>
          )
        })
      }
    </Suspense>
  )
}