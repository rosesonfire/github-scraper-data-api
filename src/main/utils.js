// Creates a new promise object
export const createDefensivePromise = (executorFunc) =>
  new Promise((resolve, reject) => {
    try {
      Promise.resolve(executorFunc(resolve, reject)).catch(err => reject(err))
    } catch (e) {
      reject(e)
    }
  })
