import { useEffect, useMemo, useState } from 'react'
import { getLearnCategories, getLearnTopicsByCategory } from '@/lib/aprenderApi'

export function useAprenderContent() {
  const [categories, setCategories] = useState([])
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [search, setSearch] = useState('')
  const [topics, setTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    async function loadCategories() {
      setLoading(true)
      setError(null)

      try {
        const rows = await getLearnCategories()
        if (cancelled) return

        setCategories(rows)
        if (!rows.length) {
          setActiveCategoryId(null)
          return
        }

        setActiveCategoryId((prev) => prev || rows[0].id)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadCategories()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    if (!activeCategoryId) {
      setTopics([])
      return
    }

    async function loadTopics() {
      setLoading(true)
      setError(null)

      try {
        const rows = await getLearnTopicsByCategory(activeCategoryId, search)
        if (!cancelled) setTopics(rows)
      } catch (err) {
        if (!cancelled) setError(err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadTopics()

    return () => {
      cancelled = true
    }
  }, [activeCategoryId, search])

  const activeCategory = useMemo(
    () => categories.find((category) => category.id === activeCategoryId) || null,
    [categories, activeCategoryId]
  )

  return {
    categories,
    activeCategoryId,
    setActiveCategoryId,
    activeCategory,
    search,
    setSearch,
    topics,
    loading,
    error,
  }
}
