var usernameField = document.getElementById('username');
        var passwordField = document.getElementById('password');
        var emailField = document.getElementById('email');

        usernameField.addEventListener('input', validateUsername);
        passwordField.addEventListener('input', validatePassword);
        emailField.addEventListener('input', validateEmail);

        function validateUsername() {
            if(usernameField.value === '') {
                usernameField.style.borderColor = 'red';
                document.getElementById('usernameError').textContent = 'Username cannot be empty';
            } else {
                usernameField.style.borderColor = '';
                document.getElementById('usernameError').textContent = '';
            }
        }

        function validatePassword() {
            var password = passwordField.value;
            var errorMessage = '';

            if(password === '') {
                errorMessage = 'Password cannot be empty';
            } else if(password.length < 8) {
                errorMessage = 'Password must be at least 8 characters long';
            } else if(!/[A-Z]/.test(password)) {
                errorMessage = 'Password must contain at least one uppercase letter';
            } else if(!/[a-z]/.test(password)) {
                errorMessage = 'Password must contain at least one lowercase letter';
            } else if(!/[0-9]/.test(password)) {
                errorMessage = 'Password must contain at least one number';
            } else if(!/[^a-zA-Z0-9]/.test(password)) {
                errorMessage = 'Password must contain at least one special character';
            }

            if(errorMessage !== '') {
                passwordField.style.borderColor = 'red';
                document.getElementById('passwordError').textContent = errorMessage;
            } else {
                passwordField.style.borderColor = '';
                document.getElementById('passwordError').textContent = '';
            }
        }

        function validateEmail() {
            var email = emailField.value;
            var errorMessage = '';

            if(email === '') {
                errorMessage = 'Email cannot be empty';
            } else if(email.indexOf('@') === -1) {
                errorMessage = 'Email must contain @';
            } else if(!email.endsWith('.com')) {
                errorMessage = 'Email must end with .com';
            } else {
                var re = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
                if (!re.test(email)) {
                    errorMessage = 'Email format is incorrect';
                }
            }

            if(errorMessage !== '') {
                emailField.style.borderColor = 'red';
                document.getElementById('emailError').textContent = errorMessage;
            } else {
                emailField.style.borderColor = '';
                document.getElementById('emailError').textContent = '';
            }
        }

        document.getElementById('loginForm').addEventListener('submit', function(event) {
            event.preventDefault();

            validateUsername();
            validatePassword();
            validateEmail();

            if(usernameField.style.borderColor === 'red' || passwordField.style.borderColor === 'red' || emailField.style.borderColor === 'red') {
                return false;
            }

            alert('Form submitted successfully');
            window.location.href = 'index.html';
            return true;
        });