import React, {useEffect, useState, useContext} from 'react';

import SocketContext from './context/SocketContext';
//import UserModal from './userModal';
import 'antd/dist/antd.css';
import { Modal, Button } from 'antd';

const Chat=(props) => {
    const [groupUsers, setGroupUsers ] = useState([]);
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);

    //const username = props.location.state.username;
    const group = props.location.state.group;

    const socket = useContext(SocketContext);

    useEffect(() => {
        // Get room and users
        socket.on('groupUsers', ({ group, users }) => {
            outputUsers(users);
        });

        // Message from server
        socket.on('message', message => {
            outputMessage(message);
        });
    })

    const outputUsers = (users) => {
        setGroupUsers(users)
    }

    const outputMessage = (message) => {
        let newMessages = messages
        let finalMessages = newMessages.concat(message)
        setMessages(finalMessages)
    }

    const chatMessageSubmitHandler = e => {
        e.preventDefault();

        // Emit message to server
        socket.emit('chatMessage', message);
    }
    const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

    return (
        <div className="chat-container">
            <header className="chat-header">
                <h1>Group Messages of {group}</h1>
            </header>
            <main className="chat-main">
                <Button type="default" onClick={showModal}>
                    View Group Members
                </Button>
                <Modal 
                    title="Group Members" 
                    visible={isModalVisible} 
                    onOk={handleOk} 
                    onCancel={handleCancel} 
                    okButtonProps={{style:{display:'none'}}}
                    cancelButtonProps={{style:{display:'none'}}}
                >
                    <ol id="users">
                        {groupUsers.map(user => (
                            <li>{user.username}</li>
                        ))}
                    </ol>
                </Modal>
                {/* <div className="chat-sidebar">
                    <h3><i className="fas fa-comments"></i> Group Name : {group}</h3>
                    <h2 id="room-name">{group}</h2>
                    <h3><i className="fas fa-users"></i> Users</h3>
                    <ul id="users">
                        {groupUsers.map(user => (
                            <li>{user.username}</li>
                        ))}
                    </ul>
                </div> */}
                <div className="chat-messages">
                    {messages.map(message => (
                        <div className="indivMessage">
                            <div style={{marginBottom:"10px"}}>
                                {message.username}
                            </div>
                            <div>
                                {message.text} - {message.time}
                            </div>
                            <br></br>
                        </div>
                    ))}
                </div>
            </main>
            <div className="chat-form-container">
                <form id="chat-form" onSubmit={chatMessageSubmitHandler}>
                    <input
                        id="msg"
                        type="text"
                        placeholder="Enter Message"
                        required
                        value={message}
                        onChange={e => setMessage(e.target.value)}
                    />
                    <button className="btn">
                        Send
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Chat;