# Vueのコンポーネント

機能を持つUI部品ごとに **テンプレートとJavaScriptを1つのセット** にして、他のUI部品とは切り離した開発及び管理ができるようにする仕組み。

## コンポーネントの定義方法

`Vue.component` メソッドを使ってグローバルに登録することで、自動的にすべてのコンポーネントから使用できる。

メソッドの引数

1. カスタムタグに使用する名前
2. コンポーネントのオプションオブジェクト

```javascript
Vue.component('my-component', {
    template: '<p>MyComponent</p>'
})
```

親となるコンポーネントのテンプレートにおいて、`<my-component></my-component>` のように書けば呼び出せる。

### ローカルへの登録

```javascript
var myComponent = {
    template: '<p>MyComponent</p>'
}
new Vue({
    el: '#app',
    components: {
        // <my-component>がルートでのみ使用可能になる
        'my-component': myComponent
    }
})
```

## コンポーネントのオプション

```javascript
Vue.component('my-component', {
    template: '<p>MyComponent</p>',
    data: function() {
        return {
            message: 'Hello Vue.js'
        }
    },
    methods: {
        //...
    }
})
```

`data` オプションに関してのみオブジェクトを返す関数にする必要があるという違いがある。

## コンポーネントインスタンス

```html
<div id="app">
    <my-component></my-component>
    <my-component></my-component>
</div>
```

同じコンポーネントを複数回使用したとき、これらは別々のインスタンスとして扱われる。

---

# コンポーネント間の通信

コンポーネントのインスタンスはそれぞれスコープを持っている。
スコープとは、影響が及ぶ範囲で、定義されたデータ、メソッド、テンプレートがスコープに当たる。

`this.message` や `this.update()` のように `this` をつかってアクセスできる。

スコープは、不用意に他の機能に影響を及ぼさせないためのものであるため、他のコンポーネントのデータやメソッドに直接、アクセスすることはできない。

コンポーネント間でデータを共有したり連携をするには、次のような方法がある。

1. `props` とカスタムイベントを使った親子間の通信
2. イベントバスを使った非親子間の通信
3. Vuexを使った状態管理

props down: 親から子への単方向通信

propsで受け取ったデータは、`this` を介して自分のデータと同じように使用できるものの、読み込み専用。
編集しようとするとエラーとなるため注意が必要。

## propsの受け取りデータ型を指定する

propsには受け取り型を指定しておくことが推奨されている。
指定した型以外を受け取った場合、警告が表示されるようになる。

また、デフォルト値や必須項目を定義でき、条件を満たされなければ警告を出すようにすることもできる。

```javascript
Vue.component('example', {
    props: {
        // 基本的な型チェック（nullはどんな型でも受け付ける）
        propA: Number,
        // 複数の受け入れ可能な型
        propB: [String, Number],
        // 必須な文字列
        propC: {
            type: String,
            required: true
        },
        // デフォルト値
        propD: {
            type: Number,
            default: 100
        },
        // オブジェクトと配列のデフォルトはファクトリ関数から返すようにしている
        propE: {
            type: Object,
            default: function() {
                return { message: 'hello' }
            }
        },
        // カスタムバリデータ関数
        propF: {
            validator: function(value) {
                return value > 10
            }
        }
    }
})
```

## 子から親

**カスタムイベント** と **`$emit`** を使用する。

event up: 子から親へのデータフロー

子のイベントを親にキャッチさせる。
`<comp-child @:childs-event="parentsMethod"></comp-child>`