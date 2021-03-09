---
title: "Automação de baixo custo com Raspberry Pi"
author: "Alvaro Viebrantz"
date: 2017-01-29T20:33:49.961Z
lastmod: 2021-02-26T10:50:43-04:00

description: ""

subtitle: "Quer ter a casa automatizada mas não quer declarar falência no processo ?"

image: "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/1.jpeg"
images:
  - "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/1.jpeg"
  - "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/2.jpeg"
  - "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/3.png"
  - "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/4.png"
  - "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/5.png"
  - "/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/6.png"

aliases:
  - "/automa%C3%A7%C3%A3o-de-baixo-custo-com-raspberry-pi-6a5b6fccadec"
---

#### _Quer ter a casa automatizada mas não quer declarar falência no processo ?_

Eu sempre gostei de brincar com automação residencial, mas sempre optei pelo lado **DIY** (Faça você mesmo) por conta de boa parte das soluções de mercado serem bem caras. Pois bem meus amigos, existe uma forma bem bacana de iniciar nesse mundo com um valor um pouco mais baixo. Aqui teremos um tutorial curto em como fazer isso com um **Raspberry Pi** rodando o [**Home Assistant**](http://home-assistant.io) \***\* e alguns módulos de tomada com Radio Frequência (RF), tudo isso **sem precisar programar\*\*.

Não tem o **Home Assistant** instalado ? Dá uma olhada no nosso post sobre como configurar ele no Raspberry Pi.

[Iniciando com Home Assistant no Raspberry Pi](https://medium.com/iot-bootcamp/iniciando-com-home-assistant-no-raspberry-pi-47d1782db664)

Existem tomadas que funcionam via RF ( normalmente 433Mhz), esses módulos são facilmente encontrados na internet e são uma maneira bem simples de começar a automatizar sua casa. Segue alguns exemplos dos produtos que estou falando, encontrados tanto aqui no Brasil quanto em sites chineses (obviamente na China é muito mais barato).

![image](/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/1.jpeg)
Tomada por Radio Frequência — [http://produto.mercadolivre.com.br/MLB-754961522-kit-3-tomadas-interruptor-c-controle-remoto-127vac-\_JM](http://produto.mercadolivre.com.br/MLB-754961522-kit-3-tomadas-interruptor-c-controle-remoto-127vac-_JM)

![image](/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/2.jpeg)
Relê por Radio Frequência — [https://www.aliexpress.com/item/1pc-DC-12v-10A-relay-1CH-wireless-RF-Remote-Control-Switch-Transmitter-Receiver/32428099104.html](https://www.aliexpress.com/item/1pc-DC-12v-10A-relay-1CH-wireless-RF-Remote-Control-Switch-Transmitter-Receiver/32428099104.html?spm=2114.01010208.3.13.5e1uji&ws_ab_test=searchweb0_0,searchweb201602_5_10065_10068_10000032_119_10000025_10000029_430_10000028_10060_10062_10056_10055_10000062_10054_10059_10099_10000022_10000012_10103_10000015_10102_10096_10000018_10000019_10000056_10000059_10052_10053_10107_10050_10106_10051_10000053_10000007_10000050_10084_10118_10083_10000047_10080_10082_10081_10110_10111_10112_10113_10114_10115_10000041_10000044_10078_10079_10000038_429_10073_10000035_10121,searchweb201603_10,afswitch_2,single_sort_1_default&btsid=e97de9ed-ffbd-43db-b22e-5b0aff865164)

Porém esses dispositivos funcionam via controle remoto (_socorro…_), o que me dá uma dor no peito só de pensar em ver minha casa com controles remoto espalhados por todo lado, sendo que eu tenho o melhor controle do mundo na minha mão, meu celular. Vamos transforma-los em um dispositivo IoT, que pode ser controlado via WiFi e não indo muito longe podemos controlar eles via comandos de voz usando um [Amazon Echo](https://www.amazon.com/Amazon-Echo-Bluetooth-Speaker-with-WiFi-Alexa/dp/B00X4WHP5E), a [Siri com HomeKit](http://www.apple.com/ios/siri/) ou o [Google Home](https://madeby.google.com/home/). Eu fiz a parte de controle de voz com a Siri e a Alexa, mas isso vou mostrar em outro tutorial, por enquanto vou ensinar como controlar via web com o Home Assistant.

Bom o centro da nossa casa neste caso vai ser o Raspberry Pi, que vai poder rodar um servidor web para receber as requisições dos celulares da casa e converter isso para chamadas de RF de 433mhz que esses módulos trabalham para ligar e desligar algo na casa. No caso aqui vamos integrar o Home Assistant com a biblioteca [433Utils](https://github.com/ninjablocks/433Utils) para fazer a comunicação mais baixo nível com o radio. Mãos a obra.#### O que você vai precisar

- Um Raspberry Pi rodando o Home Assistant (Qualquer versão serve, tenho o primeiro modelo)
- Módulo Receptor e Transmissor 433Mhz ([Bem baratos iguais este aqui](http://www.filipeflop.com/pd-80dc1-modulo-rf-transmissor-receptor-433mhz-am.html))
- Algum dos módulos de tomada ou interruptores citados no começo do post.

#### Ligações do Hardware

![image](/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/3.png)
Conectando Raspberry Pi com Módulos RF 433mhz

**Ligações Receptor:**

- Amarelo / Sinal de Dados (DATA): ligue no pino 11 do Raspberry.
- Preto / Terra (GND) : ligue no pino 6, um dos terras do Raspberry.
- Vermelho / Força (5V) : ligue no 5v do pino 2 no Raspberry.

**Ligações Transmissor:**

- Amarelo / Sinal de Dados (DATA): ligue no pino 13 do Raspberry.
- Preto / Terra (GND) : ligue no pino 9, outro terra do Raspberry.
- Vermelho / Força (5V): ligue no outro 5v no pino 4 do Raspberry pi.

#### Configurando o Raspberry Pi

Como foi mencionado anteriormente vamos usar o Home Assistant e a ferramenta [433Utils](https://github.com/ninjablocks/433Utils). Para configurar o Home Assistant dá uma olhada [neste outro post](https://medium.com/@alvaroviebrantz/iniciando-com-home-assistant-no-raspberry-pi-47d1782db664) meu sobre ele.

Nós precisamos instalar as seguintes dependências:

- wiringPi
- 433Utils

Primeiro instale o `wiringPi`:
`git clone git://git.drogon.net/wiringPi cd wiringPi ./build`

Depois baixe o _433Utils_ e compile os executaveis para Raspberry Pi:
`` git clone --recursive git://github.com/ninjablocks/433Utils.git `cd 433Utils/RPi_utils `make ``

Depois de rodar os comandos você terá instalado alguns utilitários para envio e recepção de dados via RF com o Raspberry Pi. Eles vão estar na pasta 433Utils/RPi_utils onde você baixou a ferramenta. Os comandos mais importantes são os seguintes:

1.  **./RFSniffer:** Essa ferramentar serve para escutar os dados que são enviados pelo controle remoto RF, dessa forma podemos saber qual código enviar para ligar e desligar cada tomada, dependendo do botão pressionado.
2.  **./codesend [codigo] [protocolo] [pulso]:** Essa ferramenta envia dados via RF. Os parâmetros de protocolo e pulso vão depender das tomadas que você comprou, já o código é o que foi coletado utilizando a ferramenta anterior.

#### Obtendo os códigos do controle

Com os comandos os módulos RF instalados e no Raspberry Pi, podemos utilizar o _RFSniffer_, pra escutar os códigos que são enviados pelo controle que veio junto com as tomadas. Para iniciar o _RFSniffer_, digite o comando na pasta que compilamos os executaveis:
``# Dar permissão de execução, fazer apenas uma vez isso
chmod +x RFSniffer

# Execute o comando

sudo ./RFSniffer``

Agora pegue o controle e encoste ele no receptor RF que está conectado no Raspberry Pi, e vai apertando os botões e guardando os códigos que cada um representa. As vezes aparece alguns códigos estranhos, desconsidere, use os que aparecem mais frequentemente.

![image](/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/4.png)
Exemplo lendo os comandos de On e Off do controle apenas do módulo um.

![image](/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/5.png)
As saidas no meu caso foram as apresentadas na tabela.

Agora você vai poder transmitir esses mesmo códigos usando o Raspberry Pi, mas agora vem a parte meio chata, temos que descobrir o protocolo e comprimento de pulso que funciona o módulo, pois só o código não é o suficiente. O protocolo pode ser de 0 a 5 e o comprimento de pulso pode ser entre 100 e 800 em meus testes aqui. Eu fiz o seguinte, para cada protocolo, teste um comprimento de pulso em incrementos de 50 em 50. Cheguei que os meus módulos funcionam no protocolo 0 e comprimento 200. Para enviar usamos o comando _codesend_, que configuramos anteriormente, substituindo pelos valores que você encontrou:
``# Dar permissão de execução, fazer apenas uma vez isso
chmod +x codesend

# Execute o comando

# aqui você vai ter que variar de acordo com seu módulo

# Aqui estou enviando o comando de ligar

# da tomada 1, com protocolo 0 e comprimento 200

sudo ./codesend 333107 0 200``

Encotrando os valores e conseguindo ligar e desligar os módulos via Raspberry Pi, falta muito pouco para terminarmos as configurações. Pode comemorar meu caro amigo leitor.

#### Configurando o Home Assistant

Nós vamos utilizar um componente bastante versátil do Home Assistant, o [Command line switch](https://home-assistant.io/components/switch.command_line/), com ele você consegue executar um comando no terminal quando os atuadores são acionados em sua central. Com isso vamos utilizar as ferramentas do _433Utils_, como utilizamos no passo anterior para ligar e desligar os módulos de tomada. Segue a minha configurações no arquivo _configuration.yaml_ do Home Assistant:
`switch:

- platform: command_line
  switches:
  rf_switch1:
  friendly_name: "Tomada 1"
  command_on: "/home/pi/433Utils/RPi_utils/codesend 333107 0 200"
  command_off: "/home/pi/433Utils/RPi_utils/codesend 333116 0 200"
  rf_switch2:
  friendly_name: "Tomada 2"
  command_on: "/home/pi/433Utils/RPi_utils/codesend 333251 0 200"
  command_off: "/home/pi/433Utils/RPi_utils/codesend 333260 0 200"
  rf_switch3:
  friendly_name: "Tomada 3"
  command_on: "/home/pi/433Utils/RPi_utils/codesend 333571 0 200"
  command_off: "/home/pi/433Utils/RPi_utils/codesend 333580 0 200"`

Também aproveitei e agrupei as tomadas, utilizando o componente [Group](https://home-assistant.io/components/group/) do Home Assistant, a minha configuração foi a seguinte:
`group: tomadas: name: Tomadas entities: - switch.rf_switch1 - switch.rf_switch2 - switch.rf_switch3`

Agora é só reiniciar o Home Assistant e visualizar os componentes na interface principal dele:
`sudo systemctl restart home-assistant.service`
![image](/articles/2017/2017-01-29_automação-de-baixo-custo-com-raspberry-pi/images/6.png)
AEHOOO

E por hoje é só pessoal, as possibilidades são grandes com esses módulos de tomada RF e o bom é não precisamos ter conhecimento profundo de eletrônica para se aventurar em automatizar algumas coisas em casa.> Gostou do post ? Então não esqueça de curtir clicando no ❤ aqui em baixo e de recomendar e compartilhar com os amiguinhos.> Fez alguma coisa bacana com os tutoriais aqui ? Mostre nos comentários.> Qualquer dúvida mande nos comentários que eu vou tentar te ajudar.
