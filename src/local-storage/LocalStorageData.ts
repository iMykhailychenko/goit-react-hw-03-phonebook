import { IContacts } from '../types';

const getDataFromLocalStorage = (
  key: string,
  defaultValue: IContacts[] | [] = [],
): IContacts[] | [] => {
  try {
    const data: string | null = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.log('Get state error: ', err);
    return [];
  }
};

const setDataToLocalStorage = (key: string, value: IContacts[]): void => {
  try {
    const data: string = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

export { getDataFromLocalStorage, setDataToLocalStorage };
