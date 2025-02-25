<template>
  <div class="homepage container">
    <div v-if="data == null">No data</div>
    <div v-else>{{ data.message }}</div>
    <table class="w-full table-auto border-separate border border-slate-500">
      <thead>
        <tr>
          <th class="border border-green-800 bg-green-300">STT</th>
          <th class="border border-green-800 bg-green-300">Nhóm thuốc</th>
          <th class="border border-green-800 bg-green-300">Tên thuốc</th>
          <th class="border border-green-800 bg-green-300">Đơn vị</th>
          <th class="border border-green-800 bg-green-300">Số lượng</th>
          <th class="border border-green-800 bg-green-300">Thế Thảo</th>
          <th class="border border-green-800 bg-green-300">Bách Hóa T</th>
          <th class="border border-green-800 bg-green-300">Giá thuốc tốt</th>
          <th class="border border-green-800 bg-green-300">Top thuốc</th>
          <th class="border border-green-800 bg-green-300">Note</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td class="border border-slate-200 px-2 text-center">1</td>
          <td class="border border-slate-200 px-2">Tim mạch</td>
          <td class="border border-slate-200 px-2">Aspirin 100 TPC</td>
          <td class="border border-slate-200 px-2 text-center">Hộp</td>
          <td class="border border-slate-200 px-2 text-center">1</td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2"></td>
        </tr>
        <tr>
          <td class="border border-slate-200 px-2 text-center">2</td>
          <td class="border border-slate-200 px-2">Tim mạch</td>
          <td class="border border-slate-200 px-2">Aspirin 100 TPC</td>
          <td class="border border-slate-200 px-2 text-center">Hộp</td>
          <td class="border border-slate-200 px-2 text-center">1</td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2"></td>
        </tr>
        <tr>
          <td class="border border-slate-200 px-2 text-center">3</td>
          <td class="border border-slate-200 px-2">Tim mạch</td>
          <td class="border border-slate-200 px-2">Aspirin 100 TPC</td>
          <td class="border border-slate-200 px-2 text-center">Hộp</td>
          <td class="border border-slate-200 px-2 text-center">1</td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2"></td>
        </tr>
        <tr>
          <td class="border border-slate-200 px-2 text-center">4</td>
          <td class="border border-slate-200 px-2">Tim mạch</td>
          <td class="border border-slate-200 px-2">Aspirin 100 TPC</td>
          <td class="border border-slate-200 px-2 text-center">Hộp</td>
          <td class="border border-slate-200 px-2 text-center">1</td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2"></td>
        </tr>
        <tr>
          <td class="border border-slate-200 px-2 text-center">5</td>
          <td class="border border-slate-200 px-2">Tim mạch</td>
          <td class="border border-slate-200 px-2">Aspirin 100 TPC</td>
          <td class="border border-slate-200 px-2 text-center">Hộp</td>
          <td class="border border-slate-200 px-2 text-center">1</td>
          <td class="border border-slate-200 px-2 text-right font-bold">x</td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2 text-right font-bold">
            14.000 đ
          </td>
          <td class="border border-slate-200 px-2"></td>
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

const { data } = await useFetch('/api/test');
</script>
