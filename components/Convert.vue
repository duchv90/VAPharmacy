<template>
  <div class="mt-5 rounded-md bg-white p-4 shadow-md">
    <h2 class="mb-4 text-lg font-semibold text-gray-800">
      Bước 2: Convert data từ file upload ở bước 1
    </h2>
    <button
      class="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold uppercase text-white"
      @click="onClick"
    >
      Chuyển đổi dữ liệu
    </button>
    <div
      v-if="convertMessage.text"
      :class="{
        'text-green-600': convertMessage.type === 'success',
        'text-red-600': convertMessage.type === 'error',
      }"
      class="mt-4"
    >
      {{ convertMessage.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const convertMessage = reactive({ text: '', type: '' });

const onClick = async () => {
  const response: null | { success: boolean; message: string } = await $fetch(
    '/api/data',
    {
      method: 'POST',
    },
  );

  if (response && response.success) {
    convertMessage.text = 'Convert data success';
    convertMessage.type = 'success';
  } else {
    convertMessage.text = 'Convert data failed';
    convertMessage.type = 'error';
  }
};
</script>
