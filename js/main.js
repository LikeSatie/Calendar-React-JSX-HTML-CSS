const dayNames = [
  'Понедельник',
  'Вторник',
  'Среда',
  'Четверг',
  'Пятница',
  'Суббота',
  'Воскресенье'
];
const monthNames = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
];
const genitiveMonthNames = [
  'Января',
  'Февраля',
  'Марта',
  'Апреля',
  'Мая',
  'Июня',
  'Июля',
  'Августа',
  'Сентября',
  'Октября',
  'Ноября',
  'Декабря'
];

const ruWeek = {
  Понедельник: 'Пн',
  Вторник: 'Вт',
  Среда: 'Ср',
  Четверг: 'Чт',
  Пятница: 'Пт',
  Суббота: 'Сб',
  Воскресенье: 'Вс'
};
const head = function() {
  let week = new Array(7).fill().map((item, index) => {
    let objectKey = Object.keys(ruWeek)[index];
    return (
      <th key={index} scope="col" title={objectKey}>
        {ruWeek[objectKey]}
      </th>
    );
  });
  return <tr>{week}</tr>;
};
const Calendar = function(props) {
  const date = props.date;
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 0).getDay();
  const daysInMonth = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const weeksInMonth = Math.ceil((daysInMonth + firstDay) / 7);
  const currentDate = date.getDate();

  const calendarData = () => {
    let day = 1 - firstDay;
    let calendar = [];

    for (let i = 0; i < weeksInMonth; i++) {
      calendar[i] = [];

      for (let j = 0; j < 7; j++) {
        let cellDate = new Date(
          date.getFullYear(),
          date.getMonth(),
          day++
        ).getDate();

        if (day <= 1 || day - 1 > daysInMonth) {
          calendar[i][j] = (
            <td key={j} className="ui-datepicker-other-month">
              {cellDate}
            </td>
          );
        } else {
          if (cellDate === currentDate) {
            calendar[i][j] = (
              <td key={j} className="ui-datepicker-today">
                {cellDate}
              </td>
            );
          } else {
            calendar[i][j] = <td key={j}>{cellDate}</td>;
          }
        }
      }
    }

    return calendar;
  };
  const rows = calendarData().map(week => {
    return <tr key={week[0].props.children}>{week}</tr>;
  });

  return (
    <div className="ui-datepicker">
      <div className="ui-datepicker-material-header">
        <div className="ui-datepicker-material-day">
          {dayNames[date.getDay()]}
        </div>
        <div className="ui-datepicker-material-date">
          <div className="ui-datepicker-material-day-num">{date.getDate()}</div>
          <div className="ui-datepicker-material-month">
            {genitiveMonthNames[date.getMonth()]}
          </div>
          <div className="ui-datepicker-material-year">
            {date.getFullYear()}
          </div>
        </div>
      </div>
      <div className="ui-datepicker-header">
        <div className="ui-datepicker-title">
          <span className="ui-datepicker-month">
            {monthNames[date.getMonth()]}
          </span>
          &nbsp;<span className="ui-datepicker-year">{date.getFullYear()}</span>
        </div>
      </div>
      <table className="ui-datepicker-calendar">
        <colgroup>
          <col />
          <col />
          <col />
          <col />
          <col />
          <col className="ui-datepicker-week-end" />
          <col className="ui-datepicker-week-end" />
        </colgroup>
        <thead>{head()}</thead>
        <tbody>{rows}</tbody>
      </table>
    </div>
  );
};

const now = new Date();

ReactDOM.render(<Calendar date={now} />, document.getElementById('root'));
