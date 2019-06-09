var rp = require('request-promise');

var aMusicas = [];
var tempMusica = {};

/* TODO
   ADD Escolha por gênero
*/

function falaDeezer(){
    
    return rp('https://api.deezer.com/genre')
        
        .then( (resp) =>
        { 
            var generos = JSON.parse(resp);
            var idGenero = generos.data[Math.floor(Math.random() * generos.data.length) + 1].id; 
            
            return rp('https://api.deezer.com/genre/' + idGenero + '/artists');
        })
        .then( (resp) =>
        {
            var artistas = JSON.parse(resp);
            
            return Promise.all(artistas.data.slice(0, 25).map(
                entry => rp('https://api.deezer.com/artist/' + entry.id + '/top?limit=1')
            ));        
        })
        .then( (wtf) =>
        {
            var json = wtf.map(w => JSON.parse(w));

            for(var i = 0; i < json.length; i++){
                tempMusica = {
                    idTrackDeezer: json[i].data[0].id,
                    titulo: json[i].data[0].title,
                    artista: json[i].data[0].artist.name,
                    linkAudioPreview: json[i].data[0].preview,
                    correta: false
                }
                aMusicas.push(tempMusica);
            }
            
            return aMusicas;
        })
        .catch((e) => {
            console.log(e);
        });
}

module.exports.falaDeezer = falaDeezer;
