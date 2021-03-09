---
title: "Por que usar React Native no desenvolvimento de aplicativos ?"
author: "Alvaro Viebrantz"
date: 2016-07-09T02:34:59.626Z
lastmod: 2021-02-26T10:50:38-04:00
draft: true
description: ""

subtitle: "Dei um talk sobre React Native no FrontInCuiabá deste ano, porém por problemas técnicos não conseguimos gravar as palestras do evento. Eu…"

image: "/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/1.png"
images:
  - "/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/1.png"
  - "/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/2.png"
  - "/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/3.png"
  - "/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/4.png"

aliases:
  - "/por-que-usar-react-native-no-desenvolvimento-de-aplicativos-a8d3d9a57cc4"
---

Dei um talk sobre React Native no [FrontInCuiabá](http://frontincuiaba.com.br) deste ano, porém por problemas técnicos não conseguimos gravar as palestras do evento. Eu tive um feedback muito bom do pessoal, então meu intuito aqui é passar todo o conteúdo que passei no evento e iniciar uma série de posts sobre esta tecnologia, já que existe pouco conteúdo brasileiro sobre.

> Gosto de começar com um **disclaimer**, dizendo que trabalhei com [Ionic Framework](http://ionicframework.com/) (Cordova) e também também um bom tempo com AngularJS. Dei palestras e cursos sobre essas tecnologias, então não sou hater de Angular e Cordova, mas atualmente meus esforços se viraram para o ecosistemas do React.

O [**React Native**](http://facebook.github.io/react-native/) é um framework feito pelo **Facebook**, para desenvolvimento de aplicativos móveis, com um direcionamento interessante que a equipe chama de "_Learn once, write anywhere_", em que o desenvolvedor aprende o _React Way of Life_ e consegue aplicar em diversas plataformas. O grande diferencial aqui é que mesmo programando em Javascript na maior parte do tempo, não existe dependência de **WebView** como no **Cordova**, apresentando uma performance muito melhor e experiência praticamente **nativa** nos aplicativos desenvolvidos.

Mas vamos desmembrar as tecnologias envolvidas e navegar em mares nunca antes navegados.#### Primeiramente, por que React ?

A principal característica a se notar do **React** é que ele é uma biblioteca (não um framework) focado em **interfaces** (UI). Costumamos falar que ele é apenas o V do MVC, ou seja lá qual for a arquitetura você vai usar. Ele foi desenvolvido pelo **Facebook** e, o mais importante, é usado em produção nos principais projetos da empresa.

Uma definição mais funcional do **React** é a seguinte :

> f(data) => View> Sua **View** é gerada em função dos **dados** que são passados para ela.

Isso traz um conceito em que aplicações feitas com React tendem a ser mais **declarativas** e **Data-Driven**. Também força um fluxo de dados mais previsível em que os dados são passados de cima para baixo e as mudanças nos dados é que fazem sua interface ser re-renderizada. Parece muito simples, mas isso leva a componentes mais modulares e rápidos sem criar um emaranhado de dependências entre eles ( estou olhando pra você Angular 1).

Temos a polêmica do XML no meio do Javascript, o famoso **JSX**. Ele nada mais é do que um **syntatic sugar**, pensado para simplificar o processo de se montar interfaces simples e declarativas, tudo no final das contas vira Javascript. Inicialmente também não gostava da ideia, mas depois vi algumas vantagens :

- Você está basicamente o tempo todo trabalhando em Javascript, sem precisar saber tags especificas de algum _framework_ ou coisa do tipo. Quer fazer uma lista ? Faça um _for/map_ em uma lista. Quer fazer um condicional ? Escreva um _if/else_. Simples.
- O JSX é compilado, então se você fizer alguma coisa errada, você vai ter um feedback muito mais rápido ao desenvolver, nada de ver o erro só no navegador e após recarregar a página ( ou pior, só em produção ).
- Ao utilizar as tags JSX, você consegue ter um suporte de IDE’s muito mais interessante, não é apenas uma string que não pode ser entendida pela IDE. É possível ter até mesmo validação e auto-completar dos atributos de cada componente.

Apenas Javascript

Tudo é componente

Traga sua arquitetura

#### Como o React funciona internamente ?

Acho importante citar rapidamente como o React funciona internamente, pois isso faz parte do por que de ele ser considerado muito performático em muitos casos e o quão simples é de se entender a sua API de componentes.

- **Virtual Dom:** Uma das coisas que mais afetam a performance em aplicações web é a manipulação direta de elementos na DOM. Pensando nisso foi criado o conceito de Virtual DOM, que é uma representação em memória da arvore de componentes, a ser utilizada para que os componentes sejam renderizados da forma mais eficiente. Do ponto de vista do desenvolvedor o conceito de DOM é abstraído, dando a impressão que estamos atualizando apenas declarando a forma de nossa interface a partir do estado atual do componente, mas o React fica responsável por calcular as diferenças e aplica-las na DOM de forma eficiente.
- **Batch Update** e **Fast diff:** ainda sobre a Virtual DOM, essas alterações de estado são capturadas e calculadas em lote, sendo assim essas alterações são aplicadas primeiramente a essa estrutura em memória, depois é avaliado quais as minimas operações necessárias para se alterar a DOM real, para que então seja renderizado o estado atual da aplicação.
- **State** e **Props:** Todo componente em React tem basicamente dois atributos, State e Props. Eu costumo explicar isso de forma bem simples — State é o estado interno do componente e ele pode ser mudado (mutável) apenas por ele mesmo. Props são atributos que são recebidos de outros componentes e não devem ser alterados (imutável).> "State is what you own, Props is what you won." Viebrantz, Alvaro.

- **Lifecycle:** O ciclo de vida de cada componente por ser visto na imagem abaixo, funciona de forma muito simples e bastante previsível. Nada de ciclos de _digest, watch_ e _apply_ que tem comportamento bastante imprevisível em Angular por conta do modelo mais complexo de fluxo de dados, ao invés do fluxo mais simples de _One Way Data Flow_.
  ![image](/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/1.png)
  Component Lifecycle (fonte: [https://hharnisc.github.io/2016/03/24/react-introduction.html](https://hharnisc.github.io/2016/03/24/react-introduction.html))

#### Na crista da onda com o ecossistema do React

Várias tecnologias consideradas Cutting Edge

Javascript Moderno com ES6 e ES7(!!!)

Programação Funcional e Imutabilidade

Tooling fantastic, Hot Code Reload e Webpack/NPM

Novas arquiteturas de aplicações Redux/Flux/GraphQL

Várias libs atuais se inspiraram nisso tudo.

#### Desenvolvimento mobile atualmente

Todas essas vantagens citadas já estavam sendo vistas pela equipe do Facebook na Web, então por que não se apoiar nos ombros desse gigante e aplicar todo esse ecossistema ao desenvolvimento móvel ?

Existem vários movimentos e motivações para se utilizar tecnologias web para desenvolver aplicativos. Desenvolver nativo apresenta os seguintes problemas :

- Linguagem, **guidelines** e ferramentas especificas para cada plataforma.
- Equipes e _silos_ dentro da empresa para cada plataforma.
- Ciclo **tedioso** de codificar, compilar e testar.
- Caro em termos de tempo e valor entregue ao cliente.

Surgiram as soluções híbridas, inicialmente com o **Cordova**, que nada mais é do que envelopar uma _WebView_ em uma aplicação nativa e uma ponte de comunicação entre essa _WebView_ e as funções nativas do sistema. Isso foi uma revolução no desenvolvimento de aplicativos, já que você pode desenvolver utilizando as mesmas ferramentas para a web, com padrões bem estabelecidos como _HTML5_, _CSS3_, Javascript e ainda aproveitar o poder de funcionalidades nativas do _smartphone_ como geolocalização, camera, _TouchID_, _Bluetooth LE_ e outros.

![image](/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/2.png)
SDK Web para aplicativos (Ionic Framework)

Mas até então o Cordova te dava a base para (em termos simplórios) fazer um site e colocar na WebView, o que por si só era uma péssima ideia, pensando na experiência do usuário com seu aplicativo. Precisavamos de um SDK Mobile para a Web ( e que não seja jQuery Mobile por favor ). O [Ionic Framework](http://ionicframework.com) fez isso de forma incrível, reimplementando diversos elementos de navegação e interface nativas com padrões web e criando uma base sólida baseada em AngularJS para facilitar o desenvolvimento de apps. Sem contar o ecossistema incrível criado pela **Driftyco**, com serviços na nuvem para apps ( _push, analytics_ e _user management_), fóruns, canais no youtube e outras coisas que aqueceram muito o cenário de apps feitos com Cordova.

Mas agora vem a noticia um pouco triste, infelizmente nós precisamos conversar sobre as WebViews. Como pode ser visto [neste post](https://meta.discourse.org/t/the-state-of-javascript-on-android-in-2015-is-poor/33889/1) no Discource, temos dois rumos sendo seguidos pelas plataformas Android e iOS em termos de _Hardware_:

- **iOS** — foca em poucos núcleos de processamento, mas são núcleos mais eficientes e poderosos. Também há um investimento maior em poder gráfico.
- Android — foco em **multi-cores**, porém núcleos mais fracos e que consumam pouco energia.

Com isso chegamos a um _roadblock_: A web e o javascript são single-threaded então esse ambiente se beneficia mais de apenas um núcleo mais poderoso, dependendo também de poder gráfico para a parte de renderização e animação. Avaliando o _benchmark_ mais representativo do site deles, eles perceberam que o melhor aparelho Android na época (Galaxy S6) obtinha o _score_ de ~_400ms_, não parecendo ser ruim, porém o iPhone 5 (2012) obteve o score de ~_340ms_ e o iPhone 6s ~_70ms._
![image](/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/3.png)
Parece birra, mas quem trabalha com **Cordova**, sabe que é normal ter um app rodando lindamente no iOS e ter uma performance mais sofrida no Android infelizmente.

#### Vamos ao React Native de uma vez

#### Ecossistema

Uma algumas métricas que costumamos olhar ao se avaliar uma tecnologia é sua popularidade no mundo _Open Source_, e nesse sentido o React Native está indo muito bem.

O projeto já tem mais de **34mil stars** no [Github](http://github.com) e **865 contribuidores** (uau!!!). Novas versões são lançadas com uma frequencia relativamente rápida, eu mesmo quando comecei a mexer estava na versão **0.21** e hoje já estamos indo para a **0.30**. Sem contar todo o apoio dos engenheiros do próprio Facebook nas dúvidas que aparecem nas issues do projeto. O interessante que algumas _features_ não puderam ser liberadas pelo time do Facebook por estar muito vinculado a infra-estrutura deles, mas eles estão sempre tentando liberar novos componentes internos para a comunidade.

Bom outra métrica interessante a se avaliar é a quantidade de coisas que estão sendo produzidas para a tecnologia. No caso, buscando por "React Native" no [NPM](http://npmjs.com), encontramos mais de **2 mil pacotes**, temos projetos como o [js.coach](http://js.coach) e [awesome-react-native](http://github.com/jondot/awesome-react-native) que são alimentados pela comunidade com projetos relacionados.

Temos também o engajamento da **Microsoft** neste projeto. Eles desenvolveram o [**Codepush**](http://microsoft.github.io/code-push/), que é uma ferramenta para atualizar seu app sem passar pelas Stores (nada de esperar dias para atualizar), além disso existe um plugin para o **VSCode** para React Native (vscode-react-native) e por último e não menos importante, teremos suporte oficial para **Universal Windows Plataform** (UWP) podendo fazer deploy para o Windows 10 (desktop e mobile). Inclusive foi desenvolvido um app excelente para a conferência F8 do Facebook com React Native e foi o primeiro case de deploy para UWP. Todo o projeto pode ser acompanhado em no [MakeItOpen](http://makeitopen.com). Recomendo muito esse projeto.

![image](/articles/2016/2016-07-09_por-que-usar-react-native-no-desenvolvimento-de-aplicativos-/images/4.png)
Aplicativo F8

A IDE "oficial" que o Facebook dá mais suporte é ao [**Nuclide IDE**](http://nuclide.io/), que é um conjunto de ferramentas para o [**Atom**](http://atom.io). Eu atualmente uso ele, pois é um dois poucos que tem suporte realmente decente ao [**FlowType**](http://flowtype.com).

Todo mundo fica curioso por _cases_ de sucesso também da plataforma. O Facebook obviamente utiliza em seus aplicativos, podendo ser integralmente, como no caso do **Facebook Groups** e **Facebook Ads Manager**, ou usado parcialmente, como no caso do aplicativo principal do Facebook. Outros podem ser vistos na página de [Showcase](https://facebook.github.io/react-native/showcase.html) do projeto.

#### Conclusão

React Native vs Cordova
