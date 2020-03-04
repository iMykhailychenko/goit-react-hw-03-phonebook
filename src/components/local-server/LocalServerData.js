const defaultValue = [
  { id: 'id-1', name: 'Rosie Simpson', number: '380444591256' },
  { id: 'id-2', name: 'Hermione Kline', number: '380444438912' },
  { id: 'id-3', name: 'Eden Clements', number: '380446451779' },
  { id: 'id-4', name: 'Annie Copeland', number: '380442279126' },
];

const getDataFromLocalStorage = key => {
  try {
    const data = localStorage.getItem(key);
    return data === null ? [...defaultValue] : JSON.parse(data);
  } catch (err) {
    console.log('Get state error: ', err);
  }
};

const setDataToLocalStorage = (key, value = [...defaultValue]) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

export { getDataFromLocalStorage, setDataToLocalStorage };
