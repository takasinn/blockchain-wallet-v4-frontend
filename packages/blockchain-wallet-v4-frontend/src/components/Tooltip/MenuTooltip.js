import React from 'react'
import styled from 'styled-components'
import ui from 'redux-ui'
import { connect } from 'react-redux'
import { compose, bindActionCreators } from 'redux'
import { actions } from 'data'

import { Icon, Text, TextGroup } from 'blockchain-info-components'

const MenuTooltipWrapper = styled.div`
  display: inline-flex;
  position: relative;
  width: 22px;
`
const MenuTooltipIcon = styled(Icon)`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  background-color: ${props => props.theme['brand-primary']};
  color: ${props => props.theme['white']};
  border: 1px solid ${props => props.theme['brand-primary']};
  cursor: pointer;
  font-weight: 300;
`
const MenuTooltipBox = styled(TextGroup)`
  position: absolute;
  z-index: 9999;
  top: 150%;
  left: -115px;
  width: 250px;
  display: ${props => props.displayed ? 'block' : 'none'};
  background-color: ${props => props.theme['white']};
  color: ${props => props.theme['gray-5']};
  border: 1px solid ${props => props.theme['gray-2']};
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 13px;
  font-weight: 300;
  font-family: "GillSans", sans serif;

  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 115px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-bottom-color: ${props => props.theme['gray-2']};
  }

  &:after {
    content: '';
    display: block;
    position: absolute;
    left: 116px;
    bottom: 100%;
    width: 0;
    height: 0;
    border: 9px solid transparent;
    border-bottom-color: ${props => props.theme['gray-1']};
  }
`

const MenuTooltipIconWrapper = styled.div`
  position: relative;
`

const NewLabel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10000;
  right: 1px;
  top: 3px;
  width: 10px;
  height: 10px;
  background-color: ${props => props.theme['error']};
  border-radius: 100%;
`

const MenuTooltipTitle = styled(Text)`
    background-color: ${props => props.theme['gray-1']};
    padding: 8px 14px;
`

const TextContainer = styled.div`
  max-height: 250px;
  overflow-y: scroll;
  padding: 0px 8px;
`

class MenuTooltip extends React.Component {
  constructor (props) {
    super(props)
    this.state = { displayed: false, hasNews: props.hasNews }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick () {
    this.setState({ displayed: !this.state.displayed, hasNews: false })
    this.props.whatsNewActions.updateWhatsNew(Date.now())
  }

  render () {
    const { icon, newsLength, title, children } = this.props
    return (
      <MenuTooltipWrapper>
        <MenuTooltipIconWrapper>
          {this.state.hasNews &&
          <NewLabel>
            <Text size='11px' color='white' weight={300}>{newsLength}</Text>
          </NewLabel>
          }
          <MenuTooltipIcon displayed={this.state.displayed} onClick={this.handleClick} name={icon} />
        </MenuTooltipIconWrapper>
        <MenuTooltipBox displayed={this.state.displayed} onClick={this.handleClick}>
          <MenuTooltipTitle size='14px' weight={500}>
            {title}
          </MenuTooltipTitle>
          <TextContainer>
            {children}
          </TextContainer>
        </MenuTooltipBox>
      </MenuTooltipWrapper>
    )
  }
}

MenuTooltip.defaultProps = {
  icon: 'bell'
}

const mapDispatchToProps = (dispatch) => ({
  whatsNewActions: bindActionCreators(actions.core.kvStore.whatsNew, dispatch)
})

export default connect(null, mapDispatchToProps)(MenuTooltip)