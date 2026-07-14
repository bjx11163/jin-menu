const app = getApp()
Page({
  data: { fruits: [], seasonRecommend: '', showToast: false, toastIcon: '', toastText: '' },
  onShow() {
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentTab: 1, hideTabbar: false })
    }
  },
  onLoad() {
    const dishes = wx.getStorageSync('dishes') || app.getDefaultDishes()
    this.setData({ fruits: dishes.filter(d => d.category === '甜品水果') })
    this.setSeason()
  },
  setSeason() {
    const month = new Date().getMonth()+1
    let picks = []
    if (month>=3&&month<=5) picks = ['🍓草莓','🍍菠萝','🥭芒果','🍈甜瓜']
    else if (month>=6&&month<=8) picks = ['🍉西瓜','🍇葡萄','🫐蓝莓','🍒樱桃','🥭芒果','🍑桃']
    else if (month>=9&&month<=11) picks = ['🍐梨','🍎苹果','🍊橘子','🍇葡萄','🥝猕猴桃']
    else picks = ['🍊橘子','🍎苹果','🍐梨','🍌香蕉']
    this.setData({ seasonRecommend: '本月当季推荐：'+picks[Math.floor(Math.random()*picks.length)] })
  },
  addToCart(e) {
    const id = e.currentTarget.dataset.id
    const dishes = wx.getStorageSync('dishes') || app.getDefaultDishes()
    const dish = dishes.find(d => d.id === id)
    if (!dish) return
    let cart = wx.getStorageSync('cart') || []
    const exist = cart.find(c => c.id === id)
    if (exist) exist.qty += 1
    else cart.push({ id: dish.id, name: dish.name, photo: dish.photo, emoji: dish.emoji, qty: 1 })
    wx.setStorageSync('cart', cart)
    this.showToast('/img/ok_icon.png', '不够！我还要！！！')
  },
  doFav(e) {
    const id = e.currentTarget.dataset.id
    let favs = wx.getStorageSync('favorites') || []
    if (!favs.includes(id)) {
      favs.push(id)
      wx.setStorageSync('favorites', favs)
      this.showToast('/img/fav_icon.png', '好吃好吃！下次还要！')
    }
  },
  showToast(icon, text) {
    this.setData({ toastIcon: icon, toastText: text, showToast: true })
    setTimeout(() => { this.setData({ showToast: false }) }, 2000)
  }
})
