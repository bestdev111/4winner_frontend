const GetTime =(param) => {
    const dateObj = new Date(param);
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const year = dateObj.getFullYear();
    const hour = dateObj.getUTCHours()
    const min = dateObj.getUTCMinutes()
    const date = day + "." + month + "." + year + " " + hour+':'+min;
    return date;
}
export default GetTime