import React, { useEffect, useState } from 'react';
import './Chat.css';
import { Avatar, IconButton } from '@mui/material';
import { AttachFile, InsertEmoticon, MoreVert, SearchOutlined } from '@mui/icons-material';
import MicIcon from '@mui/icons-material/Mic';
import { useParams } from 'react-router-dom'
import db from '../firebase';
import { useStateValue } from '../StateProvider';
// import firebase from 'firebase';
import firebase from "firebase/compat/app";
import SendIcon from '@mui/icons-material/Send';

const Chat = () => {

    const [seed, setseed] = useState("");
    const [input, setInput] = useState("");
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState("");
    const [messages, setMessages] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name)
            });

            db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()));
            })
        }
    }, [roomId])

    useEffect(() => {
        setseed(Math.floor(Math.random() * 5000))
    }, [roomId]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (input !== "") {
            db.collection('rooms').doc(roomId).collection('messages').add({
                message: input,
                name: user.displayName,
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            })
        }

        setInput("");
    }

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar src={`https://api.multiavatar.com/${seed}.svg`} />
                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
                </div>
                <div className='chat_headerRight'>
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>
            <div className='chat_body'>
                {messages.map((message) => {
                    return (
                        <p className={`chat_message ${message.name === user.displayName && "chat_reciever"}`}>
                            <span className='chat_name'>{message.name}</span>
                            {message.message}
                            <span className='chat_timestamp'>
                                {new Date(message.timestamp?.toDate()).toUTCString()}
                            </span>
                        </p>)
                })}
            </div>
            <div className='chat_footer'>
                <InsertEmoticon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type='text' placeholder='Type a message' />
                    <button type='submit' onClick={sendMessage}><SendIcon/></button>
                </form>
                <MicIcon />
            </div>
        </div>
    )
}

export default Chat
