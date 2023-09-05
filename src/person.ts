type Person = {
  name: string;
};

export const getPerson = (): Promise<Person> => {
  return new Promise((resolve) =>
    setTimeout(
      () =>
        resolve({
          name: 'Bob',
        }),
      3000,
    ),
  );
};
