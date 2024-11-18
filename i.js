
document.addEventListener('DOMContentLoaded', () => {
    
    try {
        // Retrieve values from localStorage
        const city = localStorage.getItem("city");
        const name = localStorage.getItem("name");
        console.log(city);
        // Try to access the elements and set their values
        const cityElement = document.getElementById("city");
        const nameElement = document.getElementById("doctor");
        // Check if the elements exist before setting their values
        if (cityElement && city) {
            cityElement.value = city;  // Set city value if element exists
        }

        if (nameElement && name) {
            nameElement.value = name;  // Set name value if element exists
        }
    } 
    catch (error) {
        console.log("Error setting values on DOM load:", error);
    }
    // Responsive Navbar Toggle
    const isDoctorPage = document.getElementById("doctor-page");
    if (isDoctorPage) {
        // Fetch all doctors initially
        fetchAllDoctors();

        // Add event listener for the search button
        const searchButton = document.getElementById("search-button");
        searchButton.addEventListener("click", () => {
            const specialtyInput = document.getElementById("search-specialty").value.trim();
            const cityInput = document.getElementById("search-city").value.trim();
            const experienceInput = document.getElementById("search-experience").value.trim();
            if (specialtyInput && cityInput && experienceInput) {
                fetchDoctorsBySpecialty(specialtyInput,cityInput,experienceInput);
            } else {
                alert("Please enter a specialty to search.");
            }
        });
    }

    // Adjust sections based on screen size
    function adjustSections() {
        const header = document.querySelector('.header');
        const services = document.getElementById('services');
        const newsSection = document.querySelector('.news-section');
        const reviewSection = document.querySelector('.review-section');
        
        if (window.innerWidth <= 768) {
            header.style.minHeight = '100vh';
            services.style.minHeight = 'auto';
            newsSection.style.minHeight = 'auto';
            reviewSection.style.minHeight = 'auto';
        } else {
            header.style.minHeight = '100vh';
            services.style.minHeight = '100vh';
            newsSection.style.minHeight = '80vh';
            reviewSection.style.minHeight = '80vh';
        }
    }

    window.addEventListener('resize', adjustSections);
    adjustSections(); // Initial call

    
    // Smooth scrolling to each section
    const navLinks = document.querySelectorAll('.navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); 
            const sectionId = link.getAttribute('href'); 
            const targetSection = document.querySelector(sectionId);

            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });

            navbar.classList.remove('active');
        });
    });

    // Navbar Search Feature
    const searchButton = document.querySelector('.main-search button');
    searchButton.addEventListener('click', () => {
        const searchInput = document.querySelector('.main-search input').value.trim();
        if (searchInput) {
            alert(`Searching for: ${searchInput}`);
        } else {
            alert('Please enter a search term');
        }
    });

    // Popup for Contact Form
    const contactButton = document.querySelector('#contact-footer');
    const contactForm = document.querySelector('.contact-section');
    
    contactButton.addEventListener('click', () => {
        contactForm.style.display = 'block';
        contactForm.scrollIntoView({ behavior: 'smooth' });
    });

    // Close Contact Form
    contactForm.addEventListener('click', () => {
        contactForm.style.display = 'none';
    });

    // Interactive Service Section
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.backgroundColor = '#476d07';
        });
        item.addEventListener('mouseleave', () => {
            item.style.backgroundColor = 'rgb(127, 171, 127)';
        });
        item.addEventListener('click', () => {
            alert(`You selected: ${item.querySelector('h3').textContent}`);
        });
    });

    // Carousel Controls for News Section
    const newsItems = document.querySelectorAll('.news-item');
    const newsTrack = document.querySelector('.carousel-track');
    let newsIndex = 0;

    function updateNewsCarousel() {
        newsTrack.style.transform = `translateX(-${newsIndex * 100}%)`;
    }

    document.querySelector('.carousel-btn.next').addEventListener('click', () => {
        newsIndex = (newsIndex + 1) % newsItems.length;
        updateNewsCarousel();
    });

    document.querySelector('.carousel-btn.prev').addEventListener('click', () => {
        newsIndex = (newsIndex - 1 + newsItems.length) % newsItems.length;
        updateNewsCarousel();
    });

    // Carousel Controls for Review Section
    const reviewSlides = document.querySelectorAll('.review-slide');
    let reviewIndex = 0;

    function showReviewSlide(index) {
        reviewSlides.forEach((slide, i) => {
            slide.classList.toggle('active', i === index);
        });
    }

    document.querySelector('.carousel-buttons .next').addEventListener('click', () => {
        reviewIndex = (reviewIndex + 1) % reviewSlides.length;
        showReviewSlide(reviewIndex);
    });

    document.querySelector('.carousel-buttons .prev').addEventListener('click', () => {
        reviewIndex = (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
        showReviewSlide(reviewIndex);
    });

    showReviewSlide(reviewIndex);
    updateNewsCarousel();

    // Notification popup
    function showNotification() {
        const notificationBar = document.createElement('div');
        notificationBar.className = 'notification-bar';
        notificationBar.innerHTML = '<p>Welcome to our health website! Check out the latest news.</p>';
        document.body.prepend(notificationBar);

        setTimeout(() => {
            notificationBar.style.display = 'none';
        }, 5000);
    }

    showNotification();

    // Close navbar when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && !menuBtn.contains(e.target)) {
            navbar.classList.remove('active');
        }
    });
});
// Open and Close the Login Modal
function openLogin() {
    document.getElementById("login-modal").style.display = "flex";
}
function openRegister(){
    document.getElementById("register-modal").style.display = "flex";
}
function closeRegister(){
    document.getElementById("register-modal").style.display = "none";
}
function closeLogin() {
    document.getElementById("login-modal").style.display = "none";
}
function profile()
    {
        window.location.href = "/profile.html";
    }

