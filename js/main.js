// Register plugin
gsap.registerPlugin(ScrollTrigger);

// Master scroll timeline for assembling the cheesesteak
const tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#hero",
        start: "top top",
        end: "bottom center",
        scrub: true,
    }
});

tl.from("#bread-bottom", { y: 150, opacity: 0 })
  .from("#steak", { y: 160, opacity: 0 })
  .from("#onions", { y: 170, opacity: 0 })
  .from("#cheese", { y: 180, opacity: 0 })
  .from("#peppers", { y: 190, opacity: 0 })
  .from("#sauce", { y: 200, opacity: 0 })
  .from("#bread-top", { y: -150, opacity: 0 });

  <script>
// Reads the public Google Calendar feed (ICS) to find today's event
async function loadTodaysLocation() {
    const calendarID = "YOUR_CALENDAR_ID_HERE";
    const url = `https://calendar.google.com/calendar/ical/${calendarID}/public/basic.ics`;

    try {
        const response = await fetch(url);
        const text = await response.text();

        const today = new Date().toISOString().split("T")[0];
        const events = text.split("BEGIN:VEVENT");

        let found = false;

        events.forEach(evt => {
            if (evt.includes("DTSTART")) {
                // Extract date in YYYYMMDD format
                const match = evt.match(/DTSTART.*:(\d{8})/);
                if (match) {
                    const eventDate = match[1].slice(0,4) + "-" + match[1].slice(4,6) + "-" + match[1].slice(6,8);

                    if (eventDate === today) {
                        found = true;

                        const summary = evt.match(/SUMMARY:(.*)/)?.[1] || "Food Truck Event";
                        const loc = evt.match(/LOCATION:(.*)/)?.[1] || "Location TBA";

                        document.getElementById("todays-location").innerHTML =
                            `<span class="text-xl font-bold">Today:</span> ${loc} • ${summary}`;
                    }
                }
            }
        });

        if (!found) {
            document.getElementById("todays-location").innerHTML =
                "No events listed for today.";
        }
    } catch (error) {
        document.getElementById("todays-location").innerHTML =
            "Unable to load today’s schedule.";
    }
}

loadTodaysLocation();
</script>
