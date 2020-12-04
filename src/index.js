import React from "react";
import { render } from "react-dom";
import {
  ChatFeed,
  Message,
} from "react-chat-ui";

const styles = {
  button: {
    backgroundColor: "#fff",
    borderColor: "#1D2129",
    borderStyle: "solid",
    borderRadius: 20,
    borderWidth: 2,
    color: "#1D2129",
    fontSize: 18,
    fontWeight: "300",
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  selected: {
    color: "#fff",
    backgroundColor: "#0084FF",
    borderColor: "#0084FF",
  },
  containerStyle: {
    display: 'column',
  }, 
  form: {
    height: '100px',
    width: '100%'
  }
};

class Chat extends React.Component {
  constructor() {
    super();
    this.state = {
      isTyping: false, 
      messages: [
        new Message({ id: 1, message: "Hi there! How can I help you?", senderName: "Becky" }),
      ],
    };
  }

  onMessageSubmit(e) {
    const input = this.message;
    e.preventDefault();
    if (!input.value) {
      return false;
    }
    this.pushMessage(this.state.curr_user, input.value);
    input.value = "";
    return true;
  }

  pushMessage(recipient=0, message) {
    const prevState = this.state;
    const newMessage = new Message({
      id: recipient,
      message,
      senderName: "You",
    });
    prevState.messages.push(newMessage);
    this.setState(this.state);
  }

  render() {
    return (
      <div style={styles.containerStyle}>
        <ChatFeed
          messages={this.state.messages} 
          isTyping={this.state.isTyping} 
          showSenderName 
          bubblesCentered={true} 
          bubbleStyles={{
            text: {
              fontSize: 13,
            },
            chatbubble: {
              borderRadius: 20,
              padding: 10,
            },
          }}
        />
        <form style={styles.form} onSubmit={(e) => this.onMessageSubmit(e)}>
          <input
            ref={(m) => {
              this.message = m;
            }}
            placeholder="Type a message..."
            className="message-input"
          />
        </form>
      </div>
    );
  }
}

render(<Chat />, document.getElementById("root"));
