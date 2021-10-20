/**
 * 日付のフォーマット変換関数
 * @param {変換したい日付データ} dateval
 * @param {過去表記に変換するかどうかを指定} ispast
 * @param {AM/PM表記にするかどうかを指定} is12hours 
 */

const DateFormat = (dateval: string, ispast: boolean = false, is12hours: boolean = false) => {
    const date = new Date(dateval);
    const now = new Date();
    // 引数日時
    let weekday = ["日", "月", "火", "水", "木", "金", "土"];
    let year = date.getFullYear();
    let month = (date.getMonth() + 1);
    let day = date.getDate();
    let dayOfWeek = weekday[date.getDay()];
    let hours = date.getHours();
    let minutes = date.getMinutes();
    
    // 現在日時
    let nyear = now.getFullYear();
    let nmonth = (now.getMonth() + 1);
    let nday = now.getDate();
    let nhours = now.getHours();
    let nminutes = now.getMinutes();

    // 過去表記
    if(ispast) {
        // 年数表記
        const yearval = nyear - year;
        if(yearval >= 1 && 3 > yearval) return '1年前';
        if(yearval >= 3 && 5 > yearval) return '3年前';
        if(yearval >= 5) return '5年前';
        // 月数表記
        const monthval = nmonth - month;
        if(monthval >= 1 && 3 > monthval) return '1カ月前';
        if(monthval >= 3 && 6 > monthval) return '3カ月前';
        if(monthval >= 6 && 9 > monthval) return '6カ月前';
        if(monthval >= 9) return '9カ月前';
        // 日にち・週表記
        const dayval = nday - day;
        if(dayval === 1) return '1日前';
        if(dayval === 2) return '2日前';
        if(dayval === 3) return '3日前';
        if(dayval === 4) return '4日前';
        if(dayval === 5) return '5日前';
        if(dayval === 5) return '6日前';
        if(dayval >= 7 && 14 > dayval) return '1週間前';
        if(dayval >= 14 && 21 > dayval) return '2週間前';
        if(dayval >= 21 && 28 > dayval) return '3週間前';
        // 時間表記
        const hoursval = nhours - hours;
        if(hoursval >= 1) {
            return `${hoursval}時間前`;
        }
        // 分数表記
        const minutesval = nminutes - minutes;
        return `${minutesval}分前`;
    }

    // 時間を AM / PM 表記
    if (is12hours) {
        let ampm = hours < 12 ? 'AM' : 'PM';
        hours = hours % 12;
        hours = (hours != 0) ? hours : 12; // 0時は12時と表示する

        return `${year}年${('0' + (month)).slice(-2)}月${('0' + (day)).slice(-2)}日(${dayOfWeek}) ${ampm} ${('0' + hours).slice(-2)}時${('0' + minutes).slice(-2)}分`;
    }

    // 通常(例：2021年09月14日(火) 08時14分)
    return `${year}年${('0' + (month)).slice(-2)}月${('0' + (day)).slice(-2)}日(${dayOfWeek}) ${('0' + hours).slice(-2)}時${('0' + minutes).slice(-2)}分`;
}

export default DateFormat