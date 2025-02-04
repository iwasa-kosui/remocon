export const assertsNever = (value: never) => {
  throw new Error(`Unexpected value: ${value}`)
}
