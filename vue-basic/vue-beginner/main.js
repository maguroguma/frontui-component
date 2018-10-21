var state = { count: 0 }

// コンポーネントの定義はVueインスタンス化の前に行っておく必要がある
Vue.component('comp-child', {
    template: '<li>{{ name }} HP.{{ hp }}</li>',
    // props: 親から受け取る
    props: ['name', 'hp']
})

var app = new Vue({
    el: '#app',

    // リアクティブデータ
    data: {
        message: 'Tree Object',
        // リアクティブデータのリストは「普遍かつユニーク」なIDなどをもたせることを推奨
        objList: [{id: 1, name: 'スライム', hp: 100}, {id: 2, name: 'ゴブリン', hp: 200}, {id: 3, name: 'ドラゴン', hp: 500}],
        name: 'キマイラ',
        inputMessage: '初期メッセージ',
        inputNumber: 0,
        isShow: false,
        state: state,    // オプション外で定義されたデータをリアクティブデータに変換
        // なるべくあとから代入されるデータと同じ型で定義しておく
        todos: [],
        error: null,
        classObject: { child: true, 'is-active': false},
        styleObject: { color: 'red', backgroundColor: 'lightgray'},
        // 複数の属性のデータバインディング
        item: { id: 1, src: 'item1.jpg', alt: '商品1サムネイル', width: 200, height: 200 },
        ok: true,
        type: 'B',
        list: []
    },
    methods: {
        handleClick: function(event) {
            alert(event.target);
        },
        increment: function() {
            // thisは関数を呼び出すオブジェクトへのリンク（ここではnew Vue()の返り値と同じものを指している）
            this.state.count += 1
        },
        doAdd: function() {
            var max = this.objList.reduce(function(a, b) {
                return a > b.id ? a : b.id
            }, 0)
            this.objList.push({
                id: max + 1,
                name: this.name,
                hp: 500
            })
        },
        doRemove: function(index) {
            this.objList.splice(index, 1)
        },
        doAttack: function(index) {
            this.objList[index].hp -= 10    // リスト要素のプロパティはリアクティブ
        }
    },
    created: function() {   // インスタンス作成後
        this.objList.forEach(function(item) {
            this.$set(item, 'active', false)    // もともと持っていないプロパティをリアクティブデータとして追加
        }, this)
    },
    mounted: function() {
        console.log(this.$el)           // ルート要素
        console.log(this.$refs.hello)   // ルート以外のDOM要素
    }
})

console.log(app.message)
//app.objList.push('9999')  // エラーにはならない

// dataオプション直下のプロパティはあとから追加できない
//app.inputMessage = '初期メッセージ'
//app.inputNumber = 0

// この更新は有効
//app.objList = []