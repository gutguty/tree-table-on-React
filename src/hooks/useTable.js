import {useCallback, useMemo, useState} from "react";
import {makeItemsWithChildren} from '@/utils/buildTree'

export const useTable = (data) => {
  const [sortState, setSortState] = useState({
    type: null,
    direction: null
  })

  const [sortStatus, setSortStatus] = useState(null)

  const handleSortEmail = useCallback(() => {
    setSortState((prev) => {
      if (prev.type === 'email') {
        if (prev.direction === 'asc') {
          return { type: 'email', direction: 'desc' }
        } else if (prev.direction === 'desc') {
          return { type: null, direction: null }
        }
      }

      return { type: 'email', direction: 'asc' }
    })
  }, [])

  const handleSortBalance = useCallback(() => {
    setSortState((prev) => {
      if (prev.type === 'balance') {
        if (prev.direction === 'asc') {
          return { type: 'balance', direction: 'desc' }
        } else if (prev.direction === 'desc') {
          return { type: null, direction: null }
        }
      }

      return { type: 'balance', direction: 'asc' }
    })
  }, [])

  const handleStatus = useCallback(() => {
    setSortStatus(prev => {
      if (prev === null) return true
      if (prev === true) return false
      return null
    })
  },[])

  const handleFilter = useMemo(() => {
    const recursiveFilter = (items) => {

      let result = []
      items.forEach((item) => {
        const hasStatusOnFilter = sortStatus === null || item.isActive === sortStatus

        const filterChildren = recursiveFilter(item.children)

        const flag = hasStatusOnFilter || filterChildren.length > 0

        if (flag) {
          result.push({
            ...item,
            children: filterChildren
          })
        }
      })

      if (sortState.type && sortState.direction) {
        if (sortState.type === 'email') {
          result.sort((first,second) => {
            if (sortState.direction === 'asc') {
              return first.email.localeCompare(second.email)
            } else {
              return second.email.localeCompare(first.email)
            }
          })
        }

        if (sortState.type === 'balance') {
          result.sort((first, second) => {
            const correctBalance = (str) => parseFloat(str.replace(/[$,]/g, ''))

            const firstNumber = correctBalance(first.balance)
            const secondNumber = correctBalance(second.balance)

            if (sortState.direction === 'asc') {
              return firstNumber - secondNumber
            } else {
              return secondNumber - firstNumber
            }
          })
        }
      }
      return result
    }
    const itemsWithChildren = makeItemsWithChildren(data)
    return recursiveFilter(itemsWithChildren)
  },[data, sortState, sortStatus])

  return {
    sortState,
    sortStatus,
    handleSortEmail,
    handleSortBalance,
    handleStatus,
    treeData: handleFilter
  }
}