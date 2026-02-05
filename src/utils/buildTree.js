export const makeItemsWithChildren = (items) => {
  const data = {}

  items.forEach((item) => {
    data[item.id] = { ...item, children: [], level: 0}
  })

  items.forEach((item) => {
    if (item.parentId !== 0) {
      data[item.id].level = data[item.parentId].level + 1
      data[item.parentId].children.push(data[item.id])
    }
  })

  return items
    .filter((item) => item.parentId === 0)
    .map((item) => data[item.id])
}