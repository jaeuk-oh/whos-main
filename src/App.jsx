import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = 3;
  const [canScroll, setCanScroll] = useState(false); // 일단 단일 페이지만
  const [textArray, setTextArray] = useState([]);

  const handleScroll = (event) => {
    if (!canScroll) return;

    if (event.deltaY > 0 && currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else if (event.deltaY < 0 && currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }

    setCanScroll(false);
    setTimeout(() => setCanScroll(true), 800);
  };

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { passive: true });
    return () => window.removeEventListener('wheel', handleScroll);
  }, [currentPage, canScroll]);

  // 🔥 requestAnimationFrame 방식으로 타이핑 효과 구현
  useEffect(() => {
    const textToType = "What On Solve."; // 타이핑될 텍스트
    let i = 0;
    let timeoutId = null;

    const type = () => {
      if (i < textToType.length) {
        setTextArray((prev) => [...prev, textToType.charAt(i)]);
        i++;
        timeoutId = setTimeout(type, 150);
      }
    };

    // 타이핑 시작
    type();

    // 정리 함수로 타이핑 중지
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="App">
      <div
        className="pages-wrapper"
        style={{ transform: `translateY(-${currentPage * 100}vh)` }}
      >
        <section className={`page ${currentPage === 0 ? 'in-view' : ''}`} style={{ backgroundColor: '#2c3e50' }}>
          <header>
            <h1 className="typing-effect">
              {textArray.map((char, index) => {
                const isInSolve = index >= 8 && index <= 12;

                return (
                  <span
                    key={index}
                    className='appear'
                    style={{
                      color: isInSolve ? 'white' : 'black',
                    }}
                  >
                    {char}
                  </span>
                );
              })}
            </h1>
            <p>하나의 문제에서 무한한 가능성을 찾아내다.</p>
            <p>세상을 바꿀 한 걸음, 이제 곧 시작됩니다.</p>
          </header>
        </section>
      </div>

      <footer>
        <p> contact : jaeuk.oh@WhatOnSolve.com</p>
        <p>&copy; 2025 WhatOnSolve. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
