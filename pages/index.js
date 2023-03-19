import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import buildspaceLogo from '../assets/buildspace-logo.png';

const Home = () => {
  const maxRetries = 20;
  const [input, setInput] = useState("");
  const [img, setImg] = useState("");

  // Numbers of retries
  const [retry, setRetry] = useState(0);
  // Number of retries left
  const [retryCount, setRetryCount] = useState(maxRetries);
  const [isGenerating, setIsGenerating] = useState(false);
  const [finalPrompt, setFinalPrompt] = useState(''); 

  const onChange = (event) => {
    setInput(event.target.value);
  };


  const generateAction = async () => {
    console.log('Generating...');

    if (isGenerating && retry === 0) return;

    setIsGenerating(true);


    if (retry > 0) {
      setRetryCount((prevState) => {
        if (prevState === 0) {
          return 0;
        } else {
          return prevState - 1;
        }
      });

      setRetry(0);
    }

    const finalInput = input.replace(/Haaniya-Iram17/gi, "Hira");

    const response = await fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'image/jpeg',
      },
      body: JSON.stringify({ finalInput }),
    });
    
    const data = await response.json();

    if (response.status === 503) {
      setRetry(data.estimated_time);
      return;
    }
  
    if (!response.ok) {
      console.log(`Error: ${data.error}`);
      setIsGenerating(false);
      return;
    }
  
    setFinalPrompt(input);
    setInput(" ");
    setImg(data.image);
    setIsGenerating(false);
  };

  const sleep = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };


  useEffect(() => {
    const runRetry = async () => {
      if (retryCount === 0) {
        console.log(
          `Model still loading after ${maxRetries} retries. Try request again in 5 minutes.`
        );
        setRetryCount(maxRetries);
        return;
      }

      console.log(`Trying again in ${retry} seconds.`);

      await sleep(retry * 1000);
      await generateAction();
    };

    if (retry === 0) {
      return;
    }

    runRetry();
  }, [retry]);


  return (
    <div className="root">
      <Head>
        <title>IndieAvatar: Grant Your Image Wishes| buildspace</title>
      </Head>
      <div className="container">
        <div className="header">
          <div className="header-title">
            <h1>IndieAvatar: Grant Your Image Wishes</h1>
          </div>
          <div className="header-subtitle">
            <h2>Hi, I'm Hira, and you'll never forget it.
            </h2>
          </div>
          <div className="prompt-container">
        <input className="prompt-box" value={input} onChange={onChange}/>
        <div className="prompt-buttons">
          <a className={
        isGenerating ? 'generate-button loading' : 'generate-button'
      } onClick={generateAction}>
          <div className="generate">
          {isGenerating ? (
          <span className="loader"></span>
        ) : (
        <p>Generate</p>
        )}
      </div>
          </a>
        </div>
        </div>
        </div>
        {img && (
      <div className="output-content">
        <Image src={img} width={512} height={512} alt={finalPrompt} />
        <p>{finalPrompt}</p>
      </div>
    )}
      
      </div>
    </div>
  );
};

export default Home;
