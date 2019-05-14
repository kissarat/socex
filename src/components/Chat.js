import React from 'react'
import Editor from "./Editor";
import History from "./History";

export default class Chat extends React.PureComponent {
  render() {
    return (
        <div className="chat">
          <History/>
          <Editor/>
        </div>
    )
  }
}
