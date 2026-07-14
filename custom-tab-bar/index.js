const app = getApp()
const tabList = [
  {"pagePath": "/pages/index/index", "iconPath": "/images/menu.png", "selectedIconPath": "/images/menu_hl.png", "text": "菜单"},
  {"pagePath": "/pages/dessert/dessert", "iconPath": "/images/dessert.png", "selectedIconPath": "/images/dessert_hl.png", "text": "甜品水果"},
  {"pagePath": "/pages/fav/fav", "iconPath": "/images/fav.png", "selectedIconPath": "/images/fav_hl.png", "text": "收藏"},
  {"pagePath": "/pages/cart/cart", "iconPath": "/images/cart.png", "selectedIconPath": "/images/cart_hl.png", "text": "购物车"},
  {"pagePath": "/pages/invoice/invoice", "iconPath": "/images/invoice.png", "selectedIconPath": "/images/invoice_hl.png", "text": "发票"},
]
Component({
  properties: {
    current: { type: Number, value: 0 }
  },
  data: { list: tabList, currentTab: 0, indicatorLeft: 0, hideTabbar: false },
  lifetimes: {
    attached() {
      this.setData({ currentTab: this.properties.current || 0 })
    },
    ready() {
      setTimeout(() => {
        this.updateIndicator(this.properties.current || 0)
      }, 100)
    }
  },
  observers: {
    'currentTab': function(val) {
      setTimeout(() => {
        this.updateIndicator(val)
      }, 50)
    }
  },
  methods: {
    updateIndicator(idx) {
      const query = this.createSelectorQuery()
      query.selectAll('.tab-item').boundingClientRect().exec(res => {
        if (!res || !res[0] || res[0].length <= idx) return
        const tab = res[0][idx]
        this.setData({ indicatorLeft: tab.left + tab.width / 2 - 40 })
      })
    },
    switchTab(e) {
      const idx = e.currentTarget.dataset.index
      const url = tabList[idx].pagePath
      wx.switchTab({ url })
    }
  }
})
