import React from 'react'
import Dialogs from "../components/dialogs/Dialogs";
import Chat from "../components/Chat";

export default class Inside extends React.PureComponent {
  render() {
    return (
        <div className="inside">
          <Dialogs/>
          <Chat/>
        </div>
    )
  }
}
