export default function Booking() {
  return (
    <section id="booking" className="w-full pt-28 pb-40">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-4xl font-black mb-6 scroll-fade-left">
          BOOKING / CONTACT
        </h2>
        <p className="mb-6 scroll-fade-right">
          Fill out the contact form below and we’ll get connected.
        </p>

        <form
          name="booking"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/success/"
          className="space-y-4"
        >
          <input type="hidden" name="form-name" value="booking" />
          <p className="hidden">
            <label>
              Don’t fill this out: <input name="bot-field" />
            </label>
          </p>

          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input
              className="w-full border p-3 rounded"
              type="text"
              name="name"
              required
              pattern="[A-Za-z ,.'-]+"
              minLength={2}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date of Event</label>
            <input
              className="w-full border p-3 rounded"
              type="date"
              name="event_date"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Event Location</label>
            <input
              className="w-full border p-3 rounded"
              type="text"
              name="location"
              required
              pattern="[A-Za-z0-9 ,.'-]+"
              minLength={3}
              placeholder="Huntsville, AL"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              className="w-full border p-3 rounded"
              type="email"
              name="email"
              required
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              className="w-full border p-3 rounded"
              type="tel"
              name="phone"
              required
              pattern="^\\d{3}-\\d{3}-\\d{4}$"
              placeholder="555-123-4567"
            />
          </div>

          <button className="bg-black text-white px-4 py-3 w-full rounded font-semibold">
            Submit Booking Request
          </button>
        </form>
      </div>
    </section>
  );
}
