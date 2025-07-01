export function prependApiUrl(path: string) {
  return `${process.env.REACT_APP_HOST_BACKEND}${path}`
}
