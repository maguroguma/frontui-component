// initial tree object
var treeNode = {
            id: 0,
            children: [
                {
                    id: 1,
                    children: [
                        {
                            id: 4,
                            children: []
                        },
                        {
                            id: 5,
                            children: []
                        }
                    ]
                },
                {
                    id: 2,
                    children: []
                },
                {
                    id: 3,
                    children: []
                }
            ]
        }

// event bus
var bus = new Vue({
    data: {
        count: 0
    }
})

// define component
Vue.component('tree', {
    template: '#tree-template',
    props: {
        node: Object
    },
    data: function() {
        return {
        }
    },
    methods: {
        openAndClose: function(event) {
            var target = event.target
            var parent = event.target.parentNode
            if (target.nodeName == "IMG" && parent.nodeName == "LI") {
                // サブツリーの展開
                var clist = parent.classList
                if (clist.contains("collapse")) {
                    clist.toggle("expand")
                }

                // マーカーのトグル
                var array = target.src.split("/")
                var fileName = array[array.length - 1]
                fileName == "close.png" ? target.src = "./images/open.png" : target.src = "./images/close.png"
            }
        },
        selectNode: function(event, selectedNode) {
            bus.$emit('node-select-event', selectedNode)
            console.log('EMITTED')
            console.log('CLICKED NODE: ' + selectedNode.id)
            console.log(selectedNode.id)
        }
    }
})

// boot up the demo
var app = new Vue({
    el: '#app',
    data: {
        treeNode: treeNode,
        preSelectedNode: null,
        selectedNode: null
    },
    methods: {
        updateState(event) {
            console.log('RECEIVED')
            console.log(event)
        },
        addNewNode: function(event) {
            console.log(event)
        },
        deleteNode: function(event) {
            console.log(event)
        }
    },
    created: function() {
        bus.$on('node-select-event', function(selectedNode) {
            console.log('RECEIVED')
            console.log('CLICKED NODE: ' + selectedNode.id)
            this.count++
        })
    }
})
