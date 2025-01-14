const shareButtons = document.querySelectorAll('.tile-share-button');

async function copyText(e) {
    // Prevent button default behavior
    e.preventDefault();
    const link = this.getAttribute('link');

    if (!link) {
        showCustomAlert('No link found to copy.', 'error');
        return;
    }

    try {
        await navigator.clipboard.writeText(link);
        showCustomAlert('Link copied to clipboard!', 'success');
    } catch (error) {
        console.error('Error copying text: ', error);
        showCustomAlert('Failed to copy link.', 'error');
    }
}

// Attach event listener to each share button
shareButtons.forEach((shareButton) => {
    shareButton.addEventListener('click', copyText);
});

// Custom alert function
function showCustomAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `custom-alert ${type}`;
    alertBox.innerHTML = `
        <div class="alert-content">
            <svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                ${type === 'success' 
                    ? '<path d="M9 21.75l-6.5-6.5L4.25 14l4.75 4.75L20 8l1.75 1.75L9 21.75z"/>' 
                    : '<path d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 17.5c-4.278 0-7.75-3.472-7.75-7.75S7.722 4.25 12 4.25s7.75 3.472 7.75 7.75-3.472 7.75-7.75 7.75zm-1-12h2v5h-2zm0 7h2v2h-2z"/>'}
            </svg>
            <span>${message}</span>
        </div>
    `;

    // Add to the document
    document.body.appendChild(alertBox);

    // Automatically remove the alert after a duration
    setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 500);
    }, 3000);
}

// Custom styles for the alert
const style = document.createElement('style');
style.innerHTML = `
    .custom-alert {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: rgba(0, 121, 107, 0.9);
        color: #fff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideIn 0.3s ease;
    }
    .custom-alert.success { background: rgba(0, 168, 255, 0.9); }
    .custom-alert.error { background: rgba(255, 111, 0, 0.9); }
    .custom-alert .alert-content { display: flex; align-items: center; }
    .custom-alert .alert-icon { width: 24px; height: 24px; }
    .custom-alert.fade-out { opacity: 0; transform: translateX(100%); transition: opacity 0.5s, transform 0.5s; }
    @keyframes slideIn {
        from { transform: translateX(100%); }
        to { transform: translateX(0); }
    }
`;
document.head.appendChild(style);
