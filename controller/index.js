let deezer = require('../services');
let shuffle = require('lodash.shuffle');
//var Musica = require('../models/classes');

const maxRodadas = 5;
var contaRodadas = 0;

var pontos = 0;
var promiseMusicas = []; 
var srcIni = montaPath('vaiFilhao');
var idCorretaDaRodada;

function play(req, res){

    /* TODO ver uma forma melhor de fazer isso: */
    contaRodadas = 0;
    pontos = 0;
    promiseMusicas = []; 

    deezer.falaDeezer()
        .then((resp) => {
            promiseMusicas = resp;
            rodada(req, res);    
    }).catch((e) => {console.log(e);});    

}

function trataArray(req, res) {
    idCorreta = '';
    /* TODO as vezes a musica repete, ver se o erro tá na chamada da api
        ou comparar as ids no array */

    var opcoes = promiseMusicas.splice(0, 5);

    certa = opcoes.shift();
    certa.correta = true;
    idCorretaDaRodada = certa.idTrackDeezer;

    opcoes.push(certa);
    var shuffled = shuffle(opcoes);

    var f = [
        certa,    
        shuffled
    ];

    return f;
}

function rodada(req, res, acertou, pontos){
    contaRodadas++;
    
    var srcMeme = '';

    var viewMusicas = trataArray(); 

    console.log('\nNa rodada()\n');
    console.log('\nidCorretaDaRodada: ' + idCorretaDaRodada +
         '\nAcertou? ' + acertou + '\nPontos: ' + pontos);
    
    /* TODO trocar por while */
    
    if(contaRodadas == maxRodadas){
        /* TODO ver uma forma melhor de fazer isso: */

        if(acertou == true){
            srcMeme = montaPath('acertou');
            res.render('index.mst', {"fim": true, "pontos": pontos, "srcMeme": srcMeme}); 
        } else if (acertou == false){
            srcMeme = montaPath('errou')
            res.render('index.mst', {"fim": true, "pontos": pontos, "srcMeme": srcMeme}); 
        }
    } else {

        if(acertou == true){

            srcMeme = montaPath('acertou')
            res.render('index.mst', {"comecou": true, "musicas": viewMusicas, "srcMeme": srcMeme}); 
            console.log('chamou1');
        } else if (acertou == false){
            console.log('chamou2');
            srcMeme = montaPath('errou')
            res.render('index.mst', {"comecou": true, "musicas": viewMusicas, "srcMeme": srcMeme}); 
        } else { // 1a rodada
            console.log('chamou3');
            res.render('index.mst', {"srcMusica": srcIni, "comecou": true, "musicas": viewMusicas}); 
        }

    }       
        
};

function correcao(idResp, req, res) {

    var acertou;

    idResp == idCorretaDaRodada ? (acertou = true, pontos++) : acertou = false;

    console.log('\nNa correcao()\n');
    console.log('idResp: ' + idResp + '\nidCorretaDaRodada: ' + idCorretaDaRodada +
         '\nAcertou? ' + acertou + '\nPontos: ' + pontos);

    rodada(req, res, acertou, pontos);
    
}

function montaPath(qAudio) {
    return './audios/' + qAudio + '.mp3';
}

module.exports = {
    play,
    correcao
}