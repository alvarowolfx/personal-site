import React from 'react';
import SectionContainer from '../components/SectionContainer'
import SectionTitle from '../components/SectionTitle'
import SocialIcons from '../components/SocialIcons';
import InviteButton from '../components/InviteButton';

const Main = () => {
    return (
        <div>
            <SectionContainer>
                <SectionTitle className="mui--text-center">Sobre</SectionTitle>
                <p>
                  Eu sou Alvaro Viebrantz, sou formado em Ciência da Computação pela UFMT.
                  Sou organizador do grupo DevMT, GDGCuiabá e dos eventos FrontInCuiabá e do Primeiro Hackathon de Mato Grosso, o GovHackMT.
                  Já dei cursos e palestras sobre diversos assuntos, em especial sobre desenvolvimento mobile com Ionic e React Native
                  e também sobre Google Cloud e Internet das Coisas.
                  Agora mantém tenho feitos alguns posts sobre automação e internet das coisas no meu blog.
                  Tenho experiência como desenvolvedor na startup Procurix e no Estuda.com. Atualmente sou analista de TI na SEFAZ-MT
                </p>
                <p> Sinta-se a vontade de me contactar, será um prazer palestrar em algum evento que você me convidar.</p>
                <InviteButton/>

                <SectionTitle small>Contato</SectionTitle>
                <p>
                  Minhas redes sociais estão todas listadas na página inicial, mas se estiver com preguiça vou colocar aqui novamente.
                </p>
                <center><SocialIcons/></center>
                <SectionTitle small>Sobre este site</SectionTitle>
                <p>
                  Este site foi feito iniciado com o create-react-app, logo foi feito com React. Foi publicado no Firebase Hosting e usa como base de estilos MUI.css. Todo código fonte está no meu GitHub.
                </p>
            </SectionContainer>
        </div>
    );
}

export default Main;
