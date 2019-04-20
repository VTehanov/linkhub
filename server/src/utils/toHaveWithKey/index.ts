interface Object {
  [key: string]: any
}

export const toHaveWithKey = (arr: Object[], keyValue: Object) => {
  const key = Object.keys(keyValue)[0]
  const value = keyValue[key]

  return !!arr.find(item => {
    return key in item && item[key] === value
  })
}
