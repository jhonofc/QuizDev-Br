//retirar logo do site 00webHost
let setIntervalVerifcar = setInterval(() => {
    let getDivs = document.querySelectorAll('div')
    let urlImg = 'https://cdn.000webhost.com/000webhost/logo/footer-powered-by-000webhost-white2.png'

    for (let x = 0; x < getDivs.length; x++) {

        if (getDivs[x].querySelector('a img')?.src == urlImg) {
            getDivs[x].remove()

            clearInterval(setIntervalVerifcar)
        }


    }



}, 100)
let intervalLoading;
let loading = 0;
let controle = 0; //inica em 0
let questoes = 0;
let quantidade_questoes = 11;
let segundos = 0;
let minutos = 0;
let pontuacao = 0; //acertos
let erros = 0; //questões erradas
let nomeJogador;//prompt("Qual seu nome?");
let inicarContagemTempo = 0;
const url = 'http://jhoncy.000webhostapp.com/php/processar.php';

/////////////************************************************************************ */
// inicio parte responsável por colocar as questões em ordem aleatorias
numeroDaQuestao = 1; //numero para cada questão anets do ) inicia a contagem no setInterval

let questoesgeradas = []; //novo  código

let arrayNum = [];
function gerarAle() {
    return Math.floor(Math.random() * 13);
}
arrayNum.push(gerarAle());
//gerar array de 10 numeros ale
(function gerarNum() {
    for (let x = 0; x < 10; x++) {
        let num = gerarAle()
        if (!arrayNum.includes(num) && arrayNum.length < 10) {
            arrayNum.push(num)
            gerarNum()
        }
    }

}())

let questoesInserir = funcao_questoes();



let getQuestao = document.querySelectorAll('.questoes');
getQuestao[0].innerHTML = questoesInserir[arrayNum[0]]
getQuestao[1].innerHTML = questoesInserir[arrayNum[1]]
getQuestao[2].innerHTML = questoesInserir[arrayNum[2]]
getQuestao[3].innerHTML = questoesInserir[arrayNum[3]]
getQuestao[4].innerHTML = questoesInserir[arrayNum[4]]
getQuestao[5].innerHTML = questoesInserir[arrayNum[5]]
getQuestao[6].innerHTML = questoesInserir[arrayNum[6]]
getQuestao[7].innerHTML = questoesInserir[arrayNum[7]]
getQuestao[8].innerHTML = questoesInserir[arrayNum[8]]
getQuestao[9].innerHTML = questoesInserir[arrayNum[9]]
getQuestao[10].innerHTML = `
<ul>
    <li class="hover">
        <span id="DTN"></span>
    </li>
</ul>
<div class="titulo-pergunta">
    Carregando... 
</div>
`;

let getClassComQuestoes = document.querySelectorAll('.titulo-pergunta')
for (let i = 0; i < getClassComQuestoes.length - 1; i++) {
    let getClassList = getClassComQuestoes[i].classList[1];
    let getNumero = getClassList;

    questoesgeradas.push(getNumero[5]);

}

for (let x = 0; x < getQuestao.length; x++) {
    getQuestao[x].addEventListener('click', (e) => {

        let getLi = document.querySelectorAll('.questoes')[x].querySelector('.titulo-pergunta').classList;

    })
}

document.querySelectorAll('.gerar-n-questao')[controle].textContent = numeroDaQuestao;
// fim parte responsavel por colocar as questões em ordem aleatorias
/////////////************************************************************************ */




//barra ninical pegar nome do jogador nick name

let getnick_name = document.querySelector('#nick-name ');

getnick_name.addEventListener('input', () => {

    if (!document.querySelector('#btn-resultado').classList.contains('hide')) {
        document.querySelector('#btn-resultado').classList.toggle('hide')
    }


});

let barraLoad = 0;
let getBtnTelaInicial = document.querySelector('#btn-comecar');

