// Initialize Lucide icons
lucide.createIcons();

// Sample data
const auctions = [
    {
        id: '1',
        title: 'Vintage Rolex Submariner',
        image: 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
        currentBid: 15000,
        timeLeft: '2h 15m',
        bids: 23,
        status: 'active',
        participants: 12
    }
];

// DOM Elements
const biddingTabs = document.getElementById('biddingTabs');
const auctionsList = document.getElementById('auctionsList');

// Event Listeners
biddingTabs.addEventListener('click', handleTabClick);

// Functions
function handleTabClick(e) {
    if (e.target.classList.contains('tab-btn')) {
        // Update active tab
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        e.target.classList.add('active');

        // Filter and render auctions
        const status = e.target.dataset.tab;
        renderAuctions(filterAuctions(status));
    }
}

function filterAuctions(status) {
    return auctions.filter(auction => {
        switch (status) {
            case 'upcoming':
                return auction.status === 'upcoming';
            case 'active':
                return auction.status === 'active';
            case 'ended':
                return auction.status === 'ended';
            default:
                return true;
        }
    });
}

function renderAuctions(filteredAuctions) {
    auctionsList.innerHTML = filteredAuctions.map(auction => `
        <div class="auction-card">
            <div class="auction-image">
                <img src="${auction.image}" alt="${auction.title}">
            </div>
            <div class="auction-content">
                <div class="auction-header">
                    <h2>${auction.title}</h2>
                    <div class="time-remaining">
                        <i data-lucide="clock" class="icon-sm"></i>
                        <span>${auction.timeLeft}</span>
                    </div>
                </div>
                <div class="auction-stats">
                    <div class="stat">
                        <p class="stat-label">Current Bid</p>
                        <p class="stat-value">$${auction.currentBid.toLocaleString()}</p>
                    </div>
                    <div class="stat">
                        <p class="stat-label">Total Bids</p>
                        <p class="stat-value">${auction.bids}</p>
                    </div>
                    <div class="stat">
                        <p class="stat-label">Participants</p>
                        <p class="stat-value">${auction.participants}</p>
                    </div>
                </div>
                <div class="auction-actions">
                    ${auction.status === 'ended' ? `
                        <button class="btn-primary">
                            <i data-lucide="users" class="icon-sm"></i>
                            Join Group Bidding
                        </button>
                    ` : `
                        <button class="btn-primary btn-green">
                            <i data-lucide="dollar-sign" class="icon-sm"></i>
                            View Auction
                        </button>
                    `}
                </div>
            </div>
        </div>
    `).join('');

    // Reinitialize icons for newly added content
    lucide.createIcons();
}

// Initial render
renderAuctions(filterAuctions('active'));