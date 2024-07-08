document.addEventListener("DOMContentLoaded", function() {
    // Populate certificate details (replace with actual data)
    const studentName = "Rohit";
    const courseName = "Advanced Web Development";
    const completionDate = new Date().toLocaleDateString();
    const studentPhoto = "images/rohit.jpg"; // Replace with actual photo path

    document.getElementById("student-name").textContent = studentName;
    document.getElementById("course-name").textContent = courseName;
    document.getElementById("completion-date").textContent = completionDate;
    document.getElementById("student-photo").src = studentPhoto;

    document.getElementById("download-btn").addEventListener("click", function() {
        const certificate = document.getElementById("certificate");

        html2canvas(certificate).then(canvas => {
            const link = document.createElement('a');
            link.download = 'certificate.png';
            link.href = canvas.toDataURL('image/png');
            link.click();
        }).catch(error => {
            console.error("Error generating certificate:", error);
        });
    });
});