getBtnTelaInicial.addEventListener('click', async () => {

    let getNickName = document.querySelector('#nick-name')


    let formDataNick = new FormData();
    formDataNick.append('acao', 'GET');
    formDataNick.append('Jogador', getNickName.value)



    const getJson = await fetch(url, {
        method: 'POST',
        body: formDataNick,
    })
        .then(response => response.json())
        .then(dados => {



            if (dados.status == false) {
                if (getNickName.value.length > 0) {

                    let timeBtncomecar = setInterval(() => {

                        document.querySelector('.load').style.width = barraLoad + "%";

                        if (barraLoad == 100) {
                            clearInterval(timeBtncomecar);

                            document.querySelector('main').style = "display: block";
                            nomeJogador = getNickName.value //.toUpperCase();
                            document.querySelector('#tela-inicial').remove()

                        }

                        barraLoad += 25;
                    }, 200)

                }
            } else {
                //modal-content

                console.log(dados.resposta)
                document.querySelector('#form label')
                    .innerHTML += ` <span style="color: red; text-transform: uppercase;">${getNickName.value} já está em uso.</span>`
                document.querySelector('#btn-resultado').classList.toggle('hide', false)
                setTimeout(() => {
                    if (document.querySelector('#form label') != null) {
                        document.querySelector('#form label').innerHTML = 'NICKNAME:';

                    }

                }, 3000);

                let getBtnResultado = document.querySelector('#btn-resultado')
                getBtnResultado.addEventListener('click', () => {

                    document.getElementById("myModal").style.display = "block";
                    document.getElementsByClassName("close")[0].addEventListener("click", function () {
                        document.getElementById("myModal").style.display = "none";
                    });

                    document.querySelector('.modal-content h2').innerHTML = `${dados.resposta.jogador}`
                    document.querySelector('.modal-content p').
                    innerHTML = `Acertos: ${dados.resposta.acertos} Erros: ${dados.resposta.erros} Tempo: ${dados.resposta.duracao}`;
               
                })

            }



        })


})

//Gerar hora do topo
const gerardataHora = () => {
    let getIdano = document.querySelector('#data');

    setInterval(() => {
        let data = new Date();
        let criarHora = data.getHours();
        let CriarMinutos = data.getMinutes();

        if (criarHora < 10) {
            criarHora = '0' + criarHora
        }
        if (CriarMinutos < 10) {
            CriarMinutos = '0' + CriarMinutos
        }

        getIdano.textContent = `${criarHora}h:${CriarMinutos}`;;


    }, 1000)



}
gerardataHora();


//Função criar alerta 
function alertInfo() {
    let getClassAlert = document.querySelector('#msg .proximo')
    getClassAlert.classList.toggle('colocar-alert')
    setTimeout(() => {
        getClassAlert.classList.toggle('colocar-alert')
    }, 4000);
}

//função inseir no localStorage informações do jogador
function setLocal() {


    let dadosInserir = {
        Jogador: nomeJogador,
        Acertos: pontuacao > 0 ? pontuacao : 0,
        Erros: erros > 0 ? erros : 0,
        Duracao: document.querySelector('#setTempo').textContent,

    }

    //inserir no php

    const dadosInserirBackEnd = new FormData();
    dadosInserirBackEnd.append('acao', 'POST');
    dadosInserirBackEnd.append('Jogador', nomeJogador);
    dadosInserirBackEnd.append('Jogador', nomeJogador);
    dadosInserirBackEnd.append('Acertos', pontuacao > 0 ? pontuacao : 0);
    dadosInserirBackEnd.append('Erros', erros > 0 ? erros : 0);
    dadosInserirBackEnd.append('Duracao', document.querySelector('#setTempo').textContent);




    async function conecao() {

        let getJogadores = document.querySelector('.jogadores');


        const getJson = await fetch(url, {
            method: 'POST',
            body: dadosInserirBackEnd,
        })
            .then(response => response.json())
            .then(dados => {

                //zerar contagem de espera do json vindo do servidor 
                document.querySelector('#loading').style = 'display: none';
                clearInterval(intervalLoading);



                //função sort colcar numeros de acertos em ordem decerscente 
                let arrayEmOrdem = dados.sort((a, b) => {
                    return Number(b.Acertos) - Number(a.Acertos);
                })

                for (let x in arrayEmOrdem) {
                    let criarDiv = document.createElement('div');
                    criarDiv.setAttribute('class', 'lista');
                    criarDiv.setAttribute('style', 'border-radius: 8px')
                    criarDiv.innerHTML = `

                    <span class="infoJogadoresFelx">  
                    <span class="infoJogadoresPlacar">                    
                    <div class="nomeJogador">${arrayEmOrdem[x].Jogador}</div>
                    Acertou: ${arrayEmOrdem[x].Acertos}
                    Errou: ${arrayEmOrdem[x].Erros}
                    Tempo: ${arrayEmOrdem[x].Duracao}
                    </span>
                    <span class="compartilharPontuacao">
                    <span class="svg-whats"></span>
                    <span class="whats-compartinhar-pontuacao"></span>
                    </span></span>
                    `

                    getJogadores.appendChild(criarDiv)
                }

                //ativar bg ultomo jogador
                let getListaJogadores = document.querySelectorAll('.nomeJogador')
                for (let i = 0; i < getListaJogadores.length; i++) {

                    if (document.querySelectorAll('.nomeJogador')[i].textContent == nomeJogador) {


                        function openWhats() {

                            let encodeURi = encodeURI(`*Quiz-Dev* \nAcertei: ${dadosInserir.Acertos}  \nErrei: ${dadosInserir.Erros} \nTempo: ${dadosInserir.Duracao} \n 
                                `)
                            return `whatsapp://send?text=${encodeURi}`;

                        }



                        letClasssetbg = document.querySelectorAll('.nomeJogador')[i].parentNode.parentNode.parentNode;
                        letClasssetbg.style = ' background-color: #c2daff';
                        document.querySelectorAll('.svg-whats')[i].innerHTML = `<a href="${openWhats()}"  target="_BLANK" >${svgWhats()}</a> `;
                        document.querySelectorAll('.whats-compartinhar-pontuacao')[i].innerHTML = '';


                    }

                }

                function iconeSVG(cor, pontuacao) {
                    return `<div class="ultimoganhador" data-tooltip="${pontuacao}">
                             <svg viewBox="0 0 501.333 501.333">
                            <path fill="#91573b" d="M136.533 359.467H364.8v141.867H136.533z" />
                            <ellipse cx="250.667" cy="430.933" fill="#e0e0df" rx="81.067" ry="48" />
                            <path fill="#e14a4a" d="M174.933 314.667H326.4v44.8H174.933z" />
                            <path fill="#f16d6e" d="M228.267 195.2h44.8v119.467h-44.8z" />
                            <path fill="${cor}"
                                d="M250.667 0L284.8 105.6h110.933l-89.6 65.067L340.267 275.2l-89.6-65.067-89.6 65.067L195.2 170.667 105.6 105.6h110.933z" />
                        </svg>
                    </div>`
                }
                let getLista = document.querySelectorAll('.lista')
                if (getLista[0] != undefined) {
                    getLista[0].innerHTML += iconeSVG('#fec656', 'Última maior pontuação');
                }
                if (getLista[1] != undefined) {
                    getLista[1].innerHTML += iconeSVG('#cccccc', 'Segunda maior pontuação');
                }
                if (getLista[2] != undefined) {
                    getLista[2].innerHTML += iconeSVG('#be6c00', 'Terceira maior pontuação');
                }


            })


    }
    conecao()



}

