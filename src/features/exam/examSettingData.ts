// const arrayFromTo = Array.from({ length: 7 }, (_, index) => index + 3);
const arrayFromTo = (start: number, end: number) => {
  const result: { label: string; value: number }[] = [];
  for (let i = start; i <= end; i++) {
    result.push({ label: 'مستوي' + ' ' + i, value: i });
  }
  return result;
};

export const examSittings = [
  { id: 1, title: 'عدد الأرقام', type: 'options', name: 'digits' },
  { id: 2, title: 'زمن الكتابة', type: 'options', name: 'showDelay' },
  { id: 3, title: 'زمن المسح', type: 'options', name: 'clearDelay' },
  { id: 4, title: 'عدد العمليات', type: 'options', name: 'numOfOperations' },
  { id: 5, title: 'المستوي', type: 'options', name: 'level' },
  { id: 6, title: 'الطرح', type: 'switch', name: 'subtraction' },
  { id: 7, title: 'لوحة المفاتيح', type: 'switch', name: 'sound' },
  { id: 8, title: 'الصوت', type: 'switch', name: 'showKeboard' },
];

export const examSettingData = {
  digits: arrayFromTo(1, 9),
  showDelay: arrayFromTo(3, 15),
  clearDelay: arrayFromTo(3, 15),
  numOfOperations: arrayFromTo(1, 15),
  level: [
    { label: 'بسيط', value: 0 },
    { label: 'مركب 5', value: 1 },
    { label: 'مركب 10', value: 2 },
  ],
};
export type ExamSettingKey = keyof typeof examSittings;
export type ExamSettingDataKey = keyof typeof examSettingData;
