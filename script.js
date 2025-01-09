const API_KEY = '69b1fb320e1549e28bd18dc11a81b928';
    const PAGE_SIZE = 4;
    let currentPage = 1;
    let currentCategory = 'general';
    let currentQuery = '';

    async function fetchNews(category = 'general', page = 1) {
      currentCategory = category;
      currentPage = page;
      currentQuery = ''; // Reset search query when a category is selected
      const API_URL = `https://newsapi.org/v2/top-headlines?country=us&category=${category}&pageSize=${PAGE_SIZE}&page=${page}&apiKey=${API_KEY}`;
      
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
          displayNews(data.articles);
        } else {
          document.getElementById('news-articles').innerHTML = '<p>No articles found or API limit reached.</p>';
        }
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    }

    async function searchNews(event) {
      event.preventDefault();
      const query = document.getElementById('search-query').value;
      if (query) {
        currentQuery = query;
        const API_URL = `https://newsapi.org/v2/everything?q=${query}&pageSize=${PAGE_SIZE}&page=${currentPage}&apiKey=${API_KEY}`;
        
        try {
          const response = await fetch(API_URL);
          const data = await response.json();
          if (data.status === 'ok') {
            displayNews(data.articles);
          } else {
            document.getElementById('news-articles').innerHTML = '<p>No articles found for your search.</p>';
          }
        } catch (error) {
          console.error('Error searching news:', error);
        }
      }
    }

    function displayNews(articles) {
      const newsContainer = document.getElementById('news-articles');
      
      // Filter out articles with missing data
      const validArticles = articles.filter(article => article.title && article.url && article.urlToImage);
      
      if (validArticles.length === 0) {
        newsContainer.innerHTML = '<p>No valid news articles available at the moment.</p>';
      } else {
        newsContainer.innerHTML = validArticles.map(article => {
          const imageUrl = article.urlToImage || 'https://via.placeholder.com/300x200?text=No+Image';
          return `
            <div class="news-card">
              <img src="${imageUrl}" alt="News Image">
              <h3>${article.title}</h3>
              <p>${article.description || 'No description available.'}</p>
              <a href="${article.url}" target="_blank">Read More</a>
            </div>
          `;
        }).join('');
      }
    }

    function changePage(direction) {
      fetchNews(currentCategory, currentPage + direction);
    }

    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('light-mode');
      document.querySelector('.navbar').classList.toggle('light-mode');
      document.querySelector('.sidebar').classList.toggle('light-mode');
      document.querySelector('.news-container').classList.toggle('light-mode');
      document.querySelector('.news-articles').classList.toggle('light-mode');
      const modeIcon = document.querySelector('.mode-icon');
      modeIcon.innerHTML = document.body.classList.contains('light-mode') 
        ? '🌞' 
        : '🌙';
    });

    window.onload = () => fetchNews();