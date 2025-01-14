const shareButtons = document.querySelectorAll('.tile-share-button');
console.log(shareButtons);

async function copyText(e) {
    // Prevent button from navigating to the site
    e.preventDefault();
    const link = this.getAttribute('link');
    console.log(link);
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            // Attempt to use the modern Clipboard API
            await navigator.clipboard.writeText(link);
            showCustomAlert('Link copied to clipboard!', 'success');
        } else {
            // Fallback method for older or restricted browsers
            const textArea = document.createElement('textarea');
            textArea.value = link;
            textArea.style.position = 'fixed'; // Prevent scrolling to bottom of the page in mobile
            textArea.style.opacity = '0';
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            if (successful) {
                showCustomAlert('Link copied to clipboard!', 'success');
            } else {
                throw new Error('Fallback copy failed');
            }
        }
    } catch (error) {
        console.error('Error copying text: ', error);
        showCustomAlert('Failed to copy link. Please try again.', 'error');
    }
}

shareButtons.forEach((shareButton) => {
    shareButton.addEventListener('click', copyText);
});

// Custom alert function with Islamic design elements
function showCustomAlert(message, type) {
    const alertBox = document.createElement('div');
    alertBox.className = `custom-alert ${type}`;
    alertBox.innerHTML = `
        <div class="alert-content">
            <svg class="alert-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                ${
                    type === 'success'
                        ? '<path d="M9 21.75l-6.5-6.5L4.25 14l4.75 4.75L20 8l1.75 1.75L9 21.75z"/>'
                        : '<path d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm0 17.5c-4.278 0-7.75-3.472-7.75-7.75S7.722 4.25 12 4.25s7.75 3.472 7.75 7.75-3.472 7.75-7.75 7.75zm-1-12h2v5h-2zm0 7h2v2h-2z"/>'
                }
            </svg>
            <span>${message}</span>
        </div>
    `;
    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.classList.add('fade-out');
        setTimeout(() => alertBox.remove(), 500);
    }, 3000);
}

// CSS for the custom alert is unchanged, already included in your original code
