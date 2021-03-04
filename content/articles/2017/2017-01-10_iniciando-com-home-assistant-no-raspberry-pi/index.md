---
title: "Iniciando com Home Assistant no Raspberry Pi"
author: "Alvaro Viebrantz"
date: 2017-01-10T14:15:04.795Z
lastmod: 2021-02-26T10:50:41-04:00

description: ""

subtitle: "Sua casa conectada e de fazer inveja nos amiguinhos"

image: "/articles/2017/2017-01-10_iniciando-com-home-assistant-no-raspberry-pi/images/1.png"
images:
  - "/articles/2017/2017-01-10_iniciando-com-home-assistant-no-raspberry-pi/images/1.png"
  - "/articles/2017/2017-01-10_iniciando-com-home-assistant-no-raspberry-pi/images/2.png"

aliases:
  - "/iniciando-com-home-assistant-no-raspberry-pi-47d1782db664"
---

_Sua casa conectada e de fazer inveja nos amiguinhos_

Uso como central de automação na minha casa o projeto Open Source chamado [Home Assistant](http://home-assistant.io). Ele é um software muito interessante por ser de fácil configuração, visual muito bonito e com quase 500 componentes diferentes que podem ser integrados para fazer sua casa ser a mais inteligente possível. Meu intuito aqui é apresentar esse projeto e como instalar em um Raspberry Pi.

![image](/articles/2017/2017-01-10_iniciando-com-home-assistant-no-raspberry-pi/images/1.png)
Visual bacanudo do Home Assistant

Os componentes são divididos em diversas áreas, sendo que esses podem ser acionados e/ou consultados. Os componentes podem ser vistos em [**https://home-assistant.io/components**](https://home-assistant.io/components)**.** Segue alguns dos tipos:

- Luzes e tomadas
- Alarmes
- Câmeras IP
- Sensores
- Localização de pessoas e dispositivos
- Travas e portões de garagem
- Controles de media players
  ![image](/articles/2017/2017-01-10_iniciando-com-home-assistant-no-raspberry-pi/images/2.png)
  Componentes em destaque no site do Home Assistant

Também tem um poderoso motor de automações, com captura de eventos e respostas dependendo da situação, como por exemplo, enviar uma notificação quando algum movimento for detectado em casa, ligar o ventilador se a temperatura estiver acima de um certo limiar, ativar um modo cinema se algum media player da casa estiver em estado de play e muitos outras idéias que sua imaginação pode criar.

O canal no Youtube [BRUH Automation](https://www.youtube.com/channel/UCLecVrux63S6aYiErxdiy4w) é uma fonte muito boa para ver o funcionamento do Home Assistant. Veja um vídeo de demonstração dele:

Mito do Home Assistant

### Passo a Passo de instalação do Home Assistant

Ao final deste passo a passo você vai ter uma instância do Home Assistant rodando na sua casa de maneira simples e pronta pra rodar suas integrações.

**Instalando o Rasbian no Raspberry Pi**

- Baixe o [Rasbian Jessie](https://www.raspberrypi.org/downloads/raspbian/) aqui e extrai o zip com a imagem.
- Siga um dos guias abaixo dependendo do seu sistema operacional.

* [Linux](https://www.raspberrypi.org/documentation/installation/installing-images/linux.md)
* [Mac](https://www.raspberrypi.org/documentation/installation/installing-images/mac.md)
* [Windows](https://www.raspberrypi.org/documentation/installation/installing-images/windows.md)

- Coloque o cartão SD no Raspberry Pi e coloque na tomada.
- Conecte o Raspberry Pi via ethernet no seu roteador.
- Procure o IP dele, eu uso o [FING](https://www.fing.io) para essa tarefa.

**Configuração inicial do Raspberry Pi**

1.  Conecte nele via **SSH** ([Putty](http://www.putty.org/) no Windows, Terminal no Mac ou Linux)
    O usuário e senha padrão é **pi**/**raspberry**
2.  Rode **sudo apt-get update**
3.  Rode **sudo apt-get upgrade** e responda **Y** quando for pedido
4.  Rode o comando **sudo raspi-config**
5.  Escolha **expand the file system**
6.  Escolha **set the timezone** e escolha seu fuso horário local.
7.  Escolha **finish and reboot**

**Configurando rede WiFi no on Raspbian Jessie via linha de comando (Opcional)**

Se você quiser conectar seu Raspberry na WiFi da casa, siga esse passo a passo. Ele é opcional, eu mesmo utilizado o meu conectado no roteador.

1.  Digite o comando **sudo iwlist wlan0 scan**
2.  Procure pelo nome da sua rede e ESSID
3.  Digite **sudo nano /etc/wpa_supplicant/wpa_supplicant.conf** para abrir o arquivo de configuração deWiFi.
4.  Vá até o final do arquivo e digite:`network={ ssid=&#34;O ESSID encontrado no passo anterior&#34; psk=&#34;Senha da Rede&#34; }`

5.  Aperte **control-x**, e então presione **Y** para salvar.

6.  Reiniciei seu Raspberry com o comando **sudo reboot** e remova o cabo Ethernet. Ele vai tentar se conectar novamente via WiFi, tente conectar nele via SSH novamente, procurando o IP pelo FING.

### **Instalando o HomeAssistant (HA)**

O Home Assistant agora possui um instalador All-In-One que já inclui a instalação de vários componentes que são dependências dele, para não ter desculpa de usar o **HA** no seu Raspberry Pi.

1.  Vá para a página do Home Assistant para utilizar o [All-In-One Installer](https://home-assistant.io/getting-started/installation-raspberry-pi-all-in-one/).
2.  Rode o comando via **SSH** e digite a senha quando for requerido:``wget -Nnv https://raw.githubusercontent.com/home-assistant/fabric-home-assistant/master/hass_rpi_installer.sh &amp;&amp; chown pi:pi hass_rpi_installer.sh &amp;&amp; bash hass_rpi_installer.sh` `

Vá tomar um café por que isso vai demorar um pouco, mas vai fazer algumas coisas interessantes como:

- Criar os **diretórios**, **usuários** e **permissões** corretamente.
- Instalar o **Python** e suas dependências
- Instalar o _broker_ [MQTT Mosquitto](http://mosquitto.org) com suporte pra _Websocket_.
- Adiciona o Home Assistant como serviço de inicialização no Linux ( controlado via **systemctl**).
- Os arquivos de configuração podem ser encontrado em **/home/homeassistant/.homeassistant**. Nessa pasta você encontra o arquivo **configuration.yml**, onde os componentes são configurados.

Se você já fez até aqui, teremos então uma instancia do Home Assistant rodando no seu Raspberry Pi na porta **8123** podendo ser acessado em qualquer navegador na rede por **ip-raspberry:8123**. A seguir temos algumas configurações adicionais para facilitar o acesso a ele.

#### Acessar o Home Assistant via mDNS Local (Opcional)

Configurando um serviço de mDNS você consegue buscar na rede local com um nome amigável como **minhacasa.local**. Para exemplificar a configuração vou utilizar este nome, então onde estiver escrito **minhacasa** substitua pelo nome que você preferir.

1.  Digite **sudo apt-get install avahi-daemon** para instalar o Avahi.
2.  Digite **sudo nano /etc/hosts** e adicione no final do arquivo:`127.0.0.1 minhacasa`

3.  Digite **sudo nano /etc/hostname** e altere o seu hostname:
    `minhacasa`

4.  Digite **sudo /etc/init.d/hostname.sh** para _setar_ o hostname.

5.  Reinicie o Raspberry Pi usando o comando **sudo reboot**.

Agora com isso você não precisa mais ficar lembrando o IP do seu Raspberry, você pode até mesmo logar via **SSH** usando um comando como **ssh pi@minhacasa.local** e acessar o seu Home Assistant digitando no navegador **minhacasa.local:8123**.

#### Acessar o Home Assistant via Internet (Opcional)

Podemos utilizar um serviço de IP dinâmico para acessar o Home Assistant quando estiver fora de casa. Vou dar um exemplo aqui com o [**DuckDNS**](http://duckdns.org/), que é grátis e entrega o prometido. Além da configuração a seguir você tem que configurar seu roteador para fazer o _Port Foward_ e isso varia muito para cada modelo, então recomendo dar uma olhada no site [portforward.com](https://portforward.com).

1.  Crie uma conta no **DuckDNS** e configura um domínio de sua preferência.
2.  Digite os comandos a seguir via **SSH** para configurar o serviço no Raspberry.
3.  Crie uma pasta com o comando **mkdir duckdns**.
4.  Mude para a pasta criada com o comando **cd duckdns**.
5.  Criei um arquivo e copiei o conteúdo que o DuckDNS na pagina de instalação. O comando **nano duck.sh** cria e abre o arquivo, depois é só dar **control+c/v** para copiar o texto com o **token** do site. Aperte **control-x**, e então pressione **Y** para salvar.
6.  Rode o comando **chmod 700 duck.sh** para dar permissão de execução ao arquivo.
7.  Rode o comando **crontab -e**, escolha o **nano** como seu editor e copie a linha a seguir. Isso vai configurar um serviço para executar de tempos em tempos o comando do arquivo **duck.sh**:`***/5 * * * * ~/duckdns/duck.sh &gt;/dev/null 2&gt;&amp;1**`

8.  Rode o arquivo com o comando **./duck.sh**

9.  Rode o comando **cat duck.log**, deve retornar **OK**

10. Rode o comando **sudo service cron start** para iniciar o serviço.

Com isso configurado o Raspberry Pi vai informar de tempos em tempos o IP Público da sua casa e você vai poder acessar ele via o domínio configurado no site do DuckDNS.Com tudo isso em mãos, você pode brincar com os mais diversos componentes fornecidos pela plataforma, você pode conferir eles [e](https://home-assistant.io/components/)m [**https://home-assistant.io/components**](https://home-assistant.io/components). Vou postar diversas integrações como ele, então fique ligado em novos posts.> Gostou do post ? Então não esqueça de curtir clicando no ❤ aqui em baixo e de recomendar e compartilhar com os amiguinhos.> Fez alguma coisa bacana com os tutoriais aqui ? Mostre nos comentários.> Qualquer dúvida mande nos comentários que eu vou tentar te ajudar.
