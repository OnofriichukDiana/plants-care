import { format, parseISO, isToday } from "date-fns";

const formatDateString = (dateString?: string): string => {
  if (dateString) {
    const date = parseISO(dateString);

    if (isToday(date)) {
      return format(date, "'today,' HH:mm");
    } else {
      return format(date, "yyyy-MM-dd, HH:mm");
    }
  } else return "";
};

export default formatDateString;
