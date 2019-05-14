import React from 'react'
import Editor from "./Editor";

export default class Chat extends React.PureComponent {
  render() {
    return (
        <div className="chat">
          <div className="replicas"></div>
          <Editor/>
        </div>
    )
  }
}
