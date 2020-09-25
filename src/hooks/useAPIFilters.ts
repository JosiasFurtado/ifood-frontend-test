import useSWR from 'swr'

interface FiltersRouteResult {
  filters: Filter[]
}

export interface Filter {
  id: 'timestamp' | 'offset' | 'limit' | 'country' | 'locale' | 'query'
  name: string
  values?: Value[]
  validation?: Validation
}

interface Validation {
  primitiveType: string
  entityType?: string
  pattern?: string
  min?: number
  max?: number
}

interface Value {
  value: string
  name: string
}

export const useAPIFilters = () => {
  return useSWR<FiltersRouteResult>('/api/filters')
}

export default useAPIFilters
