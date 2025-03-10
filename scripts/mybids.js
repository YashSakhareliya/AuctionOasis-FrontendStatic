// Initialize Lucide icons
lucide.createIcons();

// Sample data
const myBids = [
    {
        id: '1',
        itemTitle: 'Vintage Rolex Submariner',
        image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        yourBid: 15000,
        currentBid: 15500,
        timestamp: '2024-03-19T14:30:00Z',
        timeLeft: '2h 15m',
        status: 'outbid'
    },
    {
        id: '2',
        itemTitle: 'Antique Persian Rug',
        image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        yourBid: 8500,
        currentBid: 8500,
        timestamp: '2024-03-19T13:15:00Z',
        timeLeft: '4h 30m',
        status: 'winning'
    }
];

// DOM Elements
const bidsList = document.getElementById('bidsList');
const searchInput = document.getElementById('searchInput');
const statusFilter = document.getElementById('statusFilter');

// Event Listeners
searchInput.addEventListener('input', filterBids);
statusFilter.addEventListener('change', filterBids);

// Functions
function renderBids(bids) {
    bidsList.innerHTML = bids.map(bid => `
        <div class="bid-card">
            <div class="bid-content">
                <div class="bid-image">
                    <img src="${bid.image}" alt="${bid.itemTitle}">
                </div>
                <div class="bid-details">
                    <div class="bid-header">
                        <h3 class="bid-title">${bid.itemTitle}</h3>
                        <span class="bid-status ${bid.status}">
                            <i data-lucide="${bid.status === 'winning' ? 'arrow-up' : 'arrow-down'}" class="icon-sm"></i>
                            ${bid.status === 'winning' ? 'Winning' : 'Outbid'}
                        </span>
                    </div>
                    <div class="bid-amounts">
                        <div class="bid-amount">
                            <span class="amount-label">Your Bid</span>
                            <span class="amount-value">$${bid.yourBid.toLocaleString()}</span>
                        </div>
                        <div class="bid-amount">
                            <span class="amount-label">Current Bid</span>
                            <span class="amount-value">$${bid.currentBid.toLocaleString()}</span>
                        </div>
                    </div>
                    <div class="bid-footer">
                        <span>Bid placed on ${new Date(bid.timestamp).toLocaleDateString()}</span>
                        <span>Time left: ${bid.timeLeft}</span>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Reinitialize icons for newly added content
    lucide.createIcons();
}

function filterBids() {
    const searchTerm = searchInput.value.toLowerCase();
    const statusValue = statusFilter.value;

    const filtered = myBids.filter(bid => {
        const matchesSearch = bid.itemTitle.toLowerCase().includes(searchTerm);
        const matchesStatus = statusValue === 'all' || 
            (statusValue === 'winning' && bid.status === 'winning') ||
            (statusValue === 'outbid' && bid.status === 'outbid');
        return matchesSearch && matchesStatus;
    });

    renderBids(filtered);
}

// Initial render
renderBids(myBids);