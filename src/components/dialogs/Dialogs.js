import React from 'react'
import {connect} from 'react-redux'
import DialogCard from './DialogCard'

class Dialogs extends React.PureComponent {
  list() {
    return this.props.dialogs.map(dialog => <DialogCard key={dialog.peer.id} {...dialog}/>)
  }

  render() {
    return (
        <div className="dialogs">
          <div className="list">
            {this.list()}
          </div>
        </div>
    )
  }
}

function map(props) {
  const {dialogs, chats, users, messages} = props.entities
  return {
    dialogs: dialogs.filter(dialog => 'peerUser' === dialog.peer._)
        .map(function (dialog) {
          const isChannel = 'peerChannel' === dialog.peer._
          const peer = isChannel ? chats[dialog.peer.channel_id] : users[dialog.peer.user_id]
          return {
            peer,
            isChannel,
            unread_count: dialog.unread_count,
            message: messages.find(m => m.id === dialog.top_message)
          }
        })
  }
}

export default connect(map)(Dialogs)
