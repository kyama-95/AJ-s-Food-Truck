import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export function initLegacyInteractions(root: HTMLElement): () => void {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  const ctx = gsap.context(() => {
    gsap.from(".hero-line", {
      y: 40,
      opacity: 0,
      stagger: 0.15,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.from(".hero-copy", {
      y: 30,
      opacity: 0,
      delay: 0.3,
      duration: 0.8,
      ease: "power3.out",
    });

    gsap.utils.toArray<HTMLElement>(".scroll-fade-left").forEach((elem) => {
      gsap.from(elem, {
        x: -80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
        },
      });
    });

    gsap.utils.toArray<HTMLElement>(".scroll-fade-right").forEach((elem) => {
      gsap.from(elem, {
        x: 80,
        opacity: 0,
        ease: "power2.out",
        scrollTrigger: {
          trigger: elem,
          start: "top 85%",
        },
      });
    });
  }, root);

  const footerNav = root.querySelector<HTMLElement>("#footerNav");
  const footerWrapper = root.querySelector<HTMLElement>("#footerWrapper");
  const pill = root.querySelector<HTMLElement>("#pill");
  const links = footerNav
    ? Array.from(footerNav.querySelectorAll<HTMLAnchorElement>(".footer-link"))
    : [];

  const linkHandlers = new Map<HTMLAnchorElement, (event: Event) => void>();

  function movePillTo(link: HTMLAnchorElement, immediate = false) {
    if (!footerWrapper || !pill) return;

    const linkRect = link.getBoundingClientRect();
    const wrapperRect = footerWrapper.getBoundingClientRect();

    const left = linkRect.left - wrapperRect.left;
    const width = linkRect.width + 24;

    gsap.to(pill, {
      duration: immediate ? 0 : 0.35,
      x: left - 12,
      width,
      ease: "power2.out",
    });

    links.forEach((item) => {
      item.style.color = item === link ? "black" : "white";
    });
  }

  links.forEach((link) => {
    const id = link.getAttribute("data-target");
    const section = id ? root.querySelector<HTMLElement>(`#${id}`) : null;

    if (!section) return;

    const handler = (event: Event) => {
      event.preventDefault();
      const y = section.getBoundingClientRect().top + window.scrollY - 80;
      gsap.to(window, {
        duration: 0.6,
        scrollTo: y,
        ease: "power2.out",
        onUpdate: () => ScrollTrigger.refresh(),
      });
      movePillTo(link);
    };

    link.addEventListener("click", handler);
    linkHandlers.set(link, handler);
  });

  function makeTrigger(sectionId: string, link: HTMLAnchorElement) {
    const section = root.querySelector<HTMLElement>(sectionId);
    if (!section) return;

    ScrollTrigger.create({
      trigger: section,
      start: "top 70%",
      end: "bottom 70%",
      onEnter: () => movePillTo(link),
      onEnterBack: () => movePillTo(link),
    });
  }

  if (links.length === 5) {
    const [ajbs, menu, loc, about, booking] = links;
    makeTrigger("#hero", ajbs);
    makeTrigger("#menu", menu);
    makeTrigger("#locations", loc);
    makeTrigger("#about", about);
    makeTrigger("#booking", booking);
    movePillTo(ajbs, true);
  }

  const phoneInput = root.querySelector<HTMLInputElement>('input[name="phone"]');
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

  const form = root.querySelector<HTMLFormElement>('form[name="booking"]');
  const fields = form
    ? Array.from(form.querySelectorAll<HTMLInputElement>("input[required]"))
    : [];

  const errorMessages: HTMLElement[] = [];
  const inputHandlers = new Map<HTMLInputElement, (event: Event) => void>();
  let submitHandler: ((event: Event) => void) | null = null;

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
    ctx.revert();
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

    linkHandlers.forEach((handler, link) => {
      link.removeEventListener("click", handler);
    });

    inputHandlers.forEach((handler, field) => {
      field.removeEventListener("input", handler);
    });

    if (form && submitHandler) {
      form.removeEventListener("submit", submitHandler);
    }

    if (phoneInput && phoneHandler) {
      phoneInput.removeEventListener("input", phoneHandler);
    }

    errorMessages.forEach((message) => message.remove());
  };
}
