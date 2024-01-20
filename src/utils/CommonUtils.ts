export const arrayOfObjectToSet = (array: any[], property = "key") => {
  const uniqueObjects = Array.from(
    array.reduce((map, obj) => map.set(obj[property], obj), new Map()).values()
  );
  return uniqueObjects;
};

export const areEqual = (obj1: any, obj2: any) => {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
};

export const convertTimeToDate = (time: string): Date => {
  const [hour, minute] = time.split(":");
  const date = new Date(0, 0, 0, parseInt(hour, 10), parseInt(minute, 10));

  return date;
};
