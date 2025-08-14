// Dropdown functionality
document.addEventListener('DOMContentLoaded', function() {
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const dropdownButton = document.querySelector('.dropdown-toggle');

    dropdownItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get the selected text
            const selectedText = this.textContent;
            
            // Update the dropdown button text
            dropdownButton.textContent = selectedText;
            
            // Optional: Add any category filtering logic here
            console.log('Selected category:', selectedText);
        });
    });
});