const anilist = require('anilist-node');
const Anilist = new anilist();

let myFilter = {
    format: "NOVEL"
}

Anilist.searchEntry.manga("86",myFilter).then(results => {
    console.log(results);
})