//gerar tempo do jogo e finalizar o quis e chmar a função setlocal
function gerarTempo() {

    let tempo = setInterval(() => {
        segundos += 1;
        let getTempo = document.querySelector('#setTempo');

        if (segundos == 60) {
            minutos += 1;
            segundos = 0;
        }

        if (minutos == 0) {
            document.querySelector('#duracao').style = 'display: block;';
            getTempo.innerHTML = `${segundos}s`;
        } else {
            getTempo.innerHTML = `${minutos}m ${segundos}s`;
        }

        if (controle > 9) {
            //retirar configuação ultma tela 

            document.querySelector('#btn-box').style = 'display: none';
            document.querySelector('.fim').style = 'display: none';
            document.querySelector('.pontuacao').style = 'padding: 6px 0px 6px 0px;';
            document.querySelector('#loading').style = 'display: block';
            document.querySelector('#pontuacao').style = 'margin-top: 0';

            if (window.screen.width < 500) {
                carregarStyle();
            }
            //contagem loading recebendo json do servidor 
            intervalLoading = setInterval(() => {

                // document.querySelector('#progresso').textContent = loading;

                loading += 1;
            }, 100);
            setLocal();
            clearInterval(tempo);
        }

    }, 1000)


}
//iniciar contador de duração )(tempo)
let temporizador = setInterval(() => {
    if (inicarContagemTempo > 0) {
        gerarTempo()
        clearInterval(temporizador)
    }


}, 500)

//trocar letras recebidas do target click, por number da funçãp verificarCorreta(e)
function trocar_Letrapor_Numero(texto) {
    let opcoes = texto.split(')')
    switch (opcoes[0]) {
        case "A":
            return 0
            break;
        case "B":
            return 1
            break;
        case "C":
            return 2
            break;
        case "D":
            return 3
            break;
        case "E":
            return 4
            break;

        default:
            break;
    }

}

//questões corretas A=0, B=1, C=2 D=3 E=4
function questoes_certas() {
    // ------------ A=0, B=1, C=2 D=3 E=4  
    //--------------1  2  3  4  5  6  7  8  9  10      
    const certas = questoesgeradas//[0, 3, 0, 2, 1, 0, 2, 3, 3, 2];
    return certas;
}

function verificarSenãotemBG() {
    let getClassHover = document.querySelectorAll('li');
    let controle = 0;
    for (let x = 0; x < getClassHover.length; x++) {
        let bg = document.querySelectorAll('li')[x].style.backgroundColor
        if (bg !== '') {
            controle += 1;
        }
    }
    return controle
}

