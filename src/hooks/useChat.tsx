import { useCallback, useEffect, useRef, useState } from 'react';

// получаем класс IO

import io, { Socket } from 'socket.io-client';

import { useAppSelector } from 'store';

// наши хуки

// адрес сервера
// требуется перенаправление запросов - смотрите ниже
const SERVER_URL = process.env.REACT_APP_BASE_URL || 'http://localhost:7542/2.0/';

type MessageType = {
  _id: string;
  message: string;
  user: {
    _id: string;
    name: string;
  };
};

type ChatHookReturnValueType = {
  messages: MessageType[];
  sendMessage: (messageText: string) => void;
};

// хук принимает название комнаты
export const useChat = (): ChatHookReturnValueType => {
  const userName = useAppSelector(state => state.profile.name);
  const userId = useAppSelector(state => state.profile._id);
  // локальное состояние для пользователей

  // локальное состояние для сообщений
  const [messages, setMessages] = useState<MessageType[]>([]);

  // useRef() используется не только для получения доступа к DOM-элементам,
  // но и для хранения любых мутирующих значений в течение всего жизненного цикла компонента
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    // создаем экземпляр сокета, передаем ему адрес сервера
    // и записываем объект с названием комнаты в строку запроса "рукопожатия"
    // socket.handshake.query.roomId
    socketRef.current = io(SERVER_URL, {
      withCredentials: true,
      extraHeaders: {
        'my-custom-header': 'abcd',
      },
    });

    // подписка на историю сообщений
    //приходят при отправке на init
    socketRef.current.on('init-messages-published', (messages: MessageType[]) => {
      setMessages(messages);
    });

    // запросить историю сообщений
    socketRef.current.emit('init', userId, (answer: string) => console.log(answer));

    //задать своё имя
    socketRef.current.emit('client-name-sent', userName, (answer: string) =>
      console.log(answer),
    );
    //подписка на новые сообщения
    socketRef.current.on('new-message-sent', (message: MessageType) => {
      setMessages(prevMessages => [...prevMessages, message]);
    });

    return () => {
      // при размонтировании компонента выполняем отключение сокета
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId, userName]);

  // функция отправки сообщения
  // принимает объект с текстом сообщения и именем отправителя
  const sendMessage = useCallback((messageText: string): void => {
    if (socketRef.current) {
      socketRef.current.emit('client-message-sent', messageText, (answer: string) =>
        console.log(answer),
      );
    }
  }, []);

  // отправляем на сервер событие "user:leave" перед перезагрузкой страницы
  /*   useBeforeUnload(() => {
    socketRef.current.emit('user:leave', userId);
  }); */

  // хук возвращает пользователей, сообщения и функции для отправки удаления сообщений
  return { messages, sendMessage };
};
