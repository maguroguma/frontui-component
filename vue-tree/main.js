var state = { count: 0 }

var app = new Vue({
    el: '#app',

    // リアクティブデータ
    data: {
        message: 'Tree Object',
        // リアクティブデータのリストは「普遍かつユニーク」なIDなどをもたせることを推奨
        objList: [{id: 1, name: 'スライム', hp: 100}, {id: 2, name: 'ゴブリン', hp: 200}, {id: 3, name: 'ドラゴン', hp: 500}],
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
        type: 'B'
    },
    methods: {
        handleClick: function(event) {
            alert(event.target);
        },
        increment: function() {
            // thisは関数を呼び出すオブジェクトへのリンク（ここではnew Vue()の返り値と同じものを指している）
            this.state.count += 1
        }
    }
})

console.log(app.message)
//app.objList.push('9999')  // エラーにはならない

// dataオプション直下のプロパティはあとから追加できない
//app.inputMessage = '初期メッセージ'
//app.inputNumber = 0