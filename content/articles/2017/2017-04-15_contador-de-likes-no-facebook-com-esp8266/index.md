---
title: "Contador de Likes no Facebook com ESP8266"
author: "Alvaro Viebrantz"
date: 2017-04-15T20:06:37.597Z
lastmod: 2021-02-26T10:50:53-04:00

description: ""

subtitle: "Projeto bem interessante para iniciantes e que pode ser alterado para sua página."

image: "./images/1.jpeg"
images:
  - "./images/1.jpeg"
  - "./images/2.jpeg"
  - "./images/3.png"
  - "./images/4.png"
  - "./images/5.png"
  - "./images/6.png"
  - "./images/7.jpeg"
  - "./images/8.png"
  - "./images/9.png"
  - "./images/10.png"
  - "./images/11.png"

associated:
  - "https://medium.com/@alvaroviebrantz/contador-de-likes-no-facebook-com-esp8266-9cf930b1595"
---

{{< figure src="./images/1.jpeg" >}}

#### Projeto bem interessante para iniciantes e que pode ser alterado para sua página.

Eu me inspirei em um projeto que vi no Instructables que replicava o troféu que o Youtube dá ao se atingir um determinado número de seguidores no site deles. O projeto consulta a API do Youtube diretamente e mostra atualiza um display de 7 segmentos com o número atualizado de seguidores. O projeto pode ser visto a seguir.

