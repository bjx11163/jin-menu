const app = getApp()
const CATEGORIES = ['全部','🥘 干煸干锅','🍳 小炒','🍜 面类','🍗 炸烤红烧','🥣 汤类','🍲 炖煮']

Page({
  data: {
    dishes: [], displayDishes: [], categories: CATEGORIES, currentCat: '全部',
    searchText: '', dateStr: '', anniversaryDays: 0, cartCount: 0,
    recommendDish: null, recommendReason: '', loading: false,
    randomShow: false, randomDish: {},
    favorites: [],
    showToast: false, toastIcon: '', toastText: '',
    flyShow: false, flyX: 0, flyY: 0, flyPhoto: '', flyEmoji: '',
  },

  onLoad() {
    const dishes = wx.getStorageSync('dishes') || app.getDefaultDishes()
    const favs = wx.getStorageSync('favorites') || []
    const date = new Date()
    const dateStr = date.getFullYear()+'/'+String(date.getMonth()+1).padStart(2,'0')+'/'+String(date.getDate()).padStart(2,'0')
    const annDate = wx.getStorageSync('anniversaryDate') || '2026-03-23'
    const days = Math.floor((Date.now() - new Date(annDate).getTime()) / 86400000)
    this.setData({ dishes, dateStr, anniversaryDays: days, favorites: favs })
    this.filterDishes()
  },

  onShow() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({ cartCount: cart.reduce((s,c) => s + c.qty, 0) })
    if (typeof this.getTabBar === 'function' && this.getTabBar()) {
      this.getTabBar().setData({ currentTab: 0, hideTabbar: false })
    }
  },

  filterDishes() {
    let list = this.data.dishes.filter(d => d.category !== '甜品水果')
    if (this.data.currentCat !== '全部') list = list.filter(d => d.category === this.data.currentCat)
    if (this.data.searchText) list = list.filter(d => d.name.includes(this.data.searchText))
    this.setData({ displayDishes: list })
    this.pickRecommend(list)
  },

  onSearch(e) { this.setData({ searchText: e.detail.value }); this.filterDishes() },

  switchCat(e) { this.setData({ currentCat: e.currentTarget.dataset.cat }); this.filterDishes() },

  pickRecommend(list) {
    if (!list || list.length === 0) { this.setData({ recommendDish: null }); return }
    const sorted = [...list].sort((a,b) => (b.rating||0) - (a.rating||0))
    const pick = sorted[Math.floor(Math.random() * Math.min(3, sorted.length))]
    const reasons = ['天热，吃点清爽的？','天冷，来点暖胃的！','今天适合吃这个～','感觉你想吃这个了','这个好久没吃了吧']
    this.setData({ recommendDish: pick, recommendReason: reasons[Math.floor(Math.random() * reasons.length)] })
  },

  addRecommend() {
    if (this.data.recommendDish) this.doAddCart(this.data.recommendDish.id)
  },

  // 点菜
  addToCart(e) { this.doAddCart(e.currentTarget.dataset.id, e) },

  doAddCart(id, e) {
    const dish = this.data.dishes.find(d => d.id === id)
    if (!dish) return
    let cart = wx.getStorageSync('cart') || []
    const exist = cart.find(c => c.id === id)
    if (exist) exist.qty += 1
    else cart.push({ id: dish.id, name: dish.name, photo: dish.photo, emoji: dish.emoji, qty: 1 })
    wx.setStorageSync('cart', cart)
    this.setData({ cartCount: cart.reduce((s,c) => s + c.qty, 0) })

    // 飞入动效 - 从按钮位置飞向购物车tab
    if (e && dish) {
      const query = wx.createSelectorQuery()
      query.select('#cart-tab-item').boundingClientRect(cartRect => {
        if (cartRect) {
          const btn = e.currentTarget
          // 获取按钮位置
          wx.createSelectorQuery().select('.btn-light').boundingClientRect(btnRect => {
            if (btnRect) {
              this.setData({
                flyShow: true,
                flyX: btnRect.left + btnRect.width / 2,
                flyY: btnRect.top,
                flyPhoto: dish.photo || '',
                flyEmoji: dish.emoji || '',
              })
              setTimeout(() => {
                this.setData({
                  flyX: cartRect.left + cartRect.width / 2,
                  flyY: cartRect.top,
                })
              }, 30)
              setTimeout(() => {
                this.setData({ flyShow: false })
              }, 600)
            }
          }).exec()
        }
      }).exec()
    }

    this.showCustomToast('/img/ok_icon.png', '不够！我还要！！！')
  },

  // 收藏（仅添加，取消请到收藏页）
  doFav(e) {
    const id = e.currentTarget.dataset.id
    let favs = wx.getStorageSync('favorites') || []
    if (!favs.includes(id)) {
      favs.push(id)
      wx.setStorageSync('favorites', favs)
      this.setData({ favorites: favs })
      this.showCustomToast('/img/fav_icon.png', '好吃好吃！下次还要！')
    }
  },

  // 随机选菜
  randomPick() {
    const list = this.data.displayDishes
    if (list.length === 0) return
    const pick = list[Math.floor(Math.random() * list.length)]
    this.setData({ randomDish: pick, randomShow: true })
  },

  addRandomCart() {
    if (this.data.randomDish) {
      this.doAddCart(this.data.randomDish.id)
      this.setData({ randomShow: false })
    }
  },

  closeRandom() {
    this.setData({ randomShow: false })
  },

  showCustomToast(icon, text) {
    this.setData({ toastIcon: icon, toastText: text, showToast: true })
    setTimeout(() => {
      this.setData({ showToast: false })
    }, 2000)
  },
})
