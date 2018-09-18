// initial tree object
var treeNode = {
            id: 0,
            isSelected: false,
            maxId: 5,
            children: [
                {
                    id: 1,
                    isSelected: false,
                    children: [
                        {
                            id: 4,
                            isSelected: false,
                            children: []
                        },
                        {
                            id: 5,
                            isSelected: false,
                            children: []
                        }
                    ]
                },
                {
                    id: 2,
                    isSelected: false,
                    children: []
                },
                {
                    id: 3,
                    isSelected: false,
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
        }
    }
})

// boot up the demo
var app = new Vue({
    el: '#app',
    data: {
        treeNode: treeNode,
        selectedNode: null,
        maxId: treeNode.maxId
    },
    methods: {
        addNewNode: function(event) {
            if (this.selectedNode === null) {
                alert('SELECT SOME NODE!')
                return
            }
            this.maxId++
            this.selectedNode.children.push({ id: this.maxId, isSelected: false, children: [] })
        },
        deleteNode: function(event) {
            if (confirm('CHILD NODES WILL BE DELETED, IS IT OK?')) this.selectedNode.children = []
        }
    },
    created: function() {
        bus.$on('node-select-event', function(selectedNode) {
            this.count++
            if (app.selectedNode) {
                app.selectedNode.isSelected = false
            }
            selectedNode.isSelected = true
            app.selectedNode = selectedNode
        })
    },
    filters: {
        nodeStringer: function(node) {
            return node ? node.id : 'NOT SELECTED'
        }
    }
})