async function Register(event)
{
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username2").value.trim();
    const password = document.getElementById("password2").value.trim();

    const registrationdata = {
        username:username,
        password:password
    };

    

    try {
        const response = await fetch("http://127.0.0.1:5000/register",{
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(registrationdata)
        })
        if (!response.ok)
            {
                document.getElementById("register-error").style.display = "flex";

            }
            alert("Regiatration successful!");
            closeLogin();
    }
    catch(error){
        console.error("Registration Failed");
        document.getElementById("register-error").style.display = "flex";
    }

    

    
}

// Form Validation
function validateLogin(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("password").value.trim();

    if (!username || !password) {
        alert("Please fill out all fields.");
        return;
    }

    if (!validateEmail(password)) {
        alert("Please enter a valid email address.");
        return;
    }

    alert("Login successful!");
    closeLogin();
}

async function login(event) {
    event.preventDefault();

    // Collect user input
    const username2 = document.getElementById("username2").value.trim();
    const password2 = document.getElementById("password2").value.trim();

    const logindata = {
        username: username2,
        password: password2
    };

    try {
        // Send login request to the backend
        const response = await fetch("http://127.0.0.1:5000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(logindata)
        });

        // Handle response
        if (response.ok) { 
            const result = await response.text();

            if (result.trim() === "login") { 
                // Login successful, close modal or redirect
                document.getElementById("login").style.display = "none";
                document.getElementById("register").style.display = "none";
                closeLogin(); // Ensure this function is defined elsewhere

                return;
            }
        }

        // If login fails, show error
        document.getElementById("login-error").style.display = "flex";
    } catch (error) {
        console.error("Login Failed:", error);
        document.getElementById("login-error").style.display = "flex";
    }
}




// Email Validation Helper Function
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
// Function to toggle the visibility of reviews
function toggleReviews(reviewId) {
    const reviewElement = document.getElementById(reviewId);
    if (reviewElement.style.display === "none" || reviewElement.style.display === "") {
        reviewElement.style.display = "block";
    } else {
        reviewElement.style.display = "none";
    }
}

