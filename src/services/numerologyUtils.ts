/**
 * Reduces a number to a single digit or a master number (11, 22, 33)
 */
const reduceNumber = (num: number): number => {
  if (num === 11 || num === 22 || num === 33) return num;
  if (num < 10) return num;
  
  const sum = num.toString().split('').reduce((acc, curr) => acc + parseInt(curr), 0);
  return reduceNumber(sum);
};

export const calculateLifePath = (birthDate: string): number => {
  const [year, month, day] = birthDate.split('-').map(Number);
  
  // Method: Reduce Year, Month, Day separately then sum and reduce
  const rYear = reduceNumber(year);
  const rMonth = reduceNumber(month);
  const rDay = reduceNumber(day);
  
  return reduceNumber(rYear + rMonth + rDay);
};

/**
 * Calculates Personal Year based on the target prediction year
 * Formula: Day of Birth + Month of Birth + Target Year
 */
export const calculatePersonalYear = (birthDate: string, targetYear: number): number => {
  const [_, month, day] = birthDate.split('-').map(Number);
  
  const rYear = reduceNumber(targetYear);
  const rMonth = reduceNumber(month);
  const rDay = reduceNumber(day);
  
  return reduceNumber(rYear + rMonth + rDay);
};
