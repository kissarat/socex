import React from 'react'
import {connect} from 'react-redux'
import DialogCard from './DialogCard'

class Dialogs extends React.PureComponent {
  list() {
    return this.props.dialogs.map(dialog => <DialogCard key={dialog.peer.id} {...dialog}/>)
  }

  render() {
    return (
        <div children="dialogs">
          {this.list()}
        </div>
    )
  }
}

function map(props) {
  const {dialogs, chats, users, messages} = props.entities
  return {
    dialogs: dialogs.map(dialog => ({
      peer: 'peerUser' === dialog.peer._ ? users[dialog.peer.user_id] : chats[dialog.peer.channel_id],
      unread_count: dialog.unread_count,
      message: messages.find(m => m.id === dialog.top_message)
    }))
  }
}

export default connect(map)(Dialogs)
