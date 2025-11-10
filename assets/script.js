// ========================================
// GESTION DU FORMULAIRE DE CONTACT - EmailJS
// ========================================
// Configuration : Remplissez les 3 valeurs dans contact.html (data-service-id, data-template-id, data-user-id)

const form = document.getElementById('contact-form');
const statusEl = document.getElementById('form-status');

if (form) {
    // Récupérer les identifiants depuis les attributs du formulaire
    const serviceID = form.dataset.serviceId;
    const templateID = form.dataset.templateId;
    const userID = form.dataset.userId;

    // Vérifier si la configuration est complète
    const isConfigured = serviceID && templateID && userID && 
                         !/VOTRE_/i.test(serviceID + templateID + userID);

    // Initialiser EmailJS dès le chargement si configuré
    if (isConfigured && typeof emailjs !== 'undefined') {
        emailjs.init(userID);
        console.log('✓ EmailJS initialisé avec succès');
    } else {
        console.warn('⚠ EmailJS non configuré. Veuillez ajouter Service ID, Template ID et User ID dans contact.html');
    }

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn?.textContent || 'Envoyer';

        // Validation simple
        const name = form.elements['name']?.value?.trim() || '';
        const email = form.elements['email']?.value?.trim() || '';
        const message = form.elements['message']?.value?.trim() || '';

        if (!name || !email || !message) {
            showStatus('❌ Veuillez remplir tous les champs.', true);
            return;
        }

        if (!isConfigured) {
            showStatus('❌ EmailJS non configuré. Ajoutez vos identifiants dans contact.html.', true);
            return;
        }

        // Feedback visuel pendant l'envoi
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.textContent = '⏳ Envoi...';
        }

        // Envoyer le formulaire via EmailJS
        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                showStatus('✅ Votre message a été envoyé avec succès !', false);
                form.reset();
                console.log('Message envoyé avec succès');
            })
            .catch((error) => {
                console.error('Erreur lors de l\'envoi:', error);
                showStatus('❌ Erreur lors de l\'envoi. Vérifiez votre configuration.', true);
            })
            .finally(() => {
                // Restaurer le bouton
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                }
            });
    });

    // Fonction pour afficher les messages de statut
    function showStatus(message, isError) {
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.style.color = isError ? '#d9534f' : '#28a745';
            statusEl.style.marginTop = '15px';
            statusEl.style.fontWeight = '600';
        }
    }
}

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