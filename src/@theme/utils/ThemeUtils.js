class EventEmitter {
    constructor() {
        this.events = {};
    }

    _getEventListByName(eventName) {
        if (typeof this.events[eventName] === 'undefined') {
            this.events[eventName] = new Set();
        }
        return this.events[eventName];
    }

    on(eventName, fn) {
        this._getEventListByName(eventName).add(fn);
    }

    once(eventName, fn) {
        const onceFn = (...args) => {
            this.off(eventName, onceFn);
            fn(...args);
        };
        this.on(eventName, onceFn);
    }

    emit(eventName, ...args) {
        this._getEventListByName(eventName).forEach(fn => fn(...args));
    }

    off(eventName, fn) {
        this._getEventListByName(eventName).delete(fn);
    }
}

class ThemeUtils {
    static EventEmitter = EventEmitter;

    static asyncForEach(arr, cb, delay = 0) {
        arr.forEach((item, index, array) => {
            setTimeout(cb, delay, [item, index, array]);
        });
    }

    static filterArrayByString(mainArr, searchText) {
        if (searchText === '') {
            return mainArr;
        }
        searchText = searchText.toLowerCase();
        return mainArr.filter(itemObj => this.searchInObj(itemObj, searchText));
    }

    static hiddenScroll() {
        const scrollTop = document.documentElement.scrollTop
            ? document.documentElement.scrollTop
            : document.body.scrollTop;
        document.documentElement.classList.add('no-scroll');
        document.documentElement.style.top = `${-scrollTop}px`;
    }

    static visibleScroll() {
        const scrollTop = parseInt(document.documentElement.style.top);
        document.documentElement.classList.remove('no-scroll');
        document.documentElement.style.removeProperty('top');
        document.documentElement.scrollTop = -scrollTop;
        document.body.scrollTop = -scrollTop;
    }

    static searchInObj(itemObj, searchText) {
        if (!itemObj) {
            return false;
        }
        const propArray = Object.keys(itemObj);
        for (let i = 0; i < propArray.length; i += 1) {
            const prop = propArray[i];
            const value = itemObj[prop];
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            } else if (Array.isArray(value)) {
                if (this.searchInArray(value, searchText)) {
                    return true;
                }
            }
            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
        }
        return false;
    }

    static searchInArray(arr, searchText) {
        arr.forEach(value => {
            if (typeof value === 'string') {
                if (this.searchInString(value, searchText)) {
                    return true;
                }
            }
            if (typeof value === 'object') {
                if (this.searchInObj(value, searchText)) {
                    return true;
                }
            }
            return false;
        });
        return false;
    }

    static searchInString(value, searchText) {
        return value.toLowerCase().includes(searchText);
    }

    static sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
}

export default ThemeUtils;
