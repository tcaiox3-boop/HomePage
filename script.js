
// Seleciona o botão de voltar ao topo
const botaoTopo = document.getElementById("botaoTopo");

// Mostrar/ocultar o botão conforme o scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    botaoTopo.style.display = "block";
  } else {
    botaoTopo.style.display = "none";
  }
});

// Ação ao clicar no botão
if (botaoTopo) {
  botaoTopo.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// Cria elemento de mensagem de sucesso no rodapé se não existir
let msgSucesso = document.getElementById("mensagem-sucesso");
const rodape = document.querySelector(".rodape-site");
if (!msgSucesso && rodape) {
  msgSucesso = document.createElement("p");
  msgSucesso.id = "mensagem-sucesso";
  rodape.appendChild(msgSucesso);
}

// Regex para validar email
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validação dos formulários de contato
document.querySelectorAll(".formulario-contato").forEach(form => {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nome = form.querySelector("[name='nome']");
    const email = form.querySelector("[name='email']");
    const mensagem = form.querySelector("[name='mensagem']");

    // Busca elemento de mensagem dentro do formulário ou cria se faltar
    let aviso = form.querySelector(".mensagem-formulario");
    if (!aviso) {
      aviso = document.createElement("p");
      aviso.className = "mensagem-formulario";
      form.appendChild(aviso);
    }

    let valido = true;
    aviso.textContent = "";

    // Valida onome
    if (!nome || nome.value.trim() === "") {
      if (nome) nome.style.borderColor = "red";
      valido = false;
    } else {
      if (nome) nome.style.borderColor = "green";
    }

    // Valida o email
    if (!email || !emailRegex.test(email.value)) {
      if (email) email.style.borderColor = "red";
      valido = false;
    } else {
      if (email) email.style.borderColor = "green";
    }

    // Valida a mensagem
    if (!mensagem || mensagem.value.trim().length < 10) {
      if (mensagem) mensagem.style.borderColor = "red";
      valido = false;
    } else {
      if (mensagem) mensagem.style.borderColor = "green";
    }

    // Finalização
    if (valido) {
      const alvo = document.getElementById("mensagem-sucesso") || msgSucesso;
      if (alvo) {
        alvo.style.color = "green";
        alvo.textContent = `Obrigado pelo contato, ${nome ? nome.value : ""}!`;
      } else {
        alert(`Obrigado pelo contato, ${nome ? nome.value : ""}!`);
      }

      form.reset();
      if (nome) nome.style.borderColor = "";
      if (email) email.style.borderColor = "";
      if (mensagem) mensagem.style.borderColor = "";
    } else {
      aviso.style.color = "red";
      aviso.textContent = "Por favor, corrija os erros acima.";
    }
  });
});

