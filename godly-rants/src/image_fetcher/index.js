import axios from 'axios'
const keyword_extractor = require("keyword-extractor");

const KEY = "14697630-461b389bd28b39e3cd7120e03"

function parseTitle(title) {
    
    let analyzedTitle = keyword_extractor.extract(title, {
        language:"english",
        remove_digits: true,
        return_changed_case:true,
        remove_duplicates: false

   });

    let ret = analyzedTitle.join('+')

    return ret
    



}

function getImages(searchQuery) {
    let query = parseTitle(searchQuery)
    let ret = []
    axios.get(`https://pixabay.com/api/?key=${ KEY }&q=${ query }&image_type=photo`)
        .then(res => {            
            res.data["hits"].forEach(el => ret.push(el.largeImageURL))            
        })
            .catch(e => console.log(e))

    return ret
}

export {getImages}