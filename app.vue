<template>
  <div class="min-h-screen flex flex-col bg-gradient-to-b from-white to-blue-50">
    <!-- ヘッダー -->
    <header class="bg-white shadow-md py-4">
      <div class="max-w-4xl mx-auto flex items-center justify-between px-4">
        <h1 class="text-lg font-bold text-blue-600">
          HINASELECT
        </h1>
      </div>
    </header>

    <!-- ページコンテンツ -->
    <main class="flex-1 bg-[#7cc7e8]">
      <NuxtPage />
    </main>

    <!-- フッター -->
    <footer class="bg-white py-4 border-t">
      <div class="max-w-4xl mx-auto text-center text-sm text-gray-500">
        © 2025 HINASELECT
      </div>
    </footer>
  </div>
</template>
