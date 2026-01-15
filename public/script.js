function register() {
    fetch("/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value
        })
    })
    .then(() => {
        alert("Registration successful");
        window.location.href = "index.html";
    });
}

function login(isAdmin) {
    fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: username.value,
            password: password.value,
            isAdmin: isAdmin
        })
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("username", username.value);
            window.location.href = isAdmin ? "admin.html" : "poll.html";
        } else {
            alert("Invalid credentials");
        }
    });
}

function submitVote() {
    const selected = document.querySelector('input[name="vote"]:checked');

    if (!selected) {
        alert("Please select a vote");
        return;
    }

    fetch("/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: localStorage.getItem("username"),
            vote: selected.value
        })
    })
    .then(() => alert("Vote submitted successfully"));
}
