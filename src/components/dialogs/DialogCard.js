import React from 'react'
import {connect} from 'react-redux'
import {fetchHistory} from '../../actions'

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
    const {peer, message, isChannel, dispatch} = this.props
    const text = message.message ? message.message.slice(0, 15) : ''
    const p = isChannel
        ? {_: 'inputPeerChat', chat_id: peer.id, access_hash: peer.access_hash}
        : {_: 'inputPeerUser', user_id: peer.id, access_hash: peer.access_hash}
    return (
        <div className="dialog-card" onClick={() => fetchHistory(dispatch, p)}>
          <div className="name">{nameOf(peer)}</div>
          <div className="message">{text}</div>
        </div>
    )
  }
}

export default connect(s => s.entities)(Dialogs)
