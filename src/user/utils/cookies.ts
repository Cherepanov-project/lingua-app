export const setCookie = (name: string, value: string, days = 1) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  // document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=Strict`;
  // document.cookie = `${name}=${value}; expires=${expires}; path=/; Secure; SameSite=None${location.protocol === 'https:' ? '; Secure' : ''}`;
  // !!! it must work!
  document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  console.log('Set cookie:', document.cookie);
};

export const getCookie = (name: string) => {
  return document.cookie.split('; ').find(row => row.startsWith(`${name}=`))?.split('=')[1];
};

export const removeCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
};