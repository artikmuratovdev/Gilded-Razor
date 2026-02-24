const useSetDate = (date:string) => {
  const month: string = date.split('-')[1];
  const day: string = date.split('-')[2];
  const year: string = date.split('-')[0];
  const months = {
    '01': 'Yan',
    '02': 'Fev',
    '03': 'Mar',
    '04': 'Apr',
    '05': 'May',
    '06': 'Iyun',
    '07': 'Iyul',
    '08': 'Avg',
    '09': 'Sen',
    '10': 'Okt',
    '11': 'Nov',
    '12': 'Dek',
  };
  return `${day}-${months[month as keyof typeof months]}-${year}`;
};

export default useSetDate;
