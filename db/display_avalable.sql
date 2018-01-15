select * from event
join dentist on event.dentist = dentist.name
where avalable is true;