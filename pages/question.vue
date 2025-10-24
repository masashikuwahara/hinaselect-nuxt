<template>
  <div class="p-6 max-w-xl mx-auto text-center">
    <h2 v-if="store.questions.length" class="text-xl font-bold mb-6">
      質問 {{ store.currentIndex + 1 }} / {{ store.questions.length }}
    </h2>

    <transition name="fade-question" mode="out-in">
      <div
        v-if="store.currentQuestion"
        :key="store.currentIndex"
        class="bg-white p-6 rounded-2xl shadow-xl transition-all duration-500 ease-out"
      >
        <p class="text-lg font-semibold mb-6">
          {{ store.currentQuestion.text }}
        </p>

        <div class="space-y-3">
          <button
            v-for="(option, index) in store.currentQuestion.options"
            :key="index"
            @click="handleAnswer(option.category)"
            class="block w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-xl text-lg transition transform hover:scale-105"
          >
            {{ option.text }}
          </button>
        </div>
      </div>

      <div v-else key="loading" class="text-gray-500 mt-6">
        質問を読み込んでいます…
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useQuestionStore } from '~/stores/question'
import questions from '~/data/questions_balanced.json'
import { useRouter } from 'vue-router'

const store = useQuestionStore()
const router = useRouter()

onMounted(() => {
  if (!store.questions.length) {
    store.setQuestions(questions)
  }
})

function handleAnswer(category) {
  try {
    const isLast = store.currentIndex === store.questions.length - 1

    store.answer(category)

    if (isLast) {
      router.push('/result')
    }
  } catch (e) {
    console.error('handleAnswer error:', e)
  }
}
</script>

<style scoped>
.fade-question-enter-active,
.fade-question-leave-active {
  transition: all 0.5s ease;
}
.fade-question-enter-from {
  opacity: 0;
  transform: translateY(20px) scale(0.98);
}
.fade-question-leave-to {
  opacity: 0;
  transform: translateY(-15px) scale(0.98);
}
</style>