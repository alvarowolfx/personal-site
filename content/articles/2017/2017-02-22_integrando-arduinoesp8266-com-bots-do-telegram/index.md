---
title: "Integrando Arduino/ESP8266 com Bots do Telegram"
author: "Alvaro Viebrantz"
date: 2017-02-22T15:42:26.826Z
lastmod: 2021-02-26T10:50:51-04:00

description: ""

subtitle: "Agora é a vez dos chatbots e nada mais simples do que comandar seus eletrônicos, de qualquer lugar do mundo, via chat no Telegram."

image: "/articles/2017/2017-02-22_integrando-arduinoesp8266-com-bots-do-telegram/images/1.png"
images:
  - "/articles/2017/2017-02-22_integrando-arduinoesp8266-com-bots-do-telegram/images/1.png"
  - "/articles/2017/2017-02-22_integrando-arduinoesp8266-com-bots-do-telegram/images/2.png"
  - "/articles/2017/2017-02-22_integrando-arduinoesp8266-com-bots-do-telegram/images/3.png"
  - "/articles/2017/2017-02-22_integrando-arduinoesp8266-com-bots-do-telegram/images/4.png"
  - "/articles/2017/2017-02-22_integrando-arduinoesp8266-com-bots-do-telegram/images/5.png"

associated:
  - "https://medium.com/@alvaroviebrantz/integrando-arduino-esp8266-com-bots-do-telegram-f5142279c840"
---

![image](./images/1.png)

#### Agora é a vez dos chatbots e nada mais simples do que comandar seus eletrônicos, de qualquer lugar do mundo, via chat no Telegram.

De forma bem sucinta vou mostrar pra vocês como integrar o ESP8266 (programando com o core do Arduino) com o serviço de chatbot do Telegram. Um chatbot é um software que tenta simular uma conversa entre duas pessoas, interagindo com perguntas e respostas e com isso será possível no neste caso controlar LEDs, Relês e fazer a leitura de sensores. Dá uma olhada como vai ficar:

Demo de como fica o final deste tutorial:
{{< facebook-video id="1876399655941284" >}}

Mas não para por ai, podemos até mesmo criar alertas, como por exemplo, quando detectar algo na nossa casa, podemos receber diretamente no chat o que está ocorrendo, isso de qualquer lugar do mundo.

