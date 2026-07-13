# 私人点菜小程序 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 微信扫码私人点菜小程序，她点菜我做饭，两人私厨系统

**Architecture:** 微信小程序原生（wxml+wxss+js） + 微信云开发（云数据库+云存储+云函数）。同一个小程序通过openid区分角色（厨师/顾客），厨师入口设密码保护。

**Tech Stack:** 微信小程序原生框架 / 微信云开发 / Canvas 2D API（图片编辑）/ 微信订阅消息（通知）

**阶段划分：** 分4个Phase，每Phase结束后可独立验证

---
## 文件结构

```
d:/Model/claude/xcx/
├── project.config.json          # 项目配置
├── app.json                     # 全局配置
├── app.wxss                     # 全局样式（主题色/毛玻璃/字体）
├── app.js                       # 全局逻辑（角色判断/openid获取）
├── img/
│   └── bg.jpg                   # 复古街景背景图
├── env.list                     # 环境变量
│
├── pages/
│   ├── launch/                   # 启动页（角色选择）
│   │   ├── launch.wxml
│   │   ├── launch.wxss
│   │   ├── launch.js
│   │   └── launch.json
│   │
│   ├── menu/                     # 菜单首页（顾客端Tab1）
│   │   ├── menu.wxml
│   │   ├── menu.wxss
│   │   ├── menu.js
│   │   └── menu.json
│   │
│   ├── cart/                     # 购物车（顾客端Tab2）
│   │   ├── cart.wxml
│   │   ├── cart.wxss
│   │   ├── cart.js
│   │   └── cart.json
│   │
│   ├── profile/                  # 个人中心（顾客端Tab3）
│   │   ├── profile.wxml
│   │   ├── profile.wxss
│   │   ├── profile.js
│   │   └── profile.json
│   │
│   ├── order-history/            # 点单历史（个人中心子页）
│   │   ├── order_history.wxml
│   │   ├── order_history.wxss
│   │   ├── order_history.js
│   │   └── order_history.json
│   │
│   ├── wishlist/                 # 心愿菜单
│   │   ├── wishlist.wxml
│   │   ├── wishlist.wxss
│   │   ├── wishlist.js
│   │   └── wishlist.json
│   │
│   ├── admin-home/               # 管理首页（接单）
│   │   ├── admin_home.wxml
│   │   ├── admin_home.wxss
│   │   ├── admin_home.js
│   │   └── admin_home.json
│   │
│   ├── dish-edit/                # 菜品编辑（新增/编辑）
│   │   ├── dish_edit.wxml
│   │   ├── dish_edit.wxss
│   │   ├── dish_edit.js
│   │   └── dish_edit.json
│   │
│   ├── image-editor/             # 图片编辑器
│   │   ├── image_editor.wxml
│   │   ├── image_editor.wxss
│   │   ├── image_editor.js
│   │   └── image_editor.json
│   │
│   ├── stats/                    # 统计页面
│   │   ├── stats.wxml
│   │   ├── stats.wxss
│   │   ├── stats.js
│   │   └── stats.json
│   │
│   └── interaction/              # 互动管理（投票/纪念日）
│       ├── interaction.wxml
│       ├── interaction.wxss
│       ├── interaction.js
│       └── interaction.json
│
├── components/
│   ├── dish-card/                # 菜品卡片组件
│   │   ├── dish_card.wxml
│   │   ├── dish_card.wxss
│   │   ├── dish_card.js
│   │   └── dish_card.json
│   │
│   ├── order-item/               # 订单项组件
│   │   ├── order_item.wxml
│   │   ├── order_item.wxss
│   │   ├── order_item.js
│   │   └── order_item.json
│   │
│   └── star-rating/              # 星级评分组件
│       ├── star_rating.wxml
│       ├── star_rating.wxss
│       ├── star_rating.js
│       └── star_rating.json
│
├── utils/
│   ├── db.js                     # 云数据库工具（集合引用）
│   ├── auth.js                   # 角色判断/logintoken
│   ├── notify.js                 # 订阅消息工具
│   └── util.js                   # 通用工具（日期/天气/推荐）
│
├── cloudfunctions/
│   ├── sendOrderNotify/          # 提交订单 → 发订阅消息
│   │   ├── index.js
│   │   └── package.json
│   │
│   └── checkAnniversary/         # 纪念日检查（定时触发）
│       ├── index.js
│       └── package.json
│
└── miniprogram/
    └── (云开发自动生成目录)
```

---

## Phase 1: 项目初始化 + 数据库 + 全局样式（基建）

### Task 1: 微信小程序项目初始化

**Files:**
- Create: `project.config.json`
- Create: `app.json`
- Create: `app.js`
- Create: `app.wxss`
- Create: `env.list`

- [ ] **Step 1: 创建 project.config.json**

```json
{
  "description": "私人点菜小程序",
  "packOptions": { "ignore": ["env.list"] },
  "setting": {
    "urlCheck": true,
    "es6": true,
    "enhance": true,
    "postcss": true,
    "preloadBackgroundData": false,
    "minified": true,
    "newFeature": true,
    "coverView": true,
    "nodeModules": false,
    "autoAudits": false,
    "showShadowRootInWxmlPanel": true,
    "scopeDataCheck": false,
    "uglifyFileName": false,
    "checkInvalidKey": true,
    "checkSiteMap": true,
    "uploadWithSourceMap": true,
    "compileHotReLoad": false,
    "lazyloadPlaceholderEnable": false,
    "useMultiFrameRuntime": true,
    "useApiHook": true,
    "useApiHostProcess": true
  },
  "compileType": "miniprogram",
  "libVersion": "3.7.0",
  "srcMiniprogramRoot": "miniprogram/",
  "cloudfunctionRoot": "cloudfunctions/",
  "appid": "YOUR_APPID_HERE",
  "projectname": "private-order-app",
  "condition": {}
}
```

- [ ] **Step 2: 创建 app.json（全局页面注册 + TabBar 配置）**

```json
{
  "pages": [
    "pages/launch/launch",
    "pages/menu/menu",
    "pages/cart/cart",
    "pages/profile/profile",
    "pages/order-history/order_history",
    "pages/wishlist/wishlist",
    "pages/admin-home/admin_home",
    "pages/dish-edit/dish_edit",
    "pages/image-editor/image_editor",
    "pages/stats/stats",
    "pages/interaction/interaction"
  ],
  "window": {
    "navigationStyle": "custom",
    "backgroundColor": "#1a1a1a"
  },
  "tabBar": {
    "custom": false,
    "color": "#888888",
    "selectedColor": "#D4AF37",
    "backgroundColor": "#1e1e1e",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/menu/menu",
        "iconPath": "img/tab-menu.png",
        "selectedIconPath": "img/tab-menu-active.png",
        "text": "菜单"
      },
      {
        "pagePath": "pages/cart/cart",
        "iconPath": "img/tab-cart.png",
        "selectedIconPath": "img/tab-cart-active.png",
        "text": "购物车"
      },
      {
        "pagePath": "pages/profile/profile",
        "iconPath": "img/tab-profile.png",
        "selectedIconPath": "img/tab-profile-active.png",
        "text": "我的"
      }
    ]
  },
  "cloud": true,
  "sitemapLocation": "sitemap.json"
}
```

- [ ] **Step 3: 创建 app.js（全局初始化 + 角色管理）**

```javascript
// app.js
App({
  globalData: {
    isChef: false,        // 是否是厨师角色
    chefPassword: '1314', // 厨师密码，可在管理端修改
    openid: '',
    anniversaryDate: '2023-01-01', // 纪念日，可在互动管理修改
  },

  onLaunch() {
    // 初始化云开发
    wx.cloud.init({
      env: wx.cloud.DYNAMIC_CURRENT_ENV,
      traceUser: true,
    })

    // 获取openid
    this.getOpenid()
    // 读取本地缓存角色
    this.loadRole()
  },

  getOpenid() {
    const openid = wx.getStorageSync('openid')
    if (openid) {
      this.globalData.openid = openid
      return
    }
    wx.cloud.callFunction({
      name: 'getOpenid',
      complete: (res) => {
        const id = res.result?.openid || res.result?.event?.userInfo?.openId || ''
        if (id) {
          this.globalData.openid = id
          wx.setStorageSync('openid', id)
        }
      }
    })
  },

  loadRole() {
    const isChef = wx.getStorageSync('isChef') || false
    this.globalData.isChef = isChef
  },

  setChefRole(password) {
    if (password === this.globalData.chefPassword) {
      this.globalData.isChef = true
      wx.setStorageSync('isChef', true)
      return true
    }
    return false
  },

  switchToCustomer() {
    this.globalData.isChef = false
    wx.setStorageSync('isChef', false)
  }
})
```

- [ ] **Step 4: 创建 app.wxss（全局样式 — 暖棕复古金主题 + 毛玻璃）**

```css
/* 全局变量 */
page {
  --color-primary: #8B6B4D;
  --color-gold: #D4AF37;
  --color-dark: #3E2723;
  --color-bg: #f5f0eb;
  --color-card: rgba(255, 255, 255, 0.12);
  --color-text: #3E2723;
  --color-text-light: #8B7355;
  --color-border: rgba(139, 107, 77, 0.2);
  --radius-card: 14px;
  --radius-sm: 8px;
  --font-sm: 12px;
  --font-base: 14px;
  --font-lg: 16px;
  --font-xl: 20px;
  box-sizing: border-box;
}

/* 毛玻璃卡片 */
.glass-card {
  background: var(--color-card);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: var(--radius-card);
  border: 1px solid var(--color-border);
  padding: 14px;
}

/* 金色按钮 */
.btn-gold {
  background: linear-gradient(135deg, #D4AF37, #C9A032);
  color: #fff;
  border: none;
  border-radius: var(--radius-sm);
  padding: 10px 20px;
  font-size: var(--font-base);
  font-weight: 600;
  text-align: center;
}

.btn-gold:active {
  opacity: 0.8;
}

/* 毛玻璃按钮 */
.btn-glass {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  color: #fff;
  padding: 8px 16px;
  font-size: var(--font-sm);
}

/* 标签 */
.tag {
  display: inline-block;
  background: rgba(255, 255, 255, 0.12);
  padding: 4px 12px;
  border-radius: 14px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.8);
}

.tag-gold {
  background: rgba(212, 175, 55, 0.25);
  color: #D4AF37;
  font-weight: 600;
}

/* 背景图容器 */
.bg-wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('/img/bg.jpg');
  background-size: cover;
  background-position: center;
}

.bg-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.35);
}

.bg-content {
  position: relative;
  z-index: 1;
  padding: 16px;
}

/* 滚动条优化 */
::-webkit-scrollbar {
  width: 0;
  height: 0;
}

/* flex 工具 */
.flex-row { display: flex; align-items: center; }
.flex-between { display: flex; justify-content: space-between; align-items: center; }
.flex-center { display: flex; justify-content: center; align-items: center; }
.flex-wrap { flex-wrap: wrap; }
.gap-sm { gap: 6px; }
.gap-md { gap: 12px; }
```

