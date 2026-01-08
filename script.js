// Espera o site carregar completamente
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Menu Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Troca o ícone (hambúrguer <-> X)
            if (navMenu.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-xmark');
            } else {
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            }
        });

        // Fecha menu ao clicar em links
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuIcon.classList.remove('fa-xmark');
                menuIcon.classList.add('fa-bars');
            });
        });
    }


    // --- 2. Animação dos Números (Contadores) ---
    const stats = document.querySelectorAll('.stat-number');
    
    // Função para animar um contador específico
    const animateStats = (stat) => {
        const target = +stat.getAttribute('data-target'); // O valor final (ex: 150)
        const count = +stat.innerText; // O valor atual (começa em 0)
        const increment = target / 100; // Velocidade da animação

        if(count < target) {
            stat.innerText = Math.ceil(count + increment);
            setTimeout(() => animateStats(stat), 20); // Executa a cada 20ms
        } else {
            stat.innerText = target; // Garante que termine no número exato
        }
    };

    // Observador para iniciar a animação apenas quando a seção aparecer na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if(entry.isIntersecting) {
                // Se a seção apareceu, anima cada número
                stats.forEach(stat => animateStats(stat));
                observer.unobserve(entry.target); // Para de observar depois que animou
            }
        });
    }, { threshold: 0.5 }); // 50% do elemento visível para disparar

    // Começa a observar a seção de impacto (se ela existir)
    const impactoSection = document.getElementById('impacto');
    if (impactoSection) {
        observer.observe(impactoSection);
    }


    // --- 3. Ano Atual Automático no Rodapé ---
    const anoSpan = document.getElementById('ano-atual');
    if (anoSpan) {
        anoSpan.textContent = new Date().getFullYear();
    }


    // --- 4. Formulário de Contato ---
    const contactForm = document.getElementById('form-contato');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nome = document.getElementById('nome').value;
            const assunto = document.getElementById('assunto');
            const assuntoTexto = assunto.options[assunto.selectedIndex].text;
            
            alert(`Obrigado, ${nome}!\nRecebemos seu contato sobre: "${assuntoTexto}".\n\nEntraremos em contato em breve.`);
            contactForm.reset();
        });
    }
});