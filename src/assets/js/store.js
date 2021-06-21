let page = 1;
let start = 0;
let end = 20;

const store = {
    getPage: () => page,
    setPage: p => { page = p },

    getStart: () => start,
    setStart: s => { start = s},

    getEnd: () => end,
    setEnd: e => { end = e}
}

export default store;