import styled from 'styled-components'
import Panel from 'muicss/lib/react/panel';

const SectionContainer = styled(Panel)`
  margin-top: 48px;
  & .mui-btn--primary {
    background-color: ${ props => props.theme.foreground }
  }

  & .mui-btn--primary:hover {
    background-color: ${ props => props.theme.secondary }
  }
`

export default SectionContainer;
