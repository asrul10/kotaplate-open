/***    timepicker library as jQuery plugin    ***/
/*  This plugin can be applied to only input tags.
 * The timepicker shows when the input tag is focused, and hides when
 * both of the timepicker widget and the input tag lost focus.
 */

// add a member function, timepicker to jQuery object
(function ($) {
  // return 0-padded number as string whose length is 'length'
  function _padDigit(num, length) {
    var num_s = num.toString();
    if (num_s.length < length) {
      // pad num_s with 0 if num_s's length is smaller than 'length'
      var num_zeros = length - num_s.length;
      for (var i = 0; i < num_zeros; i++) {
        num_s = "0" + num_s;
      }
      return num_s;
    } else {
      // if not, return as it is
      return num_s;
    }
  }

  // check if $elem is focused
  function _isFocused($elem) {
    if ($elem.is(":focus")) {
      return true;
    } else {
      return false;
    }
  }

  // check if some $elem's child is focused
  function _isChildFocused($elem) {
    if ($elem.find(":focus").length) {
      return true;
    } else {
      return false;
    }
  }

  // check if we can interpret time_str as formatted time
  function _isTime(time_str, format, ampm_text) {
    if (typeof ampm_text === "undefined") {
      // default am/pm text
      ampm_text = { am: "am", pm: "pm", AM: "AM", PM: "PM" };
    }
    var j;
    var i = (j = 0); // indexes of format and time_str
    while (
      typeof format[i] !== "undefined" ||
      typeof time_str[j] !== "undefined"
    ) {
      if (format[i] === "%") {
        // next text must be an hour, minutes or am/pm
        switch (format[i + 1]) {
          case "h": // next 2 digits must be 0-padded hour of 12-hour clock
            var hour = parseInt(time_str.substring(j, j + 2), 10);
            if (isNaN(hour) || hour <= 0 || 12 < hour) {
              return false;
            }
            i += 2;
            j += 2;
            break;
          case "H": // next 2 digits must be 0-padded hour of 24-hour clock
            var hour = parseInt(time_str.substring(j, j + 2), 10);
            if (isNaN(hour) || hour < 0 || 24 <= hour) {
              return false;
            }
            i += 2;
            j += 2;
            break;
          case "g": // next 1 or 2 digits must be an hour of 12-hour clock
            var hour_can1 = parseInt(time_str.substring(j, j + 2), 10);
            var hour_can2 = parseInt(time_str.substring(j, j + 1), 10);
            if (!isNaN(hour_can1) && 10 <= hour_can1 && hour_can1 <= 12) {
              i += 2;
              j += 2;
              break;
            } else if (!isNaN(hour_can2) && 1 <= hour_can2 && hour_can2 <= 9) {
              i += 2;
              j += 1;
              break;
            }
            return false;
          case "G": // next 1 or 2 digits must be an hour of 24-hour clock
            var hour_can1 = parseInt(time_str.substring(j, j + 2), 10);
            var hour_can2 = parseInt(time_str.substring(j, j + 1), 10);
            if (!isNaN(hour_can1) && 10 <= hour_can1 && hour_can1 <= 23) {
              i += 2;
              j += 2;
              break;
            } else if (!isNaN(hour_can2) && 1 <= hour_can2 && hour_can2 <= 9) {
              i += 2;
              j += 1;
              break;
            }
            return false;
          case "i": // next 2 digits must be minutes
            var min = parseInt(time_str.substring(j, j + 2), 10);
            if (isNaN(min) || min < 0 || 60 <= min) {
              return false;
            }
            i += 2;
            j += 2;
            break;
          case "a": // next text must be small am/pm symbol (e.g. am/pm)
            // the length of the texts should be same, otherwise fail to read
            var len = ampm_text.am.length;
            var ampm = time_str.substring(j, j + len);
            if (ampm !== ampm_text.am && ampm !== ampm_text.pm) {
              return false;
            }
            i += 2;
            j += len;
            break;
          case "A": // next text must be large am/pm symbol (e.g. AM/PM)
            // the length of the texts should be same, otherwise fail to read
            var len = ampm_text.AM.length;
            var ampm = time_str.substring(j, j + len);
            if (ampm !== ampm_text.AM && ampm !== ampm_text.PM) {
              return false;
            }
            i += 2;
            j += len;
            break;
          default:
            // this '%' is not a format string
            if (format[i] !== time_str[j]) {
              return false;
            }
            i += 1;
            j += 1;
            break;
        }
      } else {
        // check if the current characters are same
        if (format[i] !== time_str[j]) {
          return false;
        }
        i += 1;
        j += 1;
      }
    }
    return true;
  }

  // check if we can interpret time_str as time
  function _isNormalTime(time_str) {
    // e.g. 12:32, 11:59 pm, 04:01 AM, etc...
    var match1 = time_str.match(
      /\d{1,2}:\d\d\s*(a.m.|p.m.|am|pm|A.M.|P.M.|AM|PM)?/g
    );
    // e.g. 12:00 noon, midnight, etc...
    var match2 = time_str.match(/(12)?\s*(midnight|noon|Midnight|Noon)/g);
    if (match1) {
      // if something else is included, this is invalid
      if (match1[0] !== time_str) {
        return false;
      }
      // check if the hour and minutes are valid
      var nums = time_str.match(/\d{1,2}:\d\d/)[0].split(":");
      var ampm = time_str.match(/(a.m.|p.m.|am|pm|A.M.|P.M.|AM|PM)/);
      var hour = parseInt(nums[0], 10);
      var min = parseInt(nums[1], 10);
      if (ampm) {
        // this is 12-hour clock
        return 1 <= hour && hour <= 12 && 0 <= min && min < 60;
      } else {
        // this is 24-hour clock
        return 0 <= hour && hour <= 23 && 0 <= min && min < 60;
      }
    } else if (match2) {
      // if something else is included, this is invalid
      if (match2[0] !== time_str) {
        return false;
      } else {
        return true;
      }
    }
  }

  // get the timestamp (represented by minutes) from time-like string
  // if time_str is not
  function _timeToInt(time_str) {
    var time = time_str.match(/\d{1,2}:\d\d/);
    var ampm = time_str.match(/(a.m.|p.m.|am|pm|A.M.|P.M.|AM|PM)/);
    if (time) {
      var nums = time[0].split(":");
      var hour = parseInt(nums[0], 10);
      var min = parseInt(nums[1], 10);
      if (hour >= 24 || min >= 60) {
        return null;
      } // invalid time string
      if (ampm && hour >= 13) {
        return null;
      } // invalid time string
      if (ampm) {
        if (ampm[0].charAt(0) === "A" || ampm[0].charAt(0) === "a") {
          // the time is am
          return (hour % 12) * 60 + min;
        } else {
          // the time is pm
          return ((hour % 12) + 12) * 60 + min;
        }
      } else {
        return hour * 60 + min;
      }
    } else if (time_str.search("noon") != -1) {
      return 12 * 60;
    } else if (time_str.search("midnight") != -1) {
      return 0;
    } else {
      return null;
    }
  }

  // get the timestamp (represented by minutes) from formatted time-like string
  function _formattedTimeToInt(time_str, format, ampm_text) {
    if (typeof ampm_text === "undefined") {
      // default am/pm text
      ampm_text = { am: "am", pm: "pm", AM: "AM", PM: "PM" };
    }
    var j;
    var i = (j = 0); // indexes of format and time_str
    var placeholders = {};
    while (
      typeof format[i] !== "undefined" ||
      typeof time_str[j] !== "undefined"
    ) {
      if (format[i] === "%") {
        // next text must be an hour, minutes or am/pm
        switch (format[i + 1]) {
          case "h": // next 2 digits must be 0-padded hour of 12-hour clock
            var hour = parseInt(time_str.substring(j, j + 2), 10);
            if (isNaN(hour) || hour <= 0 || 12 < hour) {
              return null;
            }
            placeholders.hour_ampm = hour;
            i += 2;
            j += 2;
            break;
          case "H": // next 2 digits must be 0-padded hour of 24-hour clock
            var hour = parseInt(time_str.substring(j, j + 2), 10);
            if (isNaN(hour) || hour < 0 || 24 <= hour) {
              return null;
            }
            placeholders.hour_24 = hour;
            i += 2;
            j += 2;
            break;
          case "g": // next 1 or 2 digits must be an hour of 12-hour clock
            var hour_can1 = parseInt(time_str.substring(j, j + 2), 10);
            var hour_can2 = parseInt(time_str.substring(j, j + 1), 10);
            if (!isNaN(hour_can1) && 10 <= hour_can1 && hour_can1 <= 12) {
              placeholders.hour_ampm = hour_can1;
              i += 2;
              j += 2;
              break;
            } else if (!isNaN(hour_can2) && 1 <= hour_can2 && hour_can2 <= 9) {
              placeholders.hour_ampm = hour_can2;
              i += 2;
              j += 1;
              break;
            }
            return null;
          case "G": // next 1 or 2 digits must be an hour of 24-hour clock
            var hour_can1 = parseInt(time_str.substring(j, j + 2), 10);
            var hour_can2 = parseInt(time_str.substring(j, j + 1), 10);
            if (!isNaN(hour_can1) && 10 <= hour_can1 && hour_can1 <= 23) {
              placeholders.hour_24 = hour_can1;
              i += 2;
              j += 2;
              break;
            } else if (!isNaN(hour_can2) && 1 <= hour_can2 && hour_can2 <= 9) {
              placeholders.hour_24 = hour_can2;
              i += 2;
              j += 1;
              break;
            }
            return null;
          case "i": // next 2 digits must be minutes
            var min = parseInt(time_str.substring(j, j + 2), 10);
            if (isNaN(min) || min < 0 || 60 <= min) {
              return null;
            }
            placeholders.minute = min;
            i += 2;
            j += 2;
            break;
          case "a": // next text must be small am/pm symbol (e.g. am/pm)
            // the length of the texts should be same, otherwise fail to read
            var len = ampm_text.am.length;
            var ampm = time_str.substring(j, j + len);
            if (ampm !== ampm_text.am && ampm !== ampm_text.pm) {
              return null;
            }
            placeholders.ampm = ampm;
            i += 2;
            j += len;
            break;
          case "A": // next text must be large am/pm symbol (e.g. AM/PM)
            // the length of the texts should be same, otherwise fail to read
            var len = ampm_text.AM.length;
            var ampm = time_str.substring(j, j + len);
            if (ampm !== ampm_text.AM && ampm !== ampm_text.PM) {
              return null;
            }
            placeholders.ampm = ampm;
            i += 2;
            j += len;
            break;
          default:
            // this '%' is not a format string
            if (format[i] !== time_str[j]) {
              return null;
            }
            i += 1;
            j += 1;
            break;
        }
      } else {
        // check if the current characters are same
        if (format[i] !== time_str[j]) {
          return null;
        }
        i += 1;
        j += 1;
      }
    }
    if (!placeholders.minute) {
      return null;
    } else if (placeholders.ampm && placeholders.hour_ampm) {
      if (
        placeholders.ampm === ampm_text.am ||
        placeholders.ampm === ampm_text.AM
      ) {
        // this time is am
        return (placeholders.hour_ampm % 12) * 60 + placeholders.minute;
      } else {
        // this time is pm
        return (
          (placeholders.hour_ampm % 12) * 60 + 12 * 60 + placeholders.minute
        );
      }
    } else if (placeholders.hour_24) {
      return placeholders.hour_24 * 60 + placeholders.minute;
    } else {
      return null;
    }
  }

  // check if a timestamp is in range of [start, end]
  // if start > end, this range spreads across next day
  function _isTimeInRange(timestamp, start, end) {
    if (start > end) {
      // the range spreads across next day
      return start <= timestamp || timestamp <= end;
    } else {
      return start <= timestamp && timestamp <= end;
    }
  }

  // try to select an option of 'value' and return true if 'value' exist
  function _selectOption(select, value) {
    var options = select.options;
    var len = options.length;
    for (var i = 0; i < len; i++) {
      if (options[i].value == value && options[i].disabled == false) {
        options[i].selected = true;
        return true;
      }
    }
    return false;
  }

  // get duration between start and end
  // if start > end, this range spreads across next day
  function _getTimeDuration(start, end) {
    if (start > end) {
      return end + 24 * 60 - start;
    } else {
      return end - start;
    }
  }

  // get the range of hour from the 2 timestamps(minute)
  function _getHourRange(timestamp_start, timestamp_end, hstep) {
    var hour_range = [];
    if (timestamp_start < timestamp_end) {
      for (
        var i = Math.floor(timestamp_start / 60);
        i <= Math.floor(timestamp_end / 60);
        i += hstep
      ) {
        hour_range.push(i);
      }
    } else {
      // start > end
      for (var i = Math.floor(timestamp_start / 60); i < 24; i += hstep) {
        hour_range.push(i);
      }
      for (var i = 0; i <= Math.floor(timestamp_end / 60); i += hstep) {
        hour_range.push(i);
      }
    }
    return hour_range;
  }

  // scroll to an option of 'hour'
  function _scrollToHourOption(select, hour) {
    var options = select.options;
    var len = options.length;
    if (parseInt(options[0], 10) == hour) {
      $(select).scrollTop(0);
      return;
    }
    var height = $(select).height();
    var opt_height = height / $(select).prop("size");
    for (var i = 1; i < len; i++) {
      var prev_hour = parseInt(options[i - 1].value, 10);
      var next_hour = parseInt(options[i].value, 10);
      if (next_hour == hour) {
        $(select).scrollTop(opt_height * (i + 1 / 2) - height / 2);
        return;
      }
      if (prev_hour > next_hour) {
        if (prev_hour < hour || hour < next_hour) {
          $(select).scrollTop(opt_height * i - height / 2);
          return;
        }
      } else if (prev_hour < hour && hour < next_hour) {
        $(select).scrollTop(opt_height * i - height / 2);
        return;
      }
    }
  }

  // scroll to an option of 'minute'
  function _scrollToMinuteOption(select, minute) {
    var options = select.options;
    var len = options.length;
    if (parseInt(options[0], 10) == minute) {
      $(select).scrollTop(0);
      return;
    }
    var height = $(select).height();
    var opt_height = height / $(select).prop("size");
    for (var i = 1; i < len; i++) {
      var prev_minute = parseInt(options[i - 1].value, 10);
      var next_minute = parseInt(options[i].value, 10);
      if (next_minute == minute) {
        $(select).scrollTop(opt_height * (i + 1 / 2) - height / 2);
        return;
      } else if (prev_minute < minute && minute < next_minute) {
        $(select).scrollTop(opt_height * i - height / 2);
        return;
      }
    }
  }

  // create select-options of hours or minutes
  // This function will be called to create select-options for the first time.
  function _createSelectOptions(which, settings, $picker) {
    if (which === "hour") {
      var hour_select = $picker.find(".hour-select").get(0);
      // clear all options
      while (hour_select.firstChild) {
        hour_select.removeChild(hour_select.firstChild);
      }
      if (settings.use12HourClock) {
        var ampm = $picker.find(".ampm-button").text();
        if (ampm === "am") {
          var len = settings.hour_data_am.length;
          for (var i = 0; i < len; i++) {
            var option = document.createElement("option");
            var hour = settings.hour_data_am[i].hour;
            option.value = hour;
            option.innerHTML = _padDigit(hour, 2);
            if (settings.hour_data_am[i].disabled) {
              option.disabled = true;
            }
            hour_select.appendChild(option);
          }
        } else {
          // ampm=="pm"
          var len = settings.hour_data_pm.length;
          for (var i = 0; i < len; i++) {
            var option = document.createElement("option");
            var hour = settings.hour_data_pm[i].hour;
            option.value = hour;
            option.innerHTML = _padDigit(hour, 2);
            if (settings.hour_data_pm[i].disabled) {
              option.disabled = true;
            }
            hour_select.appendChild(option);
          }
        }
      } else {
        var len = settings.hour_data_24.length;
        for (var i = 0; i < len; i++) {
          var option = document.createElement("option");
          var hour = settings.hour_data_24[i].hour;
          option.value = hour;
          option.innerHTML = _padDigit(hour, 2);
          if (settings.hour_data_24[i].disabled) {
            option.disabled = true;
          }
          hour_select.appendChild(option);
        }
      }
    } else if (which === "minute") {
      var min_select = $picker.find(".min-select").get(0);
      var step;
      if (settings.is_set_time_step) {
        step = settings.timeStep;
      } else {
        step = settings.minStep;
      }
      for (var i = 0; i < 60; i += step) {
        var option = document.createElement("option");
        option.value = i;
        option.innerHTML = _padDigit(i, 2);
        min_select.appendChild(option);
      }
    }
  }

  // change select-options of hours or minutes
  // depending on the currently selected hour and am/pm
  // This function will be called when some properties has changed.
  function _changeSelectOptions(which, settings, $picker) {
    // change select-options of hours when am/pm has changed
    if (which === "hour" && settings.is_set_minmax_time) {
      var hour_select = $picker.find(".hour-select").get(0);
      var hvalue = hour_select.value;
      // clear all options
      while (hour_select.firstChild) {
        hour_select.removeChild(hour_select.firstChild);
      }
      if (settings.use12HourClock) {
        var ampm = $picker.find(".ampm-button").text();
        if (ampm === "am") {
          var len = settings.hour_data_am.length;
          for (var i = 0; i < len; i++) {
            var option = document.createElement("option");
            var hour = settings.hour_data_am[i].hour;
            option.value = hour;
            option.innerHTML = _padDigit(hour, 2);
            if (settings.hour_data_am[i].disabled) {
              option.disabled = true;
            }
            hour_select.appendChild(option);
          }
        } else {
          // ampm=="pm"
          var len = settings.hour_data_pm.length;
          for (var i = 0; i < len; i++) {
            var option = document.createElement("option");
            var hour = settings.hour_data_pm[i].hour;
            option.value = hour;
            option.innerHTML = _padDigit(hour, 2);
            if (settings.hour_data_pm[i].disabled) {
              option.disabled = true;
            }
            hour_select.appendChild(option);
          }
        }
      }
      if (hvalue) {
        // scroll to and select the previously selected option of hours
        // and call the latter part of this function
        _scrollToHourOption(hour_select, hvalue);
        if (_selectOption(hour_select, hvalue)) {
          _changeSelectOptions("minute", settings, $picker);
        }
      }
    }
    // change select-options of minutes when hours has changed
    else if (which === "minute") {
      var $hour_select = $picker.find(".hour-select");
      var min_select = $picker.find(".min-select").get(0);
      var hour_index = $hour_select.prop("selectedIndex");
      var hour = parseInt($hour_select.val(), 10);
      var mvalue = min_select.value;
      var ampm = $picker.find(".ampm-button").text();
      var hour_data;
      if (settings.use12HourClock) {
        if (ampm === "am") {
          hour_data = settings.hour_data_am[hour_index];
          hour = hour % 12; // get hour in 24-hour clock
        } else {
          hour_data = settings.hour_data_pm[hour_index];
          hour = (hour % 12) + 12; // get hour in 24-hour clock
        }
      } else {
        hour_data = settings.hour_data_24[hour_index];
      }
      // clear all options
      while (min_select.firstChild) {
        min_select.removeChild(min_select.firstChild);
      }
      // get min and max minute
      var min_minute = hour_data.min_minute;
      var max_minute = hour_data.max_minute;
      min_minute = min_minute != undefined ? min_minute : 0;
      max_minute = max_minute != undefined ? max_minute : 59;
      // get start minute and end minute
      var start, end, step;
      if (settings.is_set_time_step) {
        // use timeStep
        step = settings.timeStep;
        var duration = _getTimeDuration(
          _timeToInt(settings.minTime),
          hour * 60 + min_minute
        );
        start = min_minute + ((step - (duration % step)) % step);
        end = max_minute;
      } else {
        // use minStep
        step = settings.minStep;
        start = Math.ceil(min_minute / step) * step;
        end = max_minute;
      }
      // append select-options of minutes
      for (var i = start; i <= end; i += step) {
        var option = document.createElement("option");
        option.value = i;
        option.innerHTML = _padDigit(i, 2);
        min_select.appendChild(option);
      }
      // disable some select-options of minutes
      if (settings.is_set_disabled_time) {
        var options = min_select.options;
        var optionLen = options.length;
        var disabledLen = settings.disableTimeRanges.length;
        for (var i = 0; i < disabledLen; i++) {
          var disable_start = hour_data["disable_start_minute" + i];
          var disable_end = hour_data["disable_end_minute" + i];
          if (
            typeof disable_start === "undefined" &&
            typeof disable_end === "undefined"
          ) {
            continue;
          } else if (disable_start <= disable_end) {
            for (var j = 0; j < optionLen; j++) {
              var min = parseInt(options[j].value, 10);
              if (disable_start <= min && min <= disable_end) {
                options[j].disabled = true;
              }
            }
          } else {
            for (var j = 0; j < optionLen; j++) {
              var min = parseInt(options[j].value, 10);
              if (disable_start <= min) {
                options[j].disabled = true;
              } else if (min <= disable_end) {
                options[j].disabled = true;
              }
            }
          }
        }
      }
      // select the previously selected option of minutes
      if (mvalue) {
        _scrollToMinuteOption(min_select, mvalue);
        _selectOption(min_select, mvalue);
      }
    }
  }

  // format and output the selected time
  function _outputTime(settings, $picker, $input) {
    var hour = parseInt($picker.find(".hour-select").val(), 10);
    var min = parseInt($picker.find(".min-select").val(), 10);
    if (!isNaN(hour) && !isNaN(min)) {
      var formatted = settings.timeFormat
        .replace("%g", hour == 0 || hour == 12 ? 12 : hour % 12)
        .replace("%G", hour)
        .replace("%h", _padDigit(hour == 0 || hour == 12 ? 12 : hour % 12, 2))
        .replace("%H", _padDigit(hour, 2))
        .replace("%i", _padDigit(min, 2));
      if (settings.use12HourClock) {
        var ampm = $picker.find(".ampm-button").text();
        formatted = formatted
          .replace("%a", settings.ampmText[ampm])
          .replace("%A", settings.ampmText[ampm.toUpperCase()]);
      } else {
        var ampm = hour < 12 ? "am" : "pm";
        formatted = formatted
          .replace("%a", settings.ampmText[ampm])
          .replace("%A", settings.ampmText[ampm.toUpperCase()]);
      }
      $input.val(formatted);
    }
  }

  // create timepicker object
  function _createTimepicker($input) {
    var settings = $input.data("timepicker-settings");

    // create a picker and containers
    var picker = document.createElement("div");
    var header_div = document.createElement("div");
    var select_div = document.createElement("div");
    var button_div = document.createElement("div");

    // create headers
    var hour_header = document.createElement("div");
    hour_header.innerHTML = settings.hourHeaderText;
    var min_header = document.createElement("div");
    min_header.innerHTML = settings.minHeaderText;
    header_div.appendChild(hour_header);
    header_div.appendChild(min_header);

    // create select for hours and minutes
    var hour_select = document.createElement("select");
    hour_select.setAttribute("size", settings.selectSize);
    hour_select.setAttribute("tabindex", "-1");
    var min_select = document.createElement("select");
    min_select.setAttribute("size", settings.selectSize);
    min_select.setAttribute("tabindex", "-1");
    // select-options will be created in _showTimepicker for the first time,
    // and may change when some properties has changed

    // create now button
    if (settings.nowButton) {
      var now_button = document.createElement("button");
      now_button.setAttribute("tabindex", "-1");
      now_button.className = "btn btn-sm btn-outline-primary now-button";
      now_button.innerHTML = "Now";
      button_div.appendChild(now_button);
    }

    // assemble timepicker
    select_div.appendChild(hour_select);
    select_div.appendChild(min_select);
    picker.appendChild(header_div);
    picker.appendChild(select_div);
    picker.appendChild(button_div);

    // layout items by setting class name
    picker.className = "custom-input-timepicker-div ps-2 pe-2 pt-1 pb-1";
    header_div.className = "d-flex gap-2";
    select_div.className = "d-flex gap-2 pb-1";
    button_div.className = "d-grid gap-2";
    hour_header.className = "flex-fill text-start";
    min_header.className = "flex-fill text-start";
    hour_select.className = "form-control hour-select";
    min_select.className = "form-control min-select";

    if (settings.use12HourClock) {
      var ampm_button = document.createElement("button");
      ampm_button.setAttribute("tabindex", "-1");
      ampm_button.innerHTML = "am";
      ampm_button.className = "btn btn-sm btn-outline-dark ampm-button";
      button_div.prepend(ampm_button);
    }

    return $(picker);
  }

  // set event listeners to $picker related to $input
  function _bindTimepicker($picker, $input) {
    var settings = $input.data("timepicker-settings");
    // if using 12-hour clock, change select-options of hours when am/pm changed
    if (settings.use12HourClock) {
      $picker.find(".ampm-button").on("click", function () {
        var $this = $(this);
        if ($this.html() === "pm") {
          $this.html("am");
        } else {
          $this.html("pm");
        }
        _changeSelectOptions("hour", settings, $picker);
      });
    }
    // change select-options of minutes when selected hour has changed
    $picker.find(".hour-select").on("change", function () {
      if (
        settings.is_set_time_step ||
        settings.is_set_minmax_time ||
        settings.is_set_disabled_time
      ) {
        _changeSelectOptions("minute", settings, $picker);
      }
    });
    // When its focus blurred, remove the timepicker.
    // Do this process after 50 milliseconds because a blur event
    // fires even when the focus moves to the timepicker.
    $picker.on("focusout", function () {
      setTimeout(function () {
        var $current_picker = _getTimepicker($input);
        // If a picker is being showed,
        if ($current_picker.length) {
          // and if the picker does not have focus,
          if (!_isFocused($input) && !_isChildFocused($current_picker)) {
            if (settings.selectOnBlur) {
              _outputTime(settings, $picker, $input);
            }
            // remove the picker.
            _removeTimepicker($input);
          }
        }
      }, 50);
    });
    // When the ok button was pushed, output the selected time
    // and remove the timepicker.
    $picker.find(".ok-button").on("click", function () {
      _outputTime(settings, $picker, $input);
      _removeTimepicker($input);
      // fire a change event to tell that the value of $input has changed
      // $inputの内容が変わったことを伝えるため、changeイベントを発火
      $input.trigger("change");
    });
    $picker.find(".now-button").on("click", () => {
      const d = new Date();
      let h = d.getHours();
      let m = d.getMinutes();

      if (settings.use12HourClock) {
        const ampm = h >= 12 ? 'pm' : 'am';
        h = h % 12;
        h = h ? h : 12;
        m = m < 10 ? '0'+ m : m;
        $picker.find(".ampm-button").text(ampm);
      }

      $picker.find(".hour-select").val(h);
      $picker.find(".min-select").val(m);
      _outputTime(settings, $picker, $input);
      _removeTimepicker($input);
      $input.trigger("change");
    });
    // When the cancel button was pushed, just remove the timepicker.
    $picker.find(".cancel-button").on("click", function () {
      _removeTimepicker($input);
    });
  }

  // show and set up the timepicker
  function _showTimepicker($picker, $input) {
    var settings = $input.data("timepicker-settings");
    // create select-options and select each of them which matches
    // the current value of $input before the timepicker is showed
    var timestamp = _formattedTimeToInt(
      $input.val(),
      settings.timeFormat,
      settings.ampmText
    );
    var hour_select = $picker.find(".hour-select").get(0);
    var min_select = $picker.find(".min-select").get(0);
    var hour, min;
    // $input has a value, so create select-options depending on the value
    if (timestamp != null) {
      min = timestamp % 60;
      if (settings.use12HourClock) {
        hour = Math.floor(timestamp / 60) % 12;
        hour = hour != 0 ? hour : 12;
        let ampm = $input.val().indexOf("am") == -1 ? "pm" : "am";
        ampm = $input.val().indexOf("AM") == -1 ? "pm" : "am";

        // set am/pm firstly
        $picker.find(".ampm-button").text(ampm);
      } else {
        hour = Math.floor(timestamp / 60);
      }
      // create select-options of hours
      _createSelectOptions("hour", settings, $picker);
      // select an option of 'hour'
      var selected = _selectOption(hour_select, hour);
      // if succeeded in selecting, change min-select's options
      if (selected) {
        _changeSelectOptions("minute", settings, $picker);
      }
      // else, create min-select's options of default
      else {
        _createSelectOptions("minute", settings, $picker);
      }
      // select an option of 'min'
      _selectOption(min_select, min);
    }
    // $input has no value but scrollDefault is set, so change am/pm in advance
    else if (settings.scrollDefault) {
      timestamp = _timeToInt(settings.scrollDefault);
      if (timestamp != null) {
        min = timestamp % 60;
        if (settings.use12HourClock) {
          hour = Math.floor(timestamp / 60) % 12;
          hour = hour != 0 ? hour : 12;
          let ampm = $input.val().indexOf("am") == -1 ? "pm" : "am";
          ampm = $input.val().indexOf("AM") == -1 ? "pm" : "am";
          $picker.find(".ampm-button").text(ampm);
        } else {
          hour = Math.floor(timestamp / 60);
        }
      }
      // create select-options of default
      _createSelectOptions("hour", settings, $picker);
      _createSelectOptions("minute", settings, $picker);
    }
    // $input has no value, so create select-options of default
    else {
      _createSelectOptions("hour", settings, $picker);
      _createSelectOptions("minute", settings, $picker);
    }

    // show the timepicker, $picker
    var left_pos = $input.offset()["left"];
    var top_pos = $input.offset()["top"] + $input.outerHeight() + 5;
    $picker.insertAfter($input);
    $picker.offset({ left: left_pos, top: top_pos });

    // scroll to options which match 'timestamp'
    if (typeof hour !== "undefined") {
      _scrollToHourOption(hour_select, hour);
    }
    if (typeof min !== "undefined") {
      _scrollToMinuteOption(min_select, min);
    }
  }

  // get a timepicker which was bound with $input
  function _getTimepicker($input) {
    return $input.next(".custom-input-timepicker-div");
  }

  // check if $input has a timepicker
  function _hasTimepicker($input) {
    if (_getTimepicker($input).length) {
      return true;
    } else {
      return false;
    }
  }

  // remove a timepicker $input has
  function _removeTimepicker($input) {
    $input.trigger("change");
    var $picker = $input.next(".custom-input-timepicker-div");
    $picker.remove();
  }

  var methods = {
    /* initialize inputs for timepicker */
    // This method will be called when you call $input.timepicker([option])
    init: function (options) {
      var base_data = $.extend({}, $.fn.timepicker.default_options, options);

      // set up other settings from options
      var other_data = {
        hour_data_24: null,
        hour_data_am: null,
        hour_data_pm: null,
        // used for optimization later
        is_set_minmax_time: false,
        is_set_time_step: false,
        is_set_disabled_time: false,
      };
      var timestamp_start = 0; // 00:00 -> 0
      var timestamp_end = 1439; // 23:59 -> 24*60-1
      if (base_data.minTime) {
        timestamp_start = _timeToInt(base_data.minTime);
        other_data.is_set_minmax_time = true;
      }
      if (base_data.maxTime) {
        timestamp_end = _timeToInt(base_data.maxTime);
        other_data.is_set_minmax_time = true;
      }
      var hstep;
      if (base_data.timeStep) {
        other_data.is_set_time_step = true;
        hstep = 1;
      } else {
        hstep = base_data.hourStep;
      }
      if (base_data.disableTimeRanges) {
        other_data.is_set_disabled_time = true;
      }

      // use 12-hour clock
      if (base_data.use12HourClock) {
        // make hour range
        var hour_range = _getHourRange(timestamp_start, timestamp_end, hstep);
        other_data.hour_data_am = hour_range
          .filter(function (hour) {
            return hour < 12;
          })
          .map(function (h) {
            return h != 0 ? { hour: h } : { hour: 12 };
          });
        other_data.hour_data_pm = hour_range
          .filter(function (hour) {
            return hour >= 12;
          })
          .map(function (h) {
            return h != 12 ? { hour: h % 12 } : { hour: 12 };
          });
        // determine the start hour
        if (hour_range[0] < 12) {
          // the start hour is am: save min minute in hour_data_am
          other_data.hour_data_am[0].min_minute = timestamp_start % 60;
        } else {
          // the start hour is pm: save min minute in hour_data_pm
          other_data.hour_data_pm[0].min_minute = timestamp_start % 60;
        }
        // determine the end hour
        if (hour_range[hour_range.length - 1] < 12) {
          // the end hour is am: save end minute in hour_data_am
          other_data.hour_data_am[
            other_data.hour_data_am.length - 1
          ].max_minute = timestamp_end % 60;
        } else {
          // the end hour is pm: save end minute in hour_data_pm
          other_data.hour_data_pm[
            other_data.hour_data_pm.length - 1
          ].max_minute = timestamp_end % 60;
        }
      }
      // default clock: 24 hour clock
      else {
        // make hour range
        other_data.hour_data_24 = _getHourRange(
          timestamp_start,
          timestamp_end,
          hstep
        ).map(function (h) {
          return { hour: h };
        });
        if (other_data.is_set_minmax_time) {
          // save start and end minutes in hour_data_24
          other_data.hour_data_24[0].min_minute = timestamp_start % 60;
          other_data.hour_data_24[
            other_data.hour_data_24.length - 1
          ].max_minute = timestamp_end % 60;
        }
      }

      // make data for disabled time
      if (other_data.is_set_disabled_time) {
        var disabledLen = base_data.disableTimeRanges.length;
        for (var i = 0; i < disabledLen; i++) {
          var disable_start = _timeToInt(base_data.disableTimeRanges[i][0]);
          var disable_end = _timeToInt(base_data.disableTimeRanges[i][1]);
          // use 12-hour clock
          if (base_data.use12HourClock) {
            other_data.hour_data_am.forEach(function (hdata) {
              // get hour in 24-hour clock
              var hour = hdata.hour % 12;
              if (hour * 60 == disable_start - (disable_start % 60)) {
                // hour is the start of disabled hour range
                hdata["disable_start_minute" + i] = disable_start % 60;
              }
              if (hour * 60 == disable_end - (disable_end % 60)) {
                // hour is the end of disabled hour range
                hdata["disable_end_minute" + i] = disalbe_end % 60;
              }
              if (
                _isTimeInRange(hour * 60, disable_start, disable_end) &&
                _isTimeInRange(hour * 60 + 59, disable_start, disable_end)
              ) {
                // hour is a disabled hour
                hdata.disabled = true;
              }
            });
            other_data.hour_data_pm.forEach(function (hdata) {
              // get hour in 24-hour clock
              var hour = (hdata % 12) + 12;
              if (hour * 60 == disable_start - (disable_start % 60)) {
                // hour is the start of disabled hour range
                hdata["disable_start_minute" + i] = disable_start % 60;
              }
              if (hour == disable_end - (disable_end % 60)) {
                // hour is the end of disabled hour range
                hdata["disable_end_minute" + i] = disable_end % 60;
              }
              if (
                _isTimeInRange(hour * 60, disable_start, disable_end) &&
                _isTimeInRange(hour * 60 + 59, disable_start, disable_end)
              ) {
                // hour is a disabled hour
                hdata.disabled = true;
              }
            });
          }
          // default clock: 24-hour clock
          else {
            other_data.hour_data_24.forEach(function (hdata) {
              var hour = hdata.hour;
              if (hour * 60 == disable_start - (disable_start % 60)) {
                // hour is the start of disabled hour range
                hdata["disable_start_minute" + i] = disable_start % 60;
              }
              if (hour * 60 == disable_end - (disable_end % 60)) {
                // hour is the end of disabled hour range
                hdata["disable_end_minute" + i] = disable_end % 60;
              }
              if (
                _isTimeInRange(hour * 60, disable_start, disable_end) &&
                _isTimeInRange(hour * 60 + 59, disable_start, disable_end)
              ) {
                // hour is a disabled hour
                hdata.disabled = true;
              }
            });
          }
        }
      }

      // save these settings and set event listeners to $input
      return this.each(function () {
        var settings = $.extend({}, base_data, other_data);
        var $this_input = $(this);
        $this_input.data("timepicker-settings", settings);

        // timepicker must be used only for input tag
        if ($this_input.prop("tagName") === "INPUT") {
          // set placeholder
          // $this_input.attr({ placeholder: "--:--" });
          // show timepicker when
          $this_input.on("focus.timepicker", function () {
            var $this = $(this);
            // do nothing if a timepicker has been already showed
            if (_hasTimepicker($this)) {
              return;
            }
            var $picker = _createTimepicker($this);
            _bindTimepicker($picker, $this);
            _showTimepicker($picker, $this);
          });
          // When its focus blurred, remove the timepicker.
          // Do this process after 50 milliseconds because a blur event
          // fires even when the focus moves to the timepicker.
          $this_input.on("blur.timepicker", function () {
            var $this = $(this);
            setTimeout(function () {
              var $picker = _getTimepicker($this);
              // If a picker is being showed,
              if ($picker.length) {
                // and if the picker does not have focus,
                if (!_isFocused($this) && !_isChildFocused($picker)) {
                  if (settings.selectOnBlur) {
                    _outputTime(settings, $picker, $this);
                  }
                  // remove the picker.
                  _removeTimepicker($this);
                }
              }
            }, 50);
          });
          // When the value of the input changed to non-time string, reset it
          $this_input.on("change.timepicker", function () {
            var $this = $(this);
            if (!_isTime($this.val(), settings.timeFormat, settings.ampmText)) {
              $this.val("");
            }
          });
        }
      });
    },

    /* set up settings */
    // This method must be used for inputs which are uninitialized for timepicker
    setup: function (options) {
      return this.each(function () {
        // set data which is needed for the timepicker
        var settings = $.extend({}, base_data, other_data);
        $(this).data("timepicker-settings", settings);
      });
    },

    /* configure settings */
    // This method will process slower than setup method if you configure settings
    // for the first time because of the heavy loop
    option: function (options) {
      return this.each(function () {
        var base_data;
        var current_settings = $(this).data("timepicker-settings");
        if (typeof current_settings === "undefined") {
          base_data = $.extend({}, $.fn.timepicker.default_options, options);
        } else {
          base_data = $.extend({}, current_settings, options);
        }

        // set up other settings from options
        var other_data = {
          hour_data_24: null,
          hour_data_am: null,
          hour_data_pm: null,
          // used for optimization later
          is_set_minmax_time: false,
          is_set_time_step: false,
          is_set_disabled_time: false,
        };
        var timestamp_start = 0; // 00:00 -> 0
        var timestamp_end = 1439; // 23:59 -> 24*60-1
        if (base_data.minTime) {
          timestamp_start = _timeToInt(base_data.minTime);
          other_data.is_set_minmax_time = true;
        }
        if (base_data.maxTime) {
          timestamp_end = _timeToInt(base_data.maxTime);
          other_data.is_set_minmax_time = true;
        }
        var hstep;
        if (base_data.timeStep) {
          other_data.is_set_time_step = true;
          hstep = 1;
        } else {
          hstep = base_data.hourStep;
        }
        if (base_data.disableTimeRanges) {
          other_data.is_set_disabled_time = true;
        }

        // use 12-hour clock
        if (base_data.use12HourClock) {
          // make hour range
          var hour_range = _getHourRange(timestamp_start, timestamp_end, hstep);
          other_data.hour_data_am = hour_range
            .filter(function (hour) {
              return hour < 12;
            })
            .map(function (h) {
              return h != 0 ? { hour: h } : { hour: 12 };
            });
          other_data.hour_data_pm = hour_range
            .filter(function (hour) {
              return hour >= 12;
            })
            .map(function (h) {
              return h != 12 ? { hour: h } : { hour: 12 };
            });
          // determine the start hour
          if (hour_range[0] < 12) {
            // the start hour is am: save min minute in hour_data_am
            other_data.hour_data_am[0].min_minute = timestamp_start % 60;
          } else {
            // the start hour is pm: save min minute in hour_data_pm
            other_data.hour_data_pm[0].min_minute = timestamp_start % 60;
          }
          // determine the end hour
          if (hour_range[hour_range.length - 1] < 12) {
            // the end hour is am: save end minute in hour_data_am
            other_data.hour_data_am[
              other_data.hour_data_am.length - 1
            ].max_minute = timestamp_end % 60;
          } else {
            // the end hour is pm: save end minute in hour_data_pm
            other_data.hour_data_pm[
              other_data.hour_data_pm.length - 1
            ].max_minute = timestamp_end % 60;
          }
        }
        // default clock: 24 hour clock
        else {
          // make hour range
          other_data.hour_data_24 = _getHourRange(
            timestamp_start,
            timestamp_end,
            hstep
          ).map(function (h) {
            return { hour: h };
          });
          if (other_data.is_set_minmax_time) {
            // save start and end minutes in hour_data_24
            other_data.hour_data_24[0].min_minute = timestamp_start % 60;
            other_data.hour_data_24[
              other_data.hour_data_24.length - 1
            ].max_minute = timestamp_end % 60;
          }
        }

        // make data for disabled time
        if (base_data.disableTimeRanges) {
          var disabledLen = base_data.disableTimeRanges.length;
          for (var i = 0; i < disabledLen; i++) {
            var disable_start = _timeToInt(base_data.disableTimeRanges[i][0]);
            var disable_end = _timeToInt(base_data.disableTimeRanges[i][1]);
            // use 12-hour clock
            if (base_data.use12HourClock) {
              other_data.hour_data_am.forEach(function (hdata) {
                // get hour in 24-hour clock
                var hour = hdata.hour % 12;
                if (hour * 60 == disable_start - (disable_start % 60)) {
                  // hour is the start of disabled hour range
                  hdata["disable_start_minute" + i] = disable_start % 60;
                }
                if (hour * 60 == disable_end - (disable_end % 60)) {
                  // hour is the end of disabled hour range
                  hdata["disable_end_minute" + i] = disalbe_end % 60;
                }
                if (
                  _isTimeInRange(hour * 60, disable_start, disable_end) &&
                  _isTimeInRange(hour * 60 + 59, disable_start, disable_end)
                ) {
                  // hour is a disabled hour
                  hdata.disabled = true;
                }
              });
              other_data.hour_data_pm.forEach(function (hdata) {
                // get hour in 24-hour clock
                var hour = (hdata % 12) + 12;
                if (hour * 60 == disable_start - (disable_start % 60)) {
                  // hour is the start of disabled hour range
                  hdata["disable_start_minute" + i] = disable_start % 60;
                }
                if (hour == disable_end - (disable_end % 60)) {
                  // hour is the end of disabled hour range
                  hdata["disable_end_minute" + i] = disable_end % 60;
                }
                if (
                  _isTimeInRange(hour * 60, disable_start, disable_end) &&
                  _isTimeInRange(hour * 60 + 59, disable_start, disable_end)
                ) {
                  // hour is a disabled hour
                  hdata.disabled = true;
                }
              });
            }
            // default clock: 24-hour clock
            else {
              other_data.hour_data_24.forEach(function (hdata) {
                var hour = hdata.hour;
                if (hour * 60 == disable_start - (disable_start % 60)) {
                  // hour is the start of disabled hour range
                  hdata["disable_start_minute" + i] = disable_start % 60;
                }
                if (hour * 60 == disable_end - (disable_end % 60)) {
                  // hour is the end of disabled hour range
                  hdata["disable_end_minute" + i] = disable_end % 60;
                }
                if (
                  _isTimeInRange(hour * 60, disable_start, disable_end) &&
                  _isTimeInRange(hour * 60 + 59, disable_start, disable_end)
                ) {
                  // hour is a disabled hour
                  hdata.disabled = true;
                }
              });
            }
          }
        }

        // set data which is needed for the timepicker
        var settings = $.exnted({}, base_data, other_data);
        $(this).data("timepicker-settings", settings);
      });
    },

    /* show a timepicker */
    show: function () {
      return this.each(function () {
        var $this_input = $(this);
        // if $this_input is not set up, do nothing
        if (!$this_input.data("timepicker-settings")) {
          return false;
        }
        // create, bind, show and initialize timepicker if not being showed
        if (!_hasTimepicker($this_input)) {
          var $picker = _createTimepicker($this_input);
          _bindTimepicker($picker, $this_input);
          _showTimepicker($picker, $this_input);
        }
        // ignore the rest of the elements
        return false;
      });
    },

    /* hide a timepicker */
    hide: function () {
      return this.each(function () {
        var $this_input = $(this);
        if (_hasTimepicker($this_input)) {
          _removeTimepicker($this_input);
        }
      });
    },

    /* destroy settings and unbind input of timepicker */
    remove: function () {
      return this.each(function () {
        var $this_input = $(this);
        if (_hasTimepicker($this_input)) {
          _removeTimepicker($this_input);
        }
        $this_input.removeData("timepicker-settings");
        $this_input.off(".timepicker");
      });
    },
  };

  $.fn.timepicker = function (method) {
    if (!this.length) return this;
    if (methods[method]) {
      return methods[method].apply(
        this,
        Array.prototype.slice.call(arguments, 1)
      );
    } else if (typeof method === "object" || !method) {
      return methods.init.apply(this, arguments);
    } else {
      $.error("Method " + method + " does not exist on jQuery.timepicker");
    }
  };

  $.fn.timepicker.default_options = {
    ampmText: { am: "am", pm: "pm", AM: "AM", PM: "PM" },
    hourHeaderText: "hour",
    minHeaderText: "min",
    okButtonText: "&#10004;",
    cancelButtonText: "&#10005;",
    hourStep: 1,
    minStep: 1,
    timeStep: null,
    minTime: null,
    maxTime: null,
    disableTimeRanges: null,
    scrollDefault: null,
    selectOnBlur: false,
    selectSize: 8,
    timeFormat: "%H:%i",
    use12HourClock: false,
    nowButton: true
  };
})(jQuery);