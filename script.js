const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav");
menuButton.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(opened));
  menuButton.setAttribute("aria-label", opened ? "Tutup menu" : "Buka menu");
});
nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open");
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Buka menu");
}));

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;
    document.querySelectorAll(".filter").forEach(item => item.classList.toggle("active", item === button));
    document.querySelectorAll(".project").forEach(project => {
      project.hidden = category !== "all" && project.dataset.category !== category;
    });
  });
});

const form = document.querySelector("#consultation-form");
form.addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(form);
  const subject = encodeURIComponent("Permintaan Konsultasi Interior — " + data.get("name"));
  const body = encodeURIComponent(
`Halo tim RUANG,

Saya ingin berkonsultasi mengenai proyek interior.

Nama: ${data.get("name")}
Email: ${data.get("email")}
Jenis proyek: ${data.get("project-type")}
Anggaran: ${data.get("budget") || "Belum ditentukan"}

Detail proyek:
${data.get("message")}

Terima kasih.`
  );
  const status = document.querySelector(".form-status");
  status.textContent = "Draft permintaan telah disiapkan. Aplikasi email akan dibuka jika tersedia.";
  window.location.href = `mailto:hello@ruangstudio.example?subject=${subject}&body=${body}`;
});
document.querySelector("#year").textContent = new Date().getFullYear();
