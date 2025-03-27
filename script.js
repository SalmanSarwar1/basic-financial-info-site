document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const newsList = document.getElementById('news-list');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('close-lightbox');
    const lightboxInnerContent = document.getElementById('lightbox-inner-content');

    // Event listener for the "Learn More" button to show an alert
    learnMoreBtn.addEventListener('click', () => {
        alert('Thank you for your interest!  We will provide more information soon.');
    });

    // Sample news data (in a real application, this would come from an API)
    const newsData = [
        {
            title: "Stock Market Reaches New Highs",
            date: "2024-07-28",
            content: "The stock market surged to record levels this week, driven by strong economic data and positive investor sentiment.  The S&P 500 gained 2.5%, while the Dow Jones Industrial Average rose by 2%.  Analysts predict continued growth in the coming months, but advise investors to remain cautious...",
        },
        {
            title: "Inflation Rate Declines Slightly",
            date: "2024-07-27",
            content: "The inflation rate has declined slightly, according to the latest figures from the Bureau of Statistics. However, concerns remain about the long-term impact of rising energy prices. The central bank is expected to maintain its current monetary policy...",
        },
        {
            title: "New Tax Reforms Announced",
            date: "2024-07-26",
            content: "The government has announced a new set of tax reforms aimed at simplifying the tax code and increasing revenue collection. The reforms include changes to income tax slabs, corporate tax rates, and sales tax regulations. Experts are divided on the potential impact of these changes on the economy...",
        },
    ];

    // Function to add news items to the list
    function addNewsItems() {
        newsData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${item.title}</h3>
                <p class="news-date">${item.date}</p>
                <p>${item.content.substring(0, 100)}...</p>
                <button class="read-more-btn" data-title="${item.title}" data-content="${item.content}">Read More</button>
            `;
            newsList.appendChild(listItem);
        });
    }

    // Function to open the lightbox with news content
    function openLightbox(title, content) {
        lightboxInnerContent.innerHTML = `
            <h2>${title}</h2>
            <p>${content}</p>
        `;
        lightbox.classList.add('show');
    }

    // Event listener for the news list (to handle "Read More" clicks)
    newsList.addEventListener('click', (event) => {
        const target = event.target;
        if (target.classList.contains('read-more-btn')) {
            const title = target.dataset.title;
            const content = target.dataset.content;
            openLightbox(title, content);
        }
    });

    // Event listener for the close button of the lightbox
    closeLightbox.addEventListener('click', () => {
        lightbox.classList.remove('show');
        lightboxInnerContent.innerHTML = ''; // Clear content when closing
    });

    // Initial setup: Add news items when the page loads
    addNewsItems();
});

function openBudgetTool() {
    alert("Budgeting tool is under development");
}

function openInvestmentCalculator() {
    alert("Investment Calculator is under development");
}
