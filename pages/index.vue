<template>
  <div class="homepage container py-5">
    <div v-if="data == null">KHÔNG CÓ KẾT QUẢ</div>
    <div v-else>Tổng số thuốc: {{ data?.data?.records?.length }}</div>
    <table class="w-full table-auto border-separate border border-slate-500">
      <thead>
        <tr>
          <th
            v-for="(header, index) in data?.data?.headers"
            :key="index"
            class="border border-green-800 bg-green-300"
          >
            {{ header }}
          </th>
          <th class="border border-green-800 bg-green-300">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(record, index) in data?.data?.records" :key="index">
          <template v-for="(value, key) in record" :key="key">
            <td
              v-if="key !== 'minPrice' && key.toString().includes('vendor_')"
              :class="{
                'bg-purple-100': value === record.minPrice,
              }"
              class="border border-slate-200 px-2"
            >
              {{ formatMoney(value as number) }}
            </td>
            <td
              v-else-if="key !== 'minPrice'"
              class="border border-slate-200 px-2"
            >
              {{ value }}
            </td>
          </template>
          <td class="note border border-slate-200 px-2">&nbsp;</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
useSeoMeta({
  title: 'Trang chủ',
  ogTitle: 'Trang chủ',
  description: 'Trang web được xây dựng bởi hvduc.com',
  ogDescription: 'Trang web được xây dựng bởi hvduc.com',
});

const { data } = await useFetch('/api/data', {
  method: 'GET',
});
</script>
