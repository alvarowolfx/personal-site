---
title: "Controlando sua casa com a Siri (usando o Homebridge)"
author: "Alvaro Viebrantz"
date: 2017-02-04T22:54:27.657Z
lastmod: 2021-02-26T10:50:44-04:00
tags:
  - Homebridge
  - home automation
  - raspberry pi
  - siri
  - ios
  - homekit
  - home assistant
  - smart home
  - iot
  - internet of things
description: ""

subtitle: "Controlando sua casa usando por comando de voz com a Siri, isso é uma coisa linda de Deus."

image: "/articles/2017/2017-02-04_controlando-sua-casa-com-a-siri-usando-o-homebridge/images/1.jpeg"
images:
  - "/articles/2017/2017-02-04_controlando-sua-casa-com-a-siri-usando-o-homebridge/images/1.jpeg"
  - "/articles/2017/2017-02-04_controlando-sua-casa-com-a-siri-usando-o-homebridge/images/2.jpeg"
  - "/articles/2017/2017-02-04_controlando-sua-casa-com-a-siri-usando-o-homebridge/images/3.png"

associated:
  - "https://medium.com/@alvaroviebrantz/controlando-sua-casa-com-a-siri-usando-o-homebridge-be317a306bfb"
---

#### Controlando sua casa usando por comando de voz com a Siri, isso é uma coisa linda de Deus.

{{< youtube vlgLyHO-O1o >}}

O **Homebridge** é um servidor escrito em **NodeJS** que você pode rodar na sua rede e simular a API **Homekit** do iOS. Ele \***\* é um projeto super modular e pode ser expandido com diversos módulos feitos pela comunidade, inclusive integrando com alguns dispositivos inteligentes que não se integram automaticamente ao **HomeKit\*\*, como por exemplos as lampadas e tomadas da _Belkin Wemo_ e _Philips Hue_. Tem um plugin reservado no céu para cada um deles.

### Homekit

O **HomeKit** não chega a ser um aplicativo, ele na verdade é um banco de dados e uma _API_, mais ou menos como o **HealthKit** para dados de saúde e o **PassKit** para os tíquetes e cartões, sendo que cada um tem seu aplicativo no iOS, no caso o **Health** e o **Wallet** respectivamente.

{{< figure src="./images/1.jpeg" caption="Aplicativos padrão do iOS — Wallet, Health e Home podem ser vistos ai" >}}

