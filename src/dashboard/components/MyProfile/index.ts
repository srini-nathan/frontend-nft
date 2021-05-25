import react from 'react'
import { useQuery } from "@apollo/client"
import { ME_QUERY } from "../../../auth/graphql/queries/ME_QUERY"
import { MeQuery, MeQuery_me } from "../../../auth/graphql/queries/__generated__/MeQuery"

export const MyProfile = () => {
  const { data, loading, error } = useQuery<MeQuery, MeQuery_me>(ME_QUERY)

  return { data, loading, error }
}