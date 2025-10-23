<template>
  <div class="p-4 sm:p-6 max-w-md sm:max-w-xl mx-auto">
    <h2 class="text-xl sm:text-2xl font-bold text-center mb-6">
      質問 {{ currentIndex + 1 }} / {{ questions.length }}
    </h2>

    <transition name="fade" mode="out-in">
      <div :key="currentIndex" class="bg-white/90 p-4 sm:p-6 rounded-xl shadow-lg text-center">
        <p class="text-base sm:text-lg font-semibold mb-4">
          {{ currentQuestion.text }}
        </p>

        <div class="space-y-3">
          <button
            v-for="(option, index) in currentQuestion.options"
            :key="index"
            @click="answer(option.category)"
            class="block w-full bg-[#7cc7e8] hover:bg-[#5eb8da] text-white py-3 rounded-xl transition text-base sm:text-lg font-semibold"
          >
            {{ option.text }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'

import questions from '../data/questions_balanced.json'

const scores = ref({})
const currentIndex = ref(0)
const router = useRouter()

const currentQuestion = computed(() => questions[currentIndex.value])

function answer(category) {
  if (!scores.value[category]) scores.value[category] = 0
  scores.value[category] += 1

  if (currentIndex.value < questions.length - 1) {
    currentIndex.value++
  } else {
    router.push({
      path: '/result',
      query: { scores: JSON.stringify(scores.value) }
    })
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.4s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
