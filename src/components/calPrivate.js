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
    axios.update('/api/avalable/addTime?update=')
  }

  handleChange(name, e){
    var change = {};
    change[name] = e.target.value;
    this.setState(change);
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
          Date:<input type="text" placeholder="m/d/yyyy" name="date" title="date m/d/yyyy format" maxLength="10" pattern="([1-9]|1[012])[- /.]([1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d" />
          Dentist:<input placeholder="Dentist Name" />
          Start:<input type="time" />
          End:<input type="time" />
          Open:<input type="radio" name="true" value="true" />Avalaible
            <input type="radio" name="false" value="false" />Unavalaible
          <button>SUBMIT</button>
        </div>

        <div className="addOffice">
          <h1>Add Office</h1>
          Office:<input placeholder="Office Name" />
          Dentist:<input placeholder="Dentist Name" />
          <button>SUBMIT</button>
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