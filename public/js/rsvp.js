document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formRSVP");
    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = {
            name: form.name.value,
            jumlah: form.jumlah.value
        };

        const res = await fetch("/api/rsvp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });
        const result = await res.json();
        alert(result.message);
        form.reset();
    });
});
