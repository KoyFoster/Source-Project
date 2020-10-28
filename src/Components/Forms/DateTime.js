class DateTime {
  static FormatDate(today) {
    return `${today.getFullYear()}-${today.getMonth() < 9 ? '0' : ''}${
      today.getMonth() + 1
    }-${today.getDate() < 10 ? '0' : ''}${today.getDate()}`;
  }

  static FormatTime(today) {
    return `${today.getHours() < 10 ? '0' : ''}${today.getHours()}:${
      today.getMinutes() < 10 ? '0' : ''
    }${today.getMinutes()}`;
  }
}

export default DateTime;
