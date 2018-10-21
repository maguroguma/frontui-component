// グローバルミックスイン
Vue.mixin({
    data: function() {
        return {
            loggedInUser: null
        }
    },
    created: function() {
        var auth = this.$options.auth
        this.loggedInUser = JSON.parse(sessionStorage.getItem('loggedInUser'))
        if (auth && !this.loggedInUser) {
            window.alert('このページはログインが必要です')
        }
    }
})

// ローカルコンポーネント
var LoginRequiredPage = {
    auth: true,
    template: `
        <div>
            <p v-if="!loggedInUser">
                このページはログインが必要です
            </p>
            <p v-else>
                {{ loggedInUser.name }}さんでログインしています
            </p>
        </div>
    `
}

// メインVueインスタンス
new Vue({
    el: '#app',
    components: {
        LoginRequiredPage
    }
})