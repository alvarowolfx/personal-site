---
title: "Como fazer uma tomada IoT com ESP8266 ( e controlada por voz!!!)"
author: ""
date:
lastmod: 2021-02-26T10:52:03-04:00
draft: true
description: ""

subtitle: "Nas minhas brincadeiras com Arduino, sempre gostei muito de trabalhar com o Arduino Nano, por conta do tamanho reduzido e ainda com…"

image: "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/1.png"
images:
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/1.png"
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/2.jpeg"
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/3.png"
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/4.jpeg"
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/5.png"
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/6.png"
  - "/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/7.png"
---

Nas minhas brincadeiras com Arduino, sempre gostei muito de trabalhar com o Arduino Nano, por conta do tamanho reduzido e ainda com bastante portas disponíveis, mas sempre senti falta de conecta-lo de forma fácil e barata na internet. Ai veio o maravilhoso ESP8266, com um preço incrível, processador e memória melhor que os modelos tradicionais do Arduino e com uma cereja de bolo em cima dele, WiFi embutida.

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/1.png)
ESP8266 pode ser encontrado facilmente por volta dos 3 dólares em sites chineses.

Ele pode ser encontrado em vários formatos, o mais fácil de trabalhar é o [NodeMCU](http://nodemcu.com/index_en.html), que na verdade é o nome de um runtime em LUA que pode ser utilizado para programar o ESP8266. Com esse runtime em LUA é possivel fazer coisas incríveis de forma muito fácil como:

- Configuração de WiFi (conectar em redes, salvar credenciais e etc.)
- Realizar requisições HTTP e criar um servidor HTTP.
- Utilizar as I/O do hardware como GPIO, I²C, PWM, etc.

Mas quando eu conheci esse módulo, pouco tempo depois foi lançado o suporte para programação deste módulo utilizando todo o ecosistema do Arduino. Com isso você pode programar esse microcontrolador, que já muito bom, aproveitando todo o conhecimento e bibliotecas deste ecosistemas, como por exemplo [MQTT](https://github.com/knolleary/pubsubclient), [Web Server](https://github.com/esp8266/Arduino/tree/master/libraries/ESP8266WebServer), [Neopixels](https://blog.adafruit.com/2015/06/30/updated-neopixel-support-for-esp8266-and-arduino-zero/), [Firmata](https://github.com/firmata/arduino/issues/257) (com isso, [Johnny-Five](http://johnny-five.io/)!), e muito mais.

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/2.jpeg)
Casamentos feitos nos céus

E você também pode encontrar o ESP8266 em diversos formatos, de acordo com as necessidades do seu projeto como por exemplo, quantidade de portas, tamanho, facilidade de programação, etc. Veja alguns modelos :

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/3.png)
ESP01, SparkFUN ESP8266 Thing e Wemos D1 — Diferentes formatos dependendo do que você precisa.

A maior parte dos meus projetos com Arduino foi para trabalhar com automação residencial, então por que não fazer com uma tomada que pode ser controlada pela internet e até por comando de voz.

Nós vamos fazer isso construindo um dispositivo que se conecta a um servidor MQTT, recebendo e publicando o status do dispositivo, que então pode ser enxergado por diversas centrais de automação como [Home Assistant](http://home-assistant.io). Partindo do Home Assistant podemos integrar com outros assistantes como o [Amazon Echo](https://www.amazon.com/Amazon-Echo-Bluetooth-Speaker-with-WiFi-Alexa/dp/B00X4WHP5E), a [Siri com HomeKit](http://www.apple.com/ios/siri/) ou o [Google Home](https://madeby.google.com/home/). Eu uso em casa o Home Assistant e o Homekit (através do [Homebridge](https://github.com/nfarina/homebridge)) rodando em um Raspberry Pi.

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/4.jpeg)
Alguns dos principais componentes usados

#### Materiais necessários

#### Eletrônicos

