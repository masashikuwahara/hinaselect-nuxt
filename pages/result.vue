<script setup>
import { useQuestionStore } from '~/stores/question'
import members from '~/data/members.js'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useQuestionStore()

const topCategory = computed(() => store.getTopCategory())

const matchedMembers = computed(() => {
  if (!topCategory.value) return []
  return members.filter(m => Object.keys(m.categories).includes(topCategory.value))
})

onMounted(() => {
  if (!store.isFinished) {
    router.push('/question')
  }
})

function retry() {
  store.reset()
  router.push('/question')
}
</script>

<template>
  <transition name="fade" appear>
    <div class="max-w-4xl mx-auto p-6 text-center bg-gradient-to-b from-blue-50 to-white rounded-2xl shadow-inner">
      <h1 class="text-3xl font-bold mb-6 text-blue-700 tracking-wide">診断結果</h1>

      <transition name="fade-up" mode="out-in">
        <div v-if="topCategory" key="result" class="animate-fadeIn">
          <p class="text-lg mb-4">
            あなたのタイプは
            <span class="font-bold text-blue-600 text-xl">{{ topCategory }}</span>
            タイプです！
          </p>

          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-8">
            <transition-group name="pop" tag="div" class="contents">
              <div
                v-for="member in matchedMembers"
                :key="member.name"
                class="bg-white shadow-md rounded-xl p-4 hover:scale-105 transition-transform hover:shadow-lg"
              >
                <img
                  :src="member.image"
                  :alt="member.name"
                  class="w-full h-40 object-cover rounded-lg"
                />
                <h2 class="mt-3 font-semibold text-gray-800">{{ member.name }}</h2>
                <p class="text-sm text-gray-500 mt-1">{{ member.description }}</p>
              </div>
            </transition-group>
          </div>

          <button
            @click="retry"
            class="mt-8 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
          >
            もう一度診断する
          </button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<style scoped>
/* フェード全体 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 下からふわっと */
.fade-up-enter-active {
  transition: all 0.6s ease;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* 各メンバーカードのポップアニメーション */
.pop-enter-active {
  transition: all 0.4s ease-out;
}
.pop-enter-from {
  opacity: 0;
  transform: scale(0.9);
}

/* フェードインアニメーション */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.8s ease-out;
}
</style>
