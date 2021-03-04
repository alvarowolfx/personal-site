---
title: "FAQ — Perguntas frequentes sobre o ESP8266"
author: ""
date:
lastmod: 2021-02-26T10:52:04-04:00
draft: true
description: ""

subtitle: "Atualmente essa plaquinha é o Santo Graal da Internet das Coisas e aqui vou tentar tirar as duvidas mais frequentes sobre ela."
---

#### Atualmente essa plaquinha é o Santo Graal da Internet das Coisas e aqui vou tentar tirar as duvidas mais frequentes sobre ela.

### O que é o módulo ESP8266 ?

**Resposta:** É um System-On-Chip (SoC) fabricado pela **Espressif**, contendo microcontrolador, entradas e saídas analógicas e digitais e a cereja do bolo- WiFi embutido.

#### As especificações técnicas são as seguintes:

- Possui entradas e saídas de uso geral (GPIO), podendo a maioria ser utilizada como PWM
- Barramento I²C
- Barramento SPI
- Serial UART
- Clock de 80MHz, com possibilidade de operar em 160MHz;
- 32KBytes de RAM para instrução e 96KBytes de RAM para dados;
- Memória Flash 512KBytes a 4096Kb, dependendo do modelo.

### Quais modelos e variações existentes ?

**Resposta:** Existe uma gama grande de módulos ESP8266, já que diversas fabricantes se habilitaram e desenvolver módulos baseados neste chip.

### Quais placas de desenvolvimento existentes ?

**Resposta:** As placas de desenvolvimento facilitam o uso e gravação do módulo ESP8266, já que normalmente possui chip de comunicação serial, reguladores de tensão, as vezes módulos de carregamento de baterias e entre outras facilidade. As principais placas de desenvolvimento existente são as seguintes:

NodeMCU

Wemos D1 Mini e Wemos D2

Adafruit Feather Huzzah

Sparkfun ESPThing

### Preciso de um Arduino para usar o ESP8266 ?

**Resposta:** Não. Este módulo pode ser programado de forma independente, já que também possui um microcontrolador completo. O próximo tópico mostra algumas formas de como você pode fazer isso.

### Como posso programar este módulo ?

**Resposta:** Existe uma infinidade de maneiras de programar este módulo. Aqui vou listar superficialmente as mais conhecidas.

#### SDK oficial da Espressif

A SDK oficial feita pela Espressif permite a programação de duas maneiras, sem Sistema Operacional (S.O.) , rodando direto no chip e com o S.O. FreeRTOS. Todo a documentação pode ser vista no site oficial [https://espressif.com/en/support/explore/get-started/esp8266/getting-started-guide](https://espressif.com/en/support/explore/get-started/esp8266/getting-started-guide). A programação neste caso é nativa em C++.

#### Ecossistema e IDE do Arduino

O ecossistema do Arduino é muito rico, permitiu que muitas pessoas entrassem neste mundo Maker e de dispositivos embarcados por conta da abstração de hardware bastante facilitada que foi criada em cima de diversos microcontroladores. No caso das placas oficiais Arduino, a maioria é baseada em chips da Atmel.

Porém o que muitos não sabem é que é possível utilizar outros microcontroladores neste ecossistema, deste que as devidas abstrações sejam implementadas no chip de interesse. Cada novo **core** (como é chamada essa abstração) permite estender esse ecossistema, dando suporte a uma gama maior de placas. A vantagem disso é que hoje temos diversas bibliotecas já feitas para as mais diversas funcionalidades e hardwares existentes, entçao implementando um novo **core** do Arduino, permite que essas mesma bibliotecas sejam utilizadas com outros microcontroladores. E este é o caso do ESP8266, que tem um core feito pela comunidade que pode ser visto em [https://github.com/esp8266/Arduino](https://github.com/esp8266/Arduino). A programação neste caso também é em C++.

Para configurar a IDE do Arduino para programar o ESP8266, eu recomendo o post no blog do FilipeFlop: [http://blog.filipeflop.com/wireless/programar-nodemcu-com-ide-arduino.html](http://blog.filipeflop.com/wireless/programar-nodemcu-com-ide-arduino.html)

#### MongooseOS e Javascript

#### Python e MicroPython

Python já é uma linguagem bastante conhecida por ser de fácil aprendizado, mas ao mesmo tempo bastante poderosa, sendo bastante utilizada pelo Google e também vem ganhando muito espaço na área de ciência de dados, Big Data e Aprendizado de máquina. Pois bem, os caras implementaram uma versão do Python para dispositivos embarcados e deram o carinhoso nome de MicroPython. Mais detalhes podem ser vistos em: [micropython.org](http://micropython.org/)

E nosso amigo ESP8266 também tem suporte para o MicroPython agora, apesar de terem ainda poucos conteúdos brasileiros sobre essa integração (que eu ainda pretendo explorar aqui no blog), tem um tutorial de como começar do pessoal do blog Do Bit Ao Byte: [http://dobitaobyte.com.br/esp8266-com-micropython](http://dobitaobyte.com.br/esp8266-com-micropython)

#### NodeMCU e Lua

### Dá pra vender um produto com o ESP8266 ?

**Resposta:** Sim. Não só isso é possível como também vou mostrar alguns produtos que estão sendo vendidos com ela embutida. Segue os principais produtos na minha humilde opinião.

> Todos os módulo mostrados a seguir podem ser reprogramados, o que é bastante interessante, já que podemos modifica-los de acordo com nossa necessidade e em um nível bem mais baixo.

#### Lâmpada inteligente AI Light

Lampadas inteligentes que podem ser ligados, desligados e dimerizados diretamente via Smartphone e pela internet.

[Aliexpress.com : Buy DIY Wifi LED Bulb E27 5W AC110 240V lampada LED Dimmable Bulb Lamp Remote…](http://s.aliexpress.com/mEBbEjaU)

#### Controladora de Fita de Led Wi-Fi

Chega de fita de LED com controle remoto de infravermelho, nada melhor do que poder controlar direto pela internet e pelo Smartphone;

[ARILUX® AL-LC01 Super Mini LED WIFI Smart RGB Controller For RGB LED Strip Light DC 5-28V Sale …](http://m.banggood.com/ARILUX-AL-LC01-Super-Mini-LED-WIFI-Smart-RGB-Controller-For-RGB-LED-Strip-Light-DC-9-12V-p-1058603.html?p=VD18093452842013112L)

#### Tomadas e sensores Wi-Fi da ITead

Módulo que pode ser utilizado para controlar qualquer dispositivo de corrente alternada (AC) já que possui um relé que pode ser controlado de qualquer lugar.

[Sonoff WiFi Wireless Smart Switch for Smart Home](https://www.itead.cc/sonoff-wifi-wireless-switch.html)

### Erros frequentes

Aqui vou listar os principais problemas que já vi o pessoal tirando dúvida nos grupos relacionados a este módulo.

#### Falha de upload — espcomm_upload_mem failed

Esse é um erro que já vi muitas pessoas perderem a noite ao utilizar o ESP8266.
`warning: espcomm_sync failed error: espcomm_open failed error: espcomm_upload_mem failed`
