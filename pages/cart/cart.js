Page({
  data: { cart: [], note: '', totalQty: 0, showConfirm: false },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentTab: 3 })
    }
    this.loadCart()
  },
  loadCart() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({ cart, totalQty: cart.reduce((s,c)=>s+c.qty,0) })
    this.toggleTabbar(cart.length > 0)
  },
  toggleTabbar(hide) {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ hideTabbar: hide })
    }
  },
  changeQty(e) {
    const {index,delta}=e.currentTarget.dataset; let cart=this.data.cart
    const d = parseInt(delta)
    if (cart[index].qty + d <= 0) cart.splice(index,1)
    else cart[index].qty += d
    wx.setStorageSync('cart',cart); this.loadCart()
  },
  removeItem(e) {
    let cart=this.data.cart; cart.splice(e.currentTarget.dataset.index,1)
    wx.setStorageSync('cart',cart); this.loadCart()
  },
  onNote(e) { this.setData({note:e.detail.value}) },
  goBack() {
    this.toggleTabbar(false)
    wx.switchTab({ url: '/pages/index/index' })
  },
  showConfirm() {
    this.setData({ showConfirm: true })
  },
  hideConfirm() {
    this.setData({ showConfirm: false })
  },
  doSubmit() {
    const cart=wx.getStorageSync('cart')||[]; if (cart.length===0) return
    const inv={id:Date.now().toString(36),items:JSON.parse(JSON.stringify(cart)),note:this.data.note,date:new Date().toLocaleString('zh-CN'),rating:0,wish:''}
    let invoices=wx.getStorageSync('invoices')||[]; invoices.unshift(inv)
    wx.setStorageSync('invoices',invoices); wx.setStorageSync('cart',[])
    this.setData({cart:[],note:'',totalQty:0,showConfirm:false})
    this.toggleTabbar(false)
    wx.switchTab({url:'/pages/invoice/invoice'})
  }
})
