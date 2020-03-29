const defaultValue = [
  { id: 'id-1', name: 'Rosie Simpson', number: '380444591256' },
  { id: 'id-2', name: 'Rosie Simpson', number: '380444591256' },
  { id: 'id-3', name: 'Hermione Kline', number: '380444438912' },
  { id: 'id-4', name: 'Hermione Kline', number: '380444438912' },
  { id: 'id-5', name: 'Rosie Simpson', number: '380444591256' },
  { id: 'id-6', name: 'Rosie Simpson', number: '380444591256' },
  { id: 'id-7', name: 'Hermione Kline', number: '380444438912' },
  { id: 'id-8', name: 'Hermione Kline', number: '380444438912' },
];

const filterTasks = (contacts, filter) => {
  return contacts.filter(item => {
    return item.name.toLowerCase().includes(filter.toLowerCase());
  });
};

export { defaultValue, filterTasks };