//receber letra da questão por target click
function verificarCorreta(e) {

    let op_escolhida = trocar_Letrapor_Numero(e.target.innerText)
    let getClassHover = document.querySelectorAll('li');

    //console.log(op_escolhida)

    if (verificarSenãotemBG() == 0 && e.target.className == 'hover') {

        document.querySelector('#inicio').classList.toggle('hide', true)
        if (op_escolhida === Number(questoes_certas()[controle])) {

            e.target.style = 'background-color: #06d776;';

            pontuacao += 1;

            document.querySelector('#acertos').innerHTML = `Acertou:<span style="font-weight: 600;"> ${pontuacao}</span>`;

            for (let x = 0; x < getClassHover.length; x++) {
                getClassHover[x].classList.toggle('hover', false);
                getClassHover[x].classList.toggle('cursor', true);

            }

        } else {

            e.target.style = 'background-color: red; border-radius: 5px;';

            erros += 1;

            document.querySelector('#erros')
                .innerHTML = `Errou:<span style="font-weight: 600;"> ${erros}</span>`;

            let getLI = document.querySelectorAll('.questoes');
            getLI[controle].
                querySelectorAll('.questoes li')[questoes_certas()[controle]].
                style = 'background-color: #06d776; border-radius: 5px;';



            for (let x = 0; x < getClassHover.length; x++) {
                getClassHover[x].classList.toggle('hover', false);
                getClassHover[x].classList.toggle('cursor', true);

            }


        }
    }
}

//desativar click e remover o hover depois de clicar na questão <li>
function ativar_questaoes() {
    //let op_escolhida = trocar_Letrapor_Numero(e.target.innerText)
    let getClassHover = document.querySelectorAll('li');

    for (let x = 0; x < getClassHover.length; x++) {
        getClassHover[x].classList.toggle('hover');
        getClassHover[x].classList.toggle('cursor');

    }
}

//passar para próxima questão 
function proximo() {

    let getQuestões = document.querySelectorAll('.questoes ul li');
    for (let x = 0; x < getQuestões.length; x++) {
        if (getQuestões[x].style.backgroundColor != '') {

            if (controle < quantidade_questoes) {

                document.querySelector('.reiniciar').classList.toggle('hide', false)

                let li = document.querySelectorAll('li')
                for (let x = 0; x < li.length; x++) {
                    document.querySelectorAll('li')[x].style.backgroundColor = ''
                }
                ativar_questaoes()
                let getQuestoes = document.querySelectorAll('.questoes')
                getQuestoes[controle].classList.toggle('hide')
                getQuestoes[controle + 1].classList.toggle('hide')



                controle += 1;
                numeroDaQuestao += 1;
                controle < 10 ? document.querySelectorAll('.gerar-n-questao')[controle].textContent = numeroDaQuestao : '';

            }

        } else {
            alertInfo()
        }
    }




}

setInterval(() => {
    let getQuestoesList = document.querySelectorAll('.questoes')[controle]
    getQuestoesList.addEventListener('click', verificarCorreta)

    //numeroDaQuestao += 1;
}, 500);

//botão próximo
let getBtnProximo = document.querySelector('#btn-proximo')
getBtnProximo.addEventListener('click', proximo)


//botão reiniciar
let getBtnREset = document.querySelector('.reiniciar')
getBtnREset.addEventListener('click', () => {
    let getClassAlert = document.querySelector("#msg .reiniciar-alert")
    getClassAlert.classList.toggle('colocar-alert', true)

})

//botão Pop-up alerta sim quando clica em reiniciar
let getbtn_sim = document.querySelector("#sim");
getbtn_sim.addEventListener('click', () => {
    location.reload()

})
//botão Pop-up alerta não quando clica em reiniciar
let getbtn_nao = document.querySelector("#nao");
getbtn_nao.addEventListener('click', () => {
    let getClassAlert = document.querySelector("#msg .reiniciar-alert")
    getClassAlert.classList.toggle('colocar-alert')
})

//pegar click das questões para iniciar tempo e colocar texto pontuacao
let getQuestoesClick = document.querySelectorAll('.questoes li')
for (let x = 0; x < getQuestoesClick.length; x++) {
    getQuestoesClick[x].addEventListener('click', () => {

        if (inicarContagemTempo == 0) {
            document.querySelector('.titulo-pontuacao').textContent = nomeJogador;
        }
        inicarContagemTempo += 1;
    })
}


//let pegar input nick name para retitar 
let inputNinck = document.querySelector('#nick-name');
inputNinck.addEventListener('input', (e) => {
    e.preventDefault();
})













