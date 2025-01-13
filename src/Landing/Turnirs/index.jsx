import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import LandingNavbar from '../shared/Layouts/Navbar';

const LandingTurnirs = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });

  useEffect(() => {
    const fetchTurnirs = async () => {
      try {
        const response = await fetch('http://localhost:8080/turnirs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const turnirs = await response.json();
        setData(turnirs);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTurnirs();
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const filteredData = sortedData.filter((turnir) =>
    turnir.name.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const changePage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalTurnirs = data.length;

  return (
    <>
      <LandingNavbar />
      <section className={styles.turnirsSection}>
        <div className={styles.turnirsContainer}>
          <div className={styles.textContainer}>
            <h2 className={styles.turnirsTitle}>Our Tournaments</h2>
            <p className={styles.descriptionText}>
              Find all the tournaments hosted by our platform.
            </p>
            {loading && <p className={styles.loadingText}>Loading...</p>}
            {error && <p className={styles.errorText}>Error: {error}</p>}
          </div>

          <div className={styles.searchContainer}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search by tournament name"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {!loading && !error && (
            <div className={styles.tableContainer}>
              <table className={styles.customTable}>
                <thead>
                  <tr>
                    <th onClick={() => requestSort('name')}>
                      Tournament Name {sortConfig.key === 'name' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th onClick={() => requestSort('date')}>
                      Date {sortConfig.key === 'date' ? (sortConfig.direction === 'asc' ? '↑' : '↓') : ''}
                    </th>
                    <th>Number of Teams</th>
                  </tr>
                </thead>
                <tbody>
                  {currentPageData.map((turnir, index) => (
                    <tr key={index}>
                      <td>{turnir.name}</td>
                      <td>{new Date(turnir.date).toLocaleDateString()}</td>
                      <td>{turnir.length}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {!loading && !error && (
            <div className={styles.pagination}>
              {Array.from({ length: Math.ceil(filteredData.length / itemsPerPage) }).map((_, index) => (
                <button
                  key={index}
                  className={styles.pageButton}
                  onClick={() => changePage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default LandingTurnirs;
