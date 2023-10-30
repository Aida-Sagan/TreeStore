class TreeStore {
    private itemsMap: Map<number | string, any>;
    private parentToChildrenMap: Map<number | string, any[]>;

    constructor(items: any[]) {
        this.itemsMap = new Map();
        this.parentToChildrenMap = new Map();

        for (const item of items) {
            const id = item.id;
            this.itemsMap.set(id, item);

            const parent = item.parent;
            if (parent) {
                if (!this.parentToChildrenMap.has(parent)) {
                    this.parentToChildrenMap.set(parent, []);
                }
                this.parentToChildrenMap.get(parent).push(item);
            }
        }
    }

    getAll(): any[] {
        return Array.from(this.itemsMap.values());
    }

    getItem(id: number | string): any {
        return this.itemsMap.get(id);
    }

    getChildren(id: number | string): any[] {
        return this.parentToChildrenMap.get(id) || [];
    }

    getAllChildren(id: number | string): any[] {
        const result = [];

        const processChildren = (parentId: number | string) => {
            const children = this.parentToChildrenMap.get(parentId);
            if (children) {
                for (const child of children) {
                    result.push(child);
                    processChildren(child.id);
                }
            }
        };

        processChildren(id);

        return result;
    }

    getAllParents(id: number | string): any[] {
        const result = [];
        let currentId = id;

        while (currentId) {
            const parent = this.itemsMap.get(currentId);
            if (parent) {
                result.push(parent);
                currentId = parent.parent;
            } else {
                currentId = null;
            }
        }

        return result;
    }
}

// Тесты
const items = [
    { id: 1, parent: 'root' },
    { id: 2, parent: 1, type: 'test' },
    { id: 3, parent: 1, type: 'test' },
    { id: 4, parent: 2, type: 'test' },
    { id: 5, parent: 2, type: 'test' },
    { id: 6, parent: 2, type: 'test' },
    { id: 7, parent: 4, type: null },
    { id: 8, parent: 4, type: null },
];

const ts = new TreeStore(items);

console.log('ts.getAll():', ts.getAll());
console.log('ts.getItem(7):', ts.getItem(7));
console.log('ts.getChildren(4):', ts.getChildren(4));
console.log('ts.getChildren(5):', ts.getChildren(5));
console.log('ts.getChildren(2):', ts.getChildren(2));
console.log('ts.getAllChildren(2):', ts.getAllChildren(2));
console.log('ts.getAllParents(7):', ts.getAllParents(7));
