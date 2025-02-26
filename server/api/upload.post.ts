import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);

  if (formData) {
    let success = false;
    let message = 'No file found';
    formData.forEach((file) => {
      if (
        file &&
        file.filename &&
        file.type &&
        file.type.includes('officedocument.spreadsheetml.sheet')
      ) {
        const filePath = path.join(process.cwd(), 'public/data', 'data.xlsx');
        fs.writeFileSync(filePath, file.data);
        success = true;
        message = 'File uploaded';
      }
    });

    return { success, message };
  }

  throw createError({
    statusCode: 400,
    statusMessage: 'No file found',
  });
});
