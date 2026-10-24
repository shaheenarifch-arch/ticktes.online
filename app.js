document.addEventListener("DOMContentLoaded", () => {

  // Search form
  document.querySelectorAll("[data-search]").forEach(form => {
    form.addEventListener("submit", event => {
      event.preventDefault();

      const input = form.querySelector('input[type="search"]');

      if (!input) return;

      const query = input.value.trim().toLowerCase();

      const target = document.getElementById("discover");

      if (target) {
        target.scrollIntoView({
          behavior: "smooth"
        });
      }

      document.querySelectorAll("[data-filter]").forEach(card => {

        if (!query) {
          card.hidden = false;
          return;
        }

        card.hidden =
          !card.textContent
            .toLowerCase()
            .includes(query);

      });
    });
  });

  // Newsletter form
  document
    .querySelectorAll("[data-newsletter]")
    .forEach(form => {

      form.addEventListener("submit", event => {
        event.preventDefault();

        const email =
          form.querySelector('input[type="email"]');

        if (!email || !email.value.trim()) {
          alert("Please enter a valid email address.");
          return;
        }

        fetch(form.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        })
          .then(response => response.json())
          .then(data => {
            if (!data || !data.success) throw new Error("not saved");
            alert("Thank you for subscribing.");
            form.reset();
          })
          .catch(() => {
            alert("Sorry, that did not go through. Please try again.");
          });
      });

    });

});
