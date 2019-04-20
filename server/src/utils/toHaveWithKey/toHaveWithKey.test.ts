import { toHaveWithKey } from '.'

describe('toHaveWithKey()', () => {
  test('it returns proper values', () => {
    const arr = [{ id: 2 }, { name: 'Simon' }]
    const keyValue = { name: 'Simon' }
    const missingKeyValue = { age: 35 }

    expect(toHaveWithKey(arr, keyValue)).toBeTruthy()
    expect(toHaveWithKey(arr, missingKeyValue)).toBeFalsy()
  })
})
