// import './style.css';

// let list = {
//     key: value,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: {
//           value: 4,
//           next: null
//         }
//       }
//     }
// };

function hashMap() {
    let size = 16;
    let loadFactor = 0.75;
    let buckets = [];
    for (let i = 0; i < size; i++) buckets[i] = {};

    function grow() {
        let capacity = 0;
        for (let list of buckets) if (Object.getOwnPropertyNames(list)[0]) capacity++;
        if (capacity >= size * loadFactor) {
            size *= 2;
            let nodes = entries();
            for (let i = 0; i < size; i++) buckets[i] = {};

            for (let node of nodes) set(node[0], node[1]);
        }
    }

    function hash(key) {
        let hashCode = 0;
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % size;
        }

        return hashCode;
    }

    function set(key, value) {
        let index = hash(key);
        if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');

        if (Object.getOwnPropertyNames(buckets[index]).length === 0) {
            buckets[index][key] = value;
            buckets[index].next = null;
        } else if (Object.getOwnPropertyNames(buckets[index])[0] === key) {
            buckets[index][key] = value;
        } else {
            let ptr = buckets[index];
            while (ptr.next) {
                ptr = ptr.next;
                if (Object.getOwnPropertyNames(ptr)[0] === key) {
                    ptr[key] = value;
                    return;
                }
            }

            ptr.next = {};
            ptr.next[key] = value;
            ptr.next.next = null;
        }
        grow();
    }

    function get(key) {
        let index = hash(key);
        if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');
        let ptr = buckets[index];

        while (ptr) {
            if (Object.getOwnPropertyNames(ptr)[0] === key) return ptr[key];
            ptr = ptr.next;
        }
        return null;
    }

    function has(key) {
        let index = hash(key);
        if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');
        let ptr = buckets[index];

        while (ptr) {
            if (Object.getOwnPropertyNames(ptr)[0] === key) return true;
            ptr = ptr.next;
        }
        return false;
    }

    function remove(key) {
        let index = hash(key);
        if (index < 0 || index >= buckets.length) throw new Error('Trying to access index out of bound');

        if (Object.getOwnPropertyNames(buckets[index])[0] === key) {
            buckets[index] = {};
            return true;
        }

        let ptr = buckets[index];
        while (ptr.next) {
            if (Object.getOwnPropertyNames(ptr.next)[0] === key) {
                ptr.next = ptr.next.next;
                return true;
            }
            ptr = ptr.next;
        }
        return false;
    }

    function length() {
        let nodes = 0;
        for (let list of buckets) {
            do {
                if (Object.getOwnPropertyNames(list)[0] || Object.getOwnPropertyNames(list)[0] === 0) nodes++;
                list = list.next;
            } while (list);
        }
        return nodes;
    }

    function clear() {
        for (let i = 0; i < buckets.length; i++) buckets[i] = {};
    }

    function keys() {
        let array = [];
        for (let list of buckets) {
            do {
                if (Object.getOwnPropertyNames(list)[0] || Object.getOwnPropertyNames(list)[0] === 0) {
                    array.push(Object.getOwnPropertyNames(list)[0]);
                }
                list = list.next;
            } while (list);
        }
        return array;
    }

    function values() {
        let array = [];
        for (let list of buckets) {
            do {
                let key = Object.getOwnPropertyNames(list)[0];
                if (key || key === 0) array.push(list[key]);

                list = list.next;
            } while (list);
        }
        return array;
    }

    function entries() {
        let array = [];
        for (let list of buckets) {
            do {
                let key = Object.getOwnPropertyNames(list)[0];
                if (key || key === 0) {
                    array.push([key, list[key]]);
                }
                list = list.next;
            } while (list);
        }
        return array;
    }

    return { buckets, hash, set, get, has, remove, length, clear, keys, values, entries, grow };
}

let hMap = hashMap();
hMap.set('zero', 'old');
hMap.set('Sara', 0);
// hMap.set('Saraa', 0);
// hMap.set('haha', 1);
// hMap.set('S', 0);
// hMap.set('A', 0);
// hMap.set('z', 0);
// hMap.set('aei', 0);
// hMap.set('aeiou', 0);
// hMap.set('qwe', 0);
// hMap.set('ash', 0);
// hMap.set('hash', 0);

console.log(hMap.keys());
console.log(hMap.values());
console.log(hMap.entries());
