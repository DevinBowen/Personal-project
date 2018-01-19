select e.id, e.dentist, e.date, e.time, e.start, e.end, e.avalable, d.office from event as e
join dentist as d on e.dentist = d.name
where e.avalable is false and e.date = $1;