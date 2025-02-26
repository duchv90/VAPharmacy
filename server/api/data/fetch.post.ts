import fs from 'fs';
import path from 'path';
import type { IData } from '~/shared/types/data';
import { DOMParser } from 'linkedom';
import { formatTheThaoCookie } from '~/utils';

const processUpdate = async (
  data: IData[],
  nhathuoc24h: { nhathuoc24hSetCookie: string; nhathuoc24Token: string },
) => {
  const nhathuoc24hCookie = formatTheThaoCookie(
    nhathuoc24h.nhathuoc24hSetCookie,
  );
  const nhathuoc24hResults = await Promise.allSettled(
    data.map(async (record, index: number) => {
      if (!record.isUpdated && record.name && record.name.length > 0) {
        const nhathuoc24hResponse = await fetch(
          'https://chothuoc24h.vn/searchProduct',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              cookie: nhathuoc24hCookie,
              'x-csrf-token': nhathuoc24h.nhathuoc24Token,
            },
            body: new URLSearchParams({
              page: '1',
              search: record.name,
            }).toString(),
          },
        );
        if (nhathuoc24hResponse.ok) {
          const nhathuoc24hResponseJson = await nhathuoc24hResponse.json();
          return {
            index,
            newData: nhathuoc24hResponseJson,
          };
        }
      }
      return null;
    }),
  );

  nhathuoc24hResults.forEach((result) => {
    if (result && result.status === 'fulfilled' && result.value) {
      const { index, newData } = result.value;
      if (newData && newData.data && newData.data.length > 0) {
        const firstRecord = newData.data[0];
        data[index].vendor_thethao = firstRecord.price;
        data[index].meta = {
          nhathuoc24h: firstRecord,
        };
        data[index].isUpdated = true;
      }
    }
  });
  return data;
};

export default defineEventHandler(async () => {
  const result: {
    success: boolean;
  } = { success: false };

  try {
    const dataFilePath = path.resolve(
      process.cwd(),
      'public/data',
      'data.json',
    );

    const dataJsonString = await fs.readFileSync(dataFilePath, 'utf8');
    let dataJson: IData[] = JSON.parse(dataJsonString);

    if (dataJson.length > 0) {
      // nhathuoc24h.vn
      const nhathuoc24hFirstLoad = await fetch('https://chothuoc24h.vn/', {
        method: 'GET',
      });
      if (nhathuoc24hFirstLoad.ok) {
        const nhathuoc24hSource = await nhathuoc24hFirstLoad.text();
        const headers = nhathuoc24hFirstLoad.headers;
        const nhathuoc24hSetCookie = headers.get('set-cookie');
        const nhathuoc24hDocument = new DOMParser().parseFromString(
          nhathuoc24hSource,
          'text/html',
        );
        const nhathuoc24Token = nhathuoc24hDocument
          .querySelector('[name="_token"]')
          ?.getAttribute('value');

        // const testData = [];
        // testData.push(dataJson[596]);
        if (nhathuoc24hSetCookie && nhathuoc24Token) {
          dataJson = await processUpdate(dataJson, {
            nhathuoc24hSetCookie,
            nhathuoc24Token,
          });

          // const nhathuoc24hCookie = formatTheThaoCookie(nhathuoc24hSetCookie);
          // const nhathuoc24hResults = await Promise.allSettled(
          //   dataJson.map(async (record, index) => {
          //     if (record.name && record.name.length > 0) {
          //       const nhathuoc24hResponse = await fetch(
          //         'https://chothuoc24h.vn/searchProduct',
          //         {
          //           method: 'POST',
          //           headers: {
          //             'Content-Type': 'application/x-www-form-urlencoded',
          //             cookie: nhathuoc24hCookie,
          //             'x-csrf-token': nhathuoc24Token,
          //           },
          //           body: new URLSearchParams({
          //             page: '1',
          //             search: record.name,
          //           }).toString(),
          //         },
          //       );
          //       if (nhathuoc24hResponse.ok) {
          //         const nhathuoc24hResponseJson =
          //           await nhathuoc24hResponse.json();
          //         return {
          //           index,
          //           newData: nhathuoc24hResponseJson,
          //         };
          //       }
          //     }
          //     return null;
          //   }),
          // );

          // nhathuoc24hResults.forEach((result) => {
          //   if (result && result.status === 'fulfilled' && result.value) {
          //     const { index, newData } = result.value;
          //     if (newData && newData.data && newData.data.length > 0) {
          //       const firstRecord = newData.data[0];
          //       dataJson[index].vendor_thethao = firstRecord.price;
          //       dataJson[index].meta = {
          //         nhathuoc24h: firstRecord,
          //       };
          //       dataJson[index].isUpdated = true;
          //     }
          //   }
          // });

          const dataJsonString = JSON.stringify(dataJson, null, 2);
          await fs.writeFileSync(dataFilePath, dataJsonString, 'utf8');
        }
      }
      // end nhathuoc24h.vn
    }

    result.success = true;
    return result;
  } catch {
    return result;
  }
});
