const anilist = require('anilist-node');
const Anilist = new anilist();

let myFilter = {
    format: "NOVEL"
}

Anilist.searchEntry.manga("a most unlikely hero",myFilter).then(results => {
    console.log(results);
})