O **HomeKit** no caso é um banco de dispositivos de automação e seu aplicativo a partir do iOS 10 é o Home, mas nada impede de instalar outros como o [Elgato EVE](https://itunes.apple.com/br/app/elgato-eve/id917695792?mt=8) por exemplo. Eu gosto bastante do visual do aplicativo padrão.

{{< figure src="./images/2.jpeg" caption="Carinha do aplicativo Home — Eu particularmente prefiro ele do que outras alternativas na App Store" >}}

O bacana de utilizar o HomeKit é que todos os dispositivos registrados pode ser comandados e consultados via comandos de voz com a Siri. E como o Homebridge possui diversos _plugins_, você consegue adicionar diferentes dispositivos sem gastar muito. Alguns dos comandos que podem ser utilizados:

- _Siri, desligue o ventilador._
- _Siri, ligue a luz do escritório_
- _Siri, bom dia. (Ativa cenas configuradas na casa)_
- _Siri, qual a temperatura no quarto ?_

O Homekit possui vários dispositivos oficiais que são comercializados no mercado, mas a maioria deles não tem um preço muito convidativo, então seguindo este tutorial poderemos integrar nossos próprios dispositivos com essa API bem bacana de automação e casa inteligente da Apple.

### Passo a Passo de instalação do Homebridge

A maioria dos passos foi extraída da própria Wiki do projeto, que pode ser visto [aqui](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi). Se quiser algo mais detalhado e não se importar com inglês, está ai a fonte.

> [Projeto homebridge no Github](https://github.com/nfarina/homebridge/wiki/Running-HomeBridge-on-a-Raspberry-Pi)

Ao final vou mostrar como configurar o Homebridge no iOS e como integrar com o minha central favorita: **Home Assistant**. Ainda não sabe o que é o Home Assistant ? Ouvi falar que esse post é muito bom para iniciar com ele no Raspberry Pi.

> [Iniciando com Home Assistant no Raspberry Pi](/articles/2017/2017-01-10_iniciando-com-home-assistant-no-raspberry-pi)

#### Instalando o NodeJS no Raspberry Pi

- Digite o comando a seguir para adicionar o repositório do Node ao seu Linux e instalar o NodeJS:

```
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```

- Se estiver com uma versão antiga do Raspberry, talvez não dê certo instalar direto do repositório (é o meu caso com o Raspberry Pi 1). Baixe o NodeJS já compilado para Linux embarcado disponibilizado no site deles e instale manualmente com os comando:

```
wget https://nodejs.org/dist/v6.9.2/node-v6.9.2-linux-armv6l.tar.xz

# Descompacte e renomeie com os comandos:
tar -xvf node-v6.9.2-linux-armv6l.tar.xz
mv node-v6.9.2-linux-armv6l node-v6

# Mude para o diretório e copie seu conteúdo para /usr/local
cd node-v6/
sudo cp -R * /usr/local/
```

- Se tudo estiver correto, rodando o comando **node -v** deve imprimir algo como:

```
pi@minhacasa:~ $ node -v
v6.9.2
```

### Instalando algumas dependências extras

O projeto Homebridge utiliza como base a biblioteca HAP-NodeJS que implementa as primitivas do Homekit e essa lib tem algumas dependências extras com o módulo Avahi. Apenas execute o comando a seguir que isso será instalado:

```
sudo apt-get install libavahi-compat-libdnssd-dev
```

### Instalando o Homebridge

Agora finalmente para a instalação do Homebridge. Se você estiver instalado via **apt-get**, você deve substituir **/usr/local/lib** por **/usr/lib** nos comandos a seguir:

```
sudo npm install -g --unsafe-perm homebridge hap-nodejs node-gyp
cd /usr/local/lib/node_modules/homebridge/
sudo npm install --unsafe-perm bignum
cd /usr/local/lib/node_modules/hap-nodejs/node_modules/mdns
sudo node-gyp BUILDTYPE=Release rebuild
```

### Configurando o Homebridge como serviço de sistema

Em sistemas Linux Debian mais novos o gerenciador de serviços de sistema utilizado é o **systemd,** ele é normalmente bem mais simples de configurar do que por scripts **init.d**. Vamos criar dois arquivos de acordo com esse [Gist](https://gist.github.com/johannrichard/0ad0de1feb6adb9eb61a/) de um dos mantenedores do projeto.

- Crie o arquivo **homebridge** dentro de **/etc/default** e copie o conteúdo a seguir, você pode usar o **nano** como já usamos anteriormente.

```
# Configuration options for homebridge
# The following settings tells homebridge where to find the config.json file and where to persist the data (i.e. pairing and others)
HOMEBRIDGE_OPTS=-U /var/homebridge
# If you uncomment the following line, homebridge will log more

# You can display this via systemd’s journalctl: journalctl -f -u homebridge

# DEBUG=*
```

- Crie o arquivo **homebridge.service** dentro de **/etc/systemd/system** e copie o conteúdo a seguir:

```
[Unit]
Description=Node.js HomeKit Server
After=syslog.target network-online.target

[Service]
Type=simple
User=homebridge
EnvironmentFile=/etc/default/homebridge

# Adapt this to your specific setup (could be /usr/bin/homebridge)
ExecStart=/usr/local/bin/homebridge $HOMEBRIDGE_OPTS
Restart=on-failure
RestartSec=10
KillMode=process

[Install]
WantedBy=multi-user.target
```

Com os arquivos criados agora precisamos registrar o serviço. Para isso vamos criar um usuário para o Homebridge e os diretório para as configurações.

- O usuário pode ser criado com o comando:

```
useradd — system homebridge
```

- Criar um diretório **/var/homebridge** que o usuário criado possa escrever e também o arquivo **config.json** dentro do diretório.

```
# Cria diretório
sudo mkdir /var/homebridge
# Adiciona permissão ao usuário
sudo chown -R homebridge:homebridge /var/homebridge/
# Abra o arquivo e copie o próximo conteúdo
nano config.json /var/homebridge/config.json
```

Copie no **config.json** o conteúdo a seguir, podendo mudar o nome da ponte e a senha, que são os atributos **name** e **pin** respectivamente.

```
{
  "bridge": {
    "name": "Home Viebrantz",
    "username": "CC:22:3D:E3:CE:30",
    "port": 51826,
    "pin": "031-45-154"
  },
  "platforms": []
}
```

Agora recarregue os arquivos do **systemd** e habilite o serviço do Homebridge com os comandos:

```
sudo systemctl daemon-reload
sudo systemctl enable homebridge
sudo systemctl start homebridge
```

Você pode checar os _logs_ com o comando:

```
sudo systemctl status homebridge
```

Agora você tem um Homebridge rodando, que reinicia se o serviço falhar e inicia junto com a inicialização do sistema.

### Instalando plugins

Sem plugins o Homebridge não faz nada, com eles você pode adicionar várias integrações a ele e disponibilizar via Homekit no seu iOS. Os plugins são módulo NPM e devem ser instalados globalmente para que possam ser adicionados ao Homebridge.

Vou dar um exemplo configurando é claro o meu querido Home Assistant, que possui um plugin oficial para isso chamado [homebridge-homeassistant](http://github.com/home-assistant/homebridge-homeassistant). Com essa integração diversos tipos componentes configurados são **automagicamente** integrados ao HomeKit.

Alias uma forma de encontrar novos plugins, buscando por módulo que iniciem o nome com **homebridge-** no repositório NPM. Para instalar globalmente o homebridge-homeassistant rode o comando:

```
sudo npm install -g homebridge-homeassistant
```

Após instalado um plugin você deve registra-lo no arquivo **config.json** no atributos **platform**. Cada plugin tem os atributos específicos, segue o exemplo para adicionar o Home Assistant.

```
...
"platforms": [
    {
      "platform": "HomeAssistant",
      "name": "HomeAssistant",
      "host": "http://127.0.0.1:8123",
      "password": "",
      "supported_types": ["binary_sensor", "cover", "fan", "input_boolean", "light", "lock", "media_player","scene", "sensor", "switch"]
    }
  ]
```

Para que essa integração funcione você deve ativar o componente [http](https://home-assistant.io/components/http/) no Home Assistant no **configuration.yml**.

```
http:
```

Com isso é só reiniciar o Homebridge para que ele carregue a nova configuração. Isso pode ser feito com o **systemd**.

```
sudo systemctl restart homebridge
```

### Adicionando ao seu dispositivo iOS

Bom agora vem a parte mais interessante que é configurar a ponte do Homebridge no iOS. Para isso abra o aplicativo Casa e siga os passos:
{{< figure src="./images/3.png" caption="Passo a Passo dentro do Aplicativo Casa no iOS" >}}

- Toque em + no canto superior direto e escolha **Adicionar Acessório.**
- Espere aparecer a sua ponte do Homebridge, no meu caso **Home Viebrantz.**
- Ao seleciona a ponte, vai aparecer um aviso que o acessório não é certificado (que blasfêmia), toque em **Adicionar Mesmo Assim** e digite o código de 8 dígitos o **pin** que foi configurado no **config.json** do Homebridge.
- Após isso todos os acessórios disponíveis no Home Assistant vão aparecer um a um para serem configurados. Neste momento você pode alocar cada um em um comodo da casa e dar um nome fácil a ser chamado via comando de voz.

> **ATENÇÃO**, se o nome que você quer usar tem acentuação, coloque corretamente, a Siri não entende "luminaria" sem acento, coloque "luminária" para não ter problemas.

Agora é só correr pro abraço e começar a utilizar os comandos de voz para controlar sua casa.O Homekit é uma API muito interessante e deixa a Apple um pouco a frente no mercado de automação e casa inteligente com relação aos seus concorrentes, pois isso tudo já está embutido no próprio iOS.

Somando isso a nossa central, o Home Assistant, podemos criar dispositivos próprios, funcionando até mesmo com equipamentos legados, como dei o exemplos com um ventilador e luminárias, sem ter que recorrer aos equipamentos oficiais, que normalmente são bem caros.

{{< crosspost >}}
