/**
 * Вычисляет процентное соотношение двух чисел.
 * Возвращает количество процентов, которое составляет число a от числа b.
 *
 * @param {number} a - Число, процентное соотношение которого нужно вычислить
 * @param {number} b - Базовое число, от которого вычисляется процент
 *
 * @returns {number} Процентное соотношение числа a от числа b
 *
 * @throws {TypeError} Если один или оба аргумента не являются числами
 * @throws {Error} Если один или оба аргумента равны NaN
 * @throws {Error} Если b равно 0, а a не равно 0 (деление на ноль)
 */

export const percentage = (a: number, b: number): number => {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new TypeError('Аргументы должны быть числами')
  }

  if (isNaN(a) || isNaN(b)) {
    throw new Error('Аргументы не должны быть NaN')
  }

  if (b === 0) {
    if (a === 0) {
      return 0
    } else {
      throw new Error('Невозможно вычислить процент от нуля (деление на ноль)')
    }
  }

  return (a / b) * 100
}
