import React from "react";

function Layout(props) {

  return (
    <div className="chat-container">
        <header className="chat-header">
            <h1>Join any group</h1>
        </header>
        <main className="chat-main">
            {props.children}
        </main>
    </div>
  );
}

export default Layout;