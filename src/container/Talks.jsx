import React from 'react';
import Divider from 'muicss/lib/react/divider';
import Panel from 'muicss/lib/react/panel';
import Container from 'muicss/lib/react/container';

const TALKS = [
    {
        title: 'Desenvolvendo Aplicativos com React Native',
        imageUrl: '//cdn.slidesharecdn.com/ss_thumbnails/developingappswithreactnative-160421213137-thumbnail-3.jpg?cb=1461274590',
        places: [
            {
                name: 'FronInCuiabá',
                date: '2016',
                local: 'Cuiabá - MT'
            }
        ],
        slidesUrl: 'http://pt.slideshare.net/alvarowolfx/developing-apps-with-react-native'
    }, {
        title: 'React Native - First Impressions',
        imageUrl: '//cdn.slidesharecdn.com/ss_thumbnails/reactnativefirstimpression-160315001833-thumbnail-3.jpg?cb=1458002483',
        places: [
          {
              name: 'Meetup DevMT',
              date: '2016',
              local: 'Cuiabá - MT'
          }
        ],
        slidesUrl: 'http://pt.slideshare.net/alvarowolfx/react-native-first-impression'
    }, {
        title: 'Ionic Workshop',
        imageUrl: '//cdn.slidesharecdn.com/ss_thumbnails/ionicworkshop-151116222431-lva1-app6892-thumbnail-3.jpg?cb=1447870773',
        subtitle: 'CATI 2015 (Unemat) e ERI-MT 2015 (UFMT)',
        places: [
          {
              name: 'CATI Unemat',
              date: '2015',
              local: 'Barra do Bugres - MT'
          },
          {
              name: 'ERI MT UFMT',
              date: '2015',
              local: 'Cuiabá - MT'
          }
        ],
        slidesUrl: 'http://pt.slideshare.net/alvarowolfx/ionic-workshop'
    }, {
        title: 'Workshop Desenvolvimento Web Moderno com AngularJS',
        imageUrl: 'https://image.slidesharecdn.com/cursoangular-parte1-150707000734-lva1-app6892/95/curso-angularjs-parte-1-29-638.jpg?cb=1437694044',
        subtitle: 'Semana Acadêmica Univag',
        places: [
          {
              name: 'Semana Acadêmica Univag',
              date: '2015',
              local: 'Varzea Grande - MT'
          }
        ],
        slidesUrl: 'http://pt.slideshare.net/alvarowolfx/curso-angular-parte-1'
    }, {
        title: 'Offline Apps com Ionic e PouchDB',
        imageUrl: '//cdn.slidesharecdn.com/ss_thumbnails/offlineapps-pouchdb-150718152618-lva1-app6892-thumbnail-3.jpg?cb=1437233227',
        places: [
          {
              name: 'Meetup DevMT',
              date: '2015',
              local: 'Cuiabá - MT'
          }
        ],
        slidesUrl: 'http://pt.slideshare.net/alvarowolfx/offline-apps-using-ionic-framework-and-pouchdb'
    }, {
        title: 'Construindo Aplicativos híbridos com Ionic Framework',
        imageUrl: 'https://i2.wp.com/julienrenaux.fr/wp-content/uploads/2015/02/ionic.png?resize=853%2C584',
        subtitle: 'FronInCuiabá 2015',
        places: [
          {
              name: 'FrontInCuiabá',
              date: '2015',
              local: 'Cuiabá - MT'
          },
          {
              name: '3º Circuito de TI Unic',
              date: '2015',
              local: 'Tangará da Serra - MT'
          },
          {
              name: 'Meetup DevMT',
              date: '2015',
              local: 'Cuiabá - MT'
          }
        ],
        slidesUrl: 'http://alvarowolfx.github.io/ionic-present'
    }, {
        title: 'NoSQL Onde Vivem e Como se Alimentam ?',
        imageUrl: 'https://image.slidesharecdn.com/nosql-ondevivemecomosealimentamv3-140506190736-phpapp01/95/nosql-onde-vivem-e-como-se-alimentam-1-638.jpg?cb=1452777285',
        subtitle: 'YoLab 2014 e Semana Academica Unemat 2015',
        places: [
          {
              name: 'Semana Acadêmica Unemat',
              date: '2015',
              local: 'Barra do Bugres - MT'
          },
          {
              name: 'YoLab',
              date: '2014',
              local: 'Cuiabá - MT'
          }
        ],
        slidesUrl: 'http://pt.slideshare.net/alvarowolfx/no-sql-onde-vivem-e-como-se-alimentam-v3'
    }
]

export default class Talks extends React.Component {
    render() {
        return (
            <Container>
                <div className="mui--text-center">
                    <div className="mui--text-title">
                        <h1>Talks</h1>
                    </div>
                </div>
                <center style={{
                    margin: '15px auto'
                }}>
                    <a className="mui-btn mui-btn--raised" href="mailto:alvaroviebrantz@gmail.com" style={{
                        fontSize: '0.85em'
                    }}>
                        Invite me to your conference
                    </a>
                </center>
                {TALKS.map(talk => {
                    return (
                        <Panel className="talk-panel mui--z1">
                            <img src={talk.imageUrl}/>
                            <div className="talk-panel__desc">
                                <h3 className="mui--text-title">{talk.title}</h3>
                                <div>
                                    {talk.places.map(place => {
                                        return (
                                            <p className="mui--text-caption">
                                                <i className="ion-calendar"/>
                                                &nbsp;{place.date}, {place.name} - {place.local}
                                            </p>
                                        );
                                    })}
                                </div>
                                <a className="mui-btn mui-btn--raised mui-btn--primary" href={talk.slidesUrl} target="_blank" style={{
                                    maxWidth: 200
                                }}>
                                    See slides
                                </a>
                            </div>
                        </Panel>
                    );
                })}
            </Container>
        );
    }
}
