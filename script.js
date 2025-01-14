// Cookie management functions
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length, cookie.length);
        }
    }
    return "";
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector("form");
    
    // Load saved data from cookies if they exist
    const savedName = getCookie("userName");
    const savedEmail = getCookie("userEmail");
    if (savedName) document.getElementById("name").value = savedName;
    if (savedEmail) document.getElementById("email").value = savedEmail;

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        
        // Get the name value directly
        const nameInput = document.getElementById("name");
        const name = nameInput.value;
        
        // Store the name in cookie
        setCookie("userName", name, 30);
        
        // Store other form data
        const formData = new FormData(form);
        formData.forEach((value, key) => {
            if (key !== "name") {  // Skip name as we already handled it
                setCookie("user" + key.charAt(0).toUpperCase() + key.slice(1), value, 30);
            }
        });
        
        // Redirect to welcome page
        window.location.href = 'welcome.html';
    });
});
