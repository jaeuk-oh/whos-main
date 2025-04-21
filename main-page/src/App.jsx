import './App.css';

function App() {
  return (
    <div className="App" style={{ fontFamily: 'sans-serif', padding: '2rem' }}>
      <header style={{ borderBottom: '1px solid #ccc', marginBottom: '2rem' }}>
        <h1>MyCompany</h1>
        <p>기술로 세상을 연결합니다</p>
      </header>
      <section>
        <h2>회사 소개</h2>
        <p>
          MyCompany는 혁신적인 기술을 통해 더 나은 세상을 만드는 데 기여하고 있습니다.
          인공지능, 클라우드, IoT 등 다양한 기술 영역에서 솔루션을 제공합니다.
        </p>
      </section>
      <section style={{ marginTop: '2rem' }}>
        <h2>연락처</h2>
        <p>이메일: contact@mycompany.com</p>
        <p>전화: 02-1234-5678</p>
      </section>
      <footer style={{ marginTop: '3rem', borderTop: '1px solid #ccc', paddingTop: '1rem' }}>
        <p>&copy; 2025 MyCompany. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