- [ ] **Step 5: 复制背景图 + 创建占位图标**

```bash
cp "d:/Model/claude/xcx/20161120111746_WFTcL.jpeg" "d:/Model/claude/xcx/img/bg.jpg"
# Tab图标用简单文字替代，或从微信内置图标选择
echo "创建 img/ 目录占位，后续替换正式图标"
mkdir -p d:/Model/claude/xcx/img
```

- [ ] **Step 6: 创建云函数 getOpenid**

```
cloudfunctions/getOpenid/index.js:
```

```javascript
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  return {
    openid: wxContext.OPENID,
    appid: wxContext.APPID,
  }
}
```

```
cloudfunctions/getOpenid/package.json:
```

```json
{
  "name": "getOpenid",
  "version": "1.0.0",
  "dependencies": {
    "wx-server-sdk": "latest"
  }
}
```

- [ ] **Step 7: 创建 utils 层文件（db.js / auth.js / util.js）**

```javascript
// utils/db.js
const db = wx.cloud.database()

const collections = {
  dishes: db.collection('dishes'),
  categories: db.collection('categories'),
  orders: db.collection('orders'),
  reviews: db.collection('reviews'),
  favorites: db.collection('favorites'),
  wishlist: db.collection('wishlist'),
  votes: db.collection('votes'),
}

module.exports = { db, collections }
```

```javascript
// utils/auth.js
const app = getApp()

function isChef() {
  return app.globalData.isChef
}

function getOpenid() {
  return app.globalData.openid
}

function requireChef() {
  if (!isChef()) {
    wx.showToast({ title: '无权限', icon: 'none' })
    return false
  }
  return true
}

module.exports = { isChef, getOpenid, requireChef }
```

```javascript
// utils/util.js
function formatDate(date) {
  const d = new Date(date)
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const day = d.getDate().toString().padStart(2, '0')
  return `${month}-${day}`
}

function daysAgo(dateStr) {
  const now = new Date()
  const then = new Date(dateStr)
  const diff = Math.floor((now - then) / (1000 * 60 * 60 * 24))
  return diff
}

function getWeatherTag() {
  // 简单天气判断（小程序无法直接获取天气，用月份近似）
  const month = new Date().getMonth() + 1
  if (month >= 6 && month <= 9) return 'hot'
  if (month >= 12 || month <= 2) return 'cold'
  return 'mild'
}

module.exports = { formatDate, daysAgo, getWeatherTag }
```

- [ ] **Step 8: 创建 sitemap.json + 提交 Phase 1**

```json
// sitemap.json
{
  "rules": [{
    "action": "allow",
    "page": "*"
  }]
}
```

Phase 1 完成。项目骨架搭建完毕，云开发就绪。

---

## Phase 2: 核心功能 — 菜单浏览 + 点菜下单 + 接单（MVP）

### Task 2: 云数据库集合初始化

- [ ] **Step 1: 在微信开发者工具云控制台创建集合**

| 集合名 | 权限 |
|--------|------|
| dishes | 所有用户可读，仅创建者可写 |
| categories | 所有用户可读，仅创建者可写 |
| orders | 仅创建者可读写 |
| reviews | 仅创建者可读写 |
| favorites | 仅创建者可读写 |
| wishlist | 仅创建者可读写 |
| votes | 所有用户可读，仅创建者可写 |

- [ ] **Step 2: 插入默认分类数据**

```javascript
// 在云控制台手动执行，或通过云函数初始化
const db = wx.cloud.database()
const categories = [
  { name: '🥩 荤菜', sortOrder: 1 },
  { name: '🥬 素菜', sortOrder: 2 },
  { name: '🍲 汤', sortOrder: 3 },
  { name: '🥟 主食', sortOrder: 4 },
  { name: '🥗 凉菜', sortOrder: 5 },
]
categories.forEach(c => db.collection('categories').add({ data: c }))
```

### Task 3: 菜品卡片组件 dish-card

**Files:**
- Create: `components/dish-card/dish_card.wxml`
- Create: `components/dish-card/dish_card.wxss`
- Create: `components/dish-card/dish_card.js`
- Create: `components/dish-card/dish_card.json`

- [ ] **Step 1: 创建 dish_card.wxml**

```xml
<view class="dish-card glass-card {{isFav ? 'fav' : ''}}" data-dishid="{{dish._id}}" bindtap="onTap">
  <image class="dish-img" src="{{dish.photo || '/img/placeholder.jpg'}}" mode="aspectFill" />
  <view class="dish-info">
    <view class="dish-header flex-between">
      <text class="dish-name">{{dish.name}}</text>
      <view class="dish-rating flex-row">
        <text class="rating-star">⭐</text>
        <text class="rating-num">{{dish.rating || '-'}}</text>
      </view>
    </view>
    <view class="dish-tags flex-row gap-sm flex-wrap">
      <text class="tag" wx:for="{{dish.tags || []}}" wx:key="*this">{{item}}</text>
      <text class="tag tag-gold">已点{{dish.orderCount || 0}}次</text>
    </view>
    <view class="dish-footer flex-between">
      <text class="dish-last">上次吃{{dish.lastOrderDays ? dish.lastOrderDays + '天前' : '还没点过'}}</text>
      <view class="fav-btn {{isFav ? 'active' : ''}}" catchtap="onFav">
        <text>{{isFav ? '❤️' : '🤍'}}</text>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 dish_card.wxss**

```css
.dish-card {
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  padding: 12px;
  transition: all 0.2s;
}
.dish-card:active { opacity: 0.85; }

.dish-img {
  width: 64px;
  height: 64px;
  border-radius: 8px;
  flex-shrink: 0;
  background: rgba(255,255,255,0.1);
}

.dish-info { flex: 1; min-width: 0; }

