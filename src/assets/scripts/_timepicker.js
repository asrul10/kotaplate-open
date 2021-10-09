export default () => {
  const timepickerEle = $(".time-picker");

  if (!timepickerEle.length) {
    return;
  }

  for (let index = 0; index < timepickerEle.length; index++) {
    const timepicker = $(timepickerEle[index]);
    const is12Hour = timepicker.attr("data-12-hour") == true;
    const hourStep = timepicker.attr("data-hour-step") || 1;
    const minStep = timepicker.attr("data-min-step") || 1;
    const minTime = timepicker.attr("data-min-time") || null;
    const maxTime = timepicker.attr("data-max-time") || null;
    const nowButton = timepicker.attr("data-now-button") == 0 ? false : true;

    timepicker.timepicker({
      ampmText: { am: "am", pm: "pm", AM: "AM", PM: "PM" },
      hourHeaderText: "Hour",
      minHeaderText: "Min",
      hourStep: parseInt(hourStep),
      minStep: parseInt(minStep),
      timeStep: null,
      minTime: minTime,
      maxTime: maxTime,
      disableTimeRanges: null,
      scrollDefault: null,
      selectOnBlur: true,
      selectSize: 8,
      timeFormat: is12Hour ? "%H:%i %A" : "%H:%i",
      use12HourClock: is12Hour,
      nowButton: nowButton,
    });
  }
};
