---
title: "Sensoriamento e Controle Realtime com Firebase e ESP8266"
author: "Alvaro Viebrantz"
date: 2017-02-18T02:24:58.189Z
lastmod: 2021-02-26T10:50:47-04:00

description: ""

subtitle: "Uma forma fácil e rápida de jogar seus dados para a nuvem, sem se queimar configurando servidores."

image: "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/1.png"
images:
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/1.png"
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/2.png"
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/3.png"
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/4.png"
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/5.png"
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/6.png"
  - "/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/7.png"

aliases:
  - "/sensoriamento-realtime-com-firebase-e-esp8266-6e54b9bff1c1"
---

#### Uma forma fácil e rápida de jogar seus dados para a nuvem, sem se queimar configurando servidores.

Quando desenvolvemos dispositivos conectados, um dos pilares que devemos considerar é que normalmente eles devem poder receber comandos e consultar seu estado atual em tempo real. O dispositivo consegue manter seu estado atual localmente, por meio de variáveis ou alguma forma de armazenamento interno, mas como fazer isso para consulta por dispositivos externos ?

Na perspectiva de software, esse estado pode ser uma leitura direta da voltagem em um pino digital, podendo ser _HIGH_ ou _LOW_, alguma leitura analógica de um sensor ou um leitura de um sensor ou componente utilizando um protocolo I²C, Serial, etc. Normalmente nós mantemos isso no lado da aplicação embarcada ao invés de sempre ficar consultando as entradas e saídas do dispositivos, mudando esses valores quando alguma alteração ocorre ou por algum período definido de tempo.

Mas e quando precisamos saber esse estado de fora do dispositivo, como na Web ou em um aplicativo ? Não podemos confiar em consultar diretamente o dispositivo, pois ele pode estar em estado de _sleep_ para economizar energia ou não estar acessível atualmente na rede. Uma solução é espelhar o último estado do dispositivo na nuvem, para que possamos consultar mesmo que o dispositivo esteja inacessível.

Existem várias maneiras de se fazer isso, diversos protocolos e padrões arquiteturais para cada situação, mas hoje eu vou me ater a mostrar para vocês como fazer isso de forma bem facilitada utilizando o **Firebase** integrado com um **ESP8266**, programando tudo com o ecossistema do **Arduino** e um pouquinho de HTML e JS para exibir os dados. Mas sem se queimar configurando servidores e tudo mais.

#### O que nós vamos construir

Vamos conectar diretamente o nosso dispositivo na nuvem do Google e no Firebase, publicar a mudança de estado dos sensores conectados e escutar por mudanças, podendo controlar um atuador direto no dispositivo (neste caso um simples LED). O LED pode ser trocado facilmente por um relé e acionar uma lampada por exemplo.

Depois será feito um site simples, utilizando tecnologias web, HTML5, CSS3 e Javacript, sendo hospedado diretamente no **Firebase Hosting**, para visualizar e controlar nosso dispositivo direto pela Web. A carinha da nossa aplicação vai ser essa da imagem.

![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/1.png)

