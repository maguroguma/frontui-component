var MyButton = {
    template: `
        <button>
            <!-- 以下の要素は親コンポーネントで渡されたコンテンツに差し替えられる -->
            <slot>OK</slot>
        </button>
    `
}

new Vue({
    el: '#app',
    components: {
        MyButton: MyButton
    }
})