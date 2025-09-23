document.addEventListener('DOMContentLoaded', () => {
    const formSteps = document.querySelectorAll('.form-step');
    const currentStepTitle = document.getElementById('current-step-title');

    // Step 1 elements
    const emailMobileInput = document.getElementById('email-mobile');
    const sendOtpBtn = document.getElementById('send-otp-btn');
    const gotoLoginLink = document.getElementById('goto-login');
    const gotoSignupLink = document.getElementById('goto-signup');

    // Step 2 elements
    const otpDestination = document.getElementById('otp-destination');
    const otpInput = document.getElementById('otp-input');
    const verifyOtpBtn = document.getElementById('verify-otp-btn');
    const resendOtpBtn = document.getElementById('resend-otp-btn');

    // Step 3 elements (Sign Up finalization)
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const finalSubmitBtn = document.getElementById('final-submit-btn');
    const backToOtpLink = document.getElementById('back-to-otp');

    // Step 4 elements (Login)
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginBtn = document.getElementById('login-btn');
    const backToInitialLink = document.getElementById('back-to-initial');

    let currentActiveStep = 1; // Start at step 1

    function showStep(stepNumber, title) {
        formSteps.forEach((step, index) => {
            if (index + 1 === stepNumber) {
                step.classList.add('active');
            } else {
                step.classList.remove('active');
            }
        });
        currentStepTitle.textContent = title;
        currentActiveStep = stepNumber;
    }

    // --- Event Listeners ---

    // Step 1: Send OTP
    sendOtpBtn.addEventListener('click', () => {
        const input = emailMobileInput.value;
        if (input) {
            // *** BACKEND INTEGRATION POINT ***
            // In a real app, you'd send 'input' to your backend here
            // to request an OTP.
            // fetch('/api/send-otp', { method: 'POST', body: JSON.stringify({ destination: input }) })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
                    otpDestination.textContent = input; // Update OTP destination text
                    showStep(2, 'Verify OTP');
            //     } else {
            //         alert('Failed to send OTP: ' + data.message);
            //     }
            // })
            // .catch(error => console.error('Error sending OTP:', error));
        } else {
            alert('Please enter your email or mobile number.');
        }
    });

    // Step 1: Switch to Login
    gotoLoginLink.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(4, 'Login to Your Account');
    });

    // Step 1: Switch to Sign Up (actually, just stay on step 1 and proceed to OTP)
    gotoSignupLink.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(1, 'Login or Sign Up');
        emailMobileInput.value = '';
    });


    // Step 2: Verify OTP
    verifyOtpBtn.addEventListener('click', () => {
        const otp = otpInput.value;
        if (otp && otp.length === 6) {
            // *** BACKEND INTEGRATION POINT ***
            // In a real app, send the OTP and the original destination to your backend
            // for verification.
            // fetch('/api/verify-otp', { method: 'POST', body: JSON.stringify({ destination: emailMobileInput.value, otp: otp }) })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
                    showStep(3, 'Create Account Details');
            //     } else {
            //         alert('Invalid OTP. Please try again.');
            //     }
            // })
            // .catch(error => console.error('Error verifying OTP:', error));
        } else {
            alert('Please enter a 6-digit OTP.');
        }
    });

    // Step 2: Resend OTP (conceptual)
    resendOtpBtn.addEventListener('click', () => {
        alert('Resending OTP... (In a real app, this would trigger a new OTP)');
        // *** BACKEND INTEGRATION POINT ***
        // Call your backend again to send a new OTP
    });

    // Step 3: Final Sign Up Submission
    finalSubmitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const username = usernameInput.value;
        const password = passwordInput.value;
        if (username && password) {
            // *** BACKEND INTEGRATION POINT ***
            // fetch('/api/register', { method: 'POST', body: JSON.stringify({ emailOrMobile: emailMobileInput.value, username, password }) })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
                    alert('Sign Up Successful! Redirecting to dashboard...');
                    window.location.href = 'dashboard.html'; // <<< THIS IS THE KEY CHANGE
            //     } else {
            //         alert('Sign Up Failed: ' + data.message);
            //     }
            // })
            // .catch(error => console.error('Error during registration:', error));
        } else {
            alert('Please enter a username and password.');
        }
    });

    // Step 3: Back to OTP
    backToOtpLink.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(2, 'Verify OTP');
    });

    // Step 4: Login Submission
    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const username = loginUsernameInput.value;
        const password = loginPasswordInput.value;
        if (username && password) {
            // *** BACKEND INTEGRATION POINT ***
            // fetch('/api/login', { method: 'POST', body: JSON.stringify({ username, password }) })
            // .then(response => response.json())
            // .then(data => {
            //     if (data.success) {
                    alert('Login Successful! Redirecting to dashboard...');
                    window.location.href = 'dashboard.html'; // <<< THIS IS THE KEY CHANGE
            //     } else {
            //         alert('Login Failed: ' + data.message);
            //     }
            // })
            // .catch(error => console.error('Error during login:', error));
        } else {
            alert('Please enter your username and password.');
        }
    });

    // Step 4: Back to initial email/mobile entry
    backToInitialLink.addEventListener('click', (e) => {
        e.preventDefault();
        showStep(1, 'Login or Sign Up');
        loginUsernameInput.value = '';
        loginPasswordInput.value = '';
    });


    // Initial state: show Step 1
    showStep(1, 'Login or Sign Up');
});