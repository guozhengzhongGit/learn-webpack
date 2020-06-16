export const adaptListData = res => {
  if (Array.isArray(res)) return res
  return res.data
}
export const adaptContentData = res => {
  if ('body' in res) return res.body
  return res.data.content
}