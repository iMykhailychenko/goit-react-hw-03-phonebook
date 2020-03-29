const getDataFromLocalStorage = (key, defaultValue = []) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (err) {
    console.log('Get state error: ', err);
  }
};

const setDataToLocalStorage = (key, value) => {
  try {
    const data = JSON.stringify(value);
    localStorage.setItem(key, data);
  } catch (err) {
    console.error('Set state error: ', err);
  }
};

export { getDataFromLocalStorage, setDataToLocalStorage };
