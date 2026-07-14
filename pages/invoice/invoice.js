const { getAnniversaryDays } = require('../../utils/util')
Page({
  data: { invoices: [], anniversaryDays: 0 },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentTab: 4 })
    }
    const invoices = wx.getStorageSync('invoices') || []
    invoices.forEach(inv => { inv.totalQty = inv.items.reduce((s,it)=>s+it.qty,0) })
    this.setData({ invoices, anniversaryDays: getAnniversaryDays() })
  },
  setRating(e) {
    const ds = e.currentTarget.dataset
    const rating = parseInt(ds.star || '0') + 1
    const id = ds.id
    let invoices = wx.getStorageSync('invoices') || []
    const inv = invoices.find(i => i.id === id)
    if (inv) { inv.rating = rating; wx.setStorageSync('invoices', invoices); this.onShow() }
  },
  setWish(e) {
    const id = e.currentTarget.dataset.id; const val = e.detail.value
    let invoices = wx.getStorageSync('invoices') || []
    const inv = invoices.find(i => i.id === id)
    if (inv) { inv.wish = val; wx.setStorageSync('invoices', invoices) }
  },
  captureInvoice(e) {
    wx.showToast({ title: '截屏保存到相册', icon: 'none' })
  }
})
