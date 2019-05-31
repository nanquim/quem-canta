 $(document).ready(function () {
    var $btnJogar = $("#btnJogar");
        $playerFilhao = $("#aFilhao");
        $playerMeme = $("#aMeme");

        setInterval(() => {
            $btnJogar.effect("shake");
        }, 1000);

        $playerFilhao.on('ended', () => {

            /* TODO o player começa a pulsar qnd a musica começa */
            $("#playerPrincipal").addClass("pulse");


            setTimeout(() => {
                $("#aMusica").get(0).play();
            }, 1500);

        });

       $('.opcao').click(() => {
        $('#aMusica').get(0).pause();
       });

       $playerMeme.on('ended', () => {

        /* TODO o player começa a pulsar qnd a musica começa */
        
        setTimeout(() => {
            $('#aMusica').get(0).play();
        }, 1500);

    });

});