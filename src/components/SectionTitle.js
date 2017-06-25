import styled from 'styled-components'

const SectionTitle = styled.h3`
  padding-left: 20px;
  font-size: { props => props.small ? '20px' : '34px' };
  line-height: 32px;
  color: ${ props => props.theme.secondary }
  margin: 32px 0 32px 0;
`

export default SectionTitle;
