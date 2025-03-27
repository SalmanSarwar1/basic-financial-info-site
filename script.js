document.addEventListener('DOMContentLoaded', () => {
    const learnMoreBtn = document.getElementById('learn-more-btn');
    const newsList = document.getElementById('news-list');
    const lightbox = document.getElementById('lightbox');
    const closeLightbox = document.getElementById('close-lightbox');
    const lightboxInnerContent = document.getElementById('lightbox-inner-content');
    const messageBox = document.getElementById('message-box');
    const messageText = document.getElementById('message-text');

    // Function to display a message
    function showMessage(message) {
        messageText.textContent = message;
        messageBox.classList.remove('hidden');
        messageBox.classList.add('show');
    }

    // Hide message box when clicking anywhere on the page
    document.addEventListener('click', (event) => {
        if (!messageBox.contains(event.target) && !learnMoreBtn.contains(event.target)) {
            messageBox.classList.remove('show');
            messageBox.classList.add('hidden');
        }
    });

    // Event listener for the "Learn More" button to show a message
    learnMoreBtn.addEventListener('click', () => {
        showMessage('Thank you for your interest! We will provide more information soon.');
    });

    // Function to fetch news data from an API
    async function fetchNews() {
        var requestOptions = {
            method: 'GET'
        };

        var params = {
            api_token: '7f16XoULOwlU86hccykgD8oXYVEOE05p0zmqLTSW',
            symbols: 'msft,fb',
            limit: '50'
        };

        var esc = encodeURIComponent;
        var query = Object.keys(params)
            .map(function(k) { return esc(k) + '=' + esc(params[k]); })
            .join('&');

        try {
            const response = await fetch("https://api.marketaux.com/v1/news/all?" + query, requestOptions);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const newsData = await response.json();
            console.log('Fetched news data:', newsData); // Log the fetched data
            addNewsItems(newsData.data); // Adjusted to match the new API response structure
        } catch (error) {
            console.error('Failed to fetch news data:', error);
        }
    }

    // Function to add news items to the list
    function addNewsItems(newsData) {
        newsList.innerHTML = ""; // Clear existing news items

        newsData.forEach((item) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <h3>${item.title}</h3>
                <p class="news-date">${new Date(item.published_at).toLocaleDateString()}</p>
                <p>${item.snippet}</p>
                <button class="read-more-btn" data-title="${item.title}" data-content="${item.description}">Read More</button>
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

    // Initial setup: Fetch and add news items when the page loads
    fetchNews();

    // Show/hide tools
    window.openBudgetTool = function() {
        const budgetContent = document.getElementById('budget-tool-content');
        budgetContent.classList.toggle('show');
    }

    window.openInvestmentCalculator = function() {
        const investmentContent = document.getElementById('investment-calculator-content');
        investmentContent.classList.toggle('show');
    }

    // Budget calculator
    window.calculateBudget = function() {
        const income = parseFloat(document.getElementById('income').value);
        const expensesInput = document.getElementById('expenses').value;
        const budgetResult = document.getElementById('budget-result');

        if (isNaN(income) || income <= 0) {
            budgetResult.textContent = "Please enter a valid income.";
            return;
        }

        const expenses = {};
        const expensesArray = expensesInput.split(',');
        expensesArray.forEach(expense => {
            const parts = expense.split(':');
            if (parts.length === 2) {
                const category = parts[0].trim();
                const amount = parseFloat(parts[1].trim());
                if (!isNaN(amount) && amount > 0) {
                    expenses[category] = amount;
                }
            }
        });

        let totalExpenses = 0;
        for (const category in expenses) {
            totalExpenses += expenses[category];
        }

        const balance = income - totalExpenses;

        if (balance >= 0) {
            budgetResult.textContent = `Your budget is balanced. You have $${balance} remaining.`;
        } else {
            budgetResult.textContent = `You are over budget by $${Math.abs(balance)}.`;
        }
    }

    // Investment calculator
    window.calculateInvestment = function() {
        const initialInvestment = parseFloat(document.getElementById('initial-investment').value);
        const annualContribution = parseFloat(document.getElementById('annual-contribution').value);
        const interestRate = parseFloat(document.getElementById('interest-rate').value) / 100;
        const years = parseInt(document.getElementById('years').value);
        const investmentResult = document.getElementById('investment-result');

        if (isNaN(initialInvestment) || isNaN(annualContribution) || isNaN(interestRate) || isNaN(years) || initialInvestment <= 0 || annualContribution < 0 || interestRate <= 0 || years <= 0) {
            investmentResult.textContent = "Please enter valid numbers for all fields.";
            return;
        }

        let futureValue = initialInvestment;
        for (let i = 0; i < years; i++) {
            futureValue = futureValue * (1 + interestRate) + annualContribution;
        }

        investmentResult.textContent = `Your investment will be worth $${futureValue.toFixed(2)} after ${years} years.`;
    }

    // Tax calculator
    window.calculateTax = function() {
        const income = parseFloat(document.getElementById('tax-income').value);
        const taxRate = parseFloat(document.getElementById('tax-rate').value) / 100;
        const taxResult = document.getElementById('tax-result');

        if (isNaN(income) || isNaN(taxRate) || income <= 0 || taxRate <= 0) {
            taxResult.textContent = "Please enter valid numbers for income and tax rate.";
            return;
        }

        const tax = income * taxRate;
        taxResult.textContent = `Your tax liability is $${tax.toFixed(2)}.`;
    }

    // Add event listener for tax calculator
    document.getElementById('tax-calculate-btn').addEventListener('click', calculateTax);
});
