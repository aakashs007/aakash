'use client';

import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { daysPassed } from '../../helper/util';

export default function SubscribeButton() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    let lastTime = localStorage.getItem('lastTime');
    const currentTime = new Date().getTime();

    setTimeout(() => {
      if (!lastTime || daysPassed(currentTime, lastTime) > 4) {
        setShow(true);
        lastTime = new Date().getTime();
        localStorage.setItem('lastTime', lastTime);
      }
    }, 5000);
  }, []);

  function handleCloseClick() {
    setShow(false);
  }

  if (!show) return null;

  return (
    <div className={styles.contBtn}>
      <div className={styles.parentCls}>
        <button type="button" aria-label="Toggle theme" className={`d-flex bg-transparent border-0 p-0 ${styles.closeBtn}`} onClick={handleCloseClick}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        </button>
      </div>
      <iframe
        title="Subscribe to News Letter"
        src="https://aakashcse.substack.com/embed"
        width="480"
        height="320"
        className={styles.iframeCls}
        frameBorder="0"
        scrolling="no"
      />
    </div>
  );
}
