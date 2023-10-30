var TreeStore = /** @class */ (function () {
    function TreeStore(items) {
        this.itemsMap = new Map();
        this.parentToChildrenMap = new Map();
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var id = item.id;
            this.itemsMap.set(id, item);
            var parent_1 = item.parent;
            if (parent_1) {
                if (!this.parentToChildrenMap.has(parent_1)) {
                    this.parentToChildrenMap.set(parent_1, []);
                }
                this.parentToChildrenMap.get(parent_1).push(item);
            }
        }
    }
    TreeStore.prototype.getAll = function () {
        return Array.from(this.itemsMap.values());
    };
    TreeStore.prototype.getItem = function (id) {
        return this.itemsMap.get(id);
    };
    TreeStore.prototype.getChildren = function (id) {
        return this.parentToChildrenMap.get(id) || [];
    };
    TreeStore.prototype.getAllChildren = function (id) {
        var _this = this;
        var result = [];
        var processChildren = function (parentId) {
            var children = _this.parentToChildrenMap.get(parentId);
            if (children) {
                for (var _i = 0, children_1 = children; _i < children_1.length; _i++) {
                    var child = children_1[_i];
                    result.push(child);
                    processChildren(child.id);
                }
            }
        };
        processChildren(id);
        return result;
    };
    TreeStore.prototype.getAllParents = function (id) {
        var result = [];
        var currentId = id;
        while (currentId) {
            var parent_2 = this.itemsMap.get(currentId);
            if (parent_2) {
                result.push(parent_2);
                currentId = parent_2.parent;
            }
            else {
                currentId = null;
            }
        }
        return result;
    };
    return TreeStore;
}());
// Тесты
var items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];
var ts = new TreeStore(items);
console.log('ts.getAll():', ts.getAll());
console.log('ts.getItem(7):', ts.getItem(7));
console.log('ts.getChildren(4):', ts.getChildren(4));
console.log('ts.getChildren(5):', ts.getChildren(5));
console.log('ts.getChildren(2):', ts.getChildren(2));
console.log('ts.getAllChildren(2):', ts.getAllChildren(2));
console.log('ts.getAllParents(7):', ts.getAllParents(7));
