import React, { Component } from 'react'
import PropTypes from 'prop-types'
import VideoContainer from '../../ui-components/video-container'
import ToolbarWrapper from '../../ui-components/toolbar/toolbar-wrapper'
import { Grid, Row, Col } from 'react-bootstrap'
import { connect } from 'react-redux'
import { initialize, shutdown } from '../../redux/ducks/room'
import { onToggleChat } from '../../redux/ducks/chat'
import ChatMenu from './chat-menu'
import './index.css'

class Room extends Component {
  componentWillMount () {
    this.props.initialize(this.props.roomId)
  }
  componentWillUnmount () {
    this.shutdown()
  }
  shutdown () {
    this.props.shutdown(this.props.roomId)
  }
  render () {
    return (
      <div id='room-outer-wrapper'>
        <ChatMenu />
        <Grid fluid>
          <Row className='show-grid'>
            <Col md={12} xs={12} className='room-toolbar'>
              <br />
              <ToolbarWrapper
                roomId={this.props.roomId}
                onLeaveRoom={this.props.shutdown}
              />
            </Col>
          </Row>
          <Row>
            <Col md={12} xs={12}>
              {this.props.error
                ? 'Encountered an error getting streams'
                : (
                  this.props.user && this.props.user.stream
                  ? <VideoContainer />
                  : 'Initializing streams...'
                )
              }
            </Col>
          </Row>
        </Grid>
        <main id='room-inner-wrapper' />
      </div>  
    )
  }
}

Room.propTypes = {
  roomId: PropTypes.string,
  user: PropTypes.object,
  error: PropTypes.any,
  initialize: PropTypes.func,
  shutdown: PropTypes.func,
  onSendChat: PropTypes.func
}

function mapStateToProps (state, ownProps) {
  return {
    roomId: ownProps && ownProps.match ? ownProps.match.params.id : null,
    error: state.room.error,
    user: state.user,
    chatLabel: state.chat.showChat ? 'Hide Chat' : 'Show Chat'
  }
}

export default connect(mapStateToProps, { initialize, shutdown, onToggleChat })(Room)
