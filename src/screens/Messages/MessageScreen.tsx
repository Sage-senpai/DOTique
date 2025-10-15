import React from "react";
import { motion } from "framer-motion";
import "./MessagesScreen.scss";

/**
 * MessagesScreen (web-ready)
 * - Placeholder chat UI (left-side conversation list + right-side thread)
 * - Styled to be mobile-responsive and match your aesthetic
 */

export default function MessagesScreen() {
  return (
    <motion.div
      className="messages"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <aside className="messages__sidebar">
        <div className="messages__search">Search conversations</div>
        <ul className="messages__list">
          <li className="messages__item active">
            <div className="avatar">🧑‍🎨</div>
            <div className="meta">
              <div className="meta__name">Ava Designer</div>
              <div className="meta__snippet">Hey — love your recent drop!</div>
            </div>
            <div className="meta__time">2h</div>
          </li>
          <li className="messages__item">
            <div className="avatar">👗</div>
            <div className="meta">
              <div className="meta__name">Wardrobe Bot</div>
              <div className="meta__snippet">Your NFT sold 🎉</div>
            </div>
            <div className="meta__time">1d</div>
          </li>
        </ul>
      </aside>

      <section className="messages__thread">
        <div className="thread__header">
          <h3>Ava Designer</h3>
          <div className="thread__sub">Online</div>
        </div>

        <div className="thread__messages">
          <div className="bubble incoming">Love the palette on your last piece ✨</div>
          <div className="bubble outgoing">Thanks! Working on a new drop — stay tuned.</div>
        </div>

        <div className="thread__composer">
          <input className="composer__input" placeholder="Write a message..." />
          <button className="composer__send">Send</button>
        </div>
      </section>
    </motion.div>
  );
}
