import React, {useState, useContext} from 'react';
import { useHistory } from "react-router-dom";

import Layout from './Layout';

import SocketContext from './context/SocketContext';

const ChatHome= () => {
    const [username, setUsername] = useState("");
    const [group, setGroup] = useState("Family");
    const [groupUsers,  ] = useState([]);
    const socket = useContext(SocketContext);

    let history = useHistory();
    
    const joinGroupSubmitHandler = (e) => {
        e.preventDefault();
        
        socket.emit('joinGroup', { username, group });
    
        // Get message
        socket.on('message', message => {
            console.log(message);
    
        });

        history.push({
            pathname: "/chat",
            state: {username, group, groupUsers}
        })
    }
  
    return (
        <Layout>
            <form onSubmit={joinGroupSubmitHandler}>
                <div className="form-control">
                    <label htmlFor="username">Name</label>
                    <input
                        type="text"
                        value={username}
                        id="username"
                        placeholder="Enter your name"
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="form-control">
                    <label htmlFor="group">Group</label>
                    <select id="group" value={group} onChange={e => setGroup(e.target.value)}>
                        <option value="Family">Family</option>
                        <option value="School-Friends">School-Friends</option>
                        <option value="Masai-Friends">Masai-Friends</option>
                        <option value="Work">Work</option>
                        <option value="Neighbours">Neighbours</option>
                        <option value="Hostel-Gang">Hostel-Gang</option>
                        <option value="College-Friends">College-Friends</option>
                    </select>
                </div>
                <button type="submit" className="btn">Join Group</button>
            </form>
        </Layout>
    );
}

export default ChatHome;