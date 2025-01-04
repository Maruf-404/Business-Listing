export const uniqueBusinesses = (list) => {
    const seen = new Set()
  return list.filter((business) => {
    const isDuplicate = seen.has(business.id)
    seen.add(business.id)
    return !isDuplicate
  }) 
}