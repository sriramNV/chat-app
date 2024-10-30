/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import client, {databases, DATABASE_ID, COLLECTIONS_ID_MSG, PROJECT_ID } from '../appwriteConfig';
import {ID, Query} from 'appwrite';
import {Trash2} from 'react-feather'

const Room = () => {

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');

    useEffect(() => {
        getMessages();

        client.subscribe(`databases.${DATABASE_ID}.collections.${COLLECTIONS_ID_MSG}.documents`, response => {
          // Callback will be executed on changes for documents A and all files.
          console.log('Real time: ', response);
        });
      

    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();

        // const message = e.target.message.value;
        let payload = {
          body: messageBody,
        }

        const response = await databases.createDocument(
          DATABASE_ID, 
          COLLECTIONS_ID_MSG, 
          ID.unique(), 
          payload
        );

        
        console.log('Created: ',  response);

        setMessageBody('');

        setMessages(prevState => [response, ...prevState]);
        
        // getMessages();
    }


    const getMessages = async () => {
        const response = await databases.listDocuments(
          DATABASE_ID, 
          COLLECTIONS_ID_MSG,
          [
            Query.orderDesc('$createdAt'),
          ]
        );
        console.log('RESPONSE: ',  response);
        setMessages(response.documents);
    }

    const deleteMsg = async (messageID) => {
      databases.deleteDocument(DATABASE_ID, COLLECTIONS_ID_MSG, messageID);
      setMessages(prevState => messages.filter(message => message.$id !== messageID));
    }

  return (
    <main className='container'>
      
      <div className='room--container'>  
        <form id='message--form' onSubmit={handleSubmit}>
          <div>
            <textarea 
              required 
              maxLength='1000' 
              placeholder='message' 
              onChange={(e) => {setMessageBody(e.target.value)}}
              value={messageBody}
            >       
            </textarea>
          </div>
          <div className='send-btn--wrapper'>
            <input type='submit' value='Send' className='btn btn--secondary'></input>
          </div>
        </form>
        <div>
          {messages.map((message) => (
            <div key={message.$id} className='message--wrapper'>

              <div className='message--header'>
                <small className='message-timestamp'>
                  {new Date(message.$createdAt).toLocaleString()} -
                </small>
                <Trash2 
                  className='delete--btn'
                  onClick={() => deleteMsg(message.$id)} 
                />
              </div>

              <div className='message--body'>
                <span>{message.body}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </main>
  )
}

export default Room