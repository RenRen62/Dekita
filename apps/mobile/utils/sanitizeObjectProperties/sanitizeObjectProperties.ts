export const sanitizeObjectProperties = <T extends { [key: string]: unknown }>(
  obj: T
): Partial<T> => {
  const newObj: Partial<T> = {};

  Object.keys(obj).forEach((key: keyof T) => {
    if (obj[key] !== undefined && obj[key] !== '') {
      newObj[key] = obj[key];
    }
  });

  return newObj;
};
