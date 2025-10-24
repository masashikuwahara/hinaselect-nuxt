import { defineStore } from 'pinia'

export const useQuestionStore = defineStore('question', {
  state: () => ({
    currentIndex: 0,
    scores: {},
    questions: [],
    isFinished: false,
  }),

  getters: {
    currentQuestion(state) {
      return state.questions[state.currentIndex] || null
    },
    totalQuestions(state) {
      return state.questions.length
    },
    topCategory(state) {
      const sorted = Object.entries(state.scores).sort((a, b) => b[1] - a[1])
      return sorted.length ? sorted[0][0] : null
    },
  },

  actions: {
    setQuestions(data) {
      this.questions = data
      this.currentIndex = 0
      this.scores = {}
      this.isFinished = false
    },
    answer(category) {
      if (!this.questions.length) return
      this.scores[category] = (this.scores[category] || 0) + 1

      if (this.currentIndex < this.questions.length - 1) {
        this.currentIndex++
      } else {
        this.isFinished = true
      }
    },
    reset() {
      this.currentIndex = 0
      this.scores = {}
      this.isFinished = false
    },
    getTopCategory() {
      const sorted = Object.entries(this.scores).sort((a, b) => b[1] - a[1])
      return sorted[0]?.[0] || null
    },
  },
})
