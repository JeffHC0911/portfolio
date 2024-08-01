function generateSkillCards(skills) {
  let html = '<div class="info-card mt-2">';

  for (let skill of skills) {
    html += '<div class="card">';
    html += '<div class="header">' + skill.category + "</div>";
    html += '<div class="body">';

    for (let item of skill.items) {
      html += '<div class="skill">';
      html += '<i class="' + item.icon + '"></i>';
      html += '<div class="skill-name">' + item.name + "</div>";
      html += "</div>";
    }

    html += "</div></div>";
  }

  html += "</div>";
  return html;
}

function generateProjectsCard(projects) {
  let html = '<div class="info-card mt-2">';
  for (let project of projects) {
    html += '<div class="card-project">';
    html += '<div class="front-content">';
    html += '<img src="' + project.image + '" alt="img-project">';
    html +=
      '<a href="' +
      project.url +
      '" target="_blank" class="project-btn">Ver proyecto</a>';
    html += "</div>";
    html += '<div class="content">';
    html += '<h2 class="heading">' + project.name + "</h2>";
    html += '<p class="project-description">' + project.description + "</p>";
    html += "</div>";
    html += "</div>";
  }
  html += "</div>";
  return html;
}

async function fetchData() {
  try {
    const response = await fetch("./data/projects.json");
    const data = await response.json();
    const projectsCards = generateProjectsCard(data);
    document.getElementById("projects-container").innerHTML = projectsCards;
    return data;
  } catch (error) {
    console.log("Error al cargar los datos ", error);
  }
}

function sendEmail(event) {
  event.preventDefault(); // Prevenir recarga de la página
  const parms = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value,
  };

  emailjs.send("service_71mx8pe", "template_nlaomlb", parms).then(
    (result) => {
      alert("Mensaje enviado correctamente");
    },
    (error) => {
      alert("Error al enviar el mensaje: " + error.text);
    }
  );
}

// Asignar el evento submit al formulario
document.getElementById("contactForm").addEventListener("submit", sendEmail);

function calculateAge(birthDate) {
  const today = new Date();
  const birthDateObj = new Date(birthDate);
  let age = today.getFullYear() - birthDateObj.getFullYear();
  const monthDiff = today.getMonth() - birthDateObj.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDateObj.getDate())
  ) {
    age--;
  }
  return age;
}

document.addEventListener("DOMContentLoaded", (event) => {
  const birthDate = "2001-04-09";
  const age = calculateAge(birthDate);
  document.getElementById("age").textContent = age;
});

const skills = [
  {
    category: "Front-End",
    items: [
      {
        name: "HTML",
        icon: "fa-brands fa-html5 fa-beat fa-xl text-danger",
      },
      {
        name: "CSS",
        icon: "fa-brands fa-css3-alt fa-beat fa-xl text-primary",
      },
      {
        name: "JavaScript",
        icon: "fa-brands fa-square-js fa-beat fa-xl text-warning",
      },
      {
        name: "React",
        icon: "fa-brands fa-react fa-beat fa-xl text-primary",
      },
      {
        name: "Angular",
        icon: "fa-brands fa-angular fa-beat fa-xl text-danger",
      },
      {
        name: "Vue.js",
        icon: "fa-brands fa-vuejs fa-beat fa-xl text-success",
      },
    ],
  },
  {
    category: "Back-End",
    items: [
      {
        name: "Node.js",
        icon: "fa-brands fa-node-js fa-beat fa-xl text-success",
      },
      {
        name: "Java",
        icon: "fa-brands fa-java fa-beat fa-xl text-danger",
      },
      {
        name: "Python",
        icon: "fa-brands fa-python fa-beat fa-xl",
      },
      {
        name: "Oracle",
        icon: "fa-solid fa-check-double fa-beat fa-xl text-danger",
      },
      {
        name: "MySQL",
        icon: "fa-solid fa-check-double fa-beat fa-xl text-primary",
      },
      {
        name: "MongoDB",
        icon: "fa-solid fa-check-double fa-beat fa-xl text-success",
      },
    ],
  },
];

const skillCards = generateSkillCards(skills);
document.getElementById("skills-container").innerHTML = skillCards;

fetchData();
