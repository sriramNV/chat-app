/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import { databases, DATABASE_ID, COLLECTIONS_ID_MSG, PROJECT_ID } from '../appwriteConfig';

const Room = () => {

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        getMessages();
    }, [])
    const getMessages = async () => {
        const response = await databases.listDocuments(
          DATABASE_ID, COLLECTIONS_ID_MSG
        );
        console.log('RESPONSE: ',  response);
        setMessages(response.documents);
    }

  return (
    <div>
      <div>
        {messages.map((message) => (
          <div key={message.$id}>

            <div>
              <p>
                {message.$createdAt}
              </p>
            </div>

            <span>{message.body}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Room