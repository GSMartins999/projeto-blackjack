url = "./paginaJogo.html"

function openInNewWindow (){
   window.location = url;
}

var botao = document.querySelector("#botaoIniciar")

botao.addEventListener("click", function() {
   openInNewWindow(url)
   console.log("clicou");
})