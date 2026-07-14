const app = getApp()
const tabList = [
  {"pagePath": "/pages/index/index", "iconPath": "/images/menu.png", "selectedIconPath": "/images/menu_hl.png", "text": "菜单"},
  {"pagePath": "/pages/dessert/dessert", "iconPath": "/images/dessert.png", "selectedIconPath": "/images/dessert_hl.png", "text": "甜品"},
  {"pagePath": "/pages/cart/cart", "iconPath": "/images/cart.png", "selectedIconPath": "/images/cart_hl.png", "text": "购物车"},
  {"pagePath": "/pages/invoice/invoice", "iconPath": "/images/invoice.png", "selectedIconPath": "/images/invoice_hl.png", "text": "发票"},
]
Component({
  properties: {
    current: { type: Number, value: 0 }
  },
  data: { list: tabList, currentTab: 0 },
  lifetimes: {
    attached() {
      this.setData({ currentTab: this.properties.current || 0 })
    }
  },
  methods: {
    switchTab(e) {
      const idx = e.currentTarget.dataset.index
      const url = tabList[idx].pagePath
      wx.switchTab({ url })
    }
  }
})
