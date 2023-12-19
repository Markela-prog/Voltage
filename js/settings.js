// Get the settings link and the buttons
var settingsLink = document.getElementById('settings');
var increaseFontButton = document.getElementById('increase-font');
var decreaseFontButton = document.getElementById('decrease-font');
var modeSwitch = document.querySelector('.switch');

// Initially hide the buttons
increaseFontButton.style.display = 'none';
decreaseFontButton.style.display = 'none';
modeSwitch.style.display = 'none';

// Add a click event listener to the settings link
settingsLink.addEventListener('click', function(event) {
    event.preventDefault(); // Prevent the default action

    // Toggle the display of the buttons
    if (increaseFontButton.style.display === 'none') {
        increaseFontButton.style.display = 'flex';
        decreaseFontButton.style.display = 'flex';
        modeSwitch.style.display = 'flex';
    } else {
        increaseFontButton.style.display = 'none';
        decreaseFontButton.style.display = 'none';
        modeSwitch.style.display = 'none';
    }
});

var checkbox = document.getElementById("checkbox");

// Check local storage for mode
if (localStorage.getItem('mode') === 'dark') {
    document.body.classList.add("light-mode");
    document.querySelector(".container-fluid").classList.add("light-mode");
    checkbox.checked = true;
}

checkbox.addEventListener("change", function () {
  var body = document.body;

  body.classList.toggle("light-mode");

  var container = document.querySelector(".container-fluid");

  container.classList.toggle("light-mode");
  container.classList.toggle("dark-mode");
  

  if (body.classList.contains("light-mode")) {
    localStorage.setItem('mode', 'dark');
  } else {
    localStorage.setItem('mode', 'light');
  }
});

// Increase/Decrease Font Size
var fontSize = localStorage.getItem('fontSize') || 16; // Start with a base font size
document.documentElement.style.fontSize = fontSize + "px";

document.getElementById("increase-font").addEventListener("click", function () {
  fontSize++;
  document.documentElement.style.fontSize = fontSize + "px";
  localStorage.setItem('fontSize', fontSize);
});
document.getElementById("decrease-font").addEventListener("click", function () {
  fontSize--;
  document.documentElement.style.fontSize = fontSize + "px";
  localStorage.setItem('fontSize', fontSize);
});

