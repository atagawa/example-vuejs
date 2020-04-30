var items = [
  {
    name: '鉛筆',
    price: 300,
    quantity: 0
  },
  {
    name: 'ノート',
    price: 400,
    quantity: 0
  },
  {
    name: '消しゴム',
    price: 500,
    quantity: 0
  }
]

var vm = new Vue({
  // マウントする要素を設定
  el: '#app',
  // マウントするデータを設定
  data: {
    items: items
  },
  // 文字列フォーマット関数を定義
  filters: {
    numberWithDelimiter: function(value) {
      if(!value) {
        return '0'
      } else {
        return value.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,')
      }
    }
  },
  // 主にサーバー通信を伴う関数を定義
  methods: {
    doBuy: function() {
      alert(this.totalPriceWithTax + '円のお買い上げ')
      this.items.foreach(function (item) {
        item.quantity = 0
      })
    }
  },
  // 主にインスタンス内で演算可能な関数を定義
  computed: {
    totalPrice: function() {
      return this.items.reduce(function(sum, item) {
        return sum + (item.price * item.quantity)
      }, 0)
    },
    totalPriceWithTax: function() {
      return Math.floor(this.totalPrice * 1.08)
    },
    canBuy: function() {
      return this.totalPrice >= 1000
    },
    errorMessageStyle: function() {
      return {
        border: this.canBuy ? '' : '1px solid red',
        color: this.canBuy ? '' : 'red'
      }
    }
  }
})
window.vm = vm
