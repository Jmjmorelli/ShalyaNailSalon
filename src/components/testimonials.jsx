import React from "react";

export const Testimonials = (props) => {
  document.addEventListener('DOMContentLoaded', function() {
  // Calendar functionality
  const calendar = document.getElementById('calendar');
  const selectedDateDisplay = document.getElementById('selected-date');
  
  let currentMonth = new Date().getMonth();
  let currentYear = new Date().getFullYear();
  
  // Store selected and booked dates
  let selectedDates = new Set();
  let bookedDates = new Set();
  
  // Add some example booked dates (in production, this would come from a server)
  bookedDates.add('2025-0-15'); // January 15, 2025
  bookedDates.add('2025-0-20'); // January 20, 2025
  bookedDates.add('2025-1-5');  // February 5, 2025
  bookedDates.add('2025-1-14'); // February 14, 2025
  
  // Create month/year selectors
  const calendarControls = document.createElement('div');
  calendarControls.style.textAlign = 'center';
  calendarControls.style.marginBottom = '10px';
  
  const monthSelect = document.createElement('select');
  monthSelect.id = 'monthSelect';
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  
  months.forEach((month, index) => {
    const option = document.createElement('option');
    option.value = index;
    option.textContent = month;
    if (index === currentMonth) option.selected = true;
    monthSelect.appendChild(option);
  });
  
  const yearSelect = document.createElement('select');
  yearSelect.id = 'yearSelect';
  for (let year = 2025; year <= 2027; year++) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    if (year === currentYear) option.selected = true;
    yearSelect.appendChild(option);
  }
  
  calendarControls.appendChild(monthSelect);
  calendarControls.appendChild(document.createTextNode(' '));
  calendarControls.appendChild(yearSelect);
  
  // Insert controls before calendar
  // calendar.parentNode.insertBefore(calendarControls, calendar);
  calendar.append(calendarControls);
  // Generate calendar
  function generateCalendar(month, year) {
    calendar.innerHTML = ''; // Clear existing calendar
    
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
      const headerElement = document.createElement('div');
      headerElement.textContent = day;
      headerElement.style.fontWeight = 'bold';
      headerElement.style.textAlign = 'center';
      headerElement.style.padding = '5px';
      calendar.appendChild(headerElement);
    });
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDay; i++) {
      const emptyDay = document.createElement('div');
      calendar.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayElement = document.createElement('div');
      dayElement.className = 'day';
      dayElement.textContent = day;
      
      const dateKey = `${year}-${month}-${day}`;
      
      // Check if date is already booked
      if (bookedDates.has(dateKey)) {
        dayElement.classList.add('booked');
        dayElement.title = 'This date is already booked';
        // Don't add click listener for booked dates
      } 
      // Check if date is selected by user
      else if (selectedDates.has(dateKey)) {
        dayElement.classList.add('selected');
        dayElement.addEventListener('click', () => {
          // Allow deselecting
          selectedDates.delete(dateKey);
          dayElement.classList.remove('selected');
          updateSelectedDisplay();
        });
      } 
      // Available date
      else {
        dayElement.addEventListener('click', () => {
          selectedDates.add(dateKey);
          dayElement.classList.add('selected');
          updateSelectedDisplay();
        });
      }
      
      calendar.appendChild(dayElement);
    }
  }
  
  // Update selected dates display
  function updateSelectedDisplay() {
    if (selectedDates.size === 0) {
      selectedDateDisplay.textContent = 'Select dates to book appointments';
    } else {
      const dateStrings = Array.from(selectedDates).map(dateKey => {
        const [year, month, day] = dateKey.split('-');
        return `${day}/${parseInt(month) + 1}/${year}`;
      });
      selectedDateDisplay.textContent = `Selected dates: ${dateStrings.join(', ')}`;
    }
  }
  
  // Event listeners for month/year change
  monthSelect.addEventListener('change', function() {
    currentMonth = parseInt(this.value);
    generateCalendar(currentMonth, currentYear);
  });
  
  yearSelect.addEventListener('change', function() {
    currentYear = parseInt(this.value);
    generateCalendar(currentMonth, currentYear);
  });
  
  // Initial calendar generation
  generateCalendar(currentMonth, currentYear);
  updateSelectedDisplay();
  
  // Add color legend
  const colorLegend = document.createElement('div');
  colorLegend.style.textAlign = 'center';
  colorLegend.style.marginTop = '15px';
  colorLegend.style.padding = '10px';
  colorLegend.style.border = '1px solid #e0e0e0';
  colorLegend.style.borderRadius = '8px';
  colorLegend.style.backgroundColor = '#f8f9fa';
  colorLegend.style.maxWidth = '400px';
  colorLegend.style.margin = '15px auto';
  colorLegend.style.fontSize = '13px';
  
  const legendTitle = document.createElement('h4');
  legendTitle.textContent = 'Legend';
  legendTitle.style.margin = '0 0 8px 0';
  legendTitle.style.fontSize = '14px';
  legendTitle.style.fontWeight = '600';
  colorLegend.appendChild(legendTitle);
  
  const legendItems = [
    { color: '#f9f9f9', border: '1px solid #ccc', text: 'Available' },
    { color: '#c8e6c9', border: '2px solid #4CAF50', text: 'Selected' },
    { color: '#ffcdd2', border: '1px solid #ccc', text: 'Booked' }
  ];
  
  const legendContainer = document.createElement('div');
  legendContainer.style.display = 'flex';
  legendContainer.style.justifyContent = 'center';
  legendContainer.style.gap = '15px';
  legendContainer.style.flexWrap = 'wrap';
  
  legendItems.forEach(item => {
    const legendItem = document.createElement('div');
    legendItem.style.display = 'flex';
    legendItem.style.alignItems = 'center';
    legendItem.style.gap = '5px';
    
    const colorBox = document.createElement('div');
    colorBox.style.width = '12px';
    colorBox.style.height = '12px';
    colorBox.style.backgroundColor = item.color;
    colorBox.style.border = item.border;
    colorBox.style.borderRadius = '2px';
    colorBox.style.flexShrink = '0';
    
    const labelText = document.createElement('span');
    labelText.textContent = item.text;
    labelText.style.fontSize = '12px';
    labelText.style.color = '#555';
    
    legendItem.appendChild(colorBox);
    legendItem.appendChild(labelText);
    legendContainer.appendChild(legendItem);
  });
  
  colorLegend.appendChild(legendContainer);
  
  // Add user booking controls
  const userControls = document.createElement('div');
  userControls.style.textAlign = 'center';
  userControls.style.marginTop = '10px';
  userControls.style.marginBottom = '20px';
  
  const confirmBookingBtn = document.createElement('button');
  confirmBookingBtn.textContent = 'Confirm Booking';
  confirmBookingBtn.style.backgroundColor = '#4CAF50';
  confirmBookingBtn.style.color = 'white';
  confirmBookingBtn.style.border = 'none';
  confirmBookingBtn.style.padding = '10px 20px';
  confirmBookingBtn.style.borderRadius = '5px';
  confirmBookingBtn.style.cursor = 'pointer';
  confirmBookingBtn.style.margin = '5px';
  
  const clearSelectionBtn = document.createElement('button');
  clearSelectionBtn.textContent = 'Clear Selection';
  clearSelectionBtn.style.backgroundColor = '#f44336';
  clearSelectionBtn.style.color = 'white';
  clearSelectionBtn.style.border = 'none';
  clearSelectionBtn.style.padding = '10px 20px';
  clearSelectionBtn.style.borderRadius = '5px';
  clearSelectionBtn.style.cursor = 'pointer';
  clearSelectionBtn.style.margin = '5px';
  
  userControls.appendChild(confirmBookingBtn);
  userControls.appendChild(clearSelectionBtn);
  
  // Insert user controls right after the selected date display
  selectedDateDisplay.parentNode.insertBefore(userControls, selectedDateDisplay.nextSibling);
  
  // Insert color legend right after the calendar
  calendar.parentNode.appendChild(colorLegend);
  
  // User event listeners
  confirmBookingBtn.addEventListener('click', () => {
    if (selectedDates.size === 0) {
      alert('Please select at least one date to book');
    } else {
      const dateStrings = Array.from(selectedDates).map(dateKey => {
        const [year, month, day] = dateKey.split('-');
        return `${day}/${parseInt(month) + 1}/${year}`;
      });
      alert(`Booking request submitted for: ${dateStrings.join(', ')}`);
      
      // HIDDEN ADMIN EMAIL FEATURE - This functionality sends booking details to admin email
      // In a real application, this would be handled server-side for security
      // The email sending would typically use a backend service like SendGrid, Nodemailer, etc.
      sendBookingEmailToAdmin(dateStrings);
      
      // Here you would typically send the booking data to a server
    }
  });
  
  // HIDDEN ADMIN EMAIL FUNCTIONALITY - Not visible to users
  // This function would send booking information to the admin email
  function sendBookingEmailToAdmin(bookedDates) {
    const adminEmail = "Shayla'sSalon@gmail.com"; // Admin email address
    const subject = "New Booking Request - Shayla's Salon";
    const body = `New booking request received for the following dates:\n\n${bookedDates.join('\n')}\n\nPlease review and confirm the appointment.`;
    
    // In a production environment, this would be handled by a backend service
    // For demonstration purposes, this creates a mailto link (but doesn't display it)
    const mailtoLink = `mailto:${adminEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    // This would typically be replaced with an actual email service API call
    // Example: fetch('/api/send-email', { method: 'POST', body: JSON.stringify({ to: adminEmail, subject, body }) })
    console.log('Admin email would be sent to:', adminEmail);
    console.log('Email content:', { subject, body });
    console.log('Mailto link (for reference):', mailtoLink);
  }
  
  clearSelectionBtn.addEventListener('click', () => {
    selectedDates.clear();
    generateCalendar(currentMonth, currentYear);
    updateSelectedDisplay();
  });
  
  // Clear entire calendar button
  const clearCalendarBtn = document.createElement('button');
  clearCalendarBtn.textContent = 'Clear Entire Calendar';
  clearCalendarBtn.style.backgroundColor = '#ff9800';
  clearCalendarBtn.style.color = 'white';
  clearCalendarBtn.style.border = 'none';
  clearCalendarBtn.style.padding = '10px 20px';
  clearCalendarBtn.style.borderRadius = '5px';
  clearCalendarBtn.style.cursor = 'pointer';
  clearCalendarBtn.style.margin = '5px';
  
  userControls.appendChild(clearCalendarBtn);
  
  clearCalendarBtn.addEventListener('click', () => {
    // if (confirm('Are you sure you want to clear your selected dates? This action cannot be undone.')) {
    //   selectedDates.clear();
    //   generateCalendar(currentMonth, currentYear);
    //   updateSelectedDisplay();
    //   alert('Selected dates cleared successfully');
    // }
  });
});

// Comment functionality
function addComment() {
  const commentInput = document.getElementById('CommentInput');
  const commentList = document.getElementById('commentList');
  const commentText = commentInput.value.trim();

  if (commentText) {
    const newComment = document.createElement('li');
    newComment.className = 'comment';
    newComment.textContent = commentText;
    commentList.appendChild(newComment);
    commentInput.value = ''; // Clear the input
  } else {
    alert('Please write a comment before posting!');
  }
}

  return (
    <div id="testimonials">
      <div className="container">
        
    <section id="booking" class="booking-section">
        <div class="container">
            <h2 class="section-title">Book Your Appointment</h2>
            <div class="booking-content">
                <div class="calendar-wrapper">
                    <div id="calendar" class="calendar"></div>
                    <p id="selected-date" class="selected-date-display">Select your preferred dates</p>
                </div>
            </div>
        </div>
    </section>
      </div>
    </div>
  );
};
