import fs from 'fs';
import path from 'path';
import type { IData, IDataResponse } from '~/shared/types/data';

export default defineEventHandler(async () => {
  const result: {
    success: boolean;
    data: { headers: string[]; records: IDataResponse[] };
  } = { success: false, data: { headers: [], records: [] } };

  try {
    const headersFilePath = path.resolve(
      process.cwd(),
      'public/data',
      'headers.json',
    );
    const dataFilePath = path.resolve(
      process.cwd(),
      'public/data',
      'data.json',
    );

    const headersJson = await fs.readFileSync(headersFilePath, 'utf8');
    const dataJson = await fs.readFileSync(dataFilePath, 'utf8');
    result.data.headers = JSON.parse(headersJson);
    const records: IData[] = JSON.parse(dataJson);
    result.data.records = records.reduce(
      (acc: IDataResponse[], record: IData) => {
        const maxPrice = Math.max(
          record.vendor_thethao,
          record.vendor_bachhoat,
          record.vendor_giathuoctot,
          record.vendor_topthuoc,
        );
        acc.push({
          ...record,
          minPrice: Math.min(
            record.vendor_thethao === 0 ? maxPrice : record.vendor_thethao,
            record.vendor_bachhoat === 0 ? maxPrice : record.vendor_bachhoat,
            record.vendor_giathuoctot === 0
              ? maxPrice
              : record.vendor_giathuoctot,
            record.vendor_topthuoc === 0 ? maxPrice : record.vendor_topthuoc,
          ),
        });
        return acc;
      },
      [],
    );
    result.success = true;

    return result;
  } catch {
    return result;
  }
});
