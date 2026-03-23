import { supabase } from '@/lib/supabase'

export const ALL_CATEGORIES_ID = '__all__'

const FALLBACK_DATA = {
  categories: [
    { id: 'autonomia', title: 'Autonomia y Biologia' },
    { id: 'its', title: 'Infecciones (ITS)' },
    { id: 'consentimiento', title: 'Consentimiento' },
    { id: 'derechos', title: 'Mis Derechos' },
  ],
  topicsByCategory: {
    autonomia: [
      {
        id: 'h1',
        title: 'Explorando nuestro cuerpo',
        dialog:
          'Hola. Sabias que 1/3 de mujeres en Bolivia enfrentan pobreza menstrual? Toca para ver mas.',
        expandedInfo:
          'La autonomia corporal es el derecho a gobernar tu propio cuerpo. En este modulo exploramos como el entorno, la economia y la educacion impactan la salud reproductiva.',
        concepts: [
          {
            id: 'c1',
            title: 'Pobreza Menstrual',
            dialog: 'La falta de acceso a productos es una gran barrera.',
            backDetails:
              'Es un problema de salud publica y derechos humanos que afecta la educacion y el trabajo.',
            recommendations: ['Apoyar leyes', 'Desmitificar el periodo', 'Donar productos'],
          },
          {
            id: 'c2',
            title: 'Endometriosis',
            dialog: 'El dolor puede ser intenso y no debe normalizarse.',
            backDetails:
              'Afecta a 1 de cada 10 mujeres. Requiere diagnostico y seguimiento medico oportuno.',
            recommendations: ['No normalizar el dolor', 'Consultar especialistas', 'Llevar diario de sintomas'],
          },
          {
            id: 'c3',
            title: 'Menarquia',
            dialog: 'La primera menstruacion es clave, pero aun existe tabu.',
            backDetails:
              'Suele ocurrir entre los 10 y 15 anos. La informacion previa reduce miedo y estigma.',
            recommendations: ['Hablar con naturalidad', 'Preparar un kit', 'Educar sobre higiene'],
          },
        ],
      },
    ],
  },
}

function toCategory(row) {
  return {
    id: row.id,
    title: row.title,
  }
}

function interleaveTopicsByCategory(topics) {
  const groups = new Map()

  for (const topic of topics) {
    const group = groups.get(topic.categoryId) || []
    group.push(topic)
    groups.set(topic.categoryId, group)
  }

  const queues = Array.from(groups.values())
  const result = []

  let hasItems = true
  while (hasItems) {
    hasItems = false

    for (const queue of queues) {
      if (queue.length > 0) {
        result.push(queue.shift())
        hasItems = true
      }
    }
  }

  return result
}

function normalizeRecommendations(value) {
  if (Array.isArray(value)) return value
  if (!value) return []
  if (typeof value === 'string') return [value]

  if (typeof value === 'object') {
    if (Array.isArray(value.items)) return value.items
    return Object.values(value)
      .filter((item) => typeof item === 'string')
  }

  return []
}

function isMissingTable(error) {
  return error?.code === '42P01'
}

export async function getLearnCategories() {
  const { data, error } = await supabase
    .from('learn_categories')
    .select('id, title, is_active, sort_order')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error) {
    if (isMissingTable(error)) {
      return [{ id: ALL_CATEGORIES_ID, title: 'Todos' }, ...FALLBACK_DATA.categories]
    }
    throw error
  }

  const categories = data?.length ? data.map(toCategory) : FALLBACK_DATA.categories
  return [{ id: ALL_CATEGORIES_ID, title: 'Todos' }, ...categories]
}