// Function to search hospitals by name
function searchHospitals() {
    const searchInput = document.getElementById("searchInput").value.toLowerCase();
    const hospitalCards = document.querySelectorAll(".hospital-card");

    hospitalCards.forEach(card => {
        const hospitalName = card.querySelector("h3").innerText.toLowerCase();
        if (hospitalName.includes(searchInput)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Function to filter hospitals by specialty
function filterBySpecialty(specialty) {
    const hospitalCards = document.querySelectorAll(".hospital-card");

    hospitalCards.forEach(card => {
        const hospitalSpecialty = card.querySelector("p:nth-of-type(1)").innerText.toLowerCase();
        if (hospitalSpecialty.includes(specialty.toLowerCase()) || specialty === "All") {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Function to filter hospitals by cost range
function filterByCost(minCost, maxCost) {
    const hospitalCards = document.querySelectorAll(".hospital-card");

    hospitalCards.forEach(card => {
        const costText = card.querySelector("p:nth-of-type(2)").innerText;
        const [minRange, maxRange] = costText.match(/\d+/g).map(Number);

        if ((minRange >= minCost && minRange <= maxCost) || (maxRange >= minCost && maxRange <= maxCost)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
}

// Function to reset all filters and show all hospitals
function resetFilters() {
    const hospitalCards = document.querySelectorAll(".hospital-card");
    hospitalCards.forEach(card => card.style.display = "block");
    document.getElementById("searchInput").value = "";
}
// Function to toggle the visibility of doctor details
function toggleDetails(detailsId) {
    const detailsElement = document.getElementById(detailsId);
    if (detailsElement.style.display === "none" || detailsElement.style.display === "") {
        detailsElement.style.display = "block";
    } else {
        detailsElement.style.display = "none";
    }
}
document.addEventListener("DOMContentLoaded", () =>{
    const alphabetNav = document.querySelector(".alphabet-nav");
    const serviceItems = document.querySelectorAll(".service-item");

    // Event listener for the alphabet navigation
    alphabetNav.addEventListener("click", (event) => {
        if (event.target.tagName === "SPAN") {
            const letter = event.target.textContent.trim();
            filterServices(letter);
        }
    });


    // Function to filter services based on the selected letter
    function filterServices(letter) {
        serviceItems.forEach(item => {
            const serviceName = item.querySelector("h3").textContent.trim();
            if (serviceName.startsWith(letter)) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }
    });
    }
});
document.addEventListener("DOMContentLoaded", function () {
    const ctx = document.getElementById("activityChart").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Jan 1", "Jan 2", "Jan 3", "Jan 4", "Jan 5"],
            datasets: [
                {
                    label: "Aerobics",
                    data: [50, 60, 70, 80, 90],
                    backgroundColor: "rgba(88, 129, 87, 0.6)",
                },
                {
                    label: "Yoga",
                    data: [30, 40, 50, 60, 70],
                    backgroundColor: "rgba(163, 177, 138, 0.6)",
                },
                {
                    label: "Meditation",
                    data: [20, 30, 40, 50, 60],
                    backgroundColor: "rgba(218, 215, 205, 0.6)",
                },
            ],
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,
                },
            },
        },
    });
});
// Sample data for doctors based on city and medical issue
const doctorsByCityAndIssue = {
    delhi: {
        cardiology: ["Dr. John Doe", "Dr. Emily Heart"],
        dermatology: ["Dr. Sarah Skin", "Dr. Tim Derm"],
        neurology: ["Dr. Brian Neuro", "Dr. Wendy Brain"],
        dentistry: ["Dr. Alice Tooth", "Dr. Karen Smile"]
    },
    chennai: {
        orthopedics: ["Dr. James Bone", "Dr. Amy Joint"],
        pediatrics: ["Dr. Lily Child", "Dr. Susan Kids"],
        ophthalmology: ["Dr. Ian Vision", "Dr. Rachel Sight"],
        psychiatry: ["Dr. Phil Mind", "Dr. Julia Calm"]
    },
    mumbai: {
        cardiology: ["Dr. Sam Heart", "Dr. Angela Vessels"],
        dermatology: ["Dr. Olive Skin", "Dr. Tony Spot"],
        orthopedics: ["Dr. Alan Spine", "Dr. Clara Fracture"],
        psychiatry: ["Dr. Hannah Peace", "Dr. Leo Focus"]
    },
    gujrat: {
        pediatrics: ["Dr. Susan Child", "Dr. Monica Baby"],
        dentistry: ["Dr. Mark Clean", "Dr. Ann Smile"],
        ophthalmology: ["Dr. Ellen Eyes", "Dr. Victor Lens"],
        neurology: ["Dr. Sarah Brain", "Dr. Raj Neuron"]
    },
    noida: {
        cardiology: ["Dr. Chris Heart", "Dr. Nadia Pulse"],
        dermatology: ["Dr. Peter Skin", "Dr. Fiona Glow"],
        psychiatry: ["Dr. Zoe Calm", "Dr. Ethan Peace"],
        orthopedics: ["Dr. Tom Muscle", "Dr. Natalie Joint"]
    }
};

// Populate doctors based on selected city and issue
document.getElementById("city").addEventListener("change", updateDoctors);
document.getElementById("issue").addEventListener("change", updateDoctors);

function updateDoctors() {
    const city = document.getElementById("city").value;
    const issue = document.getElementById("issue").value;
    const doctorSelect = document.getElementById("doctor");

    doctorSelect.innerHTML = '<option value="">--Select a Doctor--</option>'; // Reset options

    if (city && issue && doctorsByCityAndIssue[city] && doctorsByCityAndIssue[city][issue]) {
        doctorsByCityAndIssue[city][issue].forEach(doctor => {
            const option = document.createElement("option");
            option.value = doctor;
            option.textContent = doctor;
            doctorSelect.appendChild(option);
        });
    }
}

// Handle form submission
document.getElementById("appointmentForm").addEventListener("submit", function (event) {
    event.preventDefault();

    // Gather form data
    const city = document.getElementById("city").value;
    const issue = document.getElementById("issue").value;
    const doctor = document.getElementById("doctor").value;
    const appointmentType = document.querySelector('input[name="appointmentType"]:checked').value;
    const appointmentDate = document.getElementById("appointmentDate").value;
    const appointmentTime = document.getElementById("appointmentTime").value;

    // Confirmation message
    const confirmationMessage = `
        Appointment Scheduled!<br>
        City: ${city.charAt(0).toUpperCase() + city.slice(1)}<br>
        Issue: ${issue.charAt(0).toUpperCase() + issue.slice(1)}<br>
        Doctor: ${doctor}<br>
        Type: ${appointmentType}<br>
        Date: ${appointmentDate}<br>
        Time: ${appointmentTime}
    `;

   // Display alert message for appointment confirmation
   alert("Your appointment has been successfully booked!");

   // Display confirmation on the page
   document.getElementById("confirmationMessage").innerHTML = confirmationMessage;
   document.getElementById("confirmationSection").style.display = "block";

   // Reset the form
   document.getElementById("appointmentForm").reset();
   
});

var prescriptions = [];
function addPrescription() {
    const doctorName = document.getElementById("doctorName").value;
    const hospitalName = document.getElementById("hospitalName").value;
    const patientName = document.getElementById("patientName").value;

    if (!Array.isArray(prescriptions)) {
        prescriptions = [];
    }

    if (doctorName && hospitalName && patientName) {
        const prescription = {
            doctor: doctorName,
            hospital: hospitalName,
            patient: patientName,
            details: [
                { medication: "Ibuprofen", dosage: "200 mg", instructions: "Take once every 8 hours" },
                { medication: "Paracetamol", dosage: "500 mg", instructions: "Take once every 6 hours" },
                { medication: "Amoxicillin", dosage: "250 mg", instructions: "Take twice daily" },
                { medication: "Cetirizine", dosage: "10 mg", instructions: "Take before bedtime" }
            ]
        };
        prescriptions.push(prescription);

        displayPrescriptions();
        alert("Prescription added successfully!");

        // Reset form
        document.getElementById("prescriptionForm").reset();
    } else {
        alert("Please fill in all the fields.");
    }
}

function displayPrescriptions() {
    const prescriptionsContainer = document.getElementById("prescriptions");
    prescriptionsContainer.innerHTML = "";

    prescriptions.forEach((prescription, index) => {
        const card = document.createElement("div");
        card.className = "prescription-card";

        const doctorInfo = document.createElement("h3");
        doctorInfo.textContent = `Dr. ${prescription.doctor} (${prescription.hospital})`;

        const patientInfo = document.createElement("p");
        patientInfo.textContent = `Patient: ${prescription.patient}`;

        const detailsList = document.createElement("ul");

        prescription.details.forEach(detail => {
            const detailItem = document.createElement("li");
            detailItem.innerHTML = `
                <strong>Medication:</strong> ${detail.medication}<br>
                <strong>Dosage:</strong> ${detail.dosage}<br>
                <strong>Instructions:</strong> ${detail.instructions}
            `;
            detailsList.appendChild(detailItem);
        });

        card.appendChild(doctorInfo);
        card.appendChild(patientInfo);
        card.appendChild(detailsList);
        prescriptionsContainer.appendChild(card);
    });
}
function generateMedicalHistory() {
    const patientName = document.getElementById("patientName").value;
    const dateOfBirth = document.getElementById("dateOfBirth").value;

    if (patientName && dateOfBirth) {
        document.getElementById("medicalHistory").style.display = "block";
    } else {
        alert("Please enter all required fields.");
    }
}


async function fetchAllDoctors() {
    try {
        const response = await fetch("http://127.0.0.1:8000/doctors");
        if (!response.ok) {
            throw new Error("Failed to fetch doctors");
        }
        const data = await response.json();
        renderDoctors(data.doctors);
    } catch (error) {
        console.error("Error loading doctors:", error);
    }
}

// Function to fetch doctors by specialty
async function fetchDoctorsBySpecialty(specialty,city,experience) {
    try {
        console.log(experience);
        const response = await fetch(`http://127.0.0.1:8000/doctors/${encodeURIComponent(specialty)}/${encodeURIComponent(city)}/${encodeURIComponent(experience)}`);
        if (!response.ok) {
            throw new Error("Failed to fetch doctors by specialty");
        }
        const data = await response.json();
        console.log(data);
        renderDoctors(data.doctors);
    } catch (error) {
        console.log("Error searching for doctors:",error);
        alert("No doctors found for the entered specialty.");
    }
}

// Function to render doctor data into the page
function renderDoctors(doctors) {
    const doctorListContainer = document.querySelector(".doctor-list");
    if (!doctorListContainer) return; // Ensure the container exists

    doctorListContainer.innerHTML = ""; // Clear existing content

    if (doctors.length === 0) {
        doctorListContainer.innerHTML = `<p>No doctors found for the selected specialty.</p>`;
        return;
    }

    doctors.forEach((doctor) => {
        // Create doctor card HTML dynamically
        const doctorCard = `
            <div class="doctor-card">
                <div class="doctor-info">
                    <img src="doctor-female-svgrepo-com.svg" alt="Doctor Photo" class="doctor-photo">
                    <h3 id ="name" value="${doctor.name}">${doctor.name}</h3>
                    <p id ="speciality"><strong>Specialty:</strong> ${doctor.specialty}</p>
                    <p id ="location" value="${doctor.city}"><strong>Location:</strong> ${doctor.city}</p>
                    <p id = "contact"><strong>Contact:</strong> ${doctor.contact}</p>
                    <p id = "experience"><strong>Experience:</strong> ${doctor.experience} Years</p>
                    <button onclick="redirect()">Confirm Appointment</button>
                </div>
            </div>
        `;
        // Append the new doctor card to the container
        doctorListContainer.insertAdjacentHTML("beforeend", doctorCard);
    });
}

function redirect() {
    const city = document.getElementById("location");
    console.log(city); // Log works now

    const name = document.getElementById("name");
    console.log(name); // Log works now

    // Assuming you're setting values for fields on the target page,
    // you cannot do this directly since the page is navigated away.
    // Instead, save them locally (e.g., localStorage or query parameters).
    localStorage.setItem("city", city.value);
    localStorage.setItem("name", name.value);
    console.log(city.value);

    // Redirect happens after all actions are complete
    window.location.href = "/appointment.html";

}

function something(){
    window.location.href = "/prescription.html";
}
