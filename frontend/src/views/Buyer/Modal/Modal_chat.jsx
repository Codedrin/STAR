import React, { useState, useEffect, useRef } from 'react';
import { FaSearch, FaUserCircle, FaPlus } from 'react-icons/fa';
import { db } from '../../../../services/firebaseClient';
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from 'firebase/storage';
import {
  ref as dbRef,
  onValue,
  push,
  set
} from 'firebase/database';

function getChatId(productId, buyerId, sellerId) {
  return `${buyerId}_${sellerId}_${productId}`;
}

const Modal_chat = ({
  onClose,
  buyerId,
  productId,
  sellerId,
  productName,
  sellerName,
  sellerProfile,
  productImage
}) => {
  // ─── state & refs ───────────────────────────────────────────
  const [sidebarChats, setSidebarChats]   = useState([]);
  const [activeChat, setActiveChat]       = useState(null);
  const [messages, setMessages]           = useState([]);
  const [message, setMessage]             = useState('');
  const [sending, setSending]             = useState(false);

  const [pendingFile, setPendingFile]       = useState(null);
  const [pendingFileUrl, setPendingFileUrl] = useState(null);

  const fileInputRef   = useRef();
  const messagesEndRef = useRef();
  const storage        = getStorage();

  // ─── 1) load & group chats by seller ────────────────────────
  useEffect(() => {
    if (!buyerId) return;
    const chatsRef = dbRef(db, 'chats');
    return onValue(chatsRef, snap => {
      const all = snap.val() || {};
      const sellerMap = {};

      Object.entries(all).forEach(([chatKey, c]) => {
        // only chats where buyer participated
        if (!c.participants?.[buyerId]) return;

        // key is already buyer_seller_product
        const sid = c.sellerId;
        if (!sid) return;

        // keep only the most recent per seller
        if (
          !sellerMap[sid] ||
          (c.updatedAt || 0) > (sellerMap[sid].updatedAt || 0)
        ) {
          sellerMap[sid] = {
            chatId: chatKey,
            sellerId: sid,
            sellerName: c.sellerName,
            sellerProfile: c.sellerProfile,
            productId: c.productId,
            productName: c.productName,
            productImage: c.productImage,
            lastMessage:
              c.lastMessage?.text || c.lastMessage?.fileUrl
                ? '[file]'
                : '',
            updatedAt: c.updatedAt || 0
          };
        }
      });

      const grouped = Object.values(sellerMap)
        .sort((a, b) => b.updatedAt - a.updatedAt);

      setSidebarChats(grouped);

      // if opening from a product page, auto-select that chat
      if (productId && sellerId) {
        setActiveChat(getChatId(productId, buyerId, sellerId));
      }
    });
  }, [buyerId, productId, sellerId]);

  // ─── 2) load messages for active chat ───────────────────────
  useEffect(() => {
    if (!activeChat) return;
    const msgsRef = dbRef(db, `chats/${activeChat}/messages`);
    return onValue(msgsRef, snap => {
      const list = Object.entries(snap.val() || {})
        .map(([id, m]) => ({ id, ...m }))
        .sort((a, b) => a.createdAt - b.createdAt);
      setMessages(list);
    });
  }, [activeChat]);

  // ─── 3) auto-scroll on new messages ────────────────────────
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // ─── 4) low-level send ▲ text OR ▲ file ▲ to Firebase ──────
  const sendToFirebase = async ({ text = '', fileUrl = '', fileName = '' }) => {
    const now = Date.now();
    // push message under messages node
    const msgRef = push(dbRef(db, `chats/${activeChat}/messages`));
    await set(msgRef, {
      senderId: buyerId,
      text,
      fileUrl,
      fileName,
      createdAt: now
    });

    // update meta for the sidebar
    await set(dbRef(db, `chats/${activeChat}/meta`), {
      participants: { [buyerId]: true, [sellerId]: true },
      productId,
      productName,
      productImage: productImage || '',
      sellerId,
      sellerName,
      sellerProfile: sellerProfile || '',
      lastMessage: { text, fileUrl, createdAt: now },
      updatedAt: now
    });
  };

  // ─── 5) unified “Send” button handler ───────────────────────
  const handleSend = async () => {
    if (sending || (!message.trim() && !pendingFile)) return;
    setSending(true);

    try {
      // if there’s a file queued, upload & send it first
      if (pendingFile) {
        const path = `chats/${activeChat}/${Date.now()}_${pendingFile.name}`;
        const sRef = storageRef(storage, path);
        await uploadBytes(sRef, pendingFile);
        const url = await getDownloadURL(sRef);

        await sendToFirebase({
          text: '',
          fileUrl: url,
          fileName: pendingFile.name
        });

        setPendingFile(null);
        setPendingFileUrl(null);
      }

      // then send any text that remains
      if (message.trim()) {
        await sendToFirebase({ text: message.trim() });
        setMessage('');
      }
    } catch (err) {
      console.error(err);
      // optionally show a toast/error message here
    }

    setSending(false);
  };

  // ─── 6) file input → preview before send ───────────────────
  const handleFileSelect = e => {
    const f = e.target.files?.[0];
    if (!f) return;
    setPendingFile(f);
    if (f.type.startsWith('image/')) {
      setPendingFileUrl(URL.createObjectURL(f));
    } else {
      setPendingFileUrl(null);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
      <div className="bg-white rounded-lg w-full h-[90vh] md:h-[500px]
                      max-w-4xl relative flex flex-col md:flex-row
                      shadow-lg overflow-hidden">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-red-600 text-3xl font-bold hover:text-red-800 z-10"
        >&times;</button>

        {/* SIDEBAR */}
        <aside className="w-full md:w-1/3 border-b md:border-b-0
                          md:border-r border-gray-300 p-4 flex flex-col">
          <h2 className="text-red-600 font-bold text-lg mb-4 hidden md:block">
            Chats
          </h2>

          <div className="relative mb-4">
            <FaSearch className="absolute top-2.5 left-3 text-gray-400"/>
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-10 pr-4 py-2 border rounded-full text-sm"
            />
          </div>

          <div className="overflow-y-auto flex-1 space-y-2">
            {sidebarChats.length === 0 ? (
              <div className="text-gray-500 text-sm">No chats</div>
            ) : (
              sidebarChats.map(c => (
                <div
                  key={c.chatId}
                  onClick={() => setActiveChat(c.chatId)}
                  className={`flex items-center gap-2 px-2 py-1 rounded cursor-pointer ${
                    c.chatId === activeChat
                      ? 'bg-gray-200'
                      : 'hover:bg-gray-100'
                  }`}
                >
                  {c.sellerProfile ? (
                    <img src={c.sellerProfile}
                         className="w-7 h-7 rounded-full"/>
                  ) : (
                    <FaUserCircle className="text-lg"/>
                  )}
                  <div className="flex-1 truncate">
                    <div className="text-sm font-medium">{c.sellerName}</div>
                    <div className="text-xs text-gray-500 truncate">
                      {c.productName}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </aside>

        {/* CHAT PANEL */}
        <section className="w-full md:w-2/3 flex flex-col h-full">
          {/* Seller Header */}
          <header className="flex items-center gap-2 p-4 border-b">
            {sellerProfile ? (
              <img src={sellerProfile}
                   className="w-8 h-8 rounded-full"/>
            ) : (
              <FaUserCircle className="text-2xl text-gray-500"/>
            )}
            <h3 className="font-semibold">{sellerName}</h3>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`max-w-[70%] mb-2 p-2 rounded ${
                  msg.senderId === buyerId
                    ? 'ml-auto bg-red-100'
                    : 'bg-gray-100'
                }`}
              >
                {msg.text && <div className="text-sm">{msg.text}</div>}
                {msg.fileUrl && (
                  <div className="mt-1">
                    <a
                      href={msg.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline text-sm"
                    >
                      {msg.fileName}
                    </a>
                  </div>
                )}
              </div>
            ))}
            <div ref={messagesEndRef}/>
          </div>

          {/* Input + Preview + Send */}
          <div className="p-4 border-t flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              disabled={sending}
            >
              <FaPlus size={20} color="red"/>
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              className="flex-1 border rounded-full px-4 py-2 text-sm"
              disabled={sending}
            />

            {/* Preview */}
            {pendingFile && (
              <div className="flex items-center gap-2">
                {pendingFileUrl ? (
                  <img
                    src={pendingFileUrl}
                    alt="preview"
                    className="w-10 h-10 object-cover rounded border"
                  />
                ) : (
                  <span className="text-xs italic">{pendingFile.name}</span>
                )}
              </div>
            )}

            <button
              onClick={handleSend}
              className="bg-red-600 text-white px-4 py-2 rounded-full text-sm"
              disabled={sending}
            >
              {sending ? '...' : 'Send'}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Modal_chat;
