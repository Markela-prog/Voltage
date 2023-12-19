// Initialize displayed vote counts from localStorage
window.onload = function() {
    // Get all radio inputs
    let options = document.querySelectorAll('input[type="radio"]');
    
    options.forEach(function(option) {
        console.log('option.value:', option.value);  // Debug line

        // Get the corresponding result element
        let result = document.querySelector('.count-' + option.value);
        
        console.log('result:', result);  // Debug line

        // Get the current vote count from localStorage (or 0 if not set)
        let count = parseInt(localStorage.getItem(option.value)) || 0;
        
        // Update the displayed vote count
        if (result) {
            result.textContent = count + ' votes';
        }
    });
};





// Get all vote buttons
let voteButtons = document.querySelectorAll('.vote-button');

// Add click event listener to each button
voteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
        // Get the form of the clicked button
        let form = button.parentElement;
        
        // Get all radio inputs in the form
        let options = form.querySelectorAll('input[type="radio"]');
        
        // Check if a radio button is selected
        let selected = Array.from(options).some(radio => radio.checked);
        
        if (!selected) {
            alert('Please select an option before voting.');
            return;
        }
        
        // Iterate over the options to find the selected one
        options.forEach(function(option) {
            if (option.checked) {
                // Get the corresponding result element
                let result = document.querySelector('#' + form.id.replace('form', 'results') + ' .count-' + option.value);
                
                // Get the current vote count from localStorage (or 0 if not set)
                let count = parseInt(localStorage.getItem(option.value)) || 0;
                
                // Increment the vote count
                count++;
                
                // Store the new vote count in localStorage
                localStorage.setItem(option.value, count);
                
                // Update the displayed vote count
                result.textContent = count + ' votes';
                
                // Show success message
                alert('Your vote has been counted. Thank you!');
            }
        });
    });
});





