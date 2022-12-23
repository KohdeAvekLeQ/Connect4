// Style
import './chat.scss';

// React
import {useState} from 'react';
import useKeypress from 'react-use-keypress';


// Chat component
export default function Chat(data) {
    // ---- STATES ----
    const [folded, setFolded] = useState(true);     // Phone folded
    const [inputFocus, setFocus] = useState(false); // Input selected
    const [msg, setMsg] = useState("");             // Message input


    // ---- FUNCTIONS ----
    function sendMessage() {
        if(msg.length > 1) {
            if(data.lobby) {
                data.socket.emit('sendLobbyChat', data.pseudo, msg);
                setMsg("");
            } else {
                data.socket.emit('sendMessage', data.gameID, data.pseudo, msg);
                setMsg("");    
            }
        }
    }
    function unfoldPhone() {
        setFolded(false);
        setTimeout(() => {
            document.getElementById('inputMsgElem').focus();
            let elem = document.getElementById('messages');
            elem.scrollTop = elem.scrollHeight;
        }, 0);
    }


    // ---- KEYS ----
    useKeypress(['Enter', 'Escape'], (event) => {
        if(inputFocus) {
            if(event.key === 'Escape') { // Unfocus
                document.getElementById('inputMsgElem').blur();
            } else { // Send message
                sendMessage();
            }
        }
    });


    // ---- RENDER MESSAGES ----
    let messages = data.messages;
    let messagesDiv = [];

    if(messages !== null) {
        for (let i in messages) {
            let msg = messages[i];

            let sender = msg.sender;
            let className = "phone-message";
            
            if (sender === data.pseudo) {
                className += " sender";
            } else {
                className += " receiver";
            }

            messagesDiv.push(
                <div key={i} id={"phoneMessage_"+i} className={className}>
                    <span className="emitter">{sender} :</span>
                    <span>{msg.content}</span> 
                </div>
            );
        }
    }


    // ---- RENDER ----
    if(folded) {
        return (
            <div id="FoldedChat" onClick={unfoldPhone}>
                <span>▲ CHAT ▲</span>
            </div>
        );
    } else {
        return (
            <div id="Chat">
                <div id="topChat" onClick={() => {setFolded(true);}}><span>▼ CHAT ▼</span></div>

                <div id="chatContent">
                    <div id="messages">
                        {messagesDiv}
                    </div>

                    <div id="messageInput">
                        <div id="msgInputDiv">
                            <input 
                                id='inputMsgElem'
                                type='text' 
                                placeholder='Tapez votre message'
                                value={msg}
                                onChange={(event) => {setMsg(event.target.value);}}
                                onFocus={() => {setFocus(true);}}
                                onBlur={() => {setFocus(false);}}
                            ></input>
                        </div>

                        <div id="sendMsgDiv" onClick={sendMessage}>
                            <span>➤</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}