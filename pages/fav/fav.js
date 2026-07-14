Page({
  data: { favDishes: [], dishes: [], showToast: false, toastIcon: '', toastText: '' },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentTab: 2 })
    }
    const dishes = wx.getStorageSync('dishes') || []
    const favs = wx.getStorageSync('favorites') || []
    this.setData({
      dishes: dishes,
      favDishes: favs.length > 0 ? dishes.filter(d => favs.includes(d.id)) : []
    })
  },
  addToCart(e) {
    const id = e.currentTarget.dataset.id
    const dish = this.data.dishes.find(d => d.id === id)
    if (!dish) return
    let cart = wx.getStorageSync('cart') || []
    const exist = cart.find(c => c.id === id)
    if (exist) exist.qty += 1
    else cart.push({ id: dish.id, name: dish.name, photo: dish.photo, emoji: dish.emoji, qty: 1 })
    wx.setStorageSync('cart', cart)
    this.showToast('/img/ok_icon.png', '不够！我还要！！！')
  },
  removeFav(e) {
    const id = e.currentTarget.dataset.id
    let favs = wx.getStorageSync('favorites') || []
    favs = favs.filter(f => f !== id)
    wx.setStorageSync('favorites', favs)
    const dishes = this.data.dishes
    this.setData({ favDishes: dishes.filter(d => favs.includes(d.id)) })
    this.showToast('/img/fav_icon.png', '下次再来宠幸你！！！')
  },
  showToast(icon, text) {
    this.setData({ toastIcon: icon, toastText: text, showToast: true })
    setTimeout(() => { this.setData({ showToast: false }) }, 2000)
  }
})
