/* ==========================================================================
   UBICAR ® — Red Internacional de Seguridad
   Interacciones compartidas · Vanilla JS
   ========================================================================== */
document.documentElement.classList.add("js");

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  /* ---------- Mobile navigation ---------- */
  var header = document.querySelector(".site-header");
  var navToggle = document.getElementById("nav-toggle");
  var nav = document.getElementById("primary-nav");
  var main = document.querySelector("main");
  var footer = document.querySelector(".site-footer");
  var mqDesktop = window.matchMedia("(min-width: 1024px)");
  var lastFocused = null;

  function getNavFocusable() {
    if (!nav || !navToggle) return [];
    var items = [navToggle].concat(
      Array.prototype.slice.call(nav.querySelectorAll("a[href], button"))
    );
    return items.filter(function (el) {
      return el.offsetParent !== null || el === navToggle;
    });
  }

  function openNav() {
    if (!nav || !navToggle) return;
    lastFocused = document.activeElement;
    nav.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
    navToggle.setAttribute("aria-label", "Cerrar menú de navegación");
    document.body.classList.add("no-scroll");
    if (main) main.inert = true;
    if (footer) footer.inert = true;

    var firstLink = nav.querySelector("a[href]");
    if (firstLink) {
      window.requestAnimationFrame(function () {
        firstLink.focus();
      });
    }
  }

  function closeNav(restoreFocus) {
    if (!nav || !navToggle) return;
    var wasOpen = nav.classList.contains("is-open");
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menú de navegación");
    document.body.classList.remove("no-scroll");
    if (main) main.inert = false;
    if (footer) footer.inert = false;

    if (wasOpen && restoreFocus !== false) {
      var target = lastFocused && document.contains(lastFocused) ? lastFocused : navToggle;
      target.focus();
    }
  }

  function toggleNav() {
    if (nav.classList.contains("is-open")) closeNav();
    else openNav();
  }

  if (nav && navToggle) {
    navToggle.addEventListener("click", toggleNav);

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        if (!mqDesktop.matches) closeNav(false);
      });
    });

    document.addEventListener("keydown", function (e) {
      if (!nav.classList.contains("is-open")) return;

      if (e.key === "Escape") {
        e.preventDefault();
        closeNav();
        return;
      }

      if (e.key !== "Tab") return;

      var focusable = getNavFocusable();
      if (!focusable.length) return;

      var first = focusable[0];
      var last = focusable[focusable.length - 1];
      var active = document.activeElement;

      if (e.shiftKey && (active === first || active === nav)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("is-open")) return;
      if (nav.contains(e.target) || navToggle.contains(e.target)) return;
      closeNav();
    });

    var handleResize = function (ev) {
      if (ev.matches) closeNav(false);
    };

    if (mqDesktop.addEventListener) mqDesktop.addEventListener("change", handleResize);
    else if (mqDesktop.addListener) mqDesktop.addListener(handleResize);
  }

  /* ---------- Header scrolled state ---------- */
  if (header) {
    var hideUtilityAfter = 64;
    var showUtilityBefore = 16;
    var headerScrolled = false;

    var onScroll = function () {
      var y = window.scrollY;

      if (!headerScrolled && y > hideUtilityAfter) {
        headerScrolled = true;
        header.classList.add("is-scrolled");
      } else if (headerScrolled && y < showUtilityBefore) {
        headerScrolled = false;
        header.classList.remove("is-scrolled");
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Reveal on scroll ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length) {
    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var revealObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
      );
      revealEls.forEach(function (el) {
        revealObserver.observe(el);
      });
    }
  }

  /* ---------- Quote / contact forms ---------- */
  var forms = document.querySelectorAll(".quote-form");

  forms.forEach(function (form) {
    var status = form.querySelector(".form-status");

    var setError = function (name, message) {
      if (!name) return;
      var errorEl = form.querySelector('[data-error-for="' + name + '"]');
      if (errorEl) errorEl.textContent = message || "";
      var input = form.querySelector('[name="' + name + '"]');
      if (input) {
        if (message) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }
    };

    var validate = function () {
      var valid = true;

      form.querySelectorAll("[required]").forEach(function (input) {
        var value = (input.value || "").trim();
        var name = input.name;
        var message = "";

        if (input.type === "checkbox") {
          if (!input.checked) message = "Debes aceptar que UBICAR te contacte.";
        } else if (!value) {
          message = "Este campo es obligatorio.";
        } else if (input.type === "email") {
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            message = "Introduce un correo válido.";
          }
        } else if (input.type === "tel") {
          if (value.replace(/[^0-9]/g, "").length < 6) {
            message = "Introduce un teléfono válido.";
          }
        } else if (input.tagName === "SELECT" && !value) {
          message = "Selecciona una opción.";
        }

        setError(name, message);
        if (message) valid = false;
      });

      return valid;
    };

    var clearErrors = function () {
      form.querySelectorAll("[data-error-for]").forEach(function (el) {
        el.textContent = "";
      });
      form.querySelectorAll("[aria-invalid]").forEach(function (el) {
        el.removeAttribute("aria-invalid");
      });
    };

    var valueOf = function (name) {
      var field = form.querySelector('[name="' + name + '"]');
      return field ? (field.value || "").trim() : "";
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!validate()) {
        if (status) {
          status.textContent = "Revisa los campos marcados.";
          status.dataset.state = "error";
        }
        var firstInvalid = form.querySelector('[aria-invalid="true"]');
        if (firstInvalid) firstInvalid.focus();
        return;
      }

      var lines = ["Hola UBICAR, quiero solicitar una cotización."];
      var nombre = valueOf("nombre");
      var telefono = valueOf("telefono");
      var email = valueOf("email");
      var ciudad = valueOf("ciudad");
      var mensaje = valueOf("mensaje");
      var servicioField = form.querySelector('[name="servicio"]');
      var servicio = "";

      if (servicioField && servicioField.value) {
        servicio = servicioField.options[servicioField.selectedIndex].text;
      }

      if (nombre) lines.push("Nombre: " + nombre);
      if (telefono) lines.push("Teléfono: " + telefono);
      if (email) lines.push("Correo: " + email);
      if (ciudad) lines.push("Ciudad: " + ciudad);
      if (servicio) lines.push("Servicio: " + servicio);
      if (mensaje) lines.push("Mensaje: " + mensaje);

      var text = lines.join("\n");
      var waNumber = form.getAttribute("data-whatsapp") || "59177319046";
      var waUrl = "https://wa.me/" + waNumber + "?text=" + encodeURIComponent(text);
      var mailUrl =
        "mailto:info@ubicar.com.bo?subject=" +
        encodeURIComponent("Solicitud de cotización — UBICAR") +
        "&body=" +
        encodeURIComponent(text);

      var opened = window.open(waUrl, "_blank", "noopener");

      if (status) {
        status.textContent = opened
          ? "Abrimos WhatsApp con tu solicitud. Si no se abrió, "
          : "No pudimos abrir WhatsApp automáticamente. ";
        status.dataset.state = "success";

        var link = document.createElement("a");
        link.href = opened ? waUrl : mailUrl;
        link.target = "_blank";
        link.rel = "noopener";
        link.textContent = opened ? "abre WhatsApp aquí" : "envía tu solicitud por correo";
        status.appendChild(link);
        status.appendChild(document.createTextNode("."));
      }

      clearErrors();
    });

    form.querySelectorAll("input, select, textarea").forEach(function (input) {
      var handler = function () {
        if (input.getAttribute("aria-invalid") === "true") {
          setError(input.name, "");
        }
      };
      input.addEventListener("input", handler);
      input.addEventListener("change", handler);
    });
  });
})();
