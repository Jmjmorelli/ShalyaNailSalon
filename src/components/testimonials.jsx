import React, { useEffect, useRef, useState } from 'react';

export const Testimonials = () => {
  const calendarRef = useRef(null);
  const selectedDisplayRef = useRef(null);
  const [selectedDates, setSelectedDates] = useState(new Set());

  useEffect(() => {
    const calendar = calendarRef.current;
    const selectedDateDisplay = selectedDisplayRef.current;

    let currentMonth = new Date().getMonth();
    let currentYear = new Date().getFullYear();

    const bookedDates = new Set([
      '2025-0-15',
      '2025-0-20',
      '2025-1-5',
      '2025-1-14',
    ]);

    const updateSelectedDisplay = () => {
      if (selectedDates.size === 0) {
        selectedDateDisplay.textContent = 'Select dates to book appointments';
      } else {
        const dateStrings = Array.from(selectedDates).map(dateKey => {
          const [year, month, day] = dateKey.split('-');
          return `${day}/${parseInt(month) + 1}/${year}`;
        });
        selectedDateDisplay.textContent = `Selected dates: ${dateStrings.join(', ')}`;
      }
    };

    const generateCalendar = (month, year) => {
      if (!calendar) return;
      calendar.innerHTML = ''; // Clear it

      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const firstDay = new Date(year, month, 1).getDay();

      const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.textContent = day;
        header.style.fontWeight = 'bold';
        calendar.appendChild(header);
      });

      for (let i = 0; i < firstDay; i++) {
        const empty = document.createElement('div');
        calendar.appendChild(empty);
      }

      for (let day = 1; day <= daysInMonth; day++) {
        const dateKey = `${year}-${month}-${day}`;
        const el = document.createElement('div');
        el.className = 'day';
        el.textContent = day;

        if (bookedDates.has(dateKey)) {
          el.classList.add('booked');
          el.title = 'Booked';
        } else {
          el.addEventListener('click', () => {
            setSelectedDates(prev => {
              const updated = new Set(prev);
              if (updated.has(dateKey)) {
                updated.delete(dateKey);
              } else {
                updated.add(dateKey);
              }
              return updated;
            });
          });
        }

        calendar.appendChild(el);
      }
    };

    generateCalendar(currentMonth, currentYear);
    updateSelectedDisplay();

  }, [selectedDates]);

  return (
    <div id="testimonials">
      <div className="container">
        <section id="booking" className="booking-section">
          <div className="container">
            <h2 className="section-title">Book Your Appointment</h2>
            <div className="booking-content">
              <div className="calendar-wrapper">
                <div ref={calendarRef} id="calendar" className="calendar"></div>
                <p ref={selectedDisplayRef} id="selected-date" className="selected-date-display">
                  Select your preferred dates
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

// issues
//  1. no way to clear calendar.
// 2. fix ui, its missing, highlighted boxes, clear and select buttons, legend.
// 3. find a way to turn the button selection into a string that gets outsourced and admins get email?
