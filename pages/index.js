import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const [input, setInput] = useState('');
  return (
    <div className="root">
      <Head>
        <title>GenieAvatar: Grant Your Image Wishes| buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>GenieAvatar: Grant Your Image Wishes</h1>
          </div>
          <div className="header-subtitle">
            <h2>Hi, I'm Hira, and you'll never forget it.
            </h2>
          </div>
          <div className="prompt-container">
        <input className="prompt-box" value={input}/>
        </div>
        </div>
      </div>
      <div className="badge-container grow">
        <a
          href="https://buildspace.so/builds/ai-avatar"
          target="_blank"
          rel="noreferrer"
        >
          <div className="badge">
            <Image src={buildspaceLogo} alt="buildspace logo" />
            <p>build with buildspace</p>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Home;
