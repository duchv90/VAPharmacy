export default defineEventHandler(async () => {
  const result: {
    success: boolean;
  } = { success: false };

  try {
    // const dataFilePath = path.resolve(
    //   process.cwd(),
    //   'public/data',
    //   'data.json',
    // );
    result.success = true;
    return result;
  } catch {
    return result;
  }
});
