const form = document.getElementById("form-upload-pdf");
const arquivoPDFInput = document.getElementById("pdf_file");
const buttonPDF = document.getElementById("select-pdf-button");
const loading = document.getElementById("loading");
const resumeForm = document.getElementById("resume-form");
const resume = document.getElementById("resume");

function update(r) {
  const resume = `
  <section id="resume-data">
    <h2>Seu currículo</h2>
    <ul>
      <li><span id="resume-name">${r?.name}</span></li>
      <li><span id="resume-role">${r?.role} - ${r?.seniority}</span></li>
      <li>Email: <span id="resume-email">${r?.contact.email}</span></li>
      <li>Telefone: <span id="resume-phone">${r?.contact?.phone}</span></li>
      <li>Linkedin: <a id="resume-linkedin" href="${r?.contact?.linkdin}">${
    r?.contact?.linkdin || ""
  }</a></li>
    </ul>

    <article>
      <p id="resume-summary">${r.resume}</p>
    </article>
  </section>

  <section id="resume-experience">
    <h2>Experiência</h2>
    ${r.experience
      .map(
        (e) => `
      <article>
        <h3>${e?.position}</h3>
        <p>${e?.company} - ${e?.period?.start} - ${e?.period?.end}</p>
        <p>${e?.description}</p>
      </article>
    `
      )
      .join("")}
  </section>

  <section id="resume-education">
    <h2>Educação</h2>
    ${r.education
      .map(
        (e) => `
      <article>
        <h3>${e?.course}</h3>
        <p>${e?.degree}</p>
        <p>${e?.institution} - ${e?.completion}</p>
      </article>
    `
      )
      .join("")}
  </section>

  <section id="resume-skills">
    <h2>Habilidades</h2>
    <h3>Técnicas</h3>
    <ul>
      ${r?.skills?.technical.map((t) => `<li>${t}</li>`).join("")}
    </ul>
    <h3>Comportamentais</h3>
    <ul>
      ${r?.skills?.interpersonal.map((b) => `<li>${b}</li>`).join("")}
    </ul>
    <h3>Linguagens</h3>
    <ul>
      ${r?.skills?.languages.map((l) => `<li>${l}</li>`).join("")}
    </ul>
  </section>

  <section id="resume-projects">
    <h2>Projetos</h2>
    ${r.projects
      .map(
        (p) => `
      <article>
        <h3>${p?.title}</h3>
        <p>${p?.description}</p>
      </article>
    `
      )
      .join("")}
  </section>
`;
  const el = document.getElementById("resume");
  el.innerHTML = resume;
  el.classList.add("active");
}

function postPDF() {
  const formData = new FormData(form);
  setLoading();

  axios({
    method: "post",
    url: "/api/resume", // URL da sua rota Flask
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(function (response) {
      console.log("Resposta do servidor:", response.data);
      update(response.data);
      showResume();
      console.log("PDF enviado com sucesso!");
    })
    .catch(function (error) {
      console.error("Erro ao enviar PDF:", error);
      showForm();
    });
}

function setLoading() {
  loading.classList.add("active");
  resumeForm.classList.remove("active");
  resume.classList.remove("active");
}

function showForm() {
  loading.classList.remove("active");
  resumeForm.classList.add("active");
  resume.classList.remove("active");
}

function showResume() {
  loading.classList.remove("active");
  resumeForm.classList.remove("active");
  resume.classList.add("active");
}

arquivoPDFInput.addEventListener("change", function () {
  postPDF();
});

form.addEventListener("submit", function (event) {
  event.preventDefault();
  postPDF();
});

buttonPDF.addEventListener("click", function () {
  arquivoPDFInput.click();
});

showForm();
