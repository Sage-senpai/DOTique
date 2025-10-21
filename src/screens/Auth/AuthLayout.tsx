import React from "react";
import { motion } from "framer-motion";
import { easeIn, easeOut } from "framer-motion";
import "./authlayout.scss";

type AuthLayoutProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

const containerVariants = {
  hidden: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.45, ease: easeOut } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3, ease: easeIn } },
};

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  return (
    <div className="auth-outer">
      <motion.div
        className="auth-card"
        variants={containerVariants}
        initial="hidden"
        animate="enter"
        exit="exit"
        role="region"
        aria-labelledby="auth-title"
      >
        <header className="auth-header">
          <h1 id="auth-title" className="auth-title">
            {title}
          </h1>
          {subtitle && <p className="auth-subtitle">{subtitle}</p>}
        </header>

        <main className="auth-body">{children}</main>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
