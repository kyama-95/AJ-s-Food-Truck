import { useEffect, useRef } from "react";

export default function Booking() {
  const formRef = useRef<HTMLFormElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const phoneInput = phoneRef.current;
    const form = formRef.current;
    const fields = form
      ? Array.from(form.querySelectorAll<HTMLInputElement>("input[required]"))
      : [];

    const errorMessages: HTMLElement[] = [];
    const inputHandlers = new Map<HTMLInputElement, (event: Event) => void>();
    let submitHandler: ((event: Event) => void) | null = null;
    let phoneHandler: ((event: Event) => void) | null = null;

    if (phoneInput) {
      phoneHandler = (event: Event) => {
        const target = event.target as HTMLInputElement;
        let value = target.value.replace(/\D/g, "");

        if (value.length > 3 && value.length <= 6) {
          value = `${value.slice(0, 3)}-${value.slice(3)}`;
        } else if (value.length > 6) {
          value = `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6, 10)}`;
        }

        target.value = value;
      };

      phoneInput.addEventListener("input", phoneHandler);
    }

    fields.forEach((field) => {
      const errorMessage = document.createElement("p");
      errorMessage.className = "text-red-600 text-xs mt-1 hidden";
      field.insertAdjacentElement("afterend", errorMessage);
      errorMessages.push(errorMessage);

      const handler = () => {
        if (field.validity.valid) {
          field.classList.remove("border-red-600");
          errorMessage.classList.add("hidden");
        } else {
          field.classList.add("border-red-600");
          errorMessage.classList.remove("hidden");

          if (field.validity.valueMissing) {
            errorMessage.textContent = "This field is required.";
          } else if (field.validity.typeMismatch) {
            errorMessage.textContent = "Please enter a valid value.";
          } else if (field.validity.patternMismatch) {
            if (field.name === "phone") {
              errorMessage.textContent = "Format must be 555-123-4567.";
            }
          } else if (field.validity.tooShort) {
            errorMessage.textContent = `Please enter at least ${field.minLength} characters.`;
          } else {
            errorMessage.textContent = "Invalid input.";
          }
        }
      };

      field.addEventListener("input", handler);
      inputHandlers.set(field, handler);
    });

    if (form) {
      submitHandler = (event: Event) => {
        let hasError = false;

        fields.forEach((field) => {
          if (!field.validity.valid) {
            hasError = true;
            field.classList.add("border-red-600");
            const message = field.nextElementSibling as HTMLElement | null;
            if (message) {
              message.classList.remove("hidden");
              if (field.validity.patternMismatch && field.name === "phone") {
                message.textContent = "Format must be 555-123-4567.";
              }
            }
          }
        });

        if (hasError) {
          event.preventDefault();
          alert("Please correct the highlighted fields before submitting.");
        }
      };

      form.addEventListener("submit", submitHandler);
    }

    return () => {
      if (phoneInput && phoneHandler) {
        phoneInput.removeEventListener("input", phoneHandler);
      }

      inputHandlers.forEach((handler, field) => {
        field.removeEventListener("input", handler);
      });

      if (form && submitHandler) {
        form.removeEventListener("submit", submitHandler);
      }

      errorMessages.forEach((message) => message.remove());
    };
  }, []);

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
          ref={formRef}
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
                ref={phoneRef}
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
