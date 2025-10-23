<template>
  <div class="p-6 max-w-2xl mx-auto text-center">
    <h1 class="text-2xl font-bold mb-4">診断結果</h1>

    <div v-if="topCategory" class="bg-white/90 p-6 rounded-2xl shadow-md">
      <h2 class="text-xl font-semibold mb-3 text-[#7cc7e8]">
        あなたのタイプは「{{ topCategory }}」！
      </h2>

      <p class="text-gray-700 mb-6">
        このタイプに最も近いメンバーを紹介します。
      </p>

      <div
        v-if="topMembers.length"
        class="grid grid-cols-2 sm:grid-cols-3 gap-4 justify-center"
      >
        <div
          v-for="(member, i) in topMembers"
          :key="i"
          class="bg-white rounded-xl overflow-hidden shadow hover:scale-105 transition"
        >
          <img :src="member.image" :alt="member.name" class="w-full h-40 object-cover" />
          <div class="p-3">
            <h3 class="font-bold text-sm">{{ member.name }}</h3>
            <p class="text-xs text-gray-600 mt-1">{{ member.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <p class="text-gray-600">診断データが見つかりません。</p>
    </div>

    <div class="mt-8">
      <NuxtLink
        to="/"
        class="bg-[#7cc7e8] hover:bg-[#5eb8da] text-white px-6 py-3 rounded-xl transition"
      >
        もう一度診断する
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import members from '~/data/members.js'

const route = useRoute()
const scores = JSON.parse(route.query.scores || '{}')

const topCategory = Object.keys(scores).reduce((a, b) =>
  scores[a] > scores[b] ? a : b
, null)

const topMembers = members.filter(member => member.categories[topCategory])
</script>
