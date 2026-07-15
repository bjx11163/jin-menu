App({
  globalData: { anniversaryDate: '2026-03-23' },
  onLaunch() {
    const DISHES_VER = 'wx3'  // 小程序版本号，强制刷新数据
    const savedVer = wx.getStorageSync('dishes_ver')
    if (savedVer !== DISHES_VER) {
      wx.setStorageSync('dishes', this.getDefaultDishes())
      wx.setStorageSync('dishes_ver', DISHES_VER)
    }
  },
  getDefaultDishes() {
    return [
      { id:'d1',name:'干锅花菜',category:'🥘 干煸干锅',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d1.jpg',emoji:'🥦',tags:['香辣','下饭'],rating:4.7 },
      { id:'d2',name:'干锅包菜',category:'🥘 干煸干锅',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d2.jpg',emoji:'🥬',tags:['香辣','爽脆'],rating:4.6 },
      { id:'d3',name:'干煸五花肉',category:'🥘 干煸干锅',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d3.jpg',emoji:'🥩',tags:['干香','下饭'],rating:4.7 },
      { id:'d4',name:'干锅土豆片',category:'🥘 干煸干锅',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d4.jpg',emoji:'🥔',tags:['香辣','粉糯'],rating:4.6 },
      { id:'d5',name:'番茄炒蛋',category:'🍳 小炒',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d5.jpg',emoji:'🍅',tags:['酸甜','下饭','经典'],rating:4.9 },
      { id:'d6',name:'双椒肉丝',category:'🍳 小炒',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d6.jpg',emoji:'🫑',tags:['家常','微辣'],rating:4.5 },
      { id:'d7',name:'葱烧鸡',category:'🍳 小炒',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d7.jpg',emoji:'🍗',tags:['葱香','嫩滑'],rating:4.7 },
      { id:'d8',name:'双椒豆角',category:'🍳 小炒',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d8.jpg',emoji:'🫘',tags:['清淡','素菜'],rating:4.3 },
      { id:'d9',name:'菠萝鸡翅',category:'🍳 小炒',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d9.jpg',emoji:'🍍',tags:['酸甜','水果入菜'],rating:4.8 },
      { id:'d10',name:'番茄鸡蛋面',category:'🍜 面类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d10.jpg',emoji:'🍜',tags:['汤面','经典'],rating:4.6 },
      { id:'d25',name:'石锅拌饭',category:'🍜 面类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d25.jpg',emoji:'🍚',tags:['韩式','热腾腾'],rating:4.7 },
      { id:'d32',name:'番茄意面',category:'🍜 面类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d32.jpg',emoji:'🍝',tags:['西式','酸甜'],rating:4.6 },
      { id:'d11',name:'红烧鸡腿',category:'🍗 炸烤红烧',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d11.png',emoji:'🍗',tags:['酱香','入味'],rating:4.7 },
      { id:'d12',name:'美味炸鸡腿',category:'🍗 炸烤红烧',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d12.jpg',emoji:'🍗',tags:['酥脆','香'],rating:4.8 },
      { id:'d13',name:'小猫才能吃的小薯条',category:'🍗 炸烤红烧',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d13.jpg',emoji:'🍟',tags:['酥脆','小朋友最爱'],rating:4.9 },
      { id:'d26',name:'不用剥壳的小龙虾',category:'🥘 干煸干锅',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d26.jpg',emoji:'🦞',tags:['香辣','省事'],rating:4.9 },
      { id:'d16',name:'番茄牛腩',category:'🍲 炖煮',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d16.jpg',emoji:'🥩',tags:['浓郁','暖胃'],rating:4.8 },
      { id:'d27',name:'诱人小火锅',category:'🍲 炖煮',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d27.jpg',emoji:'🍲',tags:['暖身','丰富'],rating:4.9 },
      { id:'d14',name:'紫菜蛋花汤',category:'🥣 汤类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d14.jpg',emoji:'🥣',tags:['清淡','快手'],rating:4.5 },
      { id:'d15',name:'莲藕排骨汤',category:'🥣 汤类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d15.jpg',emoji:'🍖',tags:['清甜','滋补'],rating:4.7 },
      { id:'d33',name:'玉米排骨汤',category:'🥣 汤类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d33.jpg',emoji:'🌽',tags:['清甜','暖胃'],rating:4.7 },
      { id:'d34',name:'榨菜汤',category:'🥣 汤类',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d34.jpg',emoji:'🥬',tags:['开胃','简单'],rating:4.3 },
      { id:'d17',name:'美味小苹果',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d17.jpg',emoji:'🍎',tags:['当季'],rating:4.5 },
      { id:'d18',name:'性感小橘子',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d18.jpg',emoji:'🍊',tags:['当季'],rating:4.6 },
      { id:'d19',name:'甜蜜小梨子',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d19.jpg',emoji:'🍐',tags:['推荐','润肺'],rating:4.7 },
      { id:'d20',name:'超绝小蓝莓',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d20.jpg',emoji:'🫐',tags:['推荐','抗氧化'],rating:4.8 },
      { id:'d21',name:'宇宙车厘子',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d21.jpg',emoji:'🍒',tags:['推荐','进口'],rating:4.9 },
      { id:'d22',name:'超A葡萄',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d22.jpg',emoji:'🍇',tags:['当季','爆汁'],rating:4.6 },
      { id:'d23',name:'甜美小西瓜',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d23.jpg',emoji:'🍉',tags:['当季','解暑'],rating:4.7 },
      { id:'d35',name:'刺激大山竹',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d35.jpg',emoji:'🟤',tags:['当季','热带'],rating:4.7 },
      { id:'d36',name:'暖阳小荔枝',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d36.jpg',emoji:'🍒',tags:['当季','甜蜜'],rating:4.8 },
      { id:'d37',name:'漩涡凤梨',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d37.jpg',emoji:'🍍',tags:['热带','酸甜'],rating:4.6 },
      { id:'d24',name:'随机美味拼盘',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d24.jpg',emoji:'🎲',tags:['惊喜','当日精选'],rating:5.0 },
      { id:'d28',name:'面包的诱惑',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d28.jpg',emoji:'🍞',tags:['甜品','经典'],rating:4.8 },
      { id:'d29',name:'豆奶盒子',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d29.jpg',emoji:'🧁',tags:['甜品','香甜'],rating:4.7 },
      { id:'d30',name:'泡芙',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d30.jpg',emoji:'🥯',tags:['甜品','酥脆'],rating:4.6 },
      { id:'d31',name:'冰淇淋',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d31.jpg',emoji:'🍦',tags:['甜品','清凉'],rating:4.9 },
      { id:'d38',name:'美味小蛋糕',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d38.jpg',emoji:'🧁',tags:['甜品','绵密'],rating:4.8 },
      { id:'d39',name:'多姿多彩小奶茶',category:'甜品水果',photo:'https://jinandhe-foreverhe-1453703478.cos.ap-guangzhou.myqcloud.com/img/dishes/d39.jpg',emoji:'🧋',tags:['甜品','丝滑'],rating:4.7 },
    ]
  }
})
