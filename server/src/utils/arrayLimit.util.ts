export function arrayLimit<T>(val: T[]) {
  return 2 <= val.length && 10 >= val.length;
}
