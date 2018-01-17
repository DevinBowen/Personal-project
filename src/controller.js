module.exports = {

    getAvalable: (req,res) => {
        const db = req.app.get('db');
        db.display_avalable().then(events => {
            res.status(200).send(events)
        })
    }
    // getAvalable: (req,res) => {
    //     const db = req.app.get('db');
    //     db.test().then(events => {
    //         res.status(200).send(events)
    //     })
    // }

}