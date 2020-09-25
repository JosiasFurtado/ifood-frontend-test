import React from 'react'
import cx from 'classnames'
import { IoIosSearch } from 'react-icons/io'
import { AiOutlineLoading } from 'react-icons/ai'
import Input from './Input'
import { Filters } from '~/types'
import useAPIFilters from '~/hooks/useAPIFilters'

export interface FiltersProps {
  readonly className?: string
  readonly value: Filters
  readonly onChange: (value: Filters) => void
}

const FiltersComponent: React.FC<FiltersProps> = ({
  className,
  onChange,
  value = {},
}) => {
  const { data: filtersData } = useAPIFilters()
  const handleFilterChange = (
    filterName: keyof Filters,
    filterValue: any
  ): void => {
    const newValue: Filters = { ...value, [filterName]: filterValue }
    onChange(newValue)
  }

  return (
    <div className={cx('relative', className)}>
      <div className="relative mb-4">
        <IoIosSearch
          size={23}
          className="absolute top-0 bottom-0 ml-2 h-full text-gray-500"
        />
        <input
          className="bg-gray-700 text-white rounded-lg outline-none px-10 py-2 text-lg w-full shadow-md"
          placeholder="Search by name"
          onChange={(e) => handleFilterChange('query', e.target.value)}
        />
      </div>
      {!value ? (
        <div>
          <AiOutlineLoading className="animate-spin text-white" size={25} />
        </div>
      ) : (
        <div className="flex flex-row overflow-x-auto">
          {filtersData?.filters.map((filter) => {
            if (filter.id !== 'timestamp') {
              return (
                <Input
                  key={filter.id}
                  filter={filter}
                  value={value[filter.id]}
                  onChange={handleFilterChange}
                  className="mr-4"
                />
              )
            }
          })}
          <input
            type="date"
            onChange={(e) => handleFilterChange('timestamp', e.target.value)}
            className="text-white flex bg-gray-700 items-center py-2 px-3 rounded-lg outline-none "
          />
        </div>
      )}
    </div>
  )
}

FiltersComponent.displayName = 'FiltersComponent'

export { FiltersComponent }
export default FiltersComponent
