(function () {
  "use strict";

  var ano = document.getElementById("ano");
  var toast = document.getElementById("toast");
  var botaoCompartilhar = document.getElementById("btn-compartilhar");
  var toastTimer;

  if (ano) {
    ano.textContent = String(new Date().getFullYear());
  }

  function mostrarToast(mensagem) {
    if (!toast) {
      return;
    }
    toast.textContent = mensagem;
    toast.hidden = false;
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toast.hidden = true;
    }, 2600);
  }

  async function copiarLink() {
    var url = window.location.href;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(url);
    } else {
      var campo = document.createElement("textarea");
      campo.value = url;
      campo.setAttribute("readonly", "");
      campo.style.position = "absolute";
      campo.style.left = "-9999px";
      document.body.appendChild(campo);
      campo.select();
      document.execCommand("copy");
      document.body.removeChild(campo);
    }
    mostrarToast("Link copiado.");
  }

  if (botaoCompartilhar) {
    botaoCompartilhar.addEventListener("click", async function () {
      var dados = {
        title: document.title,
        text: "Rede Mais Ciência nas Escolas Públicas do Distrito Federal",
        url: window.location.href
      };

      try {
        if (navigator.share) {
          await navigator.share(dados);
          return;
        }
        await copiarLink();
      } catch (erro) {
        if (erro && erro.name === "AbortError") {
          return;
        }
        try {
          await copiarLink();
        } catch (falhaCopia) {
          mostrarToast("Não foi possível copiar o link.");
        }
      }
    });
  }

  document.addEventListener("click", function (evento) {
    var alvo = evento.target.closest("[data-pending='true']");
    if (!alvo) {
      return;
    }
    evento.preventDefault();
    mostrarToast("Este link ainda será publicado.");
  });

  var avisoEdital = document.getElementById("aviso-edital");
  var vazioEdital = document.getElementById("edital-vazio");
  var editaisAbertos = document.querySelectorAll('.edital-card[data-status="aberto"], .edital-card[data-status="breve"]');

  if (editaisAbertos.length) {
    if (avisoEdital) {
      avisoEdital.hidden = false;
    }
    if (vazioEdital) {
      vazioEdital.hidden = true;
    }
  }
})();
