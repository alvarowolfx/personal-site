---
title: "Meu recap de jogos desnecessariamente complexo: Introdução e resultados"
summary: "Usando Airtable e Go para criar meu próprio recap/wrapped de jogos"
date: 2023-12-29T11:59:57-04:00
author: "Alvaro Viebrantz"
tags: []
draft: false
serie:
    - ../2023-12-29-meu-resumo-jogos-desnecessariamente-complexo-intro
    - ../2023-12-29-meu-resumo-jogos-desnecessariamente-complexo-airtable-mysql-ponte
    - ../2023-12-29-meu-resumo-jogos-desnecessariamente-complexo-desenhando-graficos-go
---

{{< serie title="Meu recap de jogos desnecessariamente complexo" >}}

Já tem um bom tempo desde que escrevi meu último artigo. Tenho que admitir que troquei meu hobby de programar nas horas vagas para cuidar do meu filho recém-nascido e jogar mais video game. Nunca me considerei um jogador hardcore, mas sempre gostei muito de jogar e tinha uma relação especial com consoles portáteis. Posso ter exagerado um pouco, mas aqui está parte da minha coleção atual de dispositivos:

{{< gallery match="images/*.jpeg" sortOrder="desc" rowHeight="200" margins="5" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true loadJQuery=true >}}
> Alguns dos dispositivos: Logitech G Cloud, 3DS, PSP Go, PS Vita, Miyoo Mini Plus, RG35XX, Retroid Pocket 3/3+ e 2S.

---

