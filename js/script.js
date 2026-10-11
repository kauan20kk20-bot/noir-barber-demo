
const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".navigation");
const currentYear = document.querySelector("#current-year");

if (currentYear) {
  currentYear.textContent = new Date().getFullYear();
}

if (menuToggle && navigation) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navigation.classList.toggle("is-open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Fechar menu" : "Abrir menu"
    );
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navigation.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menu");
    });
  });
}

if (typeof SITE_CONFIG !== "undefined") {
  document.title = `${SITE_CONFIG.nome} | Barbearia`;

  document.querySelectorAll(".logo").forEach((logo) => {
    logo.innerHTML = `${SITE_CONFIG.nome.replace(/\.$/, "")}<span>.</span>`;
  });

  const address = document.querySelector(".contact-address");
  const hours = document.querySelector(".contact-detail");
  const whatsapp = document.querySelector(".whatsapp-link");

  if (address) address.textContent = SITE_CONFIG.endereco;
  if (hours) hours.textContent = SITE_CONFIG.horario;

  if (whatsapp) {
    const number = SITE_CONFIG.whatsapp.replace(/\D/g, "");
    whatsapp.href = `https://wa.me/${number}`;
  }
}

const serviceList = document.querySelector("#service-list");

if (serviceList && typeof SITE_CONFIG !== "undefined") {
  serviceList.innerHTML = SITE_CONFIG.servicos
    .map((servico, index) => {
      const numero = String(index + 1).padStart(2, "0");

      return `
        <article class="service-item">
          <span class="service-number">${numero}</span>
          <div>
            <h3>${servico.nome}</h3>
            <p>${servico.descricao}</p>
          </div>
          <span class="service-price">${servico.preco}</span>
        </article>
      `;
    })
    .join("");
}
