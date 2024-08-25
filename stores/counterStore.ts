export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 122555
  }),
  actions: {
    increment () {
      this.count++
    },
    decrement () {
      this.count--
    },
    reset () {
      this.count = 0
    },
    increment2x () {
      this.count *= 2
    }
  }
})