- Algum módulo ESP8266
- Módulo de relé 5v
- Transistor 2N222A (mais a frente eu explico)
- Resistor de 10k e 1k
- Fonte de celular 5v (comprei vários desses simples da China)
- (Opcional) Regulador de tensão AMS1117. Dependendo do seu módulo ESP8266, você vai precisar para converter a corrente de 5v para 3.3v. No meu caso estou usando um NodeMCU que já tem um conversor.
- Jumpers e fios de alta tensão
- Raspberry Pi com Home Assistant ([Iniciando com Home Assistant](https://medium.com/@alvaroviebrantz/iniciando-com-home-assistant-no-raspberry-pi-47d1782db664))

#### Elétrica

- Caixa com tomada
- Fios de alta tensão
- Conector de tomada macho

#### Ferramentas

- Ferro de solda
- Silicone (para isolar algumas conexões)
- Alicates de corte e de desencapar fios
- Multímetro (pra testar tudo)

### MQTT, HomeAssistant e Assistentes

Você deve estar provavelmente se perguntando como que isso tudo vai funcionar, mas vou explicar as partes que vão compor esse dispositivo para facilitar esse processo.

O [MQTT](http://mqtt.org) é um protocolo leve muito utilizado em IoT para comunicação de dispositivos em rede. Com ele você tem o conceito de produtores e consumidores de mensagens, onde cada um se registra (**SUBCRIBE**) ou publica (**PUBLISH)** uma mensagem em um tópico dentro de um servidor (**BROKER)** MQTT. O tópico é um caminho qualquer, com um nome definido por você, em que as dispositivos podem ser conectar. Veja um exemplo.

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/5.png)
Visão da comunicação MQTT

O tópico **sala/luz1/estado** pode ser o caminho que um dispositivo **Pub1** que controla a **luz 1** que está na **sala, publica** o seu estado e outro dispositivo **Sub1** pode **registrar** a esse mesmo tópico e receber as mudanças de estado do dispositivo **Pub1.** Com isso temos uma comunicação assincrona entre os dispositivos através de mensagens.

O Home Assistant já foi explorado em outro post meu, mas basicamente é uma central de automação com integração de diversos componentes, sendo um deles o [de luzes e tomadas MQTT](https://home-assistant.io/components/light.mqtt/), que é o que vamos utilizar aqui. Recomendo dar uma olhada no post se ainda não tem o Home Assistant instalado em sua casa ([Iniciando com Home Assistant](https://medium.com/@alvaroviebrantz/iniciando-com-home-assistant-no-raspberry-pi-47d1782db664)).

A partir do Home Assistant conseguimos integrar com o Homebridge para integrar com o HomeKit do iOS como foi explicado nesse post e também usar o componente [emulated_hue_bridge](https://home-assistant.io/components/emulated_hue/), que simula uma ponte da Philips Hue com os dispositivos conectados ao Home Assistant, podendo então ser integrado e comandados por voz com o Amazon Echo e o Google Home. Então você estará bem servido de integrações de assistentes pessoais.

### Programando o ESP8266

Para programar o ESP8266 com a IDE do Arduino você deve primeiro instalar o suporte a esse módulo. Isso pode ser feito facilmente hoje com o _Board Manager_ que pode ser acessado em _Ferramentas > Placa > Board Manager_. Procure por ESP8266 e instale o suporte a esse módulo.

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/6.png)
Board Manager da IDE do Arduino

Também temos agora na IDE do Arduino o _Library Manager_, que pode ser acessado pelo menu _Sketch > Include Library > Manage Libraries_. Nesse menu você buscar e instalar novas bibliotecas. Ele tem a mesma cara do _Board Manager_.

Vamos usar algumas bibliotecas para desenvolver, segue a lista de cada uma delas e para que elas servem. Elas devem ser instaladas via _Library Manager_:

- **PubSubClient** — Client para servidor MQTT.
- **WiFiManager** — Permite a configuração WiFi do ESP8266 acessando um portal diretamente no dispositivo, se ele não tiver nenhum rede já configurada.
- **ArduinoJSON** — Vamos salvar um arquivo de configuração no formato JSON com os dados de servidor e porta do serviço MQTT.

O código utilizado pode ser encontrado no meu Github, vou postar sempre os códigos dos projetos aqui do blog lá. Você só precisar trocar as variáveis MQTT_RELAY_STATE_TOPIC e MQTT_RELAY_COMMAND_TOPIC, que são os caminhos em que serão publicados os estados do dispositivo e onde o dispositivo vai escutar novos comandos.

[alvarowolfx/RelayBox](https://github.com/alvarowolfx/RelayBox)

Rodando esse código no seu módulo ESP8266, você pode buscar a rede WiFi dele ( no meu caso _fan_switch1_) e entrar com a senha _123456_. Isso vai abrir um portal de configuração onde você deve colocar o IP do seu Raspberry Pi na sua casa.

Você pode testar o funcionamento colocando um LED na porta D3 do ESP8266 e assim para verificar o funcionamento do código. Para a comunicação MQTT podemos usar um software como o MQTTLens e publicar ON/OFF no tópico configurado em MQTT_RELAY_COMMAND_TOPIC e ver o LED piscando de acordo com o comando.

![image](/articles/draft__como-fazer-uma-tomada-iot-com-esp8266-e-controlada-por-voz/images/7.png)
Usando o MQTTLens para enviar mensagens ao ESP8266 via MQTT

### Configurando um componente MQTT no Home Assistant

Vamos controlar esse nossa tomada inteligente (em sua versão alpha ainda) diretamente pela internet, usando nossa central de automação, o Home Assistant.

Vamos usar o componente [MQTT Switch](https://home-assistant.io/components/switch.mqtt/), que permite controlar tomadas que funcionam via MQTT, como a que programamos anteriormente. Para isso funcionar precisamos configurar o componente [MQTT](https://home-assistant.io/components/mqtt), vamos utilizar o próprio broker [Mosquitto](https://mosquitto.org) que foi instalado junto ao Home Assistant, se você seguiu nosso tutorial de configuração.
``_# Configuração no arquivo configuration.yml_ # Considerando os valores padrões do código que eu publiquei`# Conecta no broker mqtt instalado no Raspberry pi mqtt: broker: 127.0.0.1 port: 1883 client_id: home-assistant-1 keepalive: 60`# Configura um interruptor mqtt, com os tópicos de comando e estado
switch:

- platform: mqtt
  name: "Ventilador"
  command_topic: "living/fan1/switch"
  state_topic: "living/fan1/status"``

Agora é só reiniciar o Home Assistant para ele recarregar as configurações e logo no painel principal vai aparecer o componente "Ventilador" como nós configuramos. Se estiver tudo certo, vamos poder controlar o LED conectado em nosso ESP8266 com através desse interruptor no Home Assistant. Pode comemorar, já estamos bem encaminhados.

### Projeto Final

Agora falta colocar tudo junto e fazer nossa tomada mais bonitinha para a patroa não reclamar.
