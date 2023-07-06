import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    let data = [];
    try {
      const response = await fetch('api/v1/logs', {
        cors: false,
      });
      data = await response.json();
    } catch (error) {
      alert(error);
    }

    if (data.length !== 0) {
      setLogs(data);
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchLogs();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <h1>Log App</h1>
        <p>Loading...</p>
      </div>
    );
  } else {
    return (
      <div>
        <h1 className="App">Log App</h1>
        <hr></hr>
        <div>
          {
            logs.map((log, index) => {
                return (
                  <div key={index} style={{marginBottom: 10}}>
                    <p className="App">{log.log_index}</p>
                    {
                      log.log_info.map((info, index) => {
                        return (
                          <div key={index} style={{marginLeft: 10}}>
                            <p>USER: {info.user}</p>
                            <p>ALEXA: {info.bot}</p>
                          </div>
                        );
                      })
                    }
                    <hr></hr>
                  </div>
                );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
