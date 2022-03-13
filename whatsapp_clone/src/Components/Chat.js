import React, { useEffect, useState } from 'react'
import '../Style/style.css'
import { Avatar, Button, IconButton } from '@material-ui/core'
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import CreateIcon from '@material-ui/icons/Create';
import { useParams, Link } from 'react-router-dom';
import db from '../App/firebaseSetup';
import { useStateValue } from '../App/Context'
import firebase from 'firebase/app';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';


function Chat() {
    const [ seed, setSeed ] = useState('');
    const [ input, setInput ] = useState('');
    const { roomId } = useParams();
    const [ roomName, setRoomName ] = useState('');
    const [ messages, setMessages ] = useState([]);
    const [ { user }, dispatch ] = useStateValue();
    useEffect(() => {
      if(roomId) {
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
          setRoomName(snapshot.data().name)
        ));
        db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp', 'asc').onSnapshot(
          snapshot => (
            setMessages(snapshot.docs.map(doc => doc.data()))
          )
        )
      }
    }, [roomId]);
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);
    const sendMessage = (e) => {
        e.preventDefault();
        console.log("you typed", input)
        db.collection('rooms').doc(roomId).collection('messages').add({
          message: input,
          name: user.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput('');
    };
    return (
        <div className = "chat">
            <div className = "chat__header">
              <div className = "chat__back">
                <Button component = { Link } to = "/">
                  <ArrowBackIosIcon /> <Avatar src = {`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                </Button>
              </div>
              <div className = "chat__headerInfo">
                <h3>{roomName}</h3>
                <p>Last seen at {new Date(messages[messages.length -1]?.timestamp).toUTCString()}</p>
              </div>
              <div className = "chat__headerRight">
                  <IconButton>
                    <SearchOutlinedIcon />
                  </IconButton>
                  <IconButton>
                    <AttachFileIcon />
                  </IconButton>
                  <IconButton>
                    <MoreVertIcon />
                  </IconButton>
               </div>
            </div>
            <div className = "chat__body">
                {messages.map((message) => (
                  <p className = {`chat__message ${message.name === user.displayName && "chat__reciever"}`}>
                    <span className = "chat__name">{message.name}</span>
                        {message.message}
                    <span className = "chat__timestamp">
                        {new Date(message.timestamp).toUTCString()}
                    </span>
                  </p>
                ))}
            </div>
            <div className = "chat__footer">
               <InsertEmoticonIcon />
               <form>
                  <div className = "message__cont">
                       <CreateIcon />
                       <input 
                          type = "text" 
                          placeholder = "Type a message"
                          value = {input}
                          onChange = {(e) => setInput(e.target.value)}
                        />
                  </div>
                  <Button type = "submit" onClick = {sendMessage}><SendIcon /></Button>
               </form>
               <MicIcon />
            </div>
        </div>
    )
}

export default Chat
