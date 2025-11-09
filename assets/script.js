//Initialisation EmailJS
// Remplacez "VOTRE_CLÉ_PUBLIQUE" par votre Public Key (aussi appelée User ID) trouvée sur votre compte EmailJS.
// Exemple : emailjs.init("user_xxxxxxxxxxxxxxx");
(function() {
    emailjs.init("VOTRE_CLÉ_PUBLIQUE");
})();

// Gestion du formulaire de contact
// Cette partie s'active quand le formulaire avec l'ID 'contact-form' est soumis.
document.getElementById('contact-form')?.addEventListener('submit', function(event) {
    event.preventDefault(); // Empêche le rechargement de la page par défaut

    // Utilisez emailjs.sendForm pour envoyer toutes les données du formulaire en une seule fois.
    // Assurez-vous que les 'name' de vos champs HTML (ex: name="name", name="email", name="message")
    // correspondent aux placeholders dans votre modèle d'email EmailJS (ex: {{name}}, {{email}}, {{message}}).
    // Remplacez "VOTRE_SERVICE_ID" et "VOTRE_TEMPLATE_ID" par vos IDs réels d'EmailJS.
    emailjs.sendForm('VOTRE_SERVICE_ID', 'VOTRE_TEMPLATE_ID', this)
        .then(() => {
            // Message de succès affiché à l'utilisateur
            alert('Votre message a été envoyé avec succès !');
            // Réinitialise tous les champs du formulaire après un envoi réussi
            this.reset();
        }, (error) => {
            // Message d'erreur si l'envoi échoue
            console.error('Erreur lors de l\'envoi du message :', error); // Log l'erreur complète dans la console
            alert('Désolé, une erreur est survenue lors de l\'envoi de votre message. Veuillez réessayer.');
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