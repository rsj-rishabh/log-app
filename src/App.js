import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://18.204.239.18/api/v1/logs');
      if (response.status !== 200) {
        console.log("Error: " + response.status);
      }
      
      const data = await response.json();

      if (data?.length !== 0) {
        setLogs(data);
        setLoading(false);
      }

    } catch (error) {
      console.log(error);
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
