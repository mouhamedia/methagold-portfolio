// Gestion améliorée de l'envoi d'email avec EmailJS (envoi sans quitter l'application)
// Le formulaire doit inclure les data-attributes : data-service-id, data-template-id, data-user-id
const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

function setStatus(message, isError = false) {
    if (statusEl) {
        statusEl.textContent = message;
        statusEl.style.color = isError ? '#d9534f' : '#28a745';
    } else {
        alert(message);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (!form) return;

    const serviceID = form.dataset.serviceId;
    const templateID = form.dataset.templateId;
    const userID = form.dataset.userId;

    const isConfigured = serviceID && templateID && userID && !/VOTRE_/i.test(serviceID + templateID + userID);

    // Si l'utilisateur a renseigné le userID, on initialise EmailJS dès le chargement pour gagner du temps
    if (isConfigured) {
        try {
            emailjs.init(userID);
        } catch (e) {
            console.warn('EmailJS init error:', e);
        }
    }

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitButton = form.querySelector('button[type="submit"]');
        const originalBtnText = submitButton ? submitButton.textContent : null;
        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Envoi...';
        }

        // Simple validation
        const name = (form.elements['name'] || {}).value || '';
        const email = (form.elements['email'] || {}).value || '';
        const message = (form.elements['message'] || {}).value || '';

        if (!name || !email || !message) {
            setStatus('Veuillez remplir tous les champs.', true);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalBtnText;
            }
            return;
        }

        if (!isConfigured) {
            // Ne pas sortir de l'application : informer simplement l'utilisateur
            setStatus('Envoi non configuré côté serveur/front (EmailJS manquant). Merci de configurer EmailJS dans contact.html.', true);
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = originalBtnText;
            }
            return;
        }

        // Envoi via EmailJS (reste dans l'application)
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                setStatus('Votre message a été envoyé avec succès !');
                form.reset();
            })
            .catch((error) => {
                console.error('Erreur EmailJS:', error);
                setStatus('Erreur lors de l\'envoi. Vérifiez la configuration EmailJS dans contact.html.', true);
            })
            .finally(() => {
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = originalBtnText;
                }
            });
    });
});

// Animation au scroll (Fade-in)
// Sélectionne tous les éléments avec la classe 'fade-in'
const fadeIns = document.querySelectorAll('.fade-in');

// Crée un IntersectionObserver pour détecter quand les éléments entrent dans le viewport.
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Si l'élément est visible (intersects), ajoute la classe 'visible'.
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optionnel : Arrête d'observer l'élément une fois qu'il est visible pour optimiser.
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1 // L'animation se déclenche quand 10% de l'élément est visible
});

// Attache l'observer à chaque élément 'fade-in'
fadeIns.forEach(element => observer.observe(element));

// Gestion du Menu Hamburger pour la navigation mobile
const hamburger = document.querySelector('.hamburger'); // Bouton hamburger
const navUl = document.querySelector('nav ul');       // Liste de navigation

// Vérifie si les éléments existent avant d'ajouter l'écouteur d'événement
if (hamburger && navUl) {
    hamburger.addEventListener('click', () => {
        // Bascule la classe 'active' sur la liste de navigation pour l'afficher/cacher
        navUl.classList.toggle('active');
    });
}

// Gestion du Bouton "Retour en haut"
const scrollTopButton = document.querySelector('.scroll-top'); // Le bouton lui-même

// Vérifie si le bouton existe
if (scrollTopButton) {
    // Ajoute un écouteur d'événement pour le scroll de la fenêtre
    window.addEventListener('scroll', () => {
        // Affiche le bouton si l'utilisateur a scrollé plus de 300px vers le bas
        if (window.scrollY > 300) {
            // Utilise 'flex' si votre CSS utilise flexbox pour centrer l'icône, sinon 'block' est aussi ok.
            scrollTopButton.style.display = 'flex';
        } else {
            // Cache le bouton si l'utilisateur est en haut de la page
            scrollTopButton.style.display = 'none';
        }
    });
}