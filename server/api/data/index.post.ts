import fs from 'fs';
import ExcelJS from 'exceljs';
import path from 'path';
import type { IData } from '~/shared/types/data';

export default defineEventHandler(async () => {
  try {
    const filePath = path.resolve(process.cwd(), 'public/data', 'data.xlsx');

    const workbook = new ExcelJS.Workbook();
    await workbook.xlsx.readFile(filePath);

    const worksheet = workbook.getWorksheet(1);
    const jsonData: IData[] = [];
    const headers: string[] = [];

    if (worksheet) {
      worksheet.eachRow((row, rowNumber) => {
        if (rowNumber === 2 && row.values) {
          if (Array.isArray(row.values)) {
            row.values.forEach((column) => {
              const header = column ? column.toString().trim() : '';
              headers.push(header);
            });
          }
        }
        if (rowNumber > 2 && row.values) {
          if (Array.isArray(row.values)) {
            const rowData: IData = {
              id: 0,
              category: '',
              name: '',
              unit: 'Hộp',
              qty: 0,
              vendor_thethao: 0,
              vendor_bachhoat: 0,
              vendor_giathuoctot: 0,
              vendor_topthuoc: 0,
            };
            row.values.forEach((column, index) => {
              switch (index) {
                case 1:
                  if (column) rowData.id = parseInt(column.toString(), 10);
                  break;
                case 2:
                  rowData.category = column ? (column as string) : '';
                  break;
                case 3:
                  rowData.name = column ? (column as string) : '';
                  break;
                case 4:
                  rowData.unit = column ? (column as string) : 'Hộp';
                  break;
                case 5:
                  rowData.qty = column ? (column as number) : 0;
                  break;
                case 6: {
                  const price =
                    column && Number.isInteger(column) ? (column as number) : 0;
                  rowData.vendor_thethao = price;
                  break;
                }
                case 7: {
                  const price =
                    column && Number.isInteger(column) ? (column as number) : 0;
                  rowData.vendor_bachhoat = price;
                  break;
                }
                case 8: {
                  const price =
                    column && Number.isInteger(column) ? (column as number) : 0;
                  rowData.vendor_giathuoctot = price;
                  break;
                }
                case 9: {
                  const price =
                    column && Number.isInteger(column) ? (column as number) : 0;
                  rowData.vendor_topthuoc = price;
                  break;
                }
                default:
                  break;
              }
            });
            jsonData.push(rowData);
          }
        }
      });
    }

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

    await fs.promises.writeFile(
      headersFilePath,
      JSON.stringify(headers, null, 2),
      'utf8',
    );
    await fs.promises.writeFile(
      dataFilePath,
      JSON.stringify(jsonData, null, 2),
      'utf8',
    );

    return { success: true, data: jsonData };
  } catch (error) {
    console.error('Error reading Excel file:', error);
    return { success: false, error: 'Failed to read Excel file' };
  }
});
