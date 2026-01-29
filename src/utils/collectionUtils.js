const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

const buildCollections = (items) => {
  const map = new Map()
  items.forEach((art) => {
    const name = art.collection || 'Uncategorized'
    const existing = map.get(name) || {
      name,
      slug: slugify(name),
      current: false,
      items: [],
    }
    existing.items.push(art)
    if (art.current) {
      existing.current = true
    }
    map.set(name, existing)
  })

  return Array.from(map.values()).sort((a, b) => {
    if (a.current !== b.current) return a.current ? -1 : 1
    return a.name.localeCompare(b.name)
  })
}

export { buildCollections, slugify }
