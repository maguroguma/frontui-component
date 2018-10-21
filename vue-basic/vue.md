# 仮想DOM

Vue.jsのポイント

- データの更新とリアルなDOMの更新処理は非同期に行われる
- DOMの再利用によって、変更した状態が残ることがある

仮想DOMはバインディングしたデータをもとに作られ、DOMのNodeと同じように、仮想Node（VNode）と呼ばれる節点で構成されたツリー構造になっている。

## DOMを更新するタイミング

Vue.jsは、DOMと紐付いたデータを更新してもすぐにはDOMを更新しない。
仮想DOMからDOMへの反映は、**Vue.jsのリアクティブシステムによる描画処理のタイミングで自動的に行われる。**
このため、データを更新した直後にDOMにアクセスしてもまだ反映前の状態になっている。

反映されたDOMにアクセスするためには、DOM更新を待ち受けるための仕組みを提供している `nextTick` を使用する必要がある。

---

# 算出プロパティ `computed`

```javascript
computed: {
    halfWidth: function() {
        return this.width / 2
    }
}
```

`computed` は関数として定義する一方で、プロパティとして使用できる。

```html
<p>{{ width }}の半分は{{ halfWidth }}</p>
```

算出プロパティは、基本的にもとのデータに影響を与えることはなく、算出プロパティに値を代入してもその時点でエラーが発生する。
しかし、必要であればセッターも提供している

```html
<input v-model.number="width">{{ width }}
<input v-model.number="halfWidth">{{ halfWidth }}
```

```javascript
computed: {
    halfWidth: {
        get: function() { return this.width / 2 },
        set: function(val) { this.width = val * 2 }
    }
}
```

## 算出プロパティのキャッシュ機能（算出プロパティとメソッドとの違い）

算出プロパティはリアクティブな依存データに基づき結果をキャッシュする。
キャッシュを再構築するトリガになるのはリアクティブなデータのみ。

**キャッシュ機能によって、算出プロパティはもとのデータに変更があるまで何度使用しても関数内の処理は一度しか行われない。**
そのため、複雑な処理に向いている。

---

# ウォッチャ（データを監視して処理を自動化する）

```javascript
watch: {
    監視するデータ: function(新しい値, 古い値) {
        // valueが変化したときに行いたい処理
    },
    'item.value': function(newVal, oldVal) {
        // オブジェクトのプロパティも監視できる
    }
}
```

ウォッチャのオプション

`deep`: ネストされたオブジェクトも監視する（例えば配列要素内のプロパティの更新時、など）
`immediate`: 初期読み込み時にも呼び出す

```javascript
watch: {
    list: {
        handler: function(newVal, oldVal) {
            // listが変化したときに行いたい処理
        },
        deep: true,
        immediate: true
    }
}
```

---

# フィルタ（テキストの変換処理）

```html
{{ 対象のデータ | フィルタの名前 }}
<div :id="対象のデータ | フィルタの名前"></div>
```

```javascript
filters: {
    localeNum: function(val) {
        return val.toLocaleString()
    }
}
```

`methods` オプションに登録したメソッドとの違いは、`this` へのアクセスと記述方法の違いのみではあるものの、
テキストベースの変換ではフィルタを使ったほうが記述がシンプルになる。

---

# nextTickで更新後のDOMにアクセスする

データを更新すると、人間の目では瞬時にDOMに反映されているように見えるが、**実際は仮想DOMによって非同期にDOMが更新されるため、コンピュータレベルの僅かなラグが生じている。**

反映されたDOMにアクセスするには、DOM更新を待ち受けるための仕組みを提供している `nextTick` を使用する必要がある。

## `nextTick` の使い方

DOMが更新されたあとに行いたい処理をグローバルメソッド `Vue.nextTick` のコールバック関数として定義する。
（同様の機能を持つインスタンスメソッド `this.$nextTick` も使用できる。）



