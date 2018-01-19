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
    },
    addTime: (req,res) => {
        var date = req.date;
        var dentist = req.dentist;
        var start = req.start;
        var end = req.end;
        var avalable = req.avalaible;
        const db = req.app.get('db');
        db.update_event([id]).then(events => {
            res.status(200).send(events)
        })
    }
}