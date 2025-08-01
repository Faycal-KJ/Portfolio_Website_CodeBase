import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import LOGO from './Assets/Logo.png';
import Titanic from './Assets/Titanic1.png';
import Bitcoin from './Assets/Bitcoin.png';
import AI from './Assets/AI.png';
import HomeVideo from './Assets/HomeSCREEnVideo.webm';

function App() {
  const statRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [githubStats, setGithubStats] = useState(null);
  const [leetcodeStats, setLeetcodeStats] = useState(null);

  useEffect(() => {
    // GitHub public repos
    fetch('https://api.github.com/users/AZWOLD/repos?per_page=100')
      .then(res => res.json())
      .then(repos => {
        let totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
        setGithubStats(prev => ({
          ...prev,
          publicRepos: repos.length,
          stars: totalStars,
        }));
      });
  
    // GitHub contributions
    fetch('https://github-contributions-api.jogruber.de/v4/azwold')
      .then(res => res.json())
      .then(data => {
        const contributions = data?.years?.[0]?.total || 0;
        setGithubStats(prev => ({
          ...prev,
          contributions,
        }));
      });
  
    // LeetCode Stats
    fetch('https://leetcode-stats-api.herokuapp.com/Faisal_kdj')
      .then(res => res.json())
      .then(data => {
        setLeetcodeStats({ totalSolved: data.totalSolved });
      });
  }, []);
  return (
    <div className="App">
      <header className="Top-Bar">
        <a href="#projects" className="HeadButton">Projects</a>
        <a href="#stats" className="HeadButton">Stats</a>
        <img src={LOGO} alt='LOGO' className="LogoCircle"/>
        <a href="#contacts" className="HeadButton">Contacts</a>
        <a href="#about" className="HeadButton">About</a>
      </header>

      <div className="HomeScreen">
        <video
          src={HomeVideo}
          className="Video"
          autoPlay
          muted
          loop
          playsInline
        />
        <div className="StatsOverlay">
            <div className="Stat-Left">
              <p>📦 Projects: {githubStats ? githubStats.publicRepos : 'Loading...'}</p>
              <p>📈 Contributions: {githubStats?.contributions ?? 'Loading...'}</p>
            </div>
            <div className="Stat-Right">
              <p>🔥 LeetCode Solves: {leetcodeStats ? leetcodeStats.totalSolved : 'Loading...'}</p>
              <p>⭐ GitHub Stars: {githubStats?.stars ?? 'Loading...'}</p>
            </div>
        </div>
      </div>
        <div className="BottomStatsBanner">
          <p>🎓 1st Year Computer Science Student</p>
          <p>🌍 Based in Algeria</p>
          <p>💻 Most Used Language: Python</p>
        </div>

      <section id='about'>
        <div className="Plak">
          <div className="Plak-Text">
            <p className="HomeScreen-Para">Hi, I'm Faisal 👋</p>
            <p className="HomeScreen-Para">
              I'm a Computer Science student with a passion for artificial intelligence and software engineering. 
              My goal is to build intelligent systems that make life easier, more efficient, and more human.
            </p>
            <p className="HomeScreen-Para">
              Whether it's a machine learning model or a smart AI assistant, I focus on practical applications with real impact.
            </p>
            <p className="HomeScreen-Para">
              This portfolio is a glimpse into my journey — learning, building, and evolving.
            </p>
          </div>
        </div>
      </section>

      <section id='projects'>
        <p className='PROJECTS-SEC-TITLE'>PROJECTS</p>
        <div className='Projects-Wrapper'>

          {/* Project 1 */}
          <div className="Project-CARD">
            <div>
              <p className="Project-CARD-TITLE">Titanic Survival Prediction</p>
              <p className="Project-CARD-Description">A classic machine learning project using the Titanic dataset to predict passenger survival based on variables like age, fare, cabin, and embarkation port.</p>
              <p className="Project-CARD-Description">📈 Accuracy: ~77% | 🧰 Tools: Python, scikit-learn, Pandas</p>
              <div>
                <a href="https://github.com/AZWOLD/Titanic_PRE_AI" target="_blank" rel="noreferrer">
                  <button className="Project-CARD-BUTTON">GitHub Repo</button>
                </a>
                <Link to="/titanic-demo" style={{ textDecoration: 'none' }}>
                  <button li="/titanic-demo" className="Project-CARD-BUTTON">Demo</button>
                </Link>
              </div>
            </div>
            <img src={Titanic} alt='Titanic Project' className='Project-CARD-IMAGE'/>
          </div>

          {/* Project 2 */}
          <div className="Project-CARD">
            <div>
              <p className="Project-CARD-TITLE">Bitcoin Price Forecast</p>
              <p className="Project-CARD-Description">A deep learning model using LSTM to predict 12-hour Bitcoin trends based on the last 89 days of historical data including prices, volume, and market cap.</p>
              <p className="Project-CARD-Description">📈 Tools: Python, TensorFlow, LSTM, Matplotlib</p>
              <div>
                <a href="https://github.com/AZWOLD/BitCoin_PRE_AI" target="_blank" rel="noreferrer">
                  <button className="Project-CARD-BUTTON">GitHub Repo</button>
                </a>
                <Link to="/bitcoin-demo" style={{ textDecoration: 'none' }}>
                  <button li="/bitcoin-demo" className="Project-CARD-BUTTON">Demo</button>
                </Link>
              </div>
            </div>
            <img src={Bitcoin} alt='Bitcoin Forecast Project' className='Project-CARD-IMAGE'/>
          </div>

          {/* Project 3 */}
          <div className="Project-CARD">
            <div>
              <p className="Project-CARD-TITLE">QUADRA - AI Assistant</p>
              <p className="Project-CARD-Description">QUADRA is a smart desktop AI assistant featuring voice control, memory, and system awareness. Just say "Computer" to wake it up.</p>
              <p className="Project-CARD-Description">💡 Features:</p>
              <ul className="Project-CARD-Description">
                <li>🗣️ Voice-controlled commands</li>
                <li>🧠 LLM memory & personality engine</li>
                <li>⚙️ OS-level control (open/close apps, shutdown, etc.)</li>
                <li>📊 Real-time PC stats (CPU, user, storage)</li>
              </ul>
              <p className="Project-CARD-Description">📦 Tech: Python, OpenAI API, pyttsx3, psutil, custom wake word detection</p>
              <div>
                <a href="https://github.com/AZWOLD/AETHER_AI_Assistant" target="_blank" rel="noreferrer">
                  <button className="Project-CARD-BUTTON">GitHub Repo</button>
                </a>
              </div>
            </div>
            <img src={AI} alt='QUADRA AI Assistant' className='Project-CARD-IMAGE'/>
          </div>

        </div>
      </section>

      <section id='contacts'>
        <div className='About-SEC'>
          <p className='ABOUT-SEC-TITLE'>CONTACT</p>
          <div className="Contact-Buttons">
            <a href="https://www.linkedin.com/in/kaddour-djebbar-faycal-41452327a/" target="_blank" rel="noopener noreferrer">
              <button className="Contact-BUTTON">LinkedIn</button>
            </a>
            <a href="https://github.com/AZWOLD" target="_blank" rel="noopener noreferrer">
              <button className="Contact-BUTTON">GitHub</button>
            </a>
            <a href="mailto:faycalkdj0@gmail.com">
              <button className="Contact-BUTTON">Email Me</button>
            </a>
            <a href="/Assets/Faisal_Resume.pdf" target="_blank" rel="noopener noreferrer">
              <button className="Contact-BUTTON">Download CV</button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
