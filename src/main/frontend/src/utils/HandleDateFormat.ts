export const getYYYYMMDD = (date: any) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    // let hour = date.getHours();
    // let minute = date.getMinutes();
    // let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    // hour = hour >= 10 ? hour : "0" + hour;
    // minute = minute >= 10 ? minute : "0" + minute;
    // second = second >= 10 ? second : "0" + second;

    return "" + date.getFullYear() + month + day;
};

export const getHHMMSS = (date: any) => {
    // let month = date.getMonth() + 1;
    // let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    // month = month >= 10 ? month : "0" + month;
    // day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return "" + hour + minute + second;
};

export const getYYYY_MM_DD = (date: any) => {
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    let second = date.getSeconds();

    month = month >= 10 ? month : "0" + month;
    day = day >= 10 ? day : "0" + day;
    hour = hour >= 10 ? hour : "0" + hour;
    minute = minute >= 10 ? minute : "0" + minute;
    second = second >= 10 ? second : "0" + second;

    return (
        date.getFullYear() +
        "-" +
        month +
        "-" +
        day +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
    );
};

export const formattedDate = (data: string | undefined) => {
    if (!data) {
        return "";
    }

    // 년, 월, 일, 시, 분 추출
    const year = data.slice(0, 4);
    const month = data.slice(4, 6);
    const day = data.slice(6, 8);
    const hour = data.slice(8, 10);
    const minute = data.slice(10, 12);
    const second = data.slice(12, 14);

    // 포맷 변경: "yyyy-mm-dd hh:mi:ss"
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export const parseDateStringToDate = (dateString: string) => {
    const year = Number(dateString.substr(0, 4));
    const month = Number(dateString.substr(4, 2)) - 1;
    const day = Number(dateString.substr(6, 2));
    const hour = Number(dateString.substr(8, 2));
    const minute = Number(dateString.substr(10, 2));
    const second = Number(dateString.substr(12, 2));

    const dateObject = new Date(year, month, day, hour, minute, second);
    return dateObject;
}

