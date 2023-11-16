const splitDate = (str) => {
    const dateTime = new Date(str);
    return dateTime.toLocaleDateString('en-US', {
        day: 'numeric',
        weekday: 'short',
        month: 'short'
    });
}
export default splitDate;