export const joinClassNames = (...classNames) => {
  if (classNames.length === 1) return classNames[0];
  const result = classNames.filter((name) => !!name).join(' ');
  return result;
};
