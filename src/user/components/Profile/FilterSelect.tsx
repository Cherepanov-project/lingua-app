import type { SelectChangeEvent, SelectProps, SxProps } from '@mui/material'
import { Select, MenuItem } from '@mui/material'
import { useState } from 'react'

/**
 * Свойства компонента FilterSelect.
 *
 * @template T - Тип объекта, представляющего одну опцию в списке.
 * @param optionsList - Массив опций для отображения в выпадающем списке.
 * @param placeholder - Текст-подсказка, отображаемый когда ничего не выбрано.
 * @param displayLabelKey - Имя свойства в объекте `T`, значение которого будет отображаться пользователю.
 * @param valueKey - Имя свойства в объекте `T`, значение которого используется как уникальный идентификатор опции (value).
 * @param onSelectionChange - Опциональный обработчик, вызываемый при изменении выбора. Получает уникальное значение (`T[valueKey]`) выбранной опции или пустую строку.
 * @param selectedValue - Опциональное значение, контролирующее, какая опция считается выбранной. Делает компонент контролируемым.
 */
type FilterSelectOwnProps<T> = {
  optionsList: T[]
  placeholder: string
  displayLabelKey: keyof T
  valueKey: keyof T
  onSelectionChange?: (selectedValue: string | number | '' /* или readonly string[] */) => void
  selectedValue?: string | number | '' /* или readonly string[] */
}

// Ограничиваем тип значения, которое может быть использовано как `value` в MenuItem
type ValidValue = string | number // | readonly string[]; // Убираем массивы для простоты, если не нужны

type FilterSelectProps<T> = FilterSelectOwnProps<T> &
  Omit<
    SelectProps<ValidValue | ''>,
    'value' | 'onChange' | 'displayEmpty' | 'renderValue' | 'children'
  >

/**
 * Универсальный компонент выпадающего списка.
 * Позволяет отображать список опций любого типа и выбирать одну из них.
 * Для работы необходимо указать, какие свойства объекта опции использовать для отображения текста и для уникального значения.
 *
 * @template T - Тип объекта, представляющего одну опцию в списке. T[valueKey] должен быть string или number.
 */
const FilterSelect = <T extends Record<K, ValidValue>, K extends keyof T>({
  optionsList,
  placeholder,
  displayLabelKey,
  valueKey,
  onSelectionChange,
  selectedValue: externalSelectedValue,
  ...restSelectProps
}: FilterSelectProps<T> & { valueKey: K }) => {
  // Уточняем, что valueKey имеет тип K
  // Используем ValidValue | '' для правильной типизации состояния
  const [internalSelectedValue, setInternalSelectedValue] = useState<ValidValue | ''>('')
  const currentSelectedValue =
    externalSelectedValue !== undefined ? externalSelectedValue : internalSelectedValue

  // Явно типизируем event
  const handleChange = (event: SelectChangeEvent<ValidValue | ''>) => {
    const value = event.target.value
    if (externalSelectedValue === undefined) {
      // Убеждаемся, что тип совместим
      setInternalSelectedValue(value)
    }
    onSelectionChange?.(value)
  }

  return (
    <Select<ValidValue | ''>
      {...restSelectProps}
      value={currentSelectedValue}
      onChange={handleChange}
      displayEmpty
      renderValue={(selected) => {
        if (selected === '' || selected === undefined) {
          return <em>{placeholder}</em>
        }
        // Используем == для гибкости сравнения разных типов (string/number)
        // Явно приводим selected к ValidValue для сравнения
        const selectedItem = optionsList.find(
          (option) => option[valueKey] == (selected as ValidValue)
        )
        return selectedItem ? String(selectedItem[displayLabelKey]) : placeholder
      }}
      sx={selectStyles}
    >
      <MenuItem disabled value="">
        <em>{placeholder}</em>
      </MenuItem>
      {optionsList.map((option) => {
        // Получаем значение ключа. Оно гарантированно ValidValue из-за ограничения T extends Record<K, ValidValue>
        const value = option[valueKey] // T[K], где K - это valueKey, и T[K] extends ValidValue
        const label = String(option[displayLabelKey])
        // key должен быть строкой
        return (
          <MenuItem key={String(value)} value={value}>
            {label}
          </MenuItem>
        )
      })}
    </Select>
  )
}

export { FilterSelect }

///////////////////////////////////////////////////////////////////////////////

const selectStyles: SxProps = {
  borderRadius: '3rem',
  border: '1px solid #000000',
  width: '100%',

  '& svg': {
    display: 'none',
  },

  '&.Mui-focused': {
    border: '1px solid transparent',
  },

  '& .MuiSelect-select': {
    color: '#888',
    fontSize: '20px',
    lineHeight: '2',
    padding: '0 18px',
  },
}
