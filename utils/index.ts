export const formatMoney = (value: number): string => {
  return value.toLocaleString('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });
};

export const formatTheThaoCookie = (cookie: string): string => {
  const cookies = cookie.split(';');
  const xsrfToken = cookies.find((item) => item.includes('XSRF-TOKEN='));
  const thethaoSession = cookies
    .find((item) => item.includes('the_thao_product_session='))
    ?.split(',')
    .pop();

  return `${xsrfToken}; ${thethaoSession}`;
};