> [YouTube Subscriber Counter With ESP8266](http://www.instructables.com/id/YouTube-Subscriber-Counter-With-ESP8266)

Com isso em mente pensei — Por que não fazer um para páginas do Facebook, já que hoje o Facebook nem tem esse programa de premiações, essa seria uma forma carinhosa de ver quantos seguidores temos em uma página do Facebook. E fizemos, como pode ser visto na imagem do post !!!

{{< youtube 23k-Vl4lsTI >}}

> Video deste projeto

O projeto consiste de um módulo WiFi baseado no ESP8266 e um display de 7 segmentos para mostrar a contagem em tempo real dos seguidores. Para buscar a contagem, utilizamos a Graph API do Facebook para consultar os dados via HTTPS e usando o formato JSON.

{{< figure src="./images/2.jpeg" caption="[https://developers.facebook.com/docs/graph-api?locale=pt_BR](https://developers.facebook.com/docs/graph-api?locale=pt_BR)" >}}

Sinceramente a parte mais complicada é pegar o Token do Facebook com tempo infinito de expiração (já que o token vai no dispositivo embarcado), mas pode deixar que vou detalhar isso aqui.

Este projeto é bem interessante para iniciantes, já que é um projeto que tem poucas conexões e soldas e com poucas mudanças ele pode ser alterado para sua necessidade. Vamos começar.

### O que você vai precisar

Para completar este tutorial, você basicamente vai precisar de duas coisas principais — Um módulo ESP8266 e um token de acesso a API do Facebook. Vou detalhar cada parte.

#### Facebook API

Para fazer nossas interações com a API do Facebook vamos usar o [Graph API Explorer](https://developers.facebook.com/tools/explorer). Com ele você pode de forma facilitada gerar um Token de Acesso e testar as chamadas pra API.

{{< figure src="./images/3.png" caption="Facebook Graph API Explorer  —  [https://developers.facebook.com/tools/explorer](https://developers.facebook.com/tools/explorer)" >}}

A API que vamos utilizar é a de consulta de informações de uma página, que funciona simplesmente no _endpoint_ **graph.facebook.com/{id-da-pagina}**. Um exemplo de chamada para ver os dados da nossa página no Facebook seria a seguinte:

```
https://graph.facebook.com/iotbootcamp?access_token=XXXXX&fields=fan_count
```

Os parâmetros utilizados foram os seguintes:

- **/iotbootcamp** : iotbootcamp é o id da página no Facebook.
- **access_token**: Token de acesso a API
- **fields**: Aqui você pode escolher apenas os campos que você realmente deseja que seja retornado na API. Isso ajuda a reduzir o tamanho do retorno, já que estamos em um ambiente de pouca memória.

O problema é que o token gerado no Explorer expira em duas horas e precisamos de uma que dure para sempre, já que vai ficar fixa no código do dispositivo.

Para gerar esse token é necessário ter um aplicativo cadastrado na área de desenvolvedores, obter um Identificador e Segredo de Aplicativo (_App ID e App Secret_) e depois vamos algumas chamadas HTTP para gerar o novo token utilizando essas informações.

{< figure src="./images/4.png" caption="
" >}}Para criar a página você deve fazer o seguinte:

1.  Acesse [https://developers.facebook.com/apps](https://developers.facebook.com/apps).
2.  Clique em "+ Adicionar um novo aplicativo"
3.  Dê um nome qualquer ao seu aplicativo e clique em "Crie um número de identificação do aplicativo" .
4.  Na próxima tela você já vai ter acesso aos valores de **ID do Aplicativo(App ID)** e **Chave Secreta do Aplicativo** (**App Secret)**. Você também pode encontrar no menu de configurações do projeto.

Com os dados do passo anterior, podemos gerar o token novo, fazendo as chamadas HTTP diretamente a API do Facebook:

{{< figure src="./images/5.png" caption="Passos para obter o token de acesso sem expiração." >}}

1.  Acesse o Graph Explorer como mostrado anteriormente e escolha no campo superior direto o aplicativo que você criou.
2.  Clique em "**Obter Token**" > "**Obter Token de Acesso do Usuário**". Vai abrir um Pop-up de permissões, escolha a permissão "**manage_pages**"e clique em "**Obter token de Acesso**".
3.  Copie o Token de Acesso que for gerado.
4.  Faça a chama na url pelo navegador: `https://graph.facebook.com/oauth/access_token?client_id={SEU App ID}&client_secret={Seu App Secret}&grant_type=fb_exchange_token&fb_exchange_token={Seu Token de Acesso}`.
5.  A chamada anterior vai devolver um Token de Acesso com duração maior, mas apenas de 2 meses. Você pode verificar a duração do token com [essa ferramenta de debug](https://developers.facebook.com/tools/debug/accesstoken).
6.  Faça a chama na url pelo Postman: `https://graph.facebook.com/v2.8/me?access_token={Seu Token de Acesso}`.
7.  Com a chamada anterior você vai obter o ID do seu usuário no Facebook.
8.  Agora faça a última requisição necessária. `https://graph.facebook.com/v2.8/{Seu ID de Usuário}/accounts?access_token={Seu Token de Acesso}`.
9.  A chamada anterior vai retorna um JSON com um campo **data**, que é uma lista de páginas que você tem permissão. Procure a página que você quer ter acesso e copie o Token de Acesso. Com isso você conseguir gerar um token que nunca expira, você pode até testar [na ferramenta de debug](https://developers.facebook.com/tools/debug/accesstoken).

Se você seguiu corretamente os passos e com muita paciência, você vai ter um Token de Acesso que nunca expira e que pode ser colocado no nosso projeto sem se preocupar em atualizar o token. Pode comemorar.

### Hardware e componentes

O material necessário para este projeto não é muito extenso como já foi dito, a maioria é bem tranquila de encontrar e montar, então não vai ter muita complicação aqui.

No lado da eletrônica basicamente você vai precisar de um ESP8266 para conectar a internet e de um display de 7 segmentos com 4 ou 8 dígitos, com a controladora MAX7219 (para mostrar a contagem).

- Moldura Funda de 15x20 ([Parecida com essa](http://produto.mercadolivre.com.br/MLB-758897644-moldura-15-x-25-cm-perfil-28-ou-2-cm-com-fundo-e-vidro-_JM), mas eu mandei fazer sob medida na minha cidade, saiu por R$30,00)
- Um ESP8266 ([Eu usei um Wemos D1 Mini](http://produto.mercadolivre.com.br/MLB-839084277-wemos-d1-mini-esp8266-4mbytes-nodemcu-arduino-compativel-_JM))
- [Display de 8 digitos e 7 segmentos com MAX7219](http://produto.mercadolivre.com.br/MLB-730339674-display-8-digitos-max7219-led-7-segmentos-arduino-pic-_JM)
- Cabo Micro-USB
- Fonte de 5V (Qualquer carregador de celular serve)
- Fios

E vai precisar de algumas ferramentas:

- Ferro de solda e solda
- Alicate de corte
- Fita adesiva

O esquema de ligação está detalhado a seguir.
{{< figure src="./images/6.png" caption="Esquema de ligação dos componentes" >}}

{{< figure src="./images/7.jpeg" caption="Display utilizado" >}}

Nenhum detalhe especial aqui, apenas a ligação direto do ESP8266 com o módulo de display de 7 segmentos. Basicamente as ligações entre o display e o microcontrolador são as seguintes :

- VCC -> 5v
- GND -> GND
- D7 -> DIN
- D6 -> CLK
- D5 -> LOAD

### Ferramentas de Desenvolvimento

Já expliquei em outro post aqui no blog como configurar a IDE do Arduino para programar o ESP8266 e como instalar novas bibliotecas. Então se ainda não sabe, dá uma olhada lá.

> [Artigo: Sensoriamento e Controle Realtime com Firebase e ESP8266](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266)

Neste caso a biblioteca do Telegram pode ser instalada diretamente via Library Manager na IDE. Vá em _Sketch > Incluir Biblioteca > Gerenciar Bibliotecas_ e pesquise por _DigitLedDisplay_ e instale a biblioteca.

> [Biblioteca DigitLedDisplay no Github](https://github.com/ozhantr/DigitLedDisplay)

### Customizando o código do ESP8266

{{< figure src="./images/8.png" caption="Com essa parte você já vai conseguir ver funcionando o projeto" >}}

O código do arduino está neste projeto no Github, na pasta **arduino**. Você vai precisar trocar as seguintes variáveis para usar com o seu projeto de integração com o Telegram:

- **PAGE_ID**: Id da página no Facebook a ser contabilizada.
- **ACCESS_TOKEN**: O Token de acesso que criamos nos passos anteriores.
- **WIFI_SSID** e **WIFI_PASSWORD**: você deve informar os dados para conectar na WiFi do seu local.

> [Código do projeto no Github](https://github.com/alvarowolfx/facebook-followers-counter-esp8266)

Basicamente o que o código esse faz são os seguintes passos:

1.  Conecta na WiFi configurada —   Método `setupWifi`.
2.  Configura o display de 7 segmentos —   Método `setupPins`.
3.  Loop consultando a API do Facebook a quantidade de curtidas.

Até aqui você já deve conseguir ver se a contagem de likes na página no Facebook está aparecendo no display, então só falta a montagem final do projeto.

### Montagem do projeto

Agora é só colocar tudo junto para que o projeto tenha uma cara mais bonita. A primeira parte é alterar o _template_ a ser impresso. Você pode usar qualquer software de vetorização como o Sketch(foi o que usei para fazer), Illustrator, Inkscape, Corel Draw, etc. É importante aqui imprimir ele do tamanho que realmente foi desenhado (metade de um papel a4), não altere a proporção na hora de imprimir.

{{< figure src="./images/9.png" caption="Pode ser baixado no Github do projeto  —  [https://github.com/alvarowolfx/facebook-followers-counter-esp8266/tree/master/print_template](https://github.com/alvarowolfx/facebook-followers-counter-esp8266/tree/master/print_template)" >}}

Agora para montar o projeto na moldura, é importante limpar o vidro da moldura antes de colocar a imagem lá dentro. Depois coloque a impressão dentro da moldura e fixe na parte de dentro com fita adesiva.

{{< figure src="./images/10.png" caption="Fixando com fita adesiva a impressão na modulra." >}}

Cole com fita adesiva o display de 7 segmentos no local onde vão ficar os digitos, essa parte é meio chata, mas depois que alinhar e colocar a fita adesiva, tudo vai ficar bem bacana.

{{< figure src="./images/11.png" caption="Tudo fixado dentro da moldura." >}}

Passe o cabo usb pelo buraco feito na moldura (não esqueça de pedir isso, se não você vai ter que cortar um pedaço do fundo da moldura para passar o cabo). Fixe o microcontrolador em qualquer lugar e feche a moldura com tudo lá dentro. Pronto, seu quadro está finalizado.

### Aproveite

Agora é só mostrar com orgulho o seu quadro para todo mundo. Não deixe de compartilhar aqui a criação de vocês, isso vai me motivar ainda mais a continuar postando projetos por aqui..

{{< crosspost >}}