Normalmente para controlar nossos dispositivos, ficamos limitados a rede WiFi local ou se quisermos acessar externamente, temos que fazer uma tediosa configuração com um serviço de DNS dinâmico (como o [DuckDNS](https://www.duckdns.org/)), liberar porta no modem, colocar ip estático e blá blá blá, para poder acessar de fora de casa.

Bom meus amigos, uma das ideia por trás da internet das coisas é que tudo seja o mais fácil possível para nossos usuários, então usando um chatbot, basta você ter o aplicativo correspondente (muitas vezes o usuário já tem instalado) e conversar com seu dispositivos através de comando pré definidos.

{{< figure src="./images/2.png" caption="A carinha do nosso bot" >}}

### O que você vai precisar

Para completar este tutorial, você basicamente vai precisar de duas coisas principais — Um módulo ESP8266 e um smartphone com o aplicativo do Telegram. Vou detalhar cada parte.

### Telegram

Por que o Telegram ? Nas minhas brincadeiras com chatbots, o Telegram foi um dos serviços que eu achei mais simples de se configurar, alias fica até de lição para os outros serviços isso. Você cria um bot do Telegram conversando com um bot chamado @BotFather (acreditem, é fácil assim mesmo). Uma salva de palmas para equipe por essa ideia.

Você vai precisar seguir esses passos para conseguir um Token a ser utilizado mais a frente no nosso código que vai se comunicar com a API do Telegram. São eles:

1.  Abra um chat com o @BotFather no Telegram e toque em _Iniciar_
2.  Digite o comando _/newbot_ para iniciar o processo de criação do bot.
3.  Vai ser requisitado o nome do bot, então digite o nome de sua preferência.
4.  Depois será requisitado o _username_ do bot, que basicamente é a forma que você inicia a conversa com ele, iniciando um chat com o @username_do_seu_bot.
5.  Depois disso o @BotFather vai devolver pra você um Token de acesso com o formato NNNNNNNNN:um-monte-de-letra-e-numero.

{{< figure src="./images/3.png" caption="Criando um bot no telegram" >}}

Com o bot criado e o Token em mão, já podemos começar os trabalhos no nosso microcontrolador.

### Hardware e componentes

Pro lado de hardware deste projeto você vai precisar o ESP8266, que será nosso microcontrolador com WiFi e o resto dos itens varia com o que você quer controlar, no meu caso utilizei os seguintes atuadores e sensores:

- Um NodeMCU (qualquer módulo compatível com ESP8266 serve)
- Um LED
- Módulo de Relê 5v
- Sensor de Temperatura e Umidade DHT11
- Transistor 2N2222 para comandar o módulo de Relê de 5v
- Resistores de 10k, 1k e 100
- Jumpers

O esquema de ligação está detalhado a seguir.

{{< figure src="./images/4.png" caption="Esquema de ligação dos componentes" >}}

Detalhe para o uso do transistor para controlar o módulo de relê, pois o ESP8266 além de trabalhar com 3.3v, suas saídas digitais suportam apenas 12mA, então se um módulo precisar mais que isso, pode fazer o microcontrolador reiniciar sozinho e ter comportamentos estranhos. Acredite, eu já virei noite tentando achar o que estava acontecendo e esse era justamente o problema.

### Ferramentas

Já expliquei em outro post aqui no blog como configurar a IDE do Arduino para programar o ESP8266 e como instalar novas bibliotecas. Então se ainda não sabe, dá uma olhada lá.

> [Sensoriamento e Controle Realtime com Firebase e ESP8266](https://medium.com/iot-bootcamp/sensoriamento-realtime-com-firebase-e-esp8266-6e54b9bff1c1)

Neste caso a biblioteca do Telegram pode ser instalada diretamente via Library Manager na IDE. Vá em _Sketch > Incluir Biblioteca > Gerenciar Bibliotecas_ e pesquise por _Universal Telegram Bot_ e instale a biblioteca.

> [GitHub - witnessmenow/Universal-Arduino-Telegram-Bot: Use Telegram on your Arduino (ESP8266 or Wifi…](https://github.com/witnessmenow/Universal-Arduino-Telegram-Bot)

### Código do ESP8266

O código do arduino está neste projeto no Github, na pasta **arduino**. Você vai precisar trocar as seguintes variáveis para usar com o seu projeto de integração com o Telegram:

- BotToken: preencha com o Token obtido do @BotFather do seu bot criado.
- WIFI_SSID e WIFI_PASSWORD: você deve informar os dados para conectar na WiFi da sua casa.

> [Código do projeto no Github](https://github.com/alvarowolfx/esp8266-telegram-bot)

Basicamente o que o código esse faz são os seguintes passos:

1.  Conecta na WiFi configurada — Método setupWifi.
2.  Configura os sensores e atuadores — Método setupPins.
3.  Fica em loop consultando por novas mensagens no Telegram.
4.  Ao receber novas mensagens, começa o tratamento de cada comando.

Ao receber as mensagens, você pode colocar o tratamento para cada comando que você desejar, inclusive o Telegram tem suporte para enviar um teclado com os comandos pre-definidos por você, como pode ser visto ao tratar o comando **/options**. Os comandos criados foram:

- **/start**: Comando enviado ao iniciar o chat, mostra uma mensagem de boas vindas e os comandos disponíveis.
- **/ledon** e **/ledoff**: Liga e desliga o LED.
- **/relayon** e **/relayoff**: Liga e desliga o Relê.
- **/env** : Consulta os dados do sensor de temperatura e umidade.
- **/options**: Devolve um **json** com todos os comandos disponíveis.
- **/status**: Devolve o status atual do led e do relê.

{{< figure src="./images/5.png" caption="Teclado com comandos pré definidos." >}}

Você pode criar seus próprios comandos e controlar seu dispositivo via chat, as possibilidades são infinitas. Se conseguiu controlar alguma coisa com seu próprio bot, pode começar a compartilhar com os amiguinhos pois a agora a Skynet está mais próxima depois deste tutorial.O Telegram já é um aplicativo de chat muito bom e agora com essa facilidade de se criar bots, se torna um plataforma mais interessante ainda. Inclusive você sabia que diversas partes do Telegram são open source ? Você pode por exemplo ver o código fonte do aplicativo para Android e aprender como ele funciona.

Também com isso você foi introduzido ao mundo dos chatbots, que está ganhando fama no mundo todo e cada vez mais serviços estão tentando ser oferecidos via chat, desde comprar coisas online até um pedido de pizza no restaurante na esquina de casa.

{{< crosspost >}}