Este artigo é sobre minha jornada pessoal e meu ano nos jogos, inspirado no [Spotify Wrapped](https://www.spotify.com/us/wrapped/), mas fazendo algumas coisas na unha e uma boa dose de *overengineering*. Esta introdução pode ser lida por qualquer pessoa (não é necessário conhecimento de desenvolvimento), mas se você não quiser ler tudo e está aqui apenas pelos resultados, aqui está o meu recap (_autogerado_) de jogos:

{{< gallery match="images/*_2023.png" sortOrder="desc" rowHeight="400" margins="4" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true >}}

> :warning: Alerta de Spoiler :warning:
>
> Meu plano é transformar tudo isso em um site/aplicativo/rede social que todos possam usar, compartilhar o que estão jogando, qual console possuem e gerar um resumo anual como este. Fiquem ligados.

---

## Como eu registro minhas sessões de jogo

Como já mencionei, não sou um jogador hardcore, mas gosto de registrar o que estou jogando, principalmente para garantir que estou terminando alguns deles em vez de pular de jogo para jogo. Já experimentei vários aplicativos para isso, mas nunca me senti satisfeito com a forma como queria registrar.

Ao assistir alguns dos meus Youtubers favoritos sobre retrogaming no Brasil - [Cogumelando](https://www.youtube.com/@Cogumelando), descobri que ele registra os jogos que está jogando usando uma planilha do Google. Há beleza na simplicidade, com certeza; adorei a ideia e decidi fazer algo semelhante. [Aqui você pode conferir a planilha dele para referência](https://docs.google.com/spreadsheets/d/1IiJLYBNuEt2q_Vg3h8uon0cvgEqABh9G1Y31n6an4TY/edit#gid=0).

Como desenvolvedor, tentei equilibrar a minha capacidade de construir algo um pouco mais elaborado, mas também não queria gastar muito tempo codificando isso (como vocês verão, acabei falhando miseravelmente nisso de toda forma).

Em vez disso, decidi usar o [Airtable](https://airtable.com), que é uma ferramenta *NoCode* onde você pode modelar suas tabelas e gerenciar os dados como se fosse uma planilha. Você também pode construir algumas interfaces de usuário com ela, mas eu uso apenas a interface de planilha mesmo. A grande vantagem em comparação com uma simples planilha do Google é que você pode ter relacionamentos de dados e referenciá-los em tabelas diferentes de uma maneira muito mais agradável e fácil em comparação com uma planilha simples. Posso adicionar/remover campos facilmente, como recentemente adicionei o conceito de "Série de Jogo", que vou mostrar mais a frente.

{{< gallery match="images/airtable-gaming-journal.png" rowHeight="400" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true >}}

---
Você também pode conferir online aqui, compartilhei publicamente o meu modelo do Airtable: https://airtable.com/apph8AUBqD35R45Fm/shr5G8thXrzGUPFdu

### Meu modelo de dados no Airtable

{{< figure src="images/dbdiagram.png" >}}

Basicamente, tenho 5 tabelas no meu banco de dados do Airtable.
* **Jogos (Games)**: Um videogame em uma determinada **Plataforma**.
* **Series**: Super Mario World faz parte da série Mario de **Jogos**
    * Recentemente adicionei isso para rastrear qual série jogo mais.
* **Plataforma**: Uma plataforma de videogame, separada do **Console** físico, já que alguns **Jogos** podem ser emulados ou jogados remotamente. 
    * Essa separação é uma das principais razões pelas quais entrei nessa aventura de criar meu próprio sistema, já que a maioria dos aplicativos/sites por aí não tem essa separação.
* **Console**: Um dispositivo que pode jogar **Jogos**, em alguns casos de uma única **Plataforma** ou várias. Um Nintendo Switch por exemplo pode jogar quase que exclusivamente jogos de Switch, mas um Retroid Pocket 2S, por exemplo, pode jogar NES, SNES, PS1, N64, Dreamcast, etc por emulação.
* **Jogatinas (Playthrough)**: o núcleo do banco de dados, aqui é onde registro os **Jogos** que estou jogando, quanto tempo gastei e em qual **Console** joguei.

Você pode verificar todos os campos no link acima. Fique à vontade para copiar e/ou criar o seu com base nisso. 

### Limitações do uso do Airtable

O Airtable é uma ferramenta incrível, especialmente para gerar visualizações diferentes dos seus dados. Por exemplo, também tenho uma visão Kanban por status para ver quais jogos estou jogando/terminei/abandonei/etc:

{{< figure src="images/airtable-kanban.png" title="Visão Kanban" alt="Visão Kanban" >}}
---

Mas fazer algumas consultas complexas não é tão bom, ainda mais por eu ter experiência na área de dados por um bom tempo e sempre senti falta de consultar os dados usando SQL. Por exemplo, o Airtable permite fazer algumas agregações básicas, como as que eu faço ao agregar minhas jogatinas por Console, Plataforma e Ano, mas quero algo mais compacto, sem mostrar todos os outros campos. E fazer agregações por vários campos também é meio chato, a interface fica confusa ao fazer isso. Então, para responder a uma pergunta simples como "Quais são os meus consoles mais jogados em 2023?", a interface do Airtable atrapalha muito para mostrar isso.

{{< figure src="images/airtable-agg.png" title="Aqui está um exemplo para responder 'Console mais jogado em 2023' - o Airtable mostra dados demais em agregações."  alt="Aqui está um exemplo para responder 'Console mais jogado em 2023' - o Airtable mostra dados demais em agregações." >}}

Para criar minha própria versão de Spotify Wrapped para jogos, queria poder agregar dados de várias maneiras diferentes e criar visualizações em cima disso. Pra superar essa limitação, acabei fazendo algo desnecessariamente complexo e escrever bastante código. Mais detalhes de alto nível estão na próxima seção, mas esta é uma seção mais técnica, então é necessário ter um conhecimento de desenvolvimento, mas sinta-se à vontade para pular.

## Minha solução maluca para criar meu próprio resumo de jogos

Aqui está um diagrama das diferentes partes para gerar este resumo de jogos:

{{< figure src="images/architecture.png" title="Arquitetura do Projeto" alt="Arquitetura do Projeto" >}}
---

A primeira parte aqui é ser capaz de consultar dados do Airtable usando SQL. Para resolver isso, decidi construir um servidor compatível com MySQL que mostrará o Airtable como um banco de dados SQL, onde podemos consultar dados da mesma maneira que estamos acostumados com esse tipo de sistema, permitindo-nos fazer JOINs, filtrar dados, agregá-los, etc. Basicamente, fazer qualquer coisa que podemos descrever com SQL. Neste ponto do artigo, você pode estar se perguntando - "esse cara pode ser um gênio para decidir codar um servidor MySQL inteiro para isso como se fosse nada".

Bem, meu querido leitor, a boa notícia é que não sou tão inteligente assim. Este ano, estive lendo muito sobre as entranhas de bancos de dados, e um projeto com o qual eu sempre quis brincar é a biblioteca [dolthub/go-mysql-server](https://github.com/dolthub/go-mysql-server). Este projeto fornece uma interface de servidor compatível com MySQL, e você só precisa implementar a camada de armazenamento. E é exatamente o que fiz. Usando a API do Airtable, criei uma camada de armazenamento que mostra tabelas do Airtable como Tabelas SQL, usa a API para buscar dados e permite que os usuários escrevam consultas SQL sobre eles.

Você pode ler mais sobre [como eu construi uma interface de servidor MySQL para Airtable aqui]({{< relref "../2023-12-29-meu-resumo-jogos-desnecessariamente-complexo-airtable-mysql-ponte" >}}).

Para gerar as imagens, tive uma boa experiência no passado criando gráficos personalizados e visualizações de dados usando [D3](https://d3js.org/), que é uma biblioteca incrível para Dataviz. Mas como tenho codado muito em Go ultimamente, decidi construir isso em Go usando alguns apenas algumas primitivas básicas de desenho com a lib [fogleman/gg](github.com/fogleman/gg). Não é tão poderoso quanto o D3, mas os gráficos que quero gerar tbm não são tão complicados assim. Para buscar automaticamente a arte da capa do jogo, usei a [Serper API](https://serper.dev/) como um wrapper para a API de Imagens do Google.

Você pode ler mais sobre [como gerei gráficos em Go aqui]({{< relref "../2023-12-29-meu-resumo-jogos-desnecessariamente-complexo-desenhando-graficos-go" >}}).

Todo o código está disponível no Github: [alvarowolfx/gamer-journal-wrapped](https://github.com/alvarowolfx/gamer-journal-wrapped)

## Comparando com o ano anterior

A coisa legal de criar tudo isso é que posso gerar resumos para anos anteriores e analisá-los em comparação com este ano de forma bem fácil. Aqui está meu resumo de 2022, mesmo que naquela época eu não tinha todas as ferramentas que desenvolvi este ano:

{{< gallery match="images/*_2022.png" sortOrder="desc" rowHeight="400" margins="4" thumbnailResizeOptions="600x600 q90 Lanczos" previewType="blur" embedPreview=true >}}

## Analisando meu ano de jogos e promessas para o próximo ano

Algumas das descobertas interessantes que fiz com minha análise de dados:

* Joguei muito mais em um dispositivo portátil do que nos anos anteriores.
> Com nosso filho recém-nascido, estamos evitando mostrar telas para ele, o que se traduz em não usarmos a TV tanto, e acabei jogando mais em portáteis. Até mesmo meus jogos de PS5 foram principalmente jogados via Remote Play.
* Fiz um trabalho melhor de completar jogos do que no ano passado, o que significa que talvez todo esse sistema esteja me ajudando a acompanhar o que estou jogando.
* Apesar de dizer que amo jogar jogos antigos, ainda gasto uma boa quantidade de tempo em jogos modernos no meu PS5 e Switch.
* Algumas serie de jogos estão sempre na minha lista: Legend of Zelda, Castlevania, Megaman, Pokemon, Metal Gear Solid, Metroid e outros.
* Tenho muitas boas lembranças do Nintendo DS e PSP, embora o PS1 e SNES ainda sejam as principais plataformas retro nas minhas jogatinas. Para o próximo ano, quero passar mais tempo no PSP e jogar clássicos como Patapon, Metal Gear e a série GTA.
* Ainda preciso dar mais chances ao PS2 e Gamecube. Tive um PS2 na adolescência e tenho boas lembranças dele, mas na época não tive a chance de jogar Gamecube, então preciso explorar mais a biblioteca dele.
> Sobre PS2 e PSP, quero jogar novamente todos os jogos GTA e tentar jogar o GTA V (que nunca dei uma chance).

---

E isso é tudo para este artigo. Se você quiser se aprofundar no lado de desenvolvedor/técnico de como gerei todas essas informações, pode conferir os outros posts que fazem parte desta série. Me avise no Twitter ou em qualquer um dos meus perfis de mídia social se gostou do que viu aqui e se tiver algum feedback.