import './App.css';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
        <h1>What On Solve</h1>
        <p>하나의 문제에서 무한한 가능성을 찾아내다.</p>
      </header>
      <section>
        <h2>회사 소개</h2>
        <p>
          What On Solve는 
          AI 기술을 통해 더 나은 세상을 만드는 데 기여하고 있습니다. <br/>
          인공지능, IoT 등 다양한 기술 영역에서 LLM 솔루션을 제공합니다.
        </p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2>연락처</h2>
        <p>E-mail : jaeuk-oh@whatonsolve.com</p>
        <p>Mobile : 010-8633-9811</p>
      </section>
      <footer style={{ marginTop: '3rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
        <p>&copy; 2025 WhatOnSolve. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
