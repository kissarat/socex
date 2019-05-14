import React from 'react'
import {connect} from 'react-redux'

function nameOf(peer) {
  if (peer.title) {
    return peer.title
  }
  const name = `${peer.first_name || ''} ${peer.last_name || ''}`.trim()
  if (name) {
    return name
  }
  return peer.username
}

class Dialogs extends React.PureComponent {
  render() {
    const {peer, message} = this.props
    const text = message.message ? message.message.slice(0, 15) : ''
    return (
        <div className="dialog-card">
          <div className="name">{nameOf(peer)}</div>
          <div className="message">{text}</div>
        </div>
    )
  }
}

export default connect(s => s.entities)(Dialogs)
