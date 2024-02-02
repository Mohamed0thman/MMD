function convertObjectToObjectWithKeys<T extends {}>(obj: T) {
  return Object.keys(obj).reduce(
    (acc, key) => ({ ...acc, [key]: key }),
    {} as { [K in keyof T]: K },
  );
}

export { convertObjectToObjectWithKeys };
