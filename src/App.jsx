import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import liff from "@line/liff";

function App() {
  const [count, setCount] = useState(0);

  const [user, setUser] = useState({
    name: "載入中...",
    id: ""
  });

  useEffect(() => {
    const initLIFF = async () => {
      try {
        await liff.init({ liffId: "2009867749-7ud9onwA" });

        if (!liff.isLoggedIn()) {
          liff.login();
          return;
        }

        const profile = await liff.getProfile();

        setUser({
          name: profile.displayName,
          id: profile.userId
        });

      } catch (err) {
        console.error("LIFF 初始化失敗", err);
      }
    };

    initLIFF();
  }, []);

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" />
          <img src={reactLogo} className="framework" />
          <img src={viteLogo} className="vite" />
        </div>

        <h2>👋 你好 {user.name}</h2>

        <div>
          <h1>Get started</h1>
          <p>Edit <code>src/App.jsx</code></p>
        </div>

        <button className="counter" onClick={() => setCount(count + 1)}>
          Count is {count}
        </button>
      </section>
    </>
  );
}

export default App;