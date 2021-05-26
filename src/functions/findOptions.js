/*
 *	Функция поиска элемента в массиве
 */
export function findOptions (id, options, select = 'id') {
  if (id !== undefined && options !== undefined) {
    for (let i = options.length - 1; i >= 0; i--) {
      if (options[i] && options[i][select] === id) {
        return options[i]
      }
    }
  } else {
    return undefined
  }
}

/*
 *  Функция поиска ключа элемента в массиве
 */
export function findKey (id, options, select = 'id') {
  for (let i = options.length - 1; i >= 0; i--) {
    if (options[i] && options[i][select] === id) {
      return i
    }
  }
}
