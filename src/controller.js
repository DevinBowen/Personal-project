module.exports = {

    getAvalable: (req,res) => {
        const db = req.app.get('db');
        db.display_avalable().then(events => {
            res.status(200).send(events)
        })
    },
    delete: (req,res) => {
        var id = req.query.id
        const db = req.app.get('db');
        db.delete_event([id]).then(events => {
            res.status(200).send(events)
        })
    }
}