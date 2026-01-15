document.getElementById("pollForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const selectedVote = document.querySelector('input[name="vote"]:checked');

    if (selectedVote) {
        document.getElementById("message").textContent =
            "Thank you for sharing your opinion!";
    }
});
