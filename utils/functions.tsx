import { IData } from "@/constants";
import parsePhoneNumber, { CountryCode, PhoneNumber } from "libphonenumber-js";
import moment from "moment";
import { Platform } from "react-native";

import { IByPlatform } from "./Interface";

export const daysOfWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday"
];

export const Log = (...data: any) => {
  console.log(
    "console.log ======> ",
    Platform.select({
      ios: {
        ios: data
      },
      android: {
        android: data
      },
      default: {
        default: data
      }
    })
  );
};

export const byPlatform = ({ ios, android, data }: IByPlatform) => {
  const value = Platform.select({
    ios: {
      ios: ios || data
    },
    android: {
      android: android || data
    },
    default: {
      default: data
    }
  });

  return value.android || value.ios || value.default;
};

// dd/mm/yyyy
export const formatDate = (date: Date | string | number | string) => {
  const d = getMomentDate(date);
  const month = d.getMonth() + 1; // January is 0
  const day = d.getDate();
  const year = d.getFullYear();
  return !isNaN(day)
    ? `${day < 10 ? "0" : ""}${day}/${month < 10 ? "0" : ""}${month}/${year}`
    : "--/--/--";
};

export const randomColor: any = () => {
  const color: string =
    "#" + (((1 << 24) * Math.random()) | 0).toString(16).padStart(6, "0");
  if (color === "#ffffff") return randomColor();
  return color;
};

export const getAge = (dateString: Date) => {
  return getMoment(dateString).isValid() ? getMoment().diff(dateString, "years") : "--";
};

export const capitalizeFirstLetter = (string = "") => {
  return string
    .split(" ")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ");
};

export const formatDateMoment = (dateString: Date, format?: string) => {
  return getMoment(dateString).isValid()
    ? capitalizeFirstLetter(getMoment(dateString).format(format || "DD MMM YYYY"))
    : "--/--/--"; // 03 jan 2923
};

export const getAllDaysInMonth = (month: number, year: number, key: any) => {
  const dates = Array.from({ length: new Date(year, month, 0).getDate() }, (_, i) =>
    getMomentDate([year, month - 1, i + 1])
  );
  const allMonthDays = dates.map((date) => {
    date.setUTCHours(0, 0, 0, 0);
    return {
      key: date.toDateString(),
      label: formatDateMoment(date, "ddd"),
      day: formatDateMoment(date, "ddd"),
      month: formatDateMoment(date, "DD MMM"),
      date
    };
  }) as IData[];
  return {
    allMonthDays,
    index: allMonthDays.findIndex((item) => item?.key == key)
  } as { allMonthDays: IData[]; index: number };
};

export const formatTime = (time: Date | string | number) => {
  if (!time) {
    return null;
  }
  const newTime = getMomentDate(time);
  let h: any = newTime.getHours();
  let m: any = newTime.getMinutes();
  h = `${h}`.length == 1 ? `0${h}` : h;
  m = `${m}`.length == 1 ? `0${m}` : m;
  return h + " : " + m;
};

export const formatTimeMoment = (time?: Date | string | number | null) => {
  if (!time) {
    return "--:--";
  }
  const formatted = getMoment(time).format("HH:mm");
  return formatted.toLowerCase().includes("invalid") ? "--:--" : formatted;
};

export const convertDataToKeyValue = (data: any[] = [], key?: string): any[] => {
  if (!data.length) return [];
  if (typeof data[0] === "object")
    return data.map((item: any) => {
      const ele = Object.keys(item);

      return {
        key: item?.id || item[ele[0]],
        label: key ? item[key] : item[ele[1]] || item[ele[0]],
        ...item
      };
    });

  return data.map((item: any) => {
    return {
      key: item,
      label: item
    };
  });
};

export const getDayOfWeek = (
  date: Date | string | number,
  split: "full" | "mid" = "mid"
) => {
  const dayOfWeek = getMomentDate(date).getDay();
  const result = isNaN(dayOfWeek) ? null : capitalizeFirstLetter(daysOfWeek[dayOfWeek]);

  return result ? (split === "full" ? result : result.slice(0, 3)) : "invalid";
};

export const getDay = (date: Date | string | number) => {
  const day = getMomentDate(date).getDate();
  return day < 10 ? `0${day}` : day;
};