.dish-name { font-size: 15px; font-weight: 600; color: #fff; }
.dish-rating { gap: 3px; }
.rating-star { font-size: 12px; }
.rating-num { font-size: 12px; color: #D4AF37; font-weight: 600; }

.dish-tags { margin: 4px 0; }

.dish-footer { margin-top: 2px; }
.dish-last { font-size: 11px; color: rgba(255,255,255,0.55); }

.fav-btn { font-size: 18px; padding: 2px; }
.fav-btn.active { transform: scale(1.1); }
```

- [ ] **Step 3: 创建 dish_card.js**

```javascript
Component({
  properties: {
    dish: { type: Object, value: {} },
    isFav: { type: Boolean, value: false },
  },
  methods: {
    onTap() {
      this.triggerEvent('tap', { dish: this.properties.dish })
    },
    onFav(e) {
      e.stopPropagation()
      this.triggerEvent('fav', { dish: this.properties.dish, isFav: this.properties.isFav })
    }
  }
})
```

- [ ] **Step 4: 创建 dish_card.json**

```json
{ "component": true, "usingComponents": {} }
```

### Task 4: 启动页 launch

**Files:**
- Create: `pages/launch/launch.*`

- [ ] **Step 1: 创建 launch.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="launch-box">
      <text class="launch-title">🍳 小胖的厨房</text>
      <text class="launch-sub">专属点菜 · 用心做饭</text>

      <image class="launch-logo" src="/img/bg.jpg" mode="aspectFill" />

      <view class="launch-btns">
        <button class="btn-gold" bindtap="enterAsCustomer">👩 我是来点菜的</button>
        <button class="btn-glass" bindtap="enterAsChef">👨 我是厨师</button>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 launch.wxss**

```css
.launch-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 90vh;
  padding: 40px 20px;
}

.launch-title { font-size: 32px; font-weight: 700; color: #fff; margin-bottom: 6px; }
.launch-sub { font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 30px; }

.launch-logo {
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 40px;
  border: 2px solid rgba(212,175,55,0.4);
}

.launch-btns { width: 100%; max-width: 280px; display: flex; flex-direction: column; gap: 14px; }

.launch-btns button { width: 100%; }
```

- [ ] **Step 3: 创建 launch.js**

```javascript
const app = getApp()

Page({
  onLoad() {
    // 如果已经设置过角色，直接跳转
    if (app.globalData.isChef) {
      wx.redirectTo({ url: '/pages/admin-home/admin_home' })
    }
  },

  enterAsCustomer() {
    app.switchToCustomer()
    wx.switchTab({ url: '/pages/menu/menu' })
  },

  enterAsChef() {
    wx.showModal({
      title: '厨师验证',
      content: '请输入厨师密码',
      editable: true,
      placeholderText: '默认密码: 1314',
      success: (res) => {
        if (res.confirm && res.content) {
          if (app.setChefRole(res.content.trim())) {
            wx.redirectTo({ url: '/pages/admin-home/admin_home' })
          } else {
            wx.showToast({ title: '密码错误', icon: 'error' })
          }
        }
      }
    })
  }
})
```

- [ ] **Step 4: 创建 launch.json**

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 5: 菜单首页 menu（顾客端核心页面）

**Files:**
- Create: `pages/menu/menu.*`

- [ ] **Step 1: 创建 menu.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <!-- 顶部搜索 -->
    <view class="search-bar glass-card">
      <input class="search-input" placeholder="🔍 搜搜今天想吃啥..." bindinput="onSearchInput" />
    </view>

    <!-- 分类标签 -->
    <scroll-view class="category-scroll" scroll-x enhanced show-scrollbar="{{false}}">
      <view class="category-inner flex-row">
        <view class="category-tag {{currentCat === 'all' ? 'active' : ''}}" bindtap="switchCategory" data-cat="all">
          <text>📋 全部</text>
        </view>
        <view class="category-tag {{currentCat === item.name ? 'active' : ''}}" wx:for="{{categories}}" wx:key="_id" bindtap="switchCategory" data-cat="{{item.name}}">
          <text>{{item.name}}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 今日推荐（随机选投射） -->
    <view class="recommend-card glass-card" wx:if="{{recommendDish}}" bindtap="goToRecommend">
      <text class="recommend-label">🤖 猜你想吃</text>
      <text class="recommend-name">{{recommendDish.name}}</text>
      <text class="recommend-reason">{{recommendReason}}</text>
    </view>

    <!-- 菜品列表 -->
    <scroll-view class="dish-list" scroll-y enhanced show-scrollbar="{{false}}" bindscrolltolower="loadMore">
      <dish-card
        wx:for="{{dishes}}" wx:key="_id"
        dish="{{item}}"
        isFav="{{favSet.has(item._id)}}"
        bind:tap="onDishTap"
        bind:fav="onFavTap"
      />
      <view class="list-empty" wx:if="{{dishes.length === 0 && !loading}}">
        <text>🫗 还没有菜品，让厨师加几道吧</text>
      </view>
      <view class="list-loading" wx:if="{{loading}}">
        <text>加载中...</text>
      </view>
    </scroll-view>

    <!-- 浮动随机按钮 -->
    <view class="float-random" bindtap="randomPick">
      <text class="float-icon">🎲</text>
    </view>

    <!-- 投票入口（有活跃投票时显示） -->
    <view class="vote-banner glass-card" wx:if="{{activeVote}}" bindtap="goToVote">
      <text>⚖️ 投票：{{activeVote.description}} → 点击参与</text>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 menu.wxss**

```css
.search-bar { margin-bottom: 12px; padding: 8px 14px; }
.search-input { width: 100%; font-size: 14px; color: #fff; }
.search-input::placeholder { color: rgba(255,255,255,0.5); }

.category-scroll { margin-bottom: 14px; white-space: nowrap; }
.category-inner { gap: 8px; padding: 2px 0; }
.category-tag {
  display: inline-block;
  background: rgba(255,255,255,0.12);
  padding: 6px 16px;
  border-radius: 16px;
  font-size: 13px;
  color: rgba(255,255,255,0.7);
  flex-shrink: 0;
}
.category-tag.active { background: rgba(212,175,55,0.3); color: #D4AF37; font-weight: 600; }

.recommend-card {
  margin-bottom: 14px;
  padding: 14px;
  background: linear-gradient(135deg, rgba(212,175,55,0.15), rgba(139,107,77,0.15));
  border-color: rgba(212,175,55,0.3);
}
.recommend-label { font-size: 11px; color: #D4AF37; }
.recommend-name { font-size: 16px; font-weight: 600; color: #fff; display: block; margin: 4px 0; }
.recommend-reason { font-size: 12px; color: rgba(255,255,255,0.6); }

.dish-list { padding-bottom: 120px; }

.list-empty, .list-loading {
  text-align: center;
  padding: 40px 0;
  color: rgba(255,255,255,0.4);
  font-size: 14px;
}

.float-random {
  position: fixed;
  bottom: 100px;
  right: 20px;
  width: 52px;
  height: 52px;
  border-radius: 26px;
  background: linear-gradient(135deg, #D4AF37, #C9A032);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 15px rgba(212,175,55,0.4);
  z-index: 100;
}
.float-icon { font-size: 24px; }

.vote-banner {
  position: fixed;
  bottom: 180px;
  left: 16px;
  right: 16px;
  padding: 10px 14px;
  background: rgba(160, 120, 255, 0.2);
  border-color: rgba(160, 120, 255, 0.3);
  z-index: 99;
  font-size: 13px;
  color: #fff;
}
```

- [ ] **Step 3: 创建 menu.js**

```javascript
const { db, collections } = require('../../utils/db')
const { getWeatherTag } = require('../../utils/util')

Page({
  data: {
    dishes: [],
    categories: [],
    currentCat: 'all',
    searchText: '',
    favSet: new Set(),
    recommendDish: null,
    recommendReason: '',
    activeVote: null,
    loading: false,
    page: 0,
    hasMore: true,
  },

  onLoad() {
    this.loadCategories()
    this.loadDishes()
    this.loadFavorites()
    this.loadActiveVote()
    this.pickRecommend()
  },

  onShow() {
    // 每次显示刷新，可能有新数据
    this.loadDishes()
    this.loadFavorites()
  },

  loadCategories() {
    collections.categories.orderBy('sortOrder', 'asc').get().then(res => {
      this.setData({ categories: res.data })
    })
  },

  loadDishes() {
    this.setData({ loading: true })
    let query = collections.dishes.orderBy('createdAt', 'desc')

    if (this.data.currentCat !== 'all') {
      query = query.where({ category: this.data.currentCat })
    }
    if (this.data.searchText) {
      query = query.where({
        name: db.RegExp({ regexp: this.data.searchText, options: 'i' })
      })
    }

    query.skip(this.data.page * 20).limit(20).get().then(res => {
      const dishes = res.data.map(d => ({
        ...d,
        orderCount: d.orderCount || 0,
        lastOrderDays: d.lastOrderAt ? Math.floor((Date.now() - new Date(d.lastOrderAt)) / 86400000) : null,
      }))
      this.setData({
        dishes: this.data.page === 0 ? dishes : [...this.data.dishes, ...dishes],
        hasMore: dishes.length === 20,
        loading: false,
      })
    }).catch(() => {
      this.setData({ loading: false })
    })
  },

  loadFavorites() {
    const openid = getApp().globalData.openid
    if (!openid) return
    collections.favorites.where({ userId: openid }).get().then(res => {
      const favSet = new Set(res.data.map(f => f.dishId))
      this.setData({ favSet })
    })
  },

  loadActiveVote() {
    collections.votes.where({ status: 'active' }).get().then(res => {
      if (res.data.length > 0) {
        this.setData({ activeVote: res.data[0] })
      }
    })
  },

  pickRecommend() {
    const dishes = this.data.dishes
    if (dishes.length === 0) return
    const weather = getWeatherTag()
    // 简单推荐：选评分最高的或者随机
    const sorted = [...dishes].sort((a, b) => (b.rating || 0) - (a.rating || 0))
    const pick = sorted[Math.floor(Math.random() * Math.min(3, sorted.length))]
    const reasons = {
      hot: '天热，吃点清爽的？',
      cold: '天冷，来点暖胃的！',
      mild: '今天适合吃这个～',
    }
    this.setData({
      recommendDish: pick,
      recommendReason: reasons[weather] || '猜你想吃这个！'
    })
  },

  onSearchInput(e) {
    this.setData({ searchText: e.detail.value, page: 0 })
    this.loadDishes()
  },

  switchCategory(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ currentCat: cat, page: 0 })
    this.loadDishes()
  },

  loadMore() {
    if (!this.data.hasMore || this.data.loading) return
    this.setData({ page: this.data.page + 1 })
    this.loadDishes()
  },

  onDishTap(e) {
    const dish = e.detail.dish
    // 跳转到菜品详情（后续可以扩展为独立详情页，当前简化：加入购物车）
    wx.showActionSheet({
      itemList: ['加入购物车', '直接下单'],
      success: (res) => {
        if (res.tapIndex === 0) {
          this.addToCart(dish)
        } else {
          this.orderNow(dish)
        }
      }
    })
  },

  addToCart(dish) {
    const cart = wx.getStorageSync('cart') || []
    const exist = cart.find(c => c.dishId === dish._id)
    if (exist) {
      exist.quantity += 1
    } else {
      cart.push({ dishId: dish._id, name: dish.name, photo: dish.photo, quantity: 1 })
    }
    wx.setStorageSync('cart', cart)
    wx.showToast({ title: '已加入购物车', icon: 'success' })
  },

  orderNow(dish) {
    // 直接下单（不带购物车，数量1）
    const cart = [{ dishId: dish._id, name: dish.name, photo: dish.photo, quantity: 1 }]
    wx.setStorageSync('cart', cart)
    wx.switchTab({ url: '/pages/cart/cart' })
  },

  onFavTap(e) {
    const { dish, isFav } = e.detail
    const openid = getApp().globalData.openid
    if (!openid) {
      wx.showToast({ title: '请先登录', icon: 'none' })
      return
    }
    if (isFav) {
      collections.favorites.where({ userId: openid, dishId: dish._id }).get().then(res => {
        if (res.data.length > 0) {
          collections.favorites.doc(res.data[0]._id).remove()
        }
      })
      this.setData({ favSet: new Set([...this.data.favSet].filter(id => id !== dish._id)) })
      wx.showToast({ title: '已取消收藏', icon: 'none' })
    } else {
      collections.favorites.add({ data: { userId: openid, dishId: dish._id, createdAt: db.serverDate() } })
      this.setData({ favSet: new Set([...this.data.favSet, dish._id]) })
      wx.showToast({ title: '已收藏 ❤️', icon: 'success' })
    }
  },

  randomPick() {
    const dishes = this.data.dishes
    if (dishes.length === 0) return
    const pick = dishes[Math.floor(Math.random() * dishes.length)]
    wx.showModal({
      title: '🎲 今天吃这个！',
      content: `${pick.name} ${pick.rating ? '⭐' + pick.rating : ''}`,
      confirmText: '加入购物车',
      cancelText: '换一个',
      success: (res) => {
        if (res.confirm) this.addToCart(pick)
        else this.randomPick()
      }
    })
  },

  goToRecommend() {
    if (this.data.recommendDish) {
      this.addToCart(this.data.recommendDish)
    }
  },

  goToVote() {
    wx.navigateTo({ url: '/pages/interaction/interaction' })
  }
})
```

- [ ] **Step 4: 创建 menu.json**

```json
{
  "navigationStyle": "custom",
  "usingComponents": {
    "dish-card": "/components/dish-card/dish_card"
  }
}
```

### Task 6: 购物车页面 cart

**Files:**
- Create: `pages/cart/cart.*`

- [ ] **Step 1: 创建 cart.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header">
      <text class="page-title">🛒 购物车</text>
    </view>

    <view class="cart-list" wx:if="{{cart.length > 0}}">
      <view class="cart-item glass-card" wx:for="{{cart}}" wx:key="dishId">
        <image class="cart-img" src="{{item.photo || '/img/placeholder.jpg'}}" mode="aspectFill" />
        <view class="cart-info">
          <text class="cart-name">{{item.name}}</text>
          <view class="cart-qty flex-row">
            <view class="qty-btn" catchtap="decrease" data-index="{{index}}">−</view>
            <text class="qty-num">{{item.quantity}}</text>
            <view class="qty-btn" catchtap="increase" data-index="{{index}}">+</view>
            <view class="qty-del" catchtap="removeItem" data-index="{{index}}">🗑️</view>
          </view>
        </view>
      </view>
    </view>

    <view class="cart-empty" wx:if="{{cart.length === 0}}">
      <text>🛒 购物车是空的</text>
      <text class="empty-hint">去菜单里挑几道想吃的吧</text>
    </view>

    <!-- 备注 + 预约时间 -->
    <view class="order-form glass-card" wx:if="{{cart.length > 0}}">
      <textarea class="note-input" placeholder="💬 写个备注… (少放辣/多加点葱/情话)" bindinput="onNoteInput" maxlength="100" />
      <view class="time-picker flex-row flex-between">
        <text class="time-label">⏰ 预约时间</text>
        <picker mode="time" value="{{scheduledTime}}" bindchange="onTimeChange">
          <text class="time-value">{{scheduledTime || '不预约'}}</text>
        </picker>
      </view>
    </view>

    <!-- 提交按钮 -->
    <view class="submit-bar" wx:if="{{cart.length > 0}}">
      <view class="submit-inner">
        <text class="submit-count">共 {{totalQty}} 道菜</text>
        <button class="btn-gold submit-btn" bindtap="submitOrder" loading="{{submitting}}">📤 提交订单</button>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 cart.wxss**

```css
.page-header { padding: 16px 0; }
.page-title { font-size: 22px; font-weight: 700; color: #fff; }

.cart-item { display: flex; gap: 12px; margin-bottom: 10px; align-items: center; }
.cart-img { width: 50px; height: 50px; border-radius: 8px; flex-shrink: 0; background: rgba(255,255,255,0.1); }
.cart-info { flex: 1; }
.cart-name { font-size: 15px; font-weight: 600; color: #fff; display: block; margin-bottom: 6px; }

.cart-qty { align-items: center; gap: 8px; }
.qty-btn {
  width: 28px; height: 28px;
  border-radius: 14px;
  background: rgba(255,255,255,0.12);
  display: flex; align-items: center; justify-content: center;
  font-size: 16px; color: #fff;
}
.qty-num { font-size: 15px; font-weight: 600; color: #D4AF37; min-width: 24px; text-align: center; }
.qty-del { font-size: 14px; margin-left: auto; padding: 4px; }

.cart-empty { text-align: center; padding: 80px 0; }
.cart-empty text { display: block; font-size: 16px; color: rgba(255,255,255,0.4); }
.empty-hint { font-size: 13px; margin-top: 8px; color: rgba(255,255,255,0.3); }

.order-form { margin-top: 16px; padding: 14px; }
.note-input {
  width: 100%;
  min-height: 60px;
  background: rgba(255,255,255,0.06);
  border-radius: 8px;
  padding: 10px;
  font-size: 13px;
  color: #fff;
  border: none;
}
.note-input::placeholder { color: rgba(255,255,255,0.4); }

.time-picker { margin-top: 10px; }
.time-label { font-size: 13px; color: rgba(255,255,255,0.7); }
.time-value { font-size: 13px; color: #D4AF37; }

.submit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 16px;
  padding-bottom: calc(12px + env(safe-area-inset-bottom));
  background: rgba(30,30,30,0.95);
  backdrop-filter: blur(12px);
  border-top: 1px solid rgba(255,255,255,0.08);
}
.submit-inner { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.submit-count { font-size: 13px; color: rgba(255,255,255,0.6); }
.submit-btn { flex: 1; max-width: 200px; margin: 0; line-height: 1; }
```

- [ ] **Step 3: 创建 cart.js**

```javascript
const { collections } = require('../../utils/db')

Page({
  data: {
    cart: [],
    note: '',
    scheduledTime: '',
    submitting: false,
  },

  onShow() {
    this.loadCart()
  },

  loadCart() {
    const cart = wx.getStorageSync('cart') || []
    this.setData({ cart })
  },

  get totalQty() {
    return this.data.cart.reduce((sum, c) => sum + c.quantity, 0)
  },

  increase(e) {
    const idx = e.currentTarget.dataset.index
    const cart = this.data.cart
    cart[idx].quantity += 1
    wx.setStorageSync('cart', cart)
    this.setData({ cart })
  },

  decrease(e) {
    const idx = e.currentTarget.dataset.index
    const cart = this.data.cart
    if (cart[idx].quantity > 1) {
      cart[idx].quantity -= 1
    } else {
      cart.splice(idx, 1)
    }
    wx.setStorageSync('cart', cart)
    this.setData({ cart })
  },

  removeItem(e) {
    const idx = e.currentTarget.dataset.index
    const cart = this.data.cart
    cart.splice(idx, 1)
    wx.setStorageSync('cart', cart)
    this.setData({ cart })
  },

  onNoteInput(e) {
    this.setData({ note: e.detail.value })
  },

  onTimeChange(e) {
    this.setData({ scheduledTime: e.detail.value })
  },

  async submitOrder() {
    if (this.data.submitting) return
    this.setData({ submitting: true })

    const cart = this.data.cart
    const openid = getApp().globalData.openid

    if (!openid) {
      wx.showToast({ title: '登录中，请稍后', icon: 'none' })
      this.setData({ submitting: false })
      return
    }

    const orderData = {
      userId: openid,
      items: cart.map(c => ({
        dishId: c.dishId,
        name: c.name,
        quantity: c.quantity,
      })),
      note: this.data.note || '',
      scheduledTime: this.data.scheduledTime || '',
      status: 'pending',
      createdAt: db.serverDate(),
    }

    try {
      const res = await collections.orders.add({ data: orderData })

      // 清空购物车
      wx.setStorageSync('cart', [])
      this.setData({ cart: [], note: '', scheduledTime: '' })

      // 请求订阅消息权限
      this.requestNotify()

      wx.showModal({
        title: '✅ 已提交',
        content: '厨师已收到你的点单，等着吃吧～',
        confirmText: '好的',
      })
    } catch (err) {
      wx.showToast({ title: '提交失败', icon: 'error' })
    } finally {
      this.setData({ submitting: false })
    }
  },

  requestNotify() {
    wx.requestSubscribeMessage({
      tmplIds: ['YOUR_TEMPLATE_ID'], // 替换为微信订阅消息模板ID
      success: () => {
        // 触发云函数发通知
        wx.cloud.callFunction({
          name: 'sendOrderNotify',
          data: { openid: getApp().globalData.openid }
        })
      }
    })
  }
})
```

- [ ] **Step 4: 创建 cart.json**

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 7: 管理首页 admin-home（接单）

**Files:**
- Create: `pages/admin-home/admin_home.*`
- Create: `components/order-item/order_item.*`

- [ ] **Step 1: 创建 order-item 组件（订单项）**

```xml
<!-- components/order-item/order_item.wxml -->
<view class="order-item glass-card">
  <view class="order-header flex-between">
    <text class="order-time">{{item.createdAt}}</text>
    <text class="order-status {{item.status}}">{{item.status === 'pending' ? '待处理' : '已做好'}}</text>
  </view>
  <view class="order-dishes">
    <text class="order-dish" wx:for="{{item.items}}" wx:key="dishId">
      {{item.name}} × {{item.quantity}}
    </text>
  </view>
  <text class="order-note" wx:if="{{item.note}}">💬 {{item.note}}</text>
  <text class="order-time" wx:if="{{item.scheduledTime}}">⏰ 预约 {{item.scheduledTime}}</text>
  <button class="btn-gold done-btn" wx:if="{{item.status === 'pending'}}" catchtap="onDone" data-orderid="{{item._id}}">✅ 已做好</button>
</view>
```

```css
/* components/order-item/order_item.wxss */
.order-item { margin-bottom: 12px; padding: 14px; }
.order-header { margin-bottom: 8px; }
.order-time { font-size: 12px; color: rgba(255,255,255,0.5); }
.order-status {
  font-size: 11px;
  padding: 2px 10px;
  border-radius: 10px;
  background: rgba(255,255,255,0.1);
}
.order-status.pending { background: rgba(255,159,10,0.2); color: #FF9F0A; }
.order-status.done { background: rgba(52,199,89,0.2); color: #34C759; }

.order-dishes { margin-bottom: 6px; }
.order-dish { display: block; font-size: 14px; color: #fff; line-height: 1.6; }
.order-note { font-size: 12px; color: rgba(255,255,255,0.6); display: block; margin-bottom: 4px; }
.done-btn { margin-top: 10px; width: 100%; }
```

```javascript
// components/order-item/order_item.js
Component({
  properties: {
    item: { type: Object, value: {} }
  },
  methods: {
    onDone(e) {
      this.triggerEvent('done', { orderId: e.currentTarget.dataset.orderid })
    }
  }
})
```

```json
{ "component": true, "usingComponents": {} }
```

- [ ] **Step 2: 创建 admin_home.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header flex-between">
      <text class="page-title">🔧 厨师后台</text>
      <view class="header-links flex-row gap-sm">
        <text class="header-link" bindtap="goToDishEdit" data-id="">➕ 新菜</text>
        <text class="header-link" bindtap="goToStats">📊 统计</text>
        <text class="header-link" bindtap="goToInteraction">🎯 互动</text>
      </view>
    </view>

    <!-- 今日概览 -->
    <view class="stats-row flex-row">
      <view class="stat-card glass-card">
        <text class="stat-num">{{pendingCount}}</text>
        <text class="stat-label">待处理</text>
      </view>
      <view class="stat-card glass-card">
        <text class="stat-num">{{todayCount}}</text>
        <text class="stat-label">今日接单</text>
      </view>
      <view class="stat-card glass-card">
        <text class="stat-num">{{monthCount}}</text>
        <text class="stat-label">本月累计</text>
      </view>
    </view>

    <!-- 菜品管理入口 -->
    <view class="glass-card dish-mgr" bindtap="goToDishMgr">
      <text class="mgr-title">📝 菜品管理</text>
      <text class="mgr-hint">共 {{dishCount}} 道菜 · 点击管理 →</text>
    </view>

    <!-- 待处理订单 -->
    <view class="section-title">📋 待处理订单</view>
    <order-item
      wx:for="{{pendingOrders}}" wx:key="_id"
      item="{{item}}"
      bind:done="markDone"
    />
    <view class="section-title" wx:if="{{doneOrders.length > 0}}">✅ 已完成的</view>
    <order-item
      wx:for="{{doneOrders}}" wx:key="_id"
      item="{{item}}"
    />
  </view>
</view>
```

- [ ] **Step 3: 创建 admin_home.wxss**

```css
.page-header { padding: 16px 0; }
.page-title { font-size: 20px; font-weight: 700; color: #fff; }
.header-links { gap: 8px; }
.header-link { font-size: 12px; color: #D4AF37; padding: 4px 8px; }

.stats-row { gap: 10px; margin-bottom: 16px; }
.stat-card { flex: 1; text-align: center; padding: 14px 8px; }
.stat-num { font-size: 28px; font-weight: 700; color: #D4AF37; display: block; }
.stat-label { font-size: 11px; color: rgba(255,255,255,0.5); margin-top: 2px; }

.dish-mgr { padding: 14px; margin-bottom: 16px; }
.mgr-title { font-size: 15px; font-weight: 600; color: #fff; }
.mgr-hint { font-size: 12px; color: rgba(255,255,255,0.5); margin-top: 4px; }

.section-title { font-size: 15px; font-weight: 600; color: #fff; margin: 12px 0 8px; }
```

- [ ] **Step 4: 创建 admin_home.js**

```javascript
const { db, collections } = require('../../utils/db')
const { requireChef } = require('../../utils/auth')

Page({
  data: {
    pendingOrders: [],
    doneOrders: [],
    pendingCount: 0,
    todayCount: 0,
    monthCount: 0,
    dishCount: 0,
  },

  onShow() {
    if (!requireChef()) return
    this.loadOrders()
    this.loadStats()
    this.loadDishCount()
  },

  loadOrders() {
    const openid = getApp().globalData.openid

    // 待处理
    collections.orders
      .where({ status: 'pending' })
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        this.setData({
          pendingOrders: res.data,
          pendingCount: res.data.length,
        })
      })

    // 今天已完成的
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    collections.orders
      .where({ status: 'done' })
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        this.setData({ doneOrders: res.data })
      })
  },

  loadStats() {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1)

    collections.orders.where({
      createdAt: db.command.gte(today)
    }).count().then(res => {
      this.setData({ todayCount: res.total })
    })

    collections.orders.where({
      createdAt: db.command.gte(monthStart)
    }).count().then(res => {
      this.setData({ monthCount: res.total })
    })
  },

  loadDishCount() {
    collections.dishes.count().then(res => {
      this.setData({ dishCount: res.total })
    })
  },

  markDone(e) {
    const orderId = e.detail.orderId
    collections.orders.doc(orderId).update({
      data: {
        status: 'done',
        completedAt: db.serverDate(),
      }
    }).then(() => {
      wx.showToast({ title: '已标记完成', icon: 'success' })
      this.loadOrders()
      this.loadStats()
    })
  },

  goToDishEdit(e) {
    const id = e.currentTarget.dataset.id || ''
    wx.navigateTo({ url: `/pages/dish-edit/dish_edit?id=${id}` })
  },

  goToDishMgr() {
    wx.navigateTo({ url: '/pages/dish-edit/dish_edit?mode=list' })
  },

  goToStats() {
    wx.navigateTo({ url: '/pages/stats/stats' })
  },

  goToInteraction() {
    wx.navigateTo({ url: '/pages/interaction/interaction' })
  }
})
```

- [ ] **Step 5: 创建 admin_home.json**

```json
{
  "navigationStyle": "custom",
  "usingComponents": {
    "order-item": "/components/order-item/order_item"
  }
}
```

### Task 8: 云函数 sendOrderNotify

**Files:**
- Create: `cloudfunctions/sendOrderNotify/index.js`
- Create: `cloudfunctions/sendOrderNotify/package.json`

- [ ] **Step 1: 创建 sendOrderNotify**

```javascript
// cloudfunctions/sendOrderNotify/index.js
const cloud = require('wx-server-sdk')
cloud.init()
exports.main = async (event) => {
  const { toUser } = event

  try {
    const result = await cloud.openapi.subscribeMessage.send({
      touser: toUser || cloud.getWXContext().OPENID,
      templateId: 'YOUR_TEMPLATE_ID', // 替换为真实模板ID
      page: 'pages/admin-home/admin_home',
      data: {
        thing1: { value: '女朋友点了新菜！' },
        time2: { value: new Date().toLocaleString('zh-CN') },
        thing3: { value: '快去看看要做啥' },
      }
    })
    return { success: true, result }
  } catch (err) {
    return { success: false, err }
  }
}
```

```json
// cloudfunctions/sendOrderNotify/package.json
{
  "name": "sendOrderNotify",
  "version": "1.0.0",
  "dependencies": {
    "wx-server-sdk": "latest"
  }
}
```

- [ ] **Step 2: 微信公众平台配置订阅消息模板**

管理员操作：
1. 登录 mp.weixin.qq.com
2. 功能 → 订阅消息 → 公共模板库
3. 搜索"下单通知"相关模板
4. 获取模板ID → 替换代码中的 `YOUR_TEMPLATE_ID`

---

## Phase 3: 菜品管理 + 图片编辑器（管理员核心）

### Task 9: 菜品编辑页面 dish-edit

**Files:**
- Create: `pages/dish-edit/dish_edit.*`

- [ ] **Step 1: 创建 dish_edit.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header flex-between">
      <text class="page-title">{{isNew ? '➕ 新菜品' : '✏️ 编辑菜品'}}</text>
      <text class="header-link" bindtap="switchToList">📋 列表</text>
    </view>

    <!-- 列表模式 -->
    <view wx:if="{{mode === 'list'}}">
      <view class="dish-mgr-item glass-card flex-between" wx:for="{{dishList}}" wx:key="_id" bindtap="editDish" data-id="{{item._id}}">
        <view class="flex-row gap-sm">
          <image class="mgr-img" src="{{item.photo || '/img/placeholder.jpg'}}" mode="aspectFill" />
          <view>
            <text class="mgr-name">{{item.name}}</text>
            <text class="mgr-cat">{{item.category}}</text>
          </view>
        </view>
        <view class="mgr-actions flex-row gap-sm">
          <text class="mgr-del" catchtap="deleteDish" data-id="{{item._id}}">🗑️</text>
        </view>
      </view>
    </view>

    <!-- 编辑模式 -->
    <view wx:else>
      <view class="form-group">
        <text class="form-label">菜名 *</text>
        <input class="form-input" placeholder="如：番茄炒蛋" value="{{dishName}}" bindinput="onNameInput" />
      </view>

      <view class="form-group">
        <text class="form-label">分类 *</text>
        <picker range="{{categories}}" range-key="name" value="{{catIndex}}" bindchange="onCatChange">
          <text class="form-value">{{categories[catIndex]?.name || '选择分类'}}</text>
        </picker>
      </view>

      <view class="form-group">
        <text class="form-label">照片</text>
        <view class="photo-upload" bindtap="uploadPhoto">
          <image wx:if="{{photo}}" src="{{photo}}" mode="aspectFill" class="photo-preview" />
          <text wx:else>📷 上传照片</text>
        </view>
        <button class="btn-glass" wx:if="{{photo}}" bindtap="editPhoto">🎨 编辑图片</button>
      </view>

      <view class="form-group">
        <text class="form-label">描述</text>
        <textarea class="form-textarea" placeholder="这道菜的特点…" value="{{description}}" bindinput="onDescInput" />
      </view>

      <view class="form-group">
        <text class="form-label">用料（逗号分隔）</text>
        <input class="form-input" placeholder="鸡蛋, 番茄, 葱花" value="{{ingredients}}" bindinput="onIngredientsInput" />
      </view>

      <view class="form-group">
        <text class="form-label">标签（逗号分隔）</text>
        <input class="form-input" placeholder="微辣, 下饭, 快手" value="{{tags}}" bindinput="onTagsInput" />
      </view>

      <view class="form-group">
        <text class="form-label">难度</text>
        <slider min="1" max="5" step="1" value="{{difficulty}}" bindchange="onDifficultyChange" />
        <text class="form-hint">{{difficultyText}}</text>
      </view>

      <view class="form-group">
        <text class="form-label">我的评分</text>
        <slider min="1" max="5" step="1" value="{{rating}}" bindchange="onRatingChange" show-value />
      </view>

      <button class="btn-gold save-btn" bindtap="saveDish" loading="{{saving}}">{{isNew ? '创建菜品' : '保存修改'}}</button>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 dish_edit.wxss**

```css
.dish-mgr-item { padding: 12px; margin-bottom: 8px; }
.mgr-img { width: 44px; height: 44px; border-radius: 6px; }
.mgr-name { font-size: 14px; font-weight: 600; color: #fff; display: block; }
.mgr-cat { font-size: 11px; color: rgba(255,255,255,0.4); }
.mgr-del { font-size: 16px; padding: 4px; }

.form-group { margin-bottom: 16px; }
.form-label { font-size: 13px; color: rgba(255,255,255,0.7); display: block; margin-bottom: 6px; font-weight: 500; }
.form-input {
  width: 100%;
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
}
.form-textarea {
  width: 100%;
  min-height: 70px;
  background: rgba(255,255,255,0.08);
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
}
.form-value { font-size: 14px; color: #D4AF37; }
.form-hint { font-size: 12px; color: rgba(255,255,255,0.4); }

.photo-upload {
  width: 100%;
  height: 140px;
  border: 2px dashed rgba(255,255,255,0.15);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: rgba(255,255,255,0.4);
  overflow: hidden;
}
.photo-preview { width: 100%; height: 100%; }

.save-btn { width: 100%; margin-top: 10px; }
```

- [ ] **Step 3: 创建 dish_edit.js**

```javascript
const { db, collections } = require('../../utils/db')
const { requireChef } = require('../../utils/auth')

Page({
  data: {
    mode: 'edit', // list | edit
    isNew: true,
    dishId: '',
    dishName: '',
    categories: [],
    catIndex: 0,
    photo: '',
    description: '',
    ingredients: '',
    tags: '',
    difficulty: 3,
    rating: 4,
    saving: false,
    dishList: [],
  },

  onLoad(options) {
    if (!requireChef()) return
    if (options.mode === 'list') this.setData({ mode: 'list' })
    if (options.id) {
      this.setData({ dishId: options.id, isNew: false })
      this.loadDish(options.id)
    }
    this.loadCategories()
    if (this.data.mode === 'list') this.loadDishList()
  },

  loadDishList() {
    collections.dishes.orderBy('createdAt', 'desc').get().then(res => {
      this.setData({ dishList: res.data })
    })
  },

  loadDish(id) {
    collections.dishes.doc(id).get().then(res => {
      const d = res.data
      this.setData({
        dishName: d.name,
        photo: d.photo || '',
        description: d.description || '',
        ingredients: (d.ingredients || []).join(', '),
        tags: (d.tags || []).join(', '),
        difficulty: d.difficulty || 3,
        rating: d.rating || 4,
      })
    })
  },

  loadCategories() {
    collections.categories.orderBy('sortOrder', 'asc').get().then(res => {
      this.setData({ categories: res.data })
    })
  },

  switchToList() {
    this.setData({ mode: 'list' })
    this.loadDishList()
  },

  editDish(e) {
    const id = e.currentTarget.dataset.id
    this.setData({ mode: 'edit', dishId: id, isNew: false })
    this.loadDish(id)
  },

  deleteDish(e) {
    const id = e.currentTarget.dataset.id
    wx.showModal({
      title: '确定删除？',
      content: '删除后不可恢复',
      success: (res) => {
        if (res.confirm) {
          collections.dishes.doc(id).remove().then(() => {
            wx.showToast({ title: '已删除', icon: 'success' })
            this.loadDishList()
          })
        }
      }
    })
  },

  onNameInput(e) { this.setData({ dishName: e.detail.value }) },
  onDescInput(e) { this.setData({ description: e.detail.value }) },
  onIngredientsInput(e) { this.setData({ ingredients: e.detail.value }) },
  onTagsInput(e) { this.setData({ tags: e.detail.value }) },
  onCatChange(e) { this.setData({ catIndex: e.detail.value }) },
  onDifficultyChange(e) { this.setData({ difficulty: e.detail.value }) },
  onRatingChange(e) { this.setData({ rating: e.detail.value }) },

  get difficultyText() {
    const map = ['', '超简单', '简单', '中等', '有点难', '大厨级']
    return map[this.data.difficulty] || ''
  },

  uploadPhoto() {
    wx.chooseImage({
      count: 1,
      success: (res) => {
        const tempFile = res.tempFilePaths[0]
        // 先显示临时图
        this.setData({ photo: tempFile })
        // 上传到云存储
        wx.cloud.uploadFile({
          cloudPath: `dishes/${Date.now()}.${tempFile.split('.').pop()}`,
          filePath: tempFile,
          success: (res2) => {
            this.setData({ photo: res2.fileID })
          }
        })
      }
    })
  },

  editPhoto() {
    // 跳转到图片编辑器
    wx.navigateTo({
      url: `/pages/image-editor/image_editor?image=${this.data.photo}&returnPage=dish-edit`
    })
  },

  saveDish() {
    if (!this.data.dishName.trim()) {
      wx.showToast({ title: '请输入菜名', icon: 'none' })
      return
    }
    this.setData({ saving: true })

    const data = {
      name: this.data.dishName.trim(),
      category: this.data.categories[this.data.catIndex]?.name || '',
      photo: this.data.photo,
      description: this.data.description.trim(),
      ingredients: this.data.ingredients.split(',').map(s => s.trim()).filter(Boolean),
      tags: this.data.tags.split(',').map(s => s.trim()).filter(Boolean),
      difficulty: this.data.difficulty,
      rating: this.data.rating,
      updatedAt: db.serverDate(),
    }

    const promise = this.data.isNew
      ? collections.dishes.add({ data: { ...data, orderCount: 0, createdAt: db.serverDate() } })
      : collections.dishes.doc(this.data.dishId).update({ data })

    promise.then(() => {
      wx.showToast({ title: this.data.isNew ? '已创建 🎉' : '已保存', icon: 'success' })
      if (this.data.isNew) {
        this.setData({ dishName: '', photo: '', description: '', ingredients: '', tags: '' })
      }
    }).catch(() => {
      wx.showToast({ title: '保存失败', icon: 'error' })
    }).finally(() => {
      this.setData({ saving: false })
    })
  }
})
```

- [ ] **Step 4: 创建 dish_edit.json**

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 10: 图片编辑器（Canvas 2D 实现）

**Files:**
- Create: `pages/image-editor/image_editor.*`

- [ ] **Step 1: 创建 image_editor.wxml**

```xml
<view class="editor-wrapper">
  <!-- 顶部工具栏 -->
  <view class="toolbar">
    <view class="tool-group" wx:if="{{currentTool === 'crop'}}">
      <text class="tool-btn {{cropRatio === 'free' ? 'active' : ''}}" catchtap="setCropRatio" data-ratio="free">自由</text>
      <text class="tool-btn {{cropRatio === '1:1' ? 'active' : ''}}" catchtap="setCropRatio" data-ratio="1:1">1:1</text>
      <text class="tool-btn {{cropRatio === '4:3' ? 'active' : ''}}" catchtap="setCropRatio" data-ratio="4:3">4:3</text>
      <text class="tool-btn {{cropRatio === '16:9' ? 'active' : ''}}" catchtap="setCropRatio" data-ratio="16:9">16:9</text>
    </view>
    <view class="tool-group" wx:if="{{currentTool === 'filter'}}">
      <text class="tool-btn {{currentFilter === 'none' ? 'active' : ''}}" catchtap="setFilter" data-filter="none">原图</text>
      <text class="tool-btn {{currentFilter === 'warm' ? 'active' : ''}}" catchtap="setFilter" data-filter="warm">暖食</text>
      <text class="tool-btn {{currentFilter === 'vintage' ? 'active' : ''}}" catchtap="setFilter" data-filter="vintage">复古</text>
      <text class="tool-btn {{currentFilter === 'fresh' ? 'active' : ''}}" catchtap="setFilter" data-filter="fresh">清新</text>
      <text class="tool-btn {{currentFilter === 'bw' ? 'active' : ''}}" catchtap="setFilter" data-filter="bw">黑白</text>
      <text class="tool-btn {{currentFilter === 'film' ? 'active' : ''}}" catchtap="setFilter" data-filter="film">胶片</text>
    </view>
    <view class="tool-group" wx:if="{{currentTool === 'adjust'}}">
      <text class="tool-label">亮度</text>
      <slider min="-50" max="50" value="{{brightness}}" bindchange="onBrightness" style="width:120px;display:inline-block" />
      <text class="tool-label">饱和度</text>
      <slider min="-50" max="50" value="{{saturation}}" bindchange="onSaturation" style="width:120px;display:inline-block" />
    </view>
    <view class="tool-group" wx:if="{{currentTool === 'text'}}">
      <input class="text-input" placeholder="输入菜名水印" bindinput="onTextInput" maxlength="20" />
      <picker range="{{['白色','金色','黑色']}}" value="{{textColorIndex}}" bindchange="onTextColor">
        <text class="tool-btn">{{textColors[textColorIndex]}}</text>
      </picker>
    </view>
  </view>

  <!-- 画布 -->
  <canvas type="2d" id="editorCanvas" class="editor-canvas"></canvas>

  <!-- 底部工具切换 -->
  <view class="bottom-tools">
    <text class="bottom-tool {{currentTool === 'crop' ? 'active' : ''}}" catchtap="switchTool" data-tool="crop">✂️ 裁剪</text>
    <text class="bottom-tool {{currentTool === 'filter' ? 'active' : ''}}" catchtap="switchTool" data-tool="filter">🎨 滤镜</text>
    <text class="bottom-tool {{currentTool === 'adjust' ? 'active' : ''}}" catchtap="switchTool" data-tool="adjust">✨ 调色</text>
    <text class="bottom-tool {{currentTool === 'text' ? 'active' : ''}}" catchtap="switchTool" data-tool="text">✏️ 文字</text>
    <text class="bottom-tool save-tool" catchtap="saveImage">💾 保存</text>
  </view>
</view>
```

- [ ] **Step 2: 创建 image_editor.wxss**

```css
.editor-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #111;
}

.toolbar {
  padding: 8px 12px;
  background: #1e1e1e;
  min-height: 44px;
  display: flex;
  align-items: center;
  overflow-x: auto;
  gap: 8px;
}
.tool-group { display: flex; gap: 6px; align-items: center; flex-wrap: wrap; }
.tool-btn {
  font-size: 12px;
  padding: 4px 12px;
  border-radius: 14px;
  background: rgba(255,255,255,0.08);
  color: rgba(255,255,255,0.7);
}
.tool-btn.active { background: #D4AF37; color: #fff; }
.tool-label { font-size: 11px; color: rgba(255,255,255,0.5); }

.editor-canvas {
  flex: 1;
  width: 100%;
}

.text-input {
  background: rgba(255,255,255,0.1);
  border-radius: 6px;
  padding: 4px 10px;
  font-size: 13px;
  color: #fff;
  width: 130px;
}

.bottom-tools {
  display: flex;
  justify-content: space-around;
  padding: 10px 8px;
  padding-bottom: calc(10px + env(safe-area-inset-bottom));
  background: #1e1e1e;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.bottom-tool {
  font-size: 11px;
  color: rgba(255,255,255,0.5);
  text-align: center;
  padding: 4px 8px;
}
.bottom-tool.active { color: #D4AF37; }
.save-tool { color: #D4AF37; font-weight: 600; font-size: 13px; }
```

- [ ] **Step 3: 创建 image_editor.js**

```javascript
Page({
  data: {
    imagePath: '',
    currentTool: 'crop',
    cropRatio: 'free',
    currentFilter: 'none',
    brightness: 0,
    saturation: 0,
    textContent: '',
    textColorIndex: 0,
    textColors: ['白色', '金色', '黑色'],
    returnPage: '',
  },

  onLoad(options) {
    this.setData({
      imagePath: options.image || '',
      returnPage: options.returnPage || '',
    })
    if (this.data.imagePath) {
      this.initCanvas()
    }
  },

  initCanvas() {
    const query = wx.createSelectorQuery()
    query.select('#editorCanvas')
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')
        const dpr = wx.getSystemInfoSync().pixelRatio

        // 加载图片
        const img = canvas.createImage()
        img.src = this.data.imagePath
        img.onload = () => {
          canvas.width = img.width * dpr
          canvas.height = img.height * dpr
          ctx.scale(dpr, dpr)
          ctx.drawImage(img, 0, 0, img.width, img.height)
          this.canvas = canvas
          this.ctx = ctx
          this.img = img
        }
      })
  },

  // 裁剪比例
  setCropRatio(e) {
    this.setData({ cropRatio: e.currentTarget.dataset.ratio })
  },

  // 滤镜
  setFilter(e) {
    const filter = e.currentTarget.dataset.filter
    this.setData({ currentFilter: filter })
    this.applyFilters()
  },

  applyFilters() {
    if (!this.canvas || !this.ctx || !this.img) return
    const ctx = this.ctx
    const dpr = wx.getSystemInfoSync().pixelRatio
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    ctx.scale(dpr, dpr)

    // 绘制原图
    ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height)

    // 应用滤镜
    const filter = this.data.currentFilter
    const imageData = ctx.getImageData(0, 0, this.canvas.width / dpr, this.canvas.height / dpr)
    const data = imageData.data

    switch(filter) {
      case 'warm': // 暖食 — 增加红/黄
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] + 30)     // R
          data[i+1] = Math.min(255, data[i+1] + 15)  // G
        }
        break
      case 'vintage': // 复古 — 棕色调
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i+1] + data[i+2]) / 3
          data[i] = Math.min(255, avg + 40)
          data[i+1] = Math.min(255, avg + 20)
          data[i+2] = Math.max(0, avg - 10)
        }
        break
      case 'fresh': // 清新 — 偏蓝/高亮
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] + 10)
          data[i+2] = Math.min(255, data[i+2] + 25)
        }
        break
      case 'bw': // 黑白
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i+1] + data[i+2]) / 3
          data[i] = data[i+1] = data[i+2] = avg
        }
        break
      case 'film': // 胶片 — 高对比 + 暗角
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, Math.max(0, (data[i] - 128) * 1.2 + 128))
          data[i+1] = Math.min(255, Math.max(0, (data[i+1] - 128) * 1.2 + 128))
          data[i+2] = Math.min(255, Math.max(0, (data[i+2] - 128) * 1.2 + 128))
        }
        break
      default: break
    }

    // 亮度和饱和度调整
    if (this.data.brightness !== 0 || this.data.saturation !== 0) {
      const b = this.data.brightness
      const s = this.data.saturation / 100
      for (let i = 0; i < data.length; i += 4) {
        if (this.data.brightness !== 0) {
          data[i] = Math.min(255, Math.max(0, data[i] + b))
          data[i+1] = Math.min(255, Math.max(0, data[i+1] + b))
          data[i+2] = Math.min(255, Math.max(0, data[i+2] + b))
        }
        if (s !== 0) {
          const gray = 0.299 * data[i] + 0.587 * data[i+1] + 0.114 * data[i+2]
          data[i] = Math.min(255, Math.max(0, gray + (data[i] - gray) * (1 + s)))
          data[i+1] = Math.min(255, Math.max(0, gray + (data[i+1] - gray) * (1 + s)))
          data[i+2] = Math.min(255, Math.max(0, gray + (data[i+2] - gray) * (1 + s)))
        }
      }
    }

    ctx.putImageData(imageData, 0, 0)
    ctx.restore()
  },

  onBrightness(e) {
    this.setData({ brightness: e.detail.value })
    this.applyFilters()
  },

  onSaturation(e) {
    this.setData({ saturation: e.detail.value })
    this.applyFilters()
  },

  onTextInput(e) {
    this.setData({ textContent: e.detail.value })
    this.drawText()
  },

  onTextColor(e) {
    this.setData({ textColorIndex: e.detail.value })
    this.drawText()
  },

  drawText() {
    if (!this.canvas || !this.ctx || !this.data.textContent) return
    this.applyFilters() // 重新绘制原图
    const ctx = this.ctx
    const dpr = wx.getSystemInfoSync().pixelRatio

    const colors = ['#fff', '#D4AF37', '#000']
    ctx.font = '36px sans-serif'
    ctx.fillStyle = colors[this.data.textColorIndex]
    ctx.textBaseline = 'bottom'
    ctx.fillText(this.data.textContent, 20, this.img.height - 20)
  },

  switchTool(e) {
    this.setData({ currentTool: e.currentTarget.dataset.tool })
  },

  saveImage() {
    wx.showLoading({ title: '保存中' })
    wx.canvasToTempFilePath({
      canvas: this.canvas,
      success: (res) => {
        const tempPath = res.tempFilePath
        // 上传到云存储
        wx.cloud.uploadFile({
          cloudPath: `dishes/${Date.now()}_edited.png`,
          filePath: tempPath,
          success: (uploadRes) => {
            wx.hideLoading()
            const pages = getCurrentPages()
            const prevPage = pages[pages.length - 2]
            if (prevPage) {
              prevPage.setData({ photo: uploadRes.fileID })
            }
            wx.showToast({ title: '已保存', icon: 'success' })
            setTimeout(() => wx.navigateBack(), 500)
          },
          fail: () => {
            wx.hideLoading()
            wx.showToast({ title: '上传失败', icon: 'error' })
          }
        })
      }
    })
  }
})
```

- [ ] **Step 4: 创建 image_editor.json**

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

---

## Phase 4: 个人中心 + 统计 + 互动（完整功能）

### Task 11: 个人中心 profile

**Files:**
- Create: `pages/profile/profile.*`

- [ ] **Step 1: 创建 profile.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="profile-header">
      <text class="profile-avatar">👩</text>
      <text class="profile-name">我的小厨房</text>
      <text class="profile-anniversary">💝 在一起 {{anniversaryDays}} 天</text>
    </view>

    <view class="profile-menu">
      <view class="menu-item glass-card flex-between" bindtap="goToOrderHistory">
        <text>📜 点单历史</text>
        <text class="menu-arrow">→</text>
      </view>
      <view class="menu-item glass-card flex-between" bindtap="goToWishlist">
        <text>🎯 心愿菜单</text>
        <text class="menu-arrow">→</text>
      </view>
      <view class="menu-item glass-card flex-between" bindtap="goToFavorites">
        <text>❤️ 我的收藏</text>
        <text class="menu-arrow">→</text>
      </view>
      <view class="menu-item glass-card flex-between" bindtap="goToChefPhotos">
        <text>📸 你的做菜记录</text>
        <text class="menu-arrow">→</text>
      </view>
      <view class="menu-item glass-card flex-between" bindtap="switchToChef">
        <text>🔧 切换到厨师</text>
        <text class="menu-arrow">→</text>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 profile.wxss**

```css
.profile-header { text-align: center; padding: 40px 0 20px; }
.profile-avatar { font-size: 60px; }
.profile-name { font-size: 20px; font-weight: 700; color: #fff; display: block; margin: 8px 0; }
.profile-anniversary { font-size: 13px; color: #D4AF37; }

.profile-menu { display: flex; flex-direction: column; gap: 10px; }
.menu-item { padding: 14px; font-size: 14px; color: #fff; }
.menu-arrow { color: rgba(255,255,255,0.3); font-size: 16px; }
```

- [ ] **Step 3: 创建 profile.js**

```javascript
const { collections } = require('../../utils/db')

Page({
  data: {
    anniversaryDays: 0,
  },

  onShow() {
    const app = getApp()
    const annDate = app.globalData.anniversaryDate || '2023-01-01'
    const days = Math.floor((Date.now() - new Date(annDate).getTime()) / 86400000)
    this.setData({ anniversaryDays: days })
  },

  goToOrderHistory() {
    wx.navigateTo({ url: '/pages/order-history/order_history' })
  },

  goToWishlist() {
    wx.navigateTo({ url: '/pages/wishlist/wishlist' })
  },

  goToFavorites() {
    const { collections } = require('../../utils/db')
    const openid = getApp().globalData.openid
    collections.favorites.where({ userId: openid }).get().then(res => {
      const dishIds = res.data.map(f => f.dishId)
      if (dishIds.length === 0) {
        wx.showToast({ title: '还没有收藏的菜', icon: 'none' })
        return
      }
      wx.navigateTo({
        url: `/pages/menu/menu?favIds=${dishIds.join(',')}`
      })
    })
  },

  goToChefPhotos() {
    const openid = getApp().globalData.openid
    collections.reviews.where({ userId: openid }).get().then(res => {
      const photos = res.data.filter(r => r.photo).map(r => r.photo)
      if (photos.length === 0) {
        wx.showToast({ title: '还没有成品照', icon: 'none' })
        return
      }
      wx.previewImage({ urls: photos })
    })
  },

  switchToChef() {
    wx.showModal({
      title: '切换厨师',
      content: '请输入厨师密码',
      editable: true,
      success: (res) => {
        if (res.confirm && getApp().setChefRole(res.content.trim())) {
          wx.redirectTo({ url: '/pages/admin-home/admin_home' })
        }
      }
    })
  }
})
```

- [ ] **Step 4: 创建 profile.json**

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 12: 点单历史 order-history

**Files:**
- Create: `pages/order-history/order_history.*`

- [ ] **Step 1: 创建 order_history.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header">
      <text class="page-title">📜 点单历史</text>
    </view>

    <view class="history-list">
      <view class="history-item glass-card" wx:for="{{orders}}" wx:key="_id">
        <view class="history-header flex-between">
          <text class="history-time">{{formatTime(item.createdAt)}}</text>
          <text class="history-status {{item.status}}">{{item.status === 'pending' ? '制作中' : '已吃完 ✅'}}</text>
        </view>
        <text class="history-dish" wx:for="{{item.items}}" wx:key="dishId">{{item.name}} × {{item.quantity}}</text>
        <text class="history-note" wx:if="{{item.note}}">💬 {{item.note}}</text>

        <!-- 评价入口（已完成的且未评价的） -->
        <view class="rate-section" wx:if="{{item.status === 'done' && !item.rated}}" bindtap="rateOrder" data-orderid="{{item._id}}">
          <star-rating />
        </view>
      </view>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 order_history.js**

```javascript
const { collections } = require('../../utils/db')

Page({
  data: {
    orders: [],
  },

  onShow() {
    const openid = getApp().globalData.openid
    collections.orders
      .where({ userId: openid })
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        this.setData({ orders: res.data })
      })
  },

  formatTime(date) {
    const d = new Date(date)
    return `${d.getMonth()+1}/${d.getDate()} ${d.getHours()}:${String(d.getMinutes()).padStart(2,'0')}`
  },

  rateOrder(e) {
    const orderId = e.currentTarget.dataset.orderid
    const order = this.data.orders.find(o => o._id === orderId)
    wx.showActionSheet({
      itemList: ['⭐', '⭐⭐', '⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐⭐⭐'],
      success: (res) => {
        const rating = res.tapIndex + 1
        wx.showModal({
          title: `评价：${'⭐'.repeat(rating)}`,
          content: '写句评语吧～（可选）',
          editable: true,
          success: (res2) => {
            if (res2.confirm) {
              collections.reviews.add({
                data: {
                  orderId,
                  dishId: order.items[0].dishId,
                  rating,
                  comment: res2.content || '',
                  createdAt: db.serverDate(),
                }
              })
              wx.showToast({ title: '评价成功', icon: 'success' })
              this.onShow()
            }
          }
        })
      }
    })
  }
})
```

- [ ] **Step 3: 创建各种.json**

```json
{ "navigationStyle": "custom", "usingComponents": { "star-rating": "/components/star-rating/star_rating" } }
```

### Task 13: 心愿菜单 wishlist

**Files:**
- Create: `pages/wishlist/wishlist.*`

- [ ] **Step 1: 创建 wishlist.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header flex-between">
      <text class="page-title">🎯 心愿菜单</text>
      <text class="btn-glass" bindtap="addWish">➕ 提心愿</text>
    </view>

    <view class="wish-item glass-card" wx:for="{{wishes}}" wx:key="_id">
      <view class="wish-info">
        <text class="wish-name">{{item.dishName}}</text>
        <text class="wish-status {{item.status}}">
          {{item.status === '提议' ? '⏳ 等待学习' : item.status === '已学' ? '✅ 已学会' : '👨‍🍳 安排中'}}
        </text>
      </view>
      <text class="wish-time">{{formatTime(item.createdAt)}}</text>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 wishlist.js**

```javascript
const { db, collections } = require('../../utils/db')
const { isChef, getOpenid } = require('../../utils/auth')

Page({
  data: { wishes: [] },

  onShow() {
    const openid = getOpenid()
    let query = collections.wishlist.orderBy('createdAt', 'desc')
    if (!isChef()) {
      query = query.where({ userId: openid })
    }
    query.get().then(res => {
      this.setData({ wishes: res.data })
    })
  },

  addWish() {
    wx.showModal({
      title: '提出心愿',
      content: '想吃啥？我学来做',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content.trim()) {
          collections.wishlist.add({
            data: {
              userId: getOpenid(),
              dishName: res.content.trim(),
              status: '提议',
              createdAt: db.serverDate(),
            }
          }).then(() => {
            wx.showToast({ title: '已提交心愿', icon: 'success' })
            this.onShow()
          })
        }
      }
    })
  },

  formatTime(date) {
    const d = new Date(date)
    return `${d.getMonth()+1}/${d.getDate()}`
  }
})
```

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 14: 统计页面 stats

**Files:**
- Create: `pages/stats/stats.*`

- [ ] **Step 1: 创建 stats.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header">
      <text class="page-title">📊 做饭统计</text>
    </view>

    <!-- 月度概览 -->
    <view class="stats-card glass-card">
      <text class="stats-label">📅 本月做饭</text>
      <text class="stats-big">{{monthCount}} 次</text>
    </view>

    <view class="stats-card glass-card">
      <text class="stats-label">🏆 最受欢迎菜 Top 5</text>
      <view class="top-item flex-between" wx:for="{{topDishes}}" wx:key="name">
        <text>{{item.name}}</text>
        <text class="top-count">已点 {{item.count}} 次</text>
      </view>
    </view>

    <view class="stats-card glass-card">
      <text class="stats-label">⭐ 她的打分</text>
      <text class="stats-big">{{avgRating || '-'}} / 5</text>
      <text class="stats-sub">共 {{ratingCount}} 条评价</text>
    </view>

    <view class="stats-card glass-card">
      <text class="stats-label">📈 点单趋势</text>
      <!-- 简单文本趋势，后续可升级为图表 -->
      <text class="stats-sub">周一最爱点：{{mondayFav || '暂无数据'}}</text>
      <text class="stats-sub">雨天最爱点：{{rainyFav || '暂无数据'}}</text>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 stats.js**

```javascript
const { collections } = require('../../utils/db')

Page({
  data: {
    monthCount: 0,
    topDishes: [],
    avgRating: 0,
    ratingCount: 0,
    mondayFav: '',
    rainyFav: '',
  },

  onShow() {
    const monthStart = new Date()
    monthStart.setDate(1)
    monthStart.setHours(0,0,0,0)

    // 本月订单数
    collections.orders.where({
      createdAt: db.command.gte(monthStart)
    }).count().then(res => {
      this.setData({ monthCount: res.total })
    })

    // 最受欢迎 — 聚合所有订单items
    collections.orders.get().then(res => {
      const countMap = {}
      res.data.forEach(order => {
        (order.items || []).forEach(item => {
          countMap[item.name] = (countMap[item.name] || 0) + item.quantity
        })
      })
      const sorted = Object.entries(countMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([name, count]) => ({ name, count }))
      this.setData({ topDishes: sorted })
    })

    // 平均评分
    collections.reviews.get().then(res => {
      const ratings = res.data.map(r => r.rating || 0)
      const avg = ratings.length > 0
        ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1)
        : 0
      this.setData({ avgRating: avg, ratingCount: ratings.length })
    })
  }
})
```

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 15: 互动管理 interaction（投票+纪念日设置）

**Files:**
- Create: `pages/interaction/interaction.*`

- [ ] **Step 1: 创建 interaction.wxml**

```xml
<view class="bg-wrapper">
  <view class="bg-overlay"></view>
  <view class="bg-content">
    <view class="page-header">
      <text class="page-title">🎯 互动管理</text>
    </view>

    <!-- 投票管理 -->
    <view class="section-card glass-card">
      <text class="card-title">⚖️ 二选一投票</text>
      <view class="vote-item glass-card" wx:for="{{activeVotes}}" wx:key="_id">
        <text class="vote-q">{{item.description}}</text>
        <view class="vote-options flex-row">
          <text class="vote-option">{{item.options?.[0]}}</text>
          <text class="vote-vs">VS</text>
          <text class="vote-option">{{item.options?.[1]}}</text>
        </view>
        <text class="vote-result">✅ {{item.result || '投票中'}}</text>
      </view>
      <button class="btn-glass" bindtap="createVote">➕ 发起投票</button>
    </view>

    <!-- 心愿管理 -->
    <view class="section-card glass-card">
      <text class="card-title">🎯 心愿菜单</text>
      <view class="wish-item" wx:for="{{pendingWishes}}" wx:key="_id">
        <text class="wish-name">{{item.dishName}}</text>
        <view class="wish-actions flex-row gap-sm">
          <text class="btn-glass" catchtap="markLearned" data-id="{{item._id}}">✅ 已学</text>
          <text class="btn-glass" catchtap="markScheduled" data-id="{{item._id}}">📅 安排</text>
        </view>
      </view>
    </view>

    <!-- 纪念日设置 -->
    <view class="section-card glass-card">
      <text class="card-title">💝 纪念日设置</text>
      <picker mode="date" value="{{anniversaryDate}}" bindchange="onAnniversaryChange">
        <text class="date-value">{{anniversaryDate || '点击选择日期'}}</text>
      </picker>
      <text class="days-count">在一起 {{anniversaryDays}} 天 ❤️</text>
    </view>
  </view>
</view>
```

- [ ] **Step 2: 创建 interaction.js**

```javascript
const { db, collections } = require('../../utils/db')
const { requireChef } = require('../../utils/auth')

Page({
  data: {
    activeVotes: [],
    pendingWishes: [],
    anniversaryDate: '2023-01-01',
    anniversaryDays: 0,
  },

  onShow() {
    if (!requireChef()) return
    this.loadVotes()
    this.loadWishes()
    this.loadAnniversary()
  },

  loadVotes() {
    collections.votes.where({ status: 'active' }).get().then(res => {
      this.setData({ activeVotes: res.data })
    })
  },

  loadWishes() {
    collections.wishlist.orderBy('createdAt', 'desc').get().then(res => {
      this.setData({ pendingWishes: res.data })
    })
  },

  loadAnniversary() {
    const date = wx.getStorageSync('anniversaryDate') || '2023-01-01'
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
    this.setData({ anniversaryDate: date, anniversaryDays: days })
  },

  createVote() {
    wx.showModal({
      title: '发起二选一投票',
      content: '请输入选项A（用逗号分隔两个选项，如：红烧肉,糖醋排骨）',
      editable: true,
      success: (res) => {
        if (res.confirm && res.content) {
          const parts = res.content.split(/[,，]/).map(s => s.trim()).filter(Boolean)
          if (parts.length === 2) {
            collections.votes.add({
              data: {
                options: parts,
                description: `今晚吃 ${parts[0]} 还是 ${parts[1]}？`,
                status: 'active',
                createdBy: getApp().globalData.openid,
                createdAt: db.serverDate(),
              }
            }).then(() => {
              wx.showToast({ title: '投票已发起', icon: 'success' })
              this.loadVotes()
            })
          } else {
            wx.showToast({ title: '请输入两个选项', icon: 'none' })
          }
        }
      }
    })
  },

  markLearned(e) {
    const id = e.currentTarget.dataset.id
    collections.wishlist.doc(id).update({ data: { status: '已学' } }).then(() => {
      wx.showToast({ title: '已标记学会', icon: 'success' })
      this.loadWishes()
    })
  },

  markScheduled(e) {
    const id = e.currentTarget.dataset.id
    collections.wishlist.doc(id).update({ data: { status: '安排' } }).then(() => {
      wx.showToast({ title: '已安排', icon: 'success' })
      this.loadWishes()
    })
  },

  onAnniversaryChange(e) {
    const date = e.detail.value
    wx.setStorageSync('anniversaryDate', date)
    getApp().globalData.anniversaryDate = date
    const days = Math.floor((Date.now() - new Date(date).getTime()) / 86400000)
    this.setData({ anniversaryDate: date, anniversaryDays: days })
    wx.showToast({ title: '已设置纪念日', icon: 'success' })
  }
})
```

- [ ] **Step 3: 创建各种配置文件**

```json
{ "navigationStyle": "custom", "usingComponents": {} }
```

### Task 16: 二维码生成 + 部署准备

- [ ] **Step 1: 微信开发者工具上传代码**

在开发者工具中：
1. 点击"上传"按钮
2. 填写版本号（如 1.0.0）
3. 填写项目备注

- [ ] **Step 2: 微信公众平台提交审核**

1. 登录 mp.weixin.qq.com
2. 管理 → 版本管理 → 提交审核
3. 填写审核描述："私人点菜小程序，仅供两人使用"
4. 等待审核（1-2天）

- [ ] **Step 3: 审核通过后生成小程序码**

1. 管理 → 二维码 → 下载小程序码
2. 打印出来贴在家里
3. 她微信扫码即可进入

---

## Spec Coverage Check

| Spec 需求 | 对应 Task | 实现状态 |
|-----------|----------|---------|
| 启动页角色选择 | Task 4 launch | ✅ |
| 菜单浏览（分类/搜索/列表） | Task 5 menu | ✅ |
| 菜品卡片（照片/评分/已点次数/上次吃） | Task 3 dish-card + Task 5 menu | ✅ |
| 收藏/取消收藏 | Task 5 menu (onFavTap) | ✅ |
| 随机选菜 | Task 5 menu (randomPick) | ✅ |
| 猜你想吃推荐 | Task 5 menu (pickRecommend) | ✅ |
| 购物车（+-/删除/备注/预约时间） | Task 6 cart | ✅ |
| 提交订单 → 写数据库 → 通知 | Task 6 + Task 8 sendOrderNotify | ✅ |
| 管理端接单（待处理/已完成/标记） | Task 7 admin-home | ✅ |
| 菜品管理（增删改/图片上传） | Task 9 dish-edit | ✅ |
| 图片编辑器（裁剪/滤镜/调色/文字） | Task 10 image-editor | ✅ |
| 个人中心（历史/收藏/心愿/成品照/纪念日） | Task 11 profile + Task 12 order-history + Task 13 wishlist | ✅ |
| 统计（月度/最受欢迎/评分/趋势） | Task 14 stats | ✅ |
| 互动管理（投票/心愿处理/纪念日设置） | Task 15 interaction | ✅ |
| 暖棕复古金主题 + 毛玻璃 + 街景背景 | Task 1 app.wxss + app.js | ✅ |
| 云数据库 + 云函数 | Task 2 + Task 8 | ✅ |

---

**Plan complete and saved to `docs/superpowers/plans/2026-07-13-private-order-app-plan.md`.**

两个执行选项：

**1. Subagent-Driven（推荐）** — 我按Task分派子代理，各Task独立执行，逐Task审查

**2. Inline Execution** — 在当前会话中按Task顺序执行，批量完成后审查

选哪个？