export async function getLearnTopicsByCategory(categoryId, search = '') {
  if (categoryId === ALL_CATEGORIES_ID) {
    return getAllLearnTopics(search)
  }

  const { data: topicRows, error: topicError } = await supabase
    .from('learn_topics')
    .select('id, category_id, title, dialog, expanded_info, is_active, created_at')
    .eq('category_id', categoryId)
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (topicError) {
    if (isMissingTable(topicError)) {
      return FALLBACK_DATA.topicsByCategory[categoryId] || []
    }
    throw topicError
  }

  const topics = topicRows || []
  if (!topics.length) return FALLBACK_DATA.topicsByCategory[categoryId] || []

  const topicIds = topics.map((topic) => topic.id)

  let conceptQuery = supabase
    .from('learn_concepts')
    .select('id, topic_id, title, dialog, back_details, recommendations, is_active, sort_order')
    .in('topic_id', topicIds)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (search?.trim()) {
    const value = `%${search.trim()}%`
    conceptQuery = conceptQuery.or(`title.ilike.${value},dialog.ilike.${value},back_details.ilike.${value}`)
  }

  const { data: conceptRows, error: conceptError } = await conceptQuery

  if (conceptError) {
    if (isMissingTable(conceptError)) {
      return FALLBACK_DATA.topicsByCategory[categoryId] || []
    }
    throw conceptError
  }

  const conceptsByTopic = new Map()
  for (const row of conceptRows || []) {
    const concepts = conceptsByTopic.get(row.topic_id) || []
    concepts.push({
      id: row.id,
      title: row.title,
      dialog: row.dialog,
      backDetails: row.back_details,
      recommendations: normalizeRecommendations(row.recommendations),
    })
    conceptsByTopic.set(row.topic_id, concepts)
  }

  const searchValue = search.trim().toLowerCase()

  const mergedTopics = topics.map((topic) => ({
    id: topic.id,
    categoryId: topic.category_id,
    title: topic.title,
    dialog: topic.dialog,
    expandedInfo: topic.expanded_info,
    concepts: conceptsByTopic.get(topic.id) || [],
  }))

  if (searchValue) {
    return mergedTopics.filter((topic) => {
      const matchesTopic = [topic.title, topic.dialog, topic.expandedInfo]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(searchValue))

      return matchesTopic || topic.concepts.length > 0
    })
  }

  return mergedTopics
}

async function getAllLearnTopics(search = '') {
  const { data: topicRows, error: topicError } = await supabase
    .from('learn_topics')
    .select('id, category_id, title, dialog, expanded_info, is_active, created_at')
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  if (topicError) {
    if (isMissingTable(topicError)) {
      return Object.values(FALLBACK_DATA.topicsByCategory).flat()
    }
    throw topicError
  }

  const topics = topicRows || []
  if (!topics.length) return []

  const topicIds = topics.map((topic) => topic.id)

  let conceptQuery = supabase
    .from('learn_concepts')
    .select('id, topic_id, title, dialog, back_details, recommendations, is_active, sort_order')
    .in('topic_id', topicIds)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (search?.trim()) {
    const value = `%${search.trim()}%`
    conceptQuery = conceptQuery.or(`title.ilike.${value},dialog.ilike.${value},back_details.ilike.${value}`)
  }

  const { data: conceptRows, error: conceptError } = await conceptQuery

  if (conceptError) {
    if (isMissingTable(conceptError)) {
      return Object.values(FALLBACK_DATA.topicsByCategory).flat()
    }
    throw conceptError
  }

  const conceptsByTopic = new Map()
  for (const row of conceptRows || []) {
    const concepts = conceptsByTopic.get(row.topic_id) || []
    concepts.push({
      id: row.id,
      title: row.title,
      dialog: row.dialog,
      backDetails: row.back_details,
      recommendations: normalizeRecommendations(row.recommendations),
    })
    conceptsByTopic.set(row.topic_id, concepts)
  }

  const searchValue = search.trim().toLowerCase()

  const mergedTopics = topics.map((topic) => ({
    id: topic.id,
    categoryId: topic.category_id,
    title: topic.title,
    dialog: topic.dialog,
    expandedInfo: topic.expanded_info,
    concepts: conceptsByTopic.get(topic.id) || [],
  }))

  let filtered = mergedTopics
  if (searchValue) {
    filtered = mergedTopics.filter((topic) => {
      const matchesTopic = [topic.title, topic.dialog, topic.expandedInfo]
        .filter(Boolean)
        .some((text) => text.toLowerCase().includes(searchValue))

      return matchesTopic || topic.concepts.length > 0
    })
  }

  return interleaveTopicsByCategory(filtered)
}
