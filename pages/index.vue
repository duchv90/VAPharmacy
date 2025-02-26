<template>
  <div class="homepage container py-5">
    <div v-if="data == null">KHÔNG CÓ KẾT QUẢ</div>
    <template v-else>
      <div class="font-bold">
        Tổng số thuốc: {{ data?.data?.records?.length }}
      </div>
      <div class="py-3 font-medium">
        Đã update từ nhathuoc24h:
        {{ data?.data?.records?.filter((item) => item.isUpdated).length }}
      </div>
    </template>
    <table
      class="mt-2 w-full table-auto border-separate border border-slate-500"
    >
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
          <template v-for="(value, key, rIndex) in record" :key="key">
            <template v-if="rIndex < 9">
              <td
                v-if="key !== 'minPrice' && key.toString().includes('vendor_')"
                :class="{
                  'bg-purple-100':
                    value === record.minPrice && record.minPrice !== 0,
                }"
                class="border border-slate-200 px-2"
              >
                {{ formatMoney(value as number) }}
              </td>
              <td
                v-else-if="key !== 'minPrice'"
                class="border border-slate-200 px-2"
              >
                <span v-if="key === 'id'">{{ index + 1 }}</span>
                <span v-else>{{ value }}</span>
              </td>
            </template>
          </template>
          <td class="note border border-slate-200 px-2">
            <div class="w-80 border border-slate-500 bg-slate-300 p-2 text-xs">
              <div class="uppercase">Thu Thảo - chothuoc24h.vn</div>
              <p v-if="'meta' in record">
                Sản phẩm: {{ record.meta?.nhathuoc24h?.name || '' }}
              </p>
              <p v-if="'meta' in record">
                Common name: {{ record.meta?.nhathuoc24h?.common_name || '' }}
              </p>
              <p v-if="'meta' in record">
                Web volumn: {{ record.meta?.nhathuoc24h?.web_volume || '' }}
              </p>
            </div>
          </td>
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
