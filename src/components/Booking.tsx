import { forwardRef, useMemo, useRef, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import useScrollFade from "../hooks/useScrollFade";
import SectionTitle from "./SectionTitle";

type FormValues = {
  name: string;
  event_date: string;
  location: string;
  email: string;
  phone: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const Booking = forwardRef<HTMLElement>(function Booking(_, ref) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    event_date: "",
    location: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});

  const titleRef = useRef<HTMLHeadingElement>(null);
  useScrollFade(titleRef, { direction: "left" });

  const validators = useMemo(
    () => ({
      name: (value: string) => {
        if (!value.trim()) return "This field is required.";
        if (value.trim().length < 2) return "Please enter at least 2 characters.";
        if (!/^[A-Za-z ,.'-]+$/.test(value)) return "Please enter a valid name.";
        return "";
      },
      event_date: (value: string) => {
        if (!value) return "This field is required.";
        return "";
      },
      location: (value: string) => {
        if (!value.trim()) return "This field is required.";
        if (value.trim().length < 3) return "Please enter at least 3 characters.";
        if (!/^[A-Za-z0-9 ,.'-]+$/.test(value)) {
          return "Please enter a valid location.";
        }
        return "";
      },
      email: (value: string) => {
        if (!value.trim()) return "This field is required.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return "Please enter a valid email.";
        }
        return "";
      },
      phone: (value: string) => {
        if (!value.trim()) return "This field is required.";
        if (!/^[0-9]{3}-[0-9]{3}-[0-9]{4}$/.test(value)) {
          return "Format must be 555-123-4567.";
        }
        return "";
      },
    }),
    []
  );

  const formatPhone = (raw: string) => {
    const digits = raw.replace(/\D/g, "").slice(0, 10);
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  };

  const handleChange =
    (field: keyof FormValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const nextValue =
        field === "phone" ? formatPhone(event.target.value) : event.target.value;
      setValues((prev) => ({ ...prev, [field]: nextValue }));
      if (errors[field]) {
        setErrors((prev) => ({
          ...prev,
          [field]: validators[field](nextValue),
        }));
      }
    };

  const handleBlur = (field: keyof FormValues) => () => {
    setErrors((prev) => ({
      ...prev,
      [field]: validators[field](values[field]),
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const nextErrors: FormErrors = {
      name: validators.name(values.name),
      event_date: validators.event_date(values.event_date),
      location: validators.location(values.location),
      email: validators.email(values.email),
      phone: validators.phone(values.phone),
    };

    const hasErrors = Object.values(nextErrors).some(Boolean);
    if (hasErrors) {
      event.preventDefault();
      setErrors(nextErrors);
    }
  };

  return (
    <section ref={ref} id="booking" className="w-full pt-28 pb-40">
      <div className="max-w-3xl mx-auto px-6">
        <SectionTitle ref={titleRef}>BOOKING / CONTACT</SectionTitle>
        <p className="mb-6">Fill out the contact form below and we’ll get connected.</p>

        <form
          name="booking"
          method="POST"
          data-netlify="true"
          data-netlify-honeypot="bot-field"
          action="/success/index.html"
          className="space-y-4"
          noValidate
          onSubmit={handleSubmit}
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
              className={`w-full border p-3 rounded ${errors.name ? "border-red-600" : ""}`}
              type="text"
              name="name"
              value={values.name}
              onChange={handleChange("name")}
              onBlur={handleBlur("name")}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              placeholder="John Doe"
            />
            {errors.name ? (
              <p id="name-error" className="text-red-600 text-xs mt-1">
                {errors.name}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block font-semibold mb-1">Date of Event</label>
            <input
              className={`w-full border p-3 rounded ${errors.event_date ? "border-red-600" : ""}`}
              type="date"
              name="event_date"
              value={values.event_date}
              onChange={handleChange("event_date")}
              onBlur={handleBlur("event_date")}
              aria-invalid={Boolean(errors.event_date)}
              aria-describedby={errors.event_date ? "event-date-error" : undefined}
            />
            {errors.event_date ? (
              <p id="event-date-error" className="text-red-600 text-xs mt-1">
                {errors.event_date}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block font-semibold mb-1">Event Location</label>
            <input
              className={`w-full border p-3 rounded ${errors.location ? "border-red-600" : ""}`}
              type="text"
              name="location"
              value={values.location}
              onChange={handleChange("location")}
              onBlur={handleBlur("location")}
              aria-invalid={Boolean(errors.location)}
              aria-describedby={errors.location ? "location-error" : undefined}
              placeholder="Huntsville, AL"
            />
            {errors.location ? (
              <p id="location-error" className="text-red-600 text-xs mt-1">
                {errors.location}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input
              className={`w-full border p-3 rounded ${errors.email ? "border-red-600" : ""}`}
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange("email")}
              onBlur={handleBlur("email")}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "email-error" : undefined}
              placeholder="you@example.com"
            />
            {errors.email ? (
              <p id="email-error" className="text-red-600 text-xs mt-1">
                {errors.email}
              </p>
            ) : null}
          </div>

          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <input
              className={`w-full border p-3 rounded ${errors.phone ? "border-red-600" : ""}`}
              type="tel"
              name="phone"
              inputMode="numeric"
              value={values.phone}
              onChange={handleChange("phone")}
              onBlur={handleBlur("phone")}
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              placeholder="555-123-4567"
            />
            {errors.phone ? (
              <p id="phone-error" className="text-red-600 text-xs mt-1">
                {errors.phone}
              </p>
            ) : null}
          </div>

          <button className="bg-black text-white px-4 py-3 w-full rounded font-semibold">
            Submit Booking Request
          </button>
        </form>
      </div>
    </section>
  );
});

export default Booking;
