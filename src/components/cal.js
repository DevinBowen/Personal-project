import React from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import axios from 'axios';
import '../css/calandar.css';

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

export default class Cal extends React.Component {
  constructor(props) {
    super(props);
    this.handleYearMonthChange = this.handleYearMonthChange.bind(this);
    this.handleDayClick = this.handleDayClick.bind(this)
    this.state = {
      month: fromMonth,
      selectedDay: null,
      avalable: [],
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

  render() {

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
        <br />

      </div>))

    return (


      <div className="YearNavigation">
        <div className="day">
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
          
        </div>




        <div className="events">
        <p style={{fontWeight: "700"}}><u>
            {this.state.selectedDay
              ? this.state.selectedDay.toLocaleDateString() : 'please select a day!'
            }</u>
            {console.log(this.state.selectedDay)}
          </p>
          {availabeList}
        </div>
      </div>
    );
  }
}