export const getMonth = (date: Date | string | number) => {
  const month = getMomentDate(date).getMonth() + 1;
  return month < 10 ? `0${month}` : month;
};

export const getYear = (date: Date | string | number) => {
  const year = getMomentDate(date).getFullYear();
  return year < 10 ? `0${year}` : year;
};

export const getMonthOfYear = (date: Date | string | number) => {
  const month = getMomentDate(date).getMonth();
  const result = isNaN(month)
    ? null
    : [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "Jully",
        "August",
        "September",
        "October",
        "November",
        "December"
      ][month];
  // getMomentDate(getMomentDate()).format("MMMM")
  return result ? result : "invalid";
};

// array from number
export const arrayFromNumber = (value: number) => {
  return Array(value)
    .fill(0)
    .map((_, idx) => idx);
};

export const reorderItemFrom = (data: any[] = [], item: any) => {
  const itemIndex = data.findIndex((ele: any) => ele?.key === item?.key);
  const firstHalf = data.slice(itemIndex, data.length - itemIndex);
  const lastHalf = data.slice(data.length - itemIndex, data.length + 1);

  return [...firstHalf, ...lastHalf];
};

export const makeArrayUnique = (array: any[], key: string) => {
  const result: any[] = [];
  array.forEach((item) => {
    if (!result.find((ele) => ele[key] === item[key])) {
      result.push(item);
    }
  });
  return result;
};

export const convertArrayToObject = (array: any[], key?: string) => {
  if (!array?.length) {
    return {};
  }
  return array.reduce((obj, item) => {
    const id = key ? item[key] : item.id || item;
    return {
      ...obj,
      [id]: item
    };
  }, {});
};

export const removeNulls = (obj: any) => {
  if (Array.isArray(obj)) {
    return obj.filter((item) => item);
  }
  Object.keys(obj).forEach(
    (key) => [null, undefined, ""].includes(obj[key]) && delete obj[key]
  );
  return obj;
};

export const getNullKeys = (obj: any) => {
  const keys: any[] = [];
  Object.keys(obj).forEach(
    (key) => [null, undefined, ""].includes(obj[key]) && keys.push(key)
  );
  return keys;
};

export const sortByAlphabeticalOrder = (data: any[] = [], key = "name") => {
  return data.sort((a, b) => a[key].localeCompare(b[key]));
};

export const sortByCreatedAt = (data: any[] = []): any[] => {
  const updatedData = data.map((ele) => {
    const date = getMoment(ele.createdAt);

    return {
      ...ele,
      time: date.format("HH:mm"),
      date: date.calendar().split(" at ")[0].split(" à ")[0]
    };
  });

  return updatedData.sort(
    // @ts-ignore the sort should work
    (a, b) => getMomentDate(a.createdAt) - getMomentDate(b.createdAt)
  );
};

export const sectionGroupByCreatedAt = (data: any[] = []): any[] => {
  const updatedData = data.map((ele) => {
    const date = getMoment(ele.createdAt);

    return {
      ...ele,
      time: date.format("HH:mm"),
      date: date.calendar().split(" at ")[0].split(" à ")[0]
    };
  });

  return Object.values(
    updatedData.reduce(
      (prev, curr) => ({
        ...prev,
        [curr?.date]: {
          title: curr?.date,
          data: [...(prev?.[curr?.date]?.data || []), curr]?.sort(
            // @ts-ignore the sort should work
            (a, b) => getMomentDate(a?.createdAt) - getMomentDate(b?.createdAt)
          ),
          date: curr.createdAt
        }
      }),
      {}
    )
    // @ts-ignore the sort should work
  ).sort((a, b) => getMomentDate(a.date) - getMomentDate(b.date));
};

export const getPhoneNumber = (
  phoneNumber?: string,
  countryCode?: string
): PhoneNumber | undefined => {
  if (!phoneNumber) return;
  const parsedPhoneNumber = parsePhoneNumber(phoneNumber, countryCode as CountryCode);

  return parsedPhoneNumber;
};

export const getMomentDate = (date: any = new Date(), isUtc = true) => {
  if (!isUtc) {
    return moment(date).toDate();
  }
  return moment.utc(date).toDate();
};

export const getMoment = (date: any = new Date(), isUtc = true) => {
  if (!isUtc) {
    return moment(date);
  }
  return moment.utc(date);
};


export const randomString = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array(5)
    .fill(0)
    .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
    .join("_");
};