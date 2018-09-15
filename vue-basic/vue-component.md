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

