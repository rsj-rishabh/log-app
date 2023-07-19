import { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [logs, setLogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // fetchPosts(currentPage);
    console.log('Fake function call.')
  }, [currentPage]);

  const fetchPosts = async (page) => {
    try {
      const response = await axios.get(`http://<hostname>/api/v1/logs`, {
        params: { page: page },
      });
      const { data, headers } = response;
      setLogs(data);
      setTotalPages(Number(headers['x-total-pages']));

    } catch (error) {
      console.log(error);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
      <div>
        <h1 className="App">Log App</h1>
        <hr></hr>
        <div className="App">
          <div>AWS Server has been shutdown. No Data will be shown here.</div>
          <button onClick={goToPreviousPage}>Previous</button>
          <button onClick={goToNextPage}>Next</button>
        </div>
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

export default App;
