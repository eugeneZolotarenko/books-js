export const delay = (fn, ms) => {
  let timer = 0
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(fn.bind(this, ...args), ms || 0)
  }
}

export const getLocalStorageItem = (name) => {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name)
  }
}
