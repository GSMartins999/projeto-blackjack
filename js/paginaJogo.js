var comecar = false;
var jogador = [];
var computador = [];

var botaoYes = document.querySelector("#botaoYes");
var botaoNo = document.querySelector("#botaoNo");
var titulo = document.querySelector("#titulo");

botaoYes.addEventListener("click", function() {
   comecar = true;
   iniciarJogo();
});

botaoNo.addEventListener("click", function(){
    comecar = false;
    alert("Que pena... Fica para a próxima!!!")
    encerrarJogo();
});

function iniciarJogo (){
    if(comecar === true){
        ocultarElementosInicio();
        jogador = [];
        computador = [];
        let cartasOk = false;
        while (!cartasOk){
            jogador.push(comprarCarta());
            jogador.push(comprarCarta());
            computador.push(comprarCarta());
            computador.push(comprarCarta());

            if ((jogador[0].valor === 11 && jogador[1].valor === 11) ||
                (computador[0].valor === 11 && computador[1].valor === 11)) { 
                jogador = [];
                computador = [];
            } else {
                cartasOk = true;
            }
        }
        
        exibirCartas(jogador, computador);
        exibirBotoes();
        

    } else {
        console.log("error");
    }
}

function encerrarJogo(){
    if(!comecar){
        const containerBotoes = document.getElementById("containerBotoes");
        containerBotoes.innerHTML = "";

        const botaoSim = document.createElement("button");
        botaoSim.textContent = "Sim";
        botaoSim.addEventListener("click", reiniciarJogo);

        const botaoNao = document.createElement("button");
        botaoNao.textContent = "Não";
        botaoNao.addEventListener("click", function(){
            alert("Que pena... Até a próxima!");
        });

        containerBotoes.appendChild(botaoSim);
        containerBotoes.appendChild(botaoNao);
        botaoYes.textContent = "Sim";
        botaoYes.style.display = "inline-block";
        botaoNo.style.display = "inline-block";
        titulo.textContent = "Você gostaria de jogar novamente?";
    }
}

function ocultarElementosInicio() {
    botaoYes.style.display = "none";
    botaoNo.style.display = "none";
    titulo.textContent = "";
}

function exibirBotoes() {
    // Criar botões "Comprar Mais" e "Parar"
    const containerBotoes = document.getElementById("containerBotoes");
    const botaoComprar = document.createElement("button");
    botaoComprar.textContent = "Comprar Mais";
    botaoComprar.addEventListener("click", comprarMais);

    const botaoParar = document.createElement("button");
    botaoParar.textContent = "Parar";
    botaoParar.addEventListener("click", parar);

    containerBotoes.appendChild(botaoComprar);
    containerBotoes.appendChild(botaoParar);
}

function comprarMais() {
    if (calcularPontos(jogador) >= 21 || calcularPontos(computador) >= 21) {
        exibirResultado();
        return;
    }

    if (calcularPontos(jogador) === 21 || calcularPontos(computador) === 21) {
        exibirResultado();
        return;
    }

    jogador.push(comprarCarta());
    exibirCartas(jogador, computador);

    if (calcularPontos(jogador) >= 21) {
        exibirResultado();
        return;
    }

    comprarCartaComputador();
}


function comprarCartaComputador() {
    if (calcularPontos(computador) < 21) {
        computador.push(comprarCarta());
        exibirCartas(jogador, computador);
        if (calcularPontos(computador) === 21) {
            mostrarCarta(computador[computador.length - 1]);
            alert("O computador atingiu 21 pontos. Você perdeu o jogo!");
            encerrarJogo();
            return;
        }
    }
}

function parar() {
    // Ocultar botões "Comprar Mais" e "Parar"
    const containerBotoes = document.getElementById("containerBotoes");
    containerBotoes.innerHTML = "";

    // Calcular pontos do jogador e do computador
    let pontosJogador = calcularPontos(jogador);
    let pontosComputador = calcularPontos(computador);

    // Exibir resultado do jogo
    exibirResultado();
    
    // Exibir elementos iniciais
    exibirElementosInicio();
}

function calcularPontos(cartas) {
    let pontos = 0;
    for (let carta of cartas) {
        pontos += carta.valor;
    }
    return pontos;
}

function mostrarCarta(carta) {
    alert(`Você ultrapassou 21 pontos ${carta.texto}.`);
}

function exibirResultado() {
    // Calcular pontos do jogador e do computador
    let pontosJogador = calcularPontos(jogador);
    let pontosComputador = calcularPontos(computador);

    let resultado = "";
    if (pontosJogador > 21 && pontosComputador > 21) {
        resultado = "Ambos ultrapassaram 21 pontos. O jogo acabou em empate!";
    } else if (pontosJogador > 21) {
        resultado = "Você ultrapassou 21 pontos! O computador é o vencedor.";
    } else if (pontosComputador > 21) {
        resultado = "O computador ultrapassou 21 pontos! Você é o vencedor.";
    } else if (pontosJogador === pontosComputador) {
        resultado = "Empate!";
    } else {
        const pontuacaoLimiteJogador = 21 - pontosJogador;
        const pontuacaoLimiteComputador = 21 - pontosComputador;
        if (pontuacaoLimiteJogador < pontuacaoLimiteComputador) {
            resultado = "Você é o vencedor.";
        } else {
            resultado = "O computador é o vencedor.";
        }
    }

    const areaResultado = document.getElementById("resultado");
    areaResultado.textContent = resultado;
}

function exibirCartas(jogador, computador) {
    const areaJogador = document.getElementById("jogador");
    const areaComputador = document.getElementById("computador");
    areaJogador.innerHTML = "";
    areaComputador.innerHTML = "";

    const nomeJogador = document.createElement("h2");
    nomeJogador.textContent = "Jogador:";
    areaJogador.appendChild(nomeJogador);
    for (let carta of jogador) {
        const imgJogador = document.createElement("img");
        imgJogador.src = `./../imgCartas/${carta.texto}.png`;
        areaJogador.appendChild(imgJogador);
    }

    const nomeComputador = document.createElement("h2");
    nomeComputador.textContent = "Computador:";
    areaComputador.appendChild(nomeComputador);
    for (let carta of computador) {
        const imgComputador = document.createElement("img");
        imgComputador.src = `./../imgCartas/${carta.texto}.png`;
        areaComputador.appendChild(imgComputador);
    }
}

function exibirElementosInicio() {
    titulo.textContent = "Gostaria de jogar novamente?";
    botaoYes.style.display = "inline-block";
    botaoNo.style.display = "inline-block";
    // Limpar último resultado
    const areaResultado = document.getElementById("resultado");
    areaResultado.textContent = "";
    exibirCartas("")
}

