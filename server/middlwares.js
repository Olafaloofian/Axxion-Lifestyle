const notAllowed = ['peepee', 'poo', 'darn', 'cool', 'bloody', 'fart', 'shart', 'foo', 'bar', 'yolo', 'fortnite']

module.exports = {

    filterComment(req, res, next) {
        let body = req.body.body
        while ( notAllowed.find( word => body.includes(word) ) ) {
            const badWord = notAllowed.find( word => body.includes(word) );
            if(body.includes('farted')) {
                body = body.replace( 'farted', 'passed wind' )
            } else if (body.includes('farting')) {
                body = body.replace( 'farting', 'passing wind' )
            } else if (body.includes('fart')) {
                body = body.replace( 'fart', 'pass wind' )
            }
            body = body.replace( badWord, '*'.repeat( badWord.length ) );
            req.body.body = body
        }

        next();
    },

    filterBio(req, res, next) {
        console.log('------------ req.body', req.body)
        let body = req.body.new_bio
        while ( notAllowed.find( word => body.includes(word) ) ) {
            const badWord = notAllowed.find( word => body.includes(word) );
            if(body.includes('farted')) {
                body = body.replace( 'farted', 'passed wind' )
            } else if (body.includes('farting')) {
                body = body.replace( 'farting', 'passing wind' )
            } else if (body.includes('fart')) {
                body = body.replace( 'fart', 'pass wind' )
            }
            body = body.replace( badWord, '*'.repeat( badWord.length ) );
            req.body.new_bio = body
        }

        next();
    }
};