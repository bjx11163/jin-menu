App({
  globalData: { anniversaryDate: '2026-03-23' },
  onLaunch() {
    const DISHES_VER = 'wx2'  // 小程序版本号，强制刷新数据
    const savedVer = wx.getStorageSync('dishes_ver')
    if (savedVer !== DISHES_VER) {
      wx.setStorageSync('dishes', this.getDefaultDishes())
      wx.setStorageSync('dishes_ver', DISHES_VER)
    }
  },
  getDefaultDishes() {
    return [
      { id:'d1',name:'干锅花菜',category:'🥘 干煸干锅',photo:'/img/dishes/干锅花菜.jpg',emoji:'🥦',tags:['香辣','下饭'],rating:4.7 },
      { id:'d2',name:'干锅包菜',category:'🥘 干煸干锅',photo:'/img/dishes/干锅包菜.jpg',emoji:'🥬',tags:['香辣','爽脆'],rating:4.6 },
      { id:'d3',name:'干煸五花肉',category:'🥘 干煸干锅',photo:'/img/dishes/干煸五花肉.jpg',emoji:'🥩',tags:['干香','下饭'],rating:4.7 },
      { id:'d4',name:'干锅土豆片',category:'🥘 干煸干锅',photo:'/img/dishes/干锅土豆片.jpg',emoji:'🥔',tags:['香辣','粉糯'],rating:4.6 },
      { id:'d5',name:'番茄炒蛋',category:'🍳 小炒',photo:'/img/dishes/番茄炒蛋.jpg',emoji:'🍅',tags:['酸甜','下饭','经典'],rating:4.9 },
      { id:'d6',name:'双椒肉丝',category:'🍳 小炒',photo:'/img/dishes/双椒肉丝.jpg',emoji:'🫑',tags:['家常','微辣'],rating:4.5 },
      { id:'d7',name:'葱烧鸡',category:'🍳 小炒',photo:'/img/dishes/葱烧鸡.jpg',emoji:'🍗',tags:['葱香','嫩滑'],rating:4.7 },
      { id:'d8',name:'双椒豆角',category:'🍳 小炒',photo:'/img/dishes/双椒豆角.jpg',emoji:'🫘',tags:['清淡','素菜'],rating:4.3 },
      { id:'d9',name:'菠萝鸡翅',category:'🍳 小炒',photo:'/img/dishes/菠萝鸡翅.jpg',emoji:'🍍',tags:['酸甜','水果入菜'],rating:4.8 },
      { id:'d10',name:'番茄鸡蛋面',category:'🍜 面类',photo:'/img/dishes/番茄鸡蛋面.jpg',emoji:'🍜',tags:['汤面','经典'],rating:4.6 },
      { id:'d25',name:'石锅拌饭',category:'🍜 面类',photo:'/img/dishes/石锅拌饭.jpg',emoji:'🍚',tags:['韩式','热腾腾'],rating:4.7 },
      { id:'d32',name:'番茄意面',category:'🍜 面类',photo:'/img/dishes/番茄意面.jpg',emoji:'🍝',tags:['西式','酸甜'],rating:4.6 },
      { id:'d11',name:'红烧鸡腿',category:'🍗 炸烤红烧',photo:'/img/dishes/红烧鸡腿.png',emoji:'🍗',tags:['酱香','入味'],rating:4.7 },
      { id:'d12',name:'美味炸鸡腿',category:'🍗 炸烤红烧',photo:'/img/dishes/美味炸鸡腿.jpg',emoji:'🍗',tags:['酥脆','香'],rating:4.8 },
      { id:'d13',name:'小猫才能吃的小薯条',category:'🍗 炸烤红烧',photo:'/img/dishes/小猫才能吃的小薯条.jpg',emoji:'🍟',tags:['酥脆','小朋友最爱'],rating:4.9 },
      { id:'d26',name:'不用剥壳的小龙虾',category:'🥘 干煸干锅',photo:'/img/dishes/不用剥壳的小龙虾.jpg',emoji:'🦞',tags:['香辣','省事'],rating:4.9 },
      { id:'d16',name:'番茄牛腩',category:'🍲 炖煮',photo:'/img/dishes/番茄牛腩.jpg',emoji:'🥩',tags:['浓郁','暖胃'],rating:4.8 },
      { id:'d27',name:'诱人小火锅',category:'🍲 炖煮',photo:'/img/dishes/诱人小火锅.jpg',emoji:'🍲',tags:['暖身','丰富'],rating:4.9 },
      { id:'d14',name:'紫菜蛋花汤',category:'🥣 汤类',photo:'/img/dishes/紫菜蛋花汤.jpg',emoji:'🥣',tags:['清淡','快手'],rating:4.5 },
      { id:'d15',name:'莲藕排骨汤',category:'🥣 汤类',photo:'/img/dishes/莲藕排骨汤.jpg',emoji:'🍖',tags:['清甜','滋补'],rating:4.7 },
      { id:'d33',name:'玉米排骨汤',category:'🥣 汤类',photo:'/img/dishes/玉米排骨汤.jpg',emoji:'🌽',tags:['清甜','暖胃'],rating:4.7 },
      { id:'d34',name:'榨菜汤',category:'🥣 汤类',photo:'/img/dishes/榨菜汤.jpg',emoji:'🥬',tags:['开胃','简单'],rating:4.3 },
      { id:'d17',name:'美味小苹果',category:'甜品水果',photo:'/img/dishes/美味小苹果.jpg',emoji:'🍎',tags:['当季'],rating:4.5 },
      { id:'d18',name:'性感小橘子',category:'甜品水果',photo:'/img/dishes/性感小橘子.jpg',emoji:'🍊',tags:['当季'],rating:4.6 },
      { id:'d19',name:'甜蜜小梨子',category:'甜品水果',photo:'/img/dishes/甜蜜小梨子.jpg',emoji:'🍐',tags:['推荐','润肺'],rating:4.7 },
      { id:'d20',name:'超绝小蓝莓',category:'甜品水果',photo:'/img/dishes/超绝小蓝莓.jpg',emoji:'🫐',tags:['推荐','抗氧化'],rating:4.8 },
      { id:'d21',name:'宇宙车厘子',category:'甜品水果',photo:'/img/dishes/宇宙车厘子.jpg',emoji:'🍒',tags:['推荐','进口'],rating:4.9 },
      { id:'d22',name:'超A葡萄',category:'甜品水果',photo:'/img/dishes/超A葡萄.jpg',emoji:'🍇',tags:['当季','爆汁'],rating:4.6 },
      { id:'d23',name:'甜美小西瓜',category:'甜品水果',photo:'/img/dishes/甜美小西瓜.jpg',emoji:'🍉',tags:['当季','解暑'],rating:4.7 },
      { id:'d35',name:'刺激大山竹',category:'甜品水果',photo:'/img/dishes/刺激大山竹.jpg',emoji:'🟤',tags:['当季','热带'],rating:4.7 },
      { id:'d36',name:'暖阳小荔枝',category:'甜品水果',photo:'/img/dishes/暖阳小荔枝.jpg',emoji:'🍒',tags:['当季','甜蜜'],rating:4.8 },
      { id:'d37',name:'漩涡凤梨',category:'甜品水果',photo:'/img/dishes/漩涡凤梨.jpg',emoji:'🍍',tags:['热带','酸甜'],rating:4.6 },
      { id:'d24',name:'随机美味拼盘',category:'甜品水果',photo:'/img/dishes/随机美味拼盘.jpg',emoji:'🎲',tags:['惊喜','当日精选'],rating:5.0 },
      { id:'d28',name:'面包的诱惑',category:'甜品水果',photo:'/img/dishes/面包的诱惑.jpg',emoji:'🍞',tags:['甜品','经典'],rating:4.8 },
      { id:'d29',name:'豆奶盒子',category:'甜品水果',photo:'/img/dishes/豆奶盒子.jpg',emoji:'🧁',tags:['甜品','香甜'],rating:4.7 },
      { id:'d30',name:'泡芙',category:'甜品水果',photo:'/img/dishes/泡芙.jpg',emoji:'🥯',tags:['甜品','酥脆'],rating:4.6 },
      { id:'d31',name:'冰淇淋',category:'甜品水果',photo:'/img/dishes/冰淇淋.jpg',emoji:'🍦',tags:['甜品','清凉'],rating:4.9 },
      { id:'d38',name:'美味小蛋糕',category:'甜品水果',photo:'/img/dishes/美味小蛋糕.jpg',emoji:'🧁',tags:['甜品','绵密'],rating:4.8 },
      { id:'d39',name:'多姿多彩小奶茶',category:'甜品水果',photo:'/img/dishes/多姿多彩小奶茶.jpg',emoji:'🧋',tags:['甜品','丝滑'],rating:4.7 },
    ]
  }
})
