/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { databases, DATABASE_ID, COLLECTIONS_ID_MSG, PROJECT_ID } from '../appwriteConfig';
import {ID, Query} from 'appwrite';

const Room = () => {

    const [messages, setMessages] = useState([]);
    const [messageBody, setMessageBody] = useState('');

    useEffect(() => {
        getMessages();
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
                  {message.$createdAt}
                </small>
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