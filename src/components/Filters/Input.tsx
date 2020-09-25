import React, { useMemo } from 'react'
import cx from 'classnames'
import { Menu, MenuList, MenuButton, MenuItem } from '@reach/menu-button'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { Filters } from '~/types'
import { Filter } from '~/hooks/useAPIFilters'

export interface InputProps {
  readonly className?: string
  readonly filter: Filter
  readonly value: string | number | undefined
  onChange(filterName: keyof Filters, filterValue: any): void
}

const Input: React.FC<InputProps> = ({
  className,
  filter,
  value,
  onChange
}) => {
  const amountArray = useMemo(() => {
    if (filter.validation?.min && filter.validation?.max) {
      var start = filter.validation.min
      var array: number[] = []
      while (start <= filter.validation.max) {
        array.push(start)
        start++
      }
      return array
    }
  }, [filter.validation?.min])

  const isValueInput = filter.validation?.min
  const amountOfItems =
    (filter.values && filter.values.length > 8) ||
    (amountArray && amountArray?.length > 8)

  return (
    <Menu>
      <MenuButton
        className={cx(
          'text-gray-500 flex bg-gray-700 items-center py-2 px-3 rounded-lg',
          className
        )}
      >
        {filter.name}:{' '}
        <span className="text-white ml-1">{value || 'Selecione'}</span>{' '}
        <MdKeyboardArrowDown size={22} className="ml-2" />
      </MenuButton>
      <MenuList
        className={cx(
          'rounded-lg text-white',
          amountOfItems ? 'overflow-y-scroll h-64' : ''
        )}
        style={{
          backgroundColor: '#4a5568',
          fontSize: 16,
          width: 200,
        }}
      >
        {isValueInput && amountArray
          ? amountArray?.map((amount) => (
            <MenuItem key={String(amount)} onSelect={() => onChange(filter.id, amount)}>
              {amount}
            </MenuItem>
          ))
          : filter.values?.map((item) => (
            <MenuItem key={item.name} onSelect={() => onChange(filter.id, item.value)}>
              {item.name}
            </MenuItem>
          ))}
      </MenuList>
    </Menu>
  )
}

Input.displayName = 'Input'

export { Input }
export default Input
