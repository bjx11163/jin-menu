function getAnniversaryDays() {
  const d = wx.getStorageSync('anniversaryDate') || '2026-03-23'
  return Math.floor((Date.now() - new Date(d).getTime()) / 86400000)
}
function getDateStr() {
  const d = new Date()
  return d.getFullYear()+'/'+(d.getMonth()+1).toString().padStart(2,'0')+'/'+d.getDate().toString().padStart(2,'0')
}
function formatOrderDate(date) {
  const d = new Date(date)
  return (d.getMonth()+1)+'/'+d.getDate()+' '+d.getHours()+':'+String(d.getMinutes()).padStart(2,'0')
}
module.exports = { getAnniversaryDays, getDateStr, formatOrderDate }
