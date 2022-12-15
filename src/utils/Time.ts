import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
dayjs.extend(updateLocale);
dayjs.extend(relativeTime);
dayjs.updateLocale("en", {
  relativeTime: {
    s: "%ds",
    ss: "%ds",
    m: "%dm",
    mm: "%dm",
    h: "%dh",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "%dmo",
    MM: "%dmo",
    y: "%dy",
    yy: "%dy",
  },
});

export const getElapsedTime = (dateTime: string) => {
  return dayjs(dateTime).fromNow(true);
};

export const getFormatedDate = (dateTime: string, format: string): string => {
  return dayjs(dateTime).format(format);
};
