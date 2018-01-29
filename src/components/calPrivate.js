import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';


const currentYear = new Date().getFullYear();
const fromMonth = new Date(currentYear, 0);
const toMonth = new Date(currentYear + 10, 11);

function YearMonthForm({ date, localeUtils, onChange }) {
  const months = localeUtils.getMonths();

  const years = [];
  for (let i = fromMonth.getFullYear(); i <= toMonth.getFullYear(); i += 1) {
    years.push(i);
  }

  const handleChange = function handleChange(e) {
    const { year, month } = e.target.form;
    onChange(new Date(year.value, month.value));
  };

  return (
    <form className="DayPicker-Caption">
      <select name="month" onChange={handleChange} value={date.getMonth()}>
        {months.map((month, i) => (
          <option key={month} value={i}>
            {month}
          </option>
        ))}
      </select>
      <select name="year" onChange={handleChange} value={date.getFullYear()}>
        {years.map(year => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
    </form>
  );
}

export default class CalPrivate extends React.Component {
  constructor(props) {
    super(props);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this)
    this.state = {
      month: fromMonth,
      selectedDay: null,
      avalable: [],
      index: "",
      date: '',
      dentist: '',
      start: '',
      end: '',
      open: '',
      office: '',
      dentistName: '',
    };
  }



  handleDayClick(day, { selected }) {
    this.setState({
      selectedDay: selected ? undefined : day,
    })
    var selDay = (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear()
    axios.get('/api/avalable/test?date=' + selDay).then(res => {
      console.log(res.data)
      this.setState({ avalable: res.data })
    })
    console.log(selDay)
  }

  handleYearMonthChange(month) {
    this.setState({ month });
  }

  handleDeleteClick(id) {

    axios.delete('/api/delete?id=' + id)

    var day = this.state.selectedDay;

    var selDay = (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear()
    axios.get('/api/avalable/test?date=' + selDay).then(res => {
      console.log(res.data)
      this.setState({ avalable: res.data })
    })
    console.log(selDay)
  }

  handleUpdateClick() {
    var date = this.state.date;
    var dentist = this.state.dentist;
    var start = this.state.start;
    var end = this.state.end;
    var open = this.state.open;
    axios.get(`/api/avalable/addTime?date=${date}&dentist=${dentist}&start=${start}&end=${end}&open=${open}`)

    this.setState({ date: "" })
    this.setState({ dentist: "" })
    this.setState({ start: "" })
    this.setState({ end: "" })
    this.setState({ open: "" })

    alert('Your event has been added sucessfully.')

    var day = this.state.selectedDay;
    if (day === null) {
      return
    } else {

      var selDay = (day.getMonth() + 1) + "/" + day.getDate() + "/" + day.getFullYear()
      axios.get('/api/avalable/test?date=' + selDay).then(res => {
        console.log(res.data)
        this.setState({ avalable: res.data })
      })
      console.log(selDay)
    }
    
  }

  handleDateChange(event) {
    this.setState({ date: event.target.value });
    console.log(this.state.date)
  }
  handleDentistChange(event) {
    this.setState({ dentist: event.target.value });
    console.log(this.state.dentist)
  }
  handleStartChange(event) {
    this.setState({ start: event.target.value });
    console.log(this.state.start)
  }
  handleEndChange(event) {
    this.setState({ end: event.target.value });
    console.log(this.state.end)
  }
  handleTrueClick() {
    this.setState({ open: true });
    console.log(this.state.open)

  }
  handleFalseClick() {
    this.setState({ open: false });
    console.log(this.state.open)
  }



  handleOfficeClick() {
    var office = this.state.office;
    var dentist = this.state.dentistName;
    axios.get(`/api/avalable/addOffice?office=${office}&dentist=${dentist}`)
    this.setState({ office: "" })
    this.setState({ dentistName: "" })
    alert('Your dentist and office has been added sucessfully.')
  }


  handleOfficeChange(event) {
    this.setState({ office: event.target.value });
    console.log(this.state.office)
  }
  handleDentistNameChange(event) {
    this.setState({ dentistName: event.target.value });
    console.log(this.state.dentistName)
  }



  render() {
    // console.log(this.state.selectedDay)
    console.log(this.state.avalable)
    var availabeList = this.state.avalable.map(available => (
      <div key={available.id}>
        {available.avalable}
        <br />
        {available.date}
        {available.dentist}
        {available.name}
        {available.office}
        {available.time}
        {available.start}
        {available.end}
        <button onClick={() => this.handleDeleteClick(available.id)} >DELETE</button>
        <br />

      </div>))

    return (
      <div className="YearNavigation">
        <DayPicker
          selectedDays={this.state.selectedDay}
          onDayClick={this.handleDayClick}
          month={this.state.month}
          fromMonth={fromMonth}
          toMonth={toMonth}
          captionElement={({ date, localeUtils }) => (
            <YearMonthForm
              date={date}
              localeUtils={localeUtils}
              onChange={this.handleYearMonthChange}
              onDayClick={this.handleDayClick}
            />
          )}
        />
        <p>
          {this.state.selectedDay
            ? this.state.selectedDay.toLocaleDateString() : 'please select a day!'
          }
          {console.log(this.state.selectedDay)}
        </p>
        {availabeList}

        <div className="addTime">
        <h1>Add Event</h1>
          Date:<input type="text" value={this.state.date} placeholder="m/d/yyyy" name="date" title="date m/d/yyyy format" maxLength="10" pattern="([1-9]|1[012])[- /.]([1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d" onChange={(e) => this.handleDateChange(e)} />
          Dentist:<input placeholder="Dentist Name" value={this.state.dentist} onChange={(e) => this.handleDentistChange(e)} />
          Start:<input type="time" value={this.state.start} onChange={(e) => this.handleStartChange(e)} />
          End:<input type="time" value={this.state.end} onChange={(e) => this.handleEndChange(e)} />
          Open:<input type="radio" name="open" value={this.state.open} onClick={() => this.handleTrueClick()} />Avalaible
            <input type="radio" name="open" value={this.state.open} onClick={() => this.handleFalseClick()} />Unavalaible
          <button onClick={() => this.handleUpdateClick()}>SUBMIT</button>
        </div>

        <div className="addOffice">
          <h1>Add Office</h1>
          Office:<input placeholder="Office Name" value={this.state.office} onChange={(e) => this.handleOfficeChange(e)} />
          Dentist:<input placeholder="Dentist Name" value={this.state.dentistName} onChange={(e) => this.handleDentistNameChange(e)} />
          <button onClick={() => this.handleOfficeClick()} >SUBMIT</button>
        </div>


        {/* <form className="addTime" action="/api/addTime" method="post">
          <h1>Add Time</h1>
          <div>
            <label htmlFor="date">Date:</label>
            <input type="text" placeholder="m/d/yyyy" name="date" title="date m/d/yyyy format" maxLength="10" pattern="([1-9]|1[012])[- /.]([1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d" />
          </div>
          <div>
            <label htmlFor="dentist">Dentist:</label>
            <input placeholder="Dentist Name" />
          </div>
          <div>
            <label htmlFor="start">Start:</label>
            <input type="time" />
          </div>
          <div>
            <label htmlFor="end">End:</label>
            <input type="time" />
          </div>
          <div>
            <label htmlFor="avalaible">Open:</label>
            <input type="radio" name="true" value="true" />Avalaible
            <input type="radio" name="false" value="false" />Unavalaible
          </div>
          <div>
            <button type="submit">SUBMIT</button>
          </div>
        </form>*/}


      </div >
    );
  }
}