
exports.handler = async function(event, context) {
    const calendarUrl = "https://calendar.google.com/calendar/ical/441a7ac8f0f5d10ca61c216b052f2e1977bd52855dff77e6f8f07105398af5bc%40group.calendar.google.com/public/basic.ics";

    try {
        const response = await fetch(calendarUrl);
        const data = await response.text();

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/plain"
            },
            body: data
        };
    } catch (err) {
        return { statusCode: 500, body: "Error fetching calendar" };
    }
};
