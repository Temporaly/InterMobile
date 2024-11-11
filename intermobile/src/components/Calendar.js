import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { useTheme } from '../utils/ThemeContext.js';

const CustomCalendar = ({ events }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { theme } = useTheme();

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const generateCalendar = () => {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const firstDay = new Date(year, month, 1).getDay(); // Día de la semana del primer día del mes
    const totalDays = daysInMonth(month, year); // Total de días en el mes

    const daysArray = [];
    for (let i = 0; i < firstDay; i++) {
      daysArray.push(null); // Espacios vacíos antes del primer día
    }
    for (let day = 1; day <= totalDays; day++) {
      daysArray.push(new Date(year, month, day)); // Días del mes
    }

    return daysArray;
  };

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const renderCalendar = () => {
    const days = generateCalendar();
    const monthName = currentDate.toLocaleString('default', { month: 'long' });
    const year = currentDate.getFullYear();

    return (
      <div className="calendar" style={{paddingBottom:"5%", color: theme.text}}>
        <div className="calendar-header">
          <Button onClick={goToPreviousMonth} style={{backgroundColor: theme.mainColor, color: theme.text}}>Anterior</Button>
          <h2>{`${monthName} ${year}`}</h2>
          <Button onClick={goToNextMonth} style={{backgroundColor: theme.mainColor, color: theme.text}}>Siguiente</Button>
        </div>
        <div className="calendar-grid">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map((day) => (
            <div key={day} className="calendar-day-header">
              {day}
            </div>
          ))}
          {days.map((date, index) => {
            const event = events.find(
              (event) =>
                event.date.getDate() === date?.getDate() &&
                event.date.getMonth() === date?.getMonth() &&
                event.date.getFullYear() === date?.getFullYear()
            );
            return (
              <div key={index} className="calendar-day">
                {date ? (
                  <>
                    <span>{date.getDate()}</span>
                    {event && <div className="event">{event.title}</div>}
                  </>
                ) : (
                  <span></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return <>{renderCalendar()}</>;
};

export default CustomCalendar;
