// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
  const employee = {
    firstName,
    familyName,
    title,
    payPerHour,
    timeInEvents: [],
    timeOutEvents: [],
  };

  return employee;
}
function createEmployeeRecords(arrayOfArrays) {
  const employeeRecords = arrayOfArrays.map((employeeArray) => {
    const employee = createEmployeeRecord(employeeArray);
    return employee;
  });

  return employeeRecords;
}
function createTimeInEvent(employee, dateStamp) {
  const timeInEvent = {
    type: "TimeIn",
    hour: parseInt(dateStamp.slice(11, 15)),
    date: dateStamp.slice(0, 10),
  };

  employee.timeInEvents.push(timeInEvent);

  return employee;
}
function createTimeOutEvent(employeeRecord, dateStamp) {
  // Parse the date and time from the date stamp.
  const date = dateStamp.split(" ")[0];
  const hour = parseInt(dateStamp.split(" ")[1].substring(0, 4));

  // Create the event object.
  const event = {
    type: "TimeOut",
    hour,
    date,
  };

  // Add the event to the employee record.
  employeeRecord.timeOutEvents.push(event);

  return employeeRecord;
}
function hoursWorkedOnDate(employeeRecord, date) {
  // Find the time in and time out events for the given date.
  const timeInEvent = employeeRecord.timeInEvents.find(
    (event) => event.type === "TimeIn" && event.date === date
  );
  const timeOutEvent = employeeRecord.timeOutEvents.find(
    (event) => event.type === "TimeOut" && event.date === date
  );

  // If either the time in or time out event is missing, return 0.
  if (!timeInEvent || !timeOutEvent) {
    return 0;
  }

  // Calculate the number of hours worked.

  const hoursWorked = timeOutEvent.hour - timeInEvent.hour;

  return hoursWorked / 100;
}
function wagesEarnedOnDate(employeeRecord, date) {
  return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
}

//   ### `allWagesFor`
// * **Argument(s)**
//   * An employee record `Object`
// * **Returns**
//   * Pay owed for all dates
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number. **HINT**: You will need to find the available dates somehow...

function allWagesFor(employeeRecord) {
  const datesWorked = employeeRecord.timeInEvents.map((event) => event.date);

  const totalWages = datesWorked.reduce((total, date) => {
    return total + wagesEarnedOnDate(employeeRecord, date);
  }, 0);

  return totalWages;
}
// * **Argument(s)**
//   * `Array` of employee records
// * **Returns**
//   * Sum of pay owed to all employees for all dates, as a number
// * **Behavior**
//   * Using `wagesEarnedOnDate`, accumulate the value of all dates worked by the
//     employee in the record used as context. Amount should be returned as a
//     number.
function calculatePayroll(employeeRecords) {
  const totalPayroll = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
  }, 0);

  return totalPayroll;
}
