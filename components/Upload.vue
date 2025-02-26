<template>
  <div class="rounded-md bg-white p-4 shadow-md">
    <h2 class="mb-4 text-lg font-semibold text-gray-800">
      Bước 1: Upload file gốc:
    </h2>
    <div class="flex items-center space-x-4">
      <label for="file" class="text-sm font-semibold text-gray-600">
        Chọn file sheet cần update
      </label>
      <input ref="fileInput" type="file" @change="onFileChange" />
      <button
        class="rounded-md bg-indigo-600 px-5 py-2 text-sm font-semibold uppercase text-white"
        @click="uploadFile"
      >
        Upload
      </button>
    </div>
    <div
      v-if="uploadMessage.text"
      :class="{
        'text-green-600': uploadMessage.type === 'success',
        'text-red-600': uploadMessage.type === 'error',
      }"
      class="mt-4"
    >
      {{ uploadMessage.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);
const uploadMessage = reactive({ text: '', type: '' });

const clearInput = () => {
  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const onFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  selectedFile.value = target.files ? target.files[0] : null;
};

const uploadFile = async () => {
  if (!selectedFile.value) {
    uploadMessage.text = 'No file selected';
    uploadMessage.type = 'error';
    return;
  }

  const formData = new FormData();
  formData.append('file', selectedFile.value);

  try {
    const response: null | { success: boolean; message: string } = await $fetch(
      '/api/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    if (response && response.success) {
      uploadMessage.text = response.message;
      uploadMessage.type = 'success';
      selectedFile.value = null;
      clearInput();
    } else {
      throw new Error('Error uploading file');
    }
  } catch {
    uploadMessage.text = 'Error uploading file';
    uploadMessage.type = 'error';
  }
};
</script>