> Já pode ser acessada em [https://sensoriamento-iot-bootcamp.firebaseapp.com/](https://sensoriamento-iot-bootcamp.firebaseapp.com/)
> ![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/2.png)
> Um casamento feitos nos céus

### Plataforma Firebase

O Firebase hoje, após a aquisição do Google, virou uma plataforma muito completa para se desenvolver aplicações. Podendo ser integrado em vários pontos partes da sua aplicação, ele conta com diversos produtos, sendo que eu considero os principais:

- **Autenticação** com redes sociais de forma MUITO facilitada.
- **Armazenamento** de arquivos.
- **Analytics** para seu aplicativo nativo em Android e iOS.
- **Hosting** de aplicações Web — Vamos usar para hospedar nossa aplicação.
- **Notificações** Push para aplicativos iOS e Android.
- E claro o Firebase Realtime **Database** que vou falar mais a frente.
  ![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/3.png)
  O ecossistema do Firebase tomou fermento depois que foi adquirido pelo Google

Hoje ele possui bibliotecas para que podem ser utilizadas para integrar com o Firebase, então não vai faltar formas de se conectar com esses serviços:

- Aplicativos móveis iOS e Android,
- Games com a Unity
- Admin SDK para seu backend em NodeJS e Java
- A clássica **SDK** para a Web em Javascript.
- E ma equipe do Google criou a biblioteca para utilizar o Firebase com o **Arduino** também, com ela que vamos conseguir enviar os dados para lá.

O **Firebase Realtime Database** é uma tecnologia muito utilizada para manter estados em tempo real, fornecendo esse sincronismo de graça para todos os clientes conectados. Seu armazenamento funciona em forma de árvores ou documento [JSON] (http://json.org)e utilizando uma biblioteca cliente dele (que existe para diversas linguagens) você pode enviar e subscrever para qualquer caminho da árvore para receber e enviar notificações das mudanças nos dados.

![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/4.png)
Arquitetura IoT utilizando o Firebase — [https://cloud.google.com/solutions/iot-overview](https://cloud.google.com/solutions/iot-overview)

Aproveite e já crie uma conta e um projeto no console do Firebase. No console do projeto conseguimos editar e visualizar os dados em nosso banco em tempo real. Vamos precisar de algumas informações do console para poder configurar nosso dispositivo IoT e a aplicação Web.

[Firebase | App success made simple](https://firebase.google.com)

1.  Vá para a seção _Database_.
2.  Anote a URL que aparece com o formato _https://nome-do-projeto.firebaseio.com/_
3.  Agora clique na engrenagem no canto superior esquerdo, do lado de _Overview_ e depois em _Configurações do Projeto_.
4.  Vá para a aba _Contas de Serviço &gt; Segredos do Banco de Dados._
5.  Clique em “Mostrar” e anote o segredo de banco, isso serve como chave para manipular os dados do Firebase.

Ao final desses passos você deve ter a URL do seu banco e um Segredo para fazer a manipulação dos dados.

### Enviando os dados para o Firebase via ESP8266

Aqui na parte de componentes você pode flexibilizar a parte dos sensores, para este exemplo vou usar três sensores diferentes e um atuador, apenas para exemplificar as diferentes formas de interagir com o hardware. O nosso atuador vai ser um simples LED.

#### Componentes

- Algum modelo de ESP8266 (No caso usei um NodeMCU)
- Sensor de Temperatura e Umidade DHT11 ou DHT22
- Sensor de Presença PIR
- LED
- Resistor 100 e 1k
- Jumpers

O nosso esquema de ligação vai ser bem simples, apenas com a imagem acredito que vocês consigam reproduzir.

![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/5.png)
Ligação dos sensores e atuadores em um NodeMCU

#### Ferramentas

Precisamos configurar a IDE do Arduino para programar o ESP8266 e para isso eu recomendo fortemente o tutorial a seguir do blog do FilipeFlop.

[Como programar o NodeMCU com IDE Arduino | Blog FILIPEFLOP](http://blog.filipeflop.com/wireless/programar-nodemcu-com-ide-arduino.html)

Depois disso precisamos instalar a biblioteca firebase-arduino, que pode ser encontrada no Github do Firebase. Siga os passos para fazer a instalação.

[GitHub - firebase/firebase-arduino: Arduino samples for Firebase.](https://github.com/firebase/firebase-arduino)

1.  Faça o [download do projeto em seu computador](https://github.com/googlesamples/firebase-arduino/archive/master.zip).
2.  Inicie a IDE do Arduino
3.  Adicione a biblioteca indo no menu Sketch &gt; Include Library &gt; Add .ZIP Library…
4.  Escolha o arquivo firebase-arduino-master.zip que você baixou anteriormente.

Para a a biblioteca do sensor DHT, se você também for utilizar ela, você tem duas opções:

1.  Usando o Library Manager da IDE do Arduino. Você pode ir no menu Sketch &gt; Incluir Biblioteca &gt; Gerenciar Bibliotecas. Depois disso é só buscar por “Adafruit unified sensor” e “ DHT sensor library”
2.  Você pode fazer a mesma coisa que fez com a biblioteca do Firebase e instalar manualmente baixando as bibliotecas. Os links estão a seguir
    [GitHub - adafruit/DHT-sensor-library: Arduino library for DHT11DHT22, etc Temp &amp; Humidity Sensors](https://github.com/adafruit/DHT-sensor-library)

[GitHub - adafruit/Adafruit_Sensor: Common sensor library](https://github.com/adafruit/Adafruit_Sensor)

A biblioteca do Firebase tem que ser instalada manualmente por que ela não está publicada no repositório do Arduino.

#### Código do ESP8266

O código do arduino está neste projeto no Github, na pasta **arduino**. Você vai precisar trocar as seguintes variáveis para usar com o seu projeto no Firebase:

- FIREBASE_HOST: preencha com a URL do seu banco no Firebase, obtida nos passos anteriores.
- FIREBASE_AUTH: aqui deve ser colocado o Segredo do seu banco no Firebase, também obtido nos passos anteriores
- WIFI_SSID e WIFI_PASSWORD: você deve informar os dados para conectar na WiFi da sua casa.
  [GitHub - alvarowolfx/firebase-sensoriamento: [ ] Código do Tutorial de Sensoriamento Realtime com…](https://github.com/alvarowolfx/firebase-sensoriamento)

Basicamente o que a aplicação faz é publicar em um intervalo de tempo fixo os dados do sensor DHT, enviar os dados do sensor de presença e ficar escutando por mudanças na variável que representa o LED. A estrutura no Firebase ficou assim:

![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/6.png)
Estrutura da nossa aplicação

_Temperature_ e _Humidity_ são listas dos dados que são enviados pelo ESP8266 com os valores de temperatura e umidade respectivamente e _Presence_ e _Lamp_ são variáveis booleanas que representam o estado de presença e do LED. Lembrando que no lugar do LED podemos ter um módulo de relê e controlar uma lampada, então não se limite ao LED.

Pela interface Web do Firebase você consegue alterar e inserir novos dados facilmente e depois de rodar a aplicação no ESP8266 você já vai conseguir ver os dados aparecendo automagicamente na interface.

### Criando nossa aplicação Web

Agora falta a parte de controle na Web do nosso dispositivo. Vamos fazer um site simples, utilizando tecnologias web padrão, HTML5, CSS3 e Javacript, sendo hospedado diretamente no **Firebase Hosting**

#### Ferramentas e IDE

Para fazer _deploy_ da aplicação no **Firebase** precisamos instalar o _firebase-tools_, que é uma ferramenta de linha de comando para gerenciar o banco de dados e hosting de aplicações dentro da plataforma **Firebase**. Essa ferramenta é baseado em _NodeJS_, então precisamos instalar isso primeiro.

Baixe o _NodeJS_ no site oficial e instale no seu sistema operacional de preferência. Junto disso também será instalado o gerenciador de pacotes — *NPM*.

[Download | Node.js](https://nodejs.org/en/download)

Com o _Node_ e _NPM_ instalado é só rodar o comando:

> npm install -g firebase-tools

Ao final da instalação rode o comando a seguir e coloque suas credenciais do Firebase:

> firebase login

Vocês podem utilizar diversas IDEs para desenvolver o código em HTML e Javascript, vou colocar a seguir algumas, mas fica a seu critério escolher. Eu gosto bastante de utilizar o Atom.

- Atom.io
- Webstorm Jetbrains
- Visual Studio Code
- Sublime Text

#### Programação

Cria uma pasta para o seu projeto e utilize o comando dentro da pasta:

> firebase init

Com isso você vai vincular a pasta com o projeto criado no console do Firebase, então escolha corretamente o projeto que foi criado anteriormente. Ele vai criar a pasta **public**, onde vão os arquivos que podem ser hospedados no Firebase e serem acessados na web e também alguns arquivos de configuração do projeto.

Um arquivo importante que devemos alterar agora é o **database.rules.json**. Não vou me estender muito nele, mas basicamente com esse arquivo você consegue definir quem pode ler e escrever dentro do banco do Firebase, podendo definir regras e validações para os dados inseridos. Por enquanto vamos permitir leitura e escrita pra qualquer usuário, então mude para o conteúdo a seguir:
`{ &#34;rules&#34;: { &#34;.read&#34;: &#34;true&#34;, &#34;.write&#34;: &#34;true&#34; } }`

O _firebase-tools_ possui também um servidor embutido, então estando na pasta você pode rodar **firebase serve**, para iniciar um servidor web na pasta public na porta 5000 por padrão.

A parte web também pode ser vista no Github, basicamente utilizei apenas Javascript, o framework CSS [MaterializeCSS] (http://materializecss.com)e a biblioteca [Chart.JS](http://chartjs.org) para montar os gráficos. O código da aplicação pode ser visto em **public/app.js** e o front-end está todo contido em **public/index.html**

[GitHub - alvarowolfx/firebase-sensoriamento: [ ] Código do Tutorial de Sensoriamento Realtime com…](https://github.com/alvarowolfx/firebase-sensoriamento)

Para adequar a aplicação ao seu projeto próprio no Firebase, você deve alterar o começo do arquivo **app.js**, com as configurações do console do projeto no Firebase. Para obter as configurações sigam os passos:

1.  Clique em _Overview_ no menu lateral.
2.  Depois em “_Adicionar o Firebase ao seu aplicativo da Web”._
3.  Dentro da janela que abriu, copie o trecho dentro da segunda tag _&lt;script&gt;_ e substitua pelo código correspondente no arquivo **app.js**.

Agora é só dar deploy da aplicação no hosting do Firebase. É só rodar o comando **firebase deploy** que você vai enviar os arquivos da pasta **public**, pra lá e o vai ser exibido o link para acessar sua aplicação online.

![image](/articles/2017/2017-02-18_sensoriamento-e-controle-realtime-com-firebase-e-esp8266/images/7.png)
AEHOO — Mãe to na nuvem

Se deu tudo certo até aqui então pode comemorar que você uma aplicação IoT completa com controle via Web e mantendo o estado em tempo real na nuvem.O Firebase é uma plataforma bem bacana para se utilizar hoje em dia, principalmente como foi comentado no começo do post, sobre manter estados em tempo real da sua aplicação, pois o Firebase te dá de graça todo esse sincronismo entre todos os clientes conectados.

Isso sem contar todo o ecossistema de produtos envolta dele, como foi mostrado a parte de Hosting, podendo hospedar sua aplicação de graça e ainda com HTTPS, o que é bastante importante hoje na web.> Gostou do post ? Então não esqueça de curtir clicando no ❤ aqui em baixo e de recomendar e compartilhar com os amiguinhos.> Fez alguma coisa bacana com os tutoriais aqui ? Mostre nos comentários.> Qualquer dúvida mande nos comentários que eu vou tentar te ajudar.
