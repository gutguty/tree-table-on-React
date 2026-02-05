import {useCallback, useMemo, useState} from "react";

export const useTree = (data) => {
  const [expandRow, setExpandRow] = useState(new Set())

  const showItems = useMemo(() => {
    const result = []

    const recursiveShow = (items) => {
      items.forEach((item) => {
        result.push(item)

         if (expandRow.has(item.id) && item.children.length > 0) {
           recursiveShow(item.children, result)
         }
      })

      return result
    }

    return recursiveShow(data)
  }, [data, expandRow])

  const toggleRow = useCallback((id) => {
    setExpandRow((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }, [])


  return {
    expandRow,
    visibleItems: showItems,
    toggleRow
  }
}