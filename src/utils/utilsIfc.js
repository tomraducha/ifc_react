function filterElements(elements) {
  const filteredElements = elements.filter((element) => {
    const nameValue = element.Name.value;
    return nameValue !== null && !/\d{3}/.test(nameValue);
  });
  return filteredElements;
}

export { filterElements };
