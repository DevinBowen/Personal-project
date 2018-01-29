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
        var date = req.query.date;
        var dentist = req.query.dentist;
        var start = req.query.start;
        var end = req.query.end;
        var avalable = req.query.open;
        const db = req.app.get('db');
        db.update_event([dentist,date,start,end,avalable]).then(events => {
            res.status(200).send(events)
        })
    },
    addOffice: (req,res) => {
        var office = req.query.office;
        var dentist = req.query.dentist;
        const db = req.app.get('db');
        db.update_dentist([dentist,office]).then(events => {
            res.status(200).send(events)
        })
    }
}