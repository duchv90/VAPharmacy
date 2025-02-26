<template>
  <div class="mt-5 rounded-md bg-white p-4 shadow-md">
    <h2 class="mb-4 text-lg font-semibold text-gray-800">
      Bước 3: Fetch dữ liệu
    </h2>
    <button
      class="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold uppercase text-white"
      @click="onClick"
    >
      Lấy dữ liệu từ các nhà thuốc
    </button>
    <div
      v-if="fetchDataMessage.text"
      :class="{
        'text-green-600': fetchDataMessage.type === 'success',
        'text-red-600': fetchDataMessage.type === 'error',
      }"
      class="mt-4"
    >
      {{ fetchDataMessage.text }}
    </div>
  </div>
</template>
<script setup lang="ts">
const fetchDataMessage = reactive({ text: '', type: '' });

const onClick = async () => {
  fetchDataMessage.text = 'Đang lấy dữ liệu...';
  fetchDataMessage.type = 'info';

  try {
    const response: null | { success: boolean } = await $fetch(
      '/api/data/fetch',
      {
        method: 'POST',
        body: JSON.stringify({
          token: 'test_token',
        }),
      },
    );
    if (response && response.success) {
      fetchDataMessage.text =
        'Lấy dữ liệu thành công. Bạn có thể quay về trang chủ để xem dữ liệu.';
      fetchDataMessage.type = 'success';
    } else {
      fetchDataMessage.text = 'Lấy dữ liệu thất bại';
      fetchDataMessage.type = 'error';
    }
  } catch {
    fetchDataMessage.text = 'Có lỗi xảy ra khi lấy dữ liệu';
    fetchDataMessage.type = 'error';
  }
};
</script>
