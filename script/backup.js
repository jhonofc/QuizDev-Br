getBtnTelaInicial.addEventListener('click', async () => {
    let getNickName = document.querySelector('#nick-name')
//backup carregamento barra
    

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
                document.querySelector('#form label')
                    .innerHTML += ` <span style="color: red; text-transform: uppercase;">${getNickName.value} já está em uso.</span>`
                document.querySelector('#btn-resultado').classList.toggle('hide', false)
                setTimeout(() => {
                    if (document.querySelector('#form label') != null) {
                        document.querySelector('#form label').innerHTML = 'NICKNAME:';

                    }
                    document.querySelector('.load').style.width =  "0%";
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