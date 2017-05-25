import React from 'react';
import styled from 'styled-components';
import Divider from 'muicss/lib/react/divider'
import Headline from '../components/Headline';

const SkillsContainer = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  padding: 0;
  margin-top: 20px;
`

const Skill = styled.li`
  margin: 15px auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  div {
    max-width: 300px;
    flex-direction: column;
  }
  i {
      color: ${ props => props.theme.secondary };
      display: flex;
      font-size: 7em;
  }
`

const Main = () => {
    return (
        <div>
            <Headline />
            <Divider />
            <div className="mui--text-center">
                <div className="mui--text-title">
                    <h2 className="mui--text-display1">What I do</h2>
                </div>
                <SkillsContainer>
                    <Skill className="mui-panel">
                        <i className="ion-iphone" />
                        <div>
                            <b>Mobile Development</b>
                            <p>I’ve been developing mobile applications, using both hybrid and native technologies, since 2012.</p>
                        </div>
                    </Skill>
                    <Skill className="mui-panel">
                        <i className="ion-mic-c" />
                        <div>
                            <b>Conference Speaking</b>
                            <p>Sharing knowledge it's one of my passions. I would love to speak at your conference.</p>
                        </div>
                    </Skill>
                    <Skill className="mui-panel">
                        <i className="ion-ios-people" />
                        <div>
                            <b>Training</b>
                            <p>I also like teach people how to build their dreams. </p>
                        </div>
                    </Skill>
                </SkillsContainer>
            </div>
            <Divider />
        </div>
    );
}

export default Main;
