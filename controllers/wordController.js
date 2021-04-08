const Word = require('../models/word');

console.log('in word controller')
// searchWord
const searchWord = (req, res, next) => {
    console.log('Fetching Word List..', JSON.stringify(req.params));
    Word.find()
    .then(response => {
        if (typeof req.params.searchString === 'number') {
            res.json({
                errorCode:1,
                errorMessage:"Numbers cannot be searched in dictionary"
            })
        } else {
        const arr = response[0].words;
        let responseArr = [];
        let regEx = new RegExp(req.params.searchString, 'i');
        arr.filter((element) => {
            if (regEx.test(element)) {
                responseArr.push(element);
            }
        })
        res.send(responseArr);
    }
    })
    .catch(error => {
    console.log('Error Fetching Word List..' + error);
        res.json({
            message: 'Something wrong'
        })
    })
}

module.exports = {
    searchWord
};
