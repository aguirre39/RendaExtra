document.addEventListener('DOMContentLoaded', function() {

    /**
     * ------------------------------------------------------------------
     * ESTRATÉGIA 1: URGÊNCIA E ESCASSEZ (CRONÔMETRO REGRESSIVO)
     * ------------------------------------------------------------------
     */
    function startCountdown(duration, displayElements) {
        let timer = duration, minutes, seconds;
        
        const intervalId = setInterval(function () {
            minutes = parseInt(timer / 60, 10);
            seconds = parseInt(timer % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            const countdownHTML = `
                <p>A OFERTA ESPECIAL TERMINA EM:</p>
                <div class="timer">
                    <div class="timer-box"><span>${minutes}</span><span>Minutos</span></div>
                    <div class="timer-box"><span>${seconds}</span><span>Segundos</span></div>
                </div>
            `;

            displayElements.forEach(display => {
                if (display) {
                    display.innerHTML = countdownHTML;
                }
            });

            if (--timer < 0) {
                clearInterval(intervalId);
                displayElements.forEach(display => {
                   if (display) display.innerHTML = "<p>OFERTA ENCERRADA!</p>";
                });
            }
        }, 1000);
    }
    
    const countdownTimer1 = document.getElementById('countdown-timer1');
    const countdownTimer2 = document.getElementById('countdown-timer2');
    if (countdownTimer1 && countdownTimer2) {
        startCountdown(60 * 30, [countdownTimer1, countdownTimer2]);
    }


    /**
     * ------------------------------------------------------------------
     * ESTRATÉGIA 2: PROVA SOCIAL EM TEMPO REAL (FAKE)
     * ------------------------------------------------------------------
     */
    function socialProofPopup() {
        const popup = document.getElementById('social-proof');
        if (!popup) return;

        const names = ["Maria C.", "João P.", "Ana S.", "Lucas F.", "Beatriz M.", "Pedro H."];
        const cities = ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Fortaleza, CE", "Salvador, BA"];

        function showPopup() {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            
            popup.innerHTML = `
                <p><i class="fas fa-check-circle"></i> <strong>${randomName}</strong> de ${randomCity} acabou de garantir sua vaga!</p>
                <small>Verificado há poucos segundos</small>`;
            
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 5000);
        }

        setTimeout(() => {
            showPopup();
            setInterval(showPopup, 15000);
        }, 8000);
    }
    socialProofPopup();


    /**
     * ------------------------------------------------------------------
     * ESTRATÉGIA 3: RECUPERAÇÃO DE VENDAS (POPUP INTELIGENTE)
     * --- LÓGICA SEPARADA E AVANÇADA PARA DESKTOP E MOBILE ---
     * ------------------------------------------------------------------
     */
    function exitIntentPopup() {
        const popup = document.getElementById('exit-intent');
        const closeButton = document.getElementById('exit-intent-close');
        if (!popup || !closeButton) return;
    
        let hasShown = false;
    
        const showExitPopup = (triggerType) => {
            if (hasShown) return; // Garante que o popup seja mostrado apenas uma vez
            
            console.log(`Gatilho de Saída Ativado: ${triggerType}`);
            hasShown = true;
            
            popup.classList.add('show');
            
            // Remove os listeners para não disparar novamente
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('scroll', handleScroll);
        };
    
        // Lógica para fechar o popup
        closeButton.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    
        // --- LÓGICA PARA DESKTOP (PC COM MOUSE) ---
        const handleMouseLeave = (e) => {
            if (e.clientY < 0) {
                showExitPopup('Mouse Leave (Desktop)');
            }
        };

        // --- LÓGICA PARA SMARTPHONE ---
        let lastScrollY = window.scrollY;
        
        // Gatilho 1 (Mobile): Rolagem rápida para cima
        const handleScroll = () => {
            // Verifica se o usuário rolou pelo menos 200px para baixo antes de ativar
            if (window.scrollY > 200 && window.scrollY < lastScrollY - 30) { 
                showExitPopup('Scroll Up (Mobile)');
            }
            lastScrollY = window.scrollY;
        };

        // Gatilho 2 (Mobile): O usuário muda de aba ou app
        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                showExitPopup('Visibility Change (Mobile)');
            }
        };

        // --- ATIVANDO A LÓGICA CORRETA PARA CADA DISPOSITIVO ---
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            // É um dispositivo de toque (smartphone/tablet)
            console.log("Modo de detecção de saída: Mobile (Scroll & Visibility)");
            window.addEventListener('scroll', handleScroll, { passive: true });
            document.addEventListener('visibilitychange', handleVisibilityChange);
        } else {
            // É um dispositivo com mouse (PC)
            console.log("Modo de detecção de saída: Desktop (Mouse Leave)");
            document.addEventListener('mouseleave', handleMouseLeave);
        }
    }
    exitIntentPopup();


    /**
     * ------------------------------------------------------------------
     * RASTREAMENTO DE CLIQUES OTIMIZADO
     * ------------------------------------------------------------------
     */
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyFkVks_70iwVVyU-EWYaP3pbiSD9uij6L__PhK8L0FaSZVDsjU21yf7SocPhG0UpR7/exec';

    function enviarNotificacao(type, data) {
        const payload = JSON.stringify({ type, data });
        console.log(`Tentando enviar notificação de '${type}'`);
        
        if (navigator.sendBeacon && navigator.sendBeacon(GOOGLE_SCRIPT_URL, payload)) {
             console.log(`SUCESSO: Notificação de '${type}' enviada via sendBeacon.`);
             return;
        }
        try {
            fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                body: payload,
                headers: { 'Content-Type': 'text/plain;charset=utf-8' },
                mode: 'no-cors',
                keepalive: true
            });
            console.log(`SUCESSO: Notificação de '${type}' enviada via fetch com keepalive.`);
        } catch (error) {
            console.error(`FALHA no envio da notificação de '${type}':`, error);
        }
    }

    function configurarRastreamentoDeCliques() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        if (ctaButtons.length === 0) return;

        ctaButtons.forEach(button => {
            button.addEventListener('click', function(event) {
                event.preventDefault();
                const destinationUrl = this.href;

                console.log('CLIQUE DETETADO: Enviando notificação...');
                enviarNotificacao('clique', { 
                    link: destinationUrl, 
                    pagina: window.location.href 
                });
                
                if (typeof fbq === 'function') {
                    fbq('track', 'InitiateCheckout');
                }
                
                setTimeout(() => {
                    window.location.href = destinationUrl;
                }, 300);
            });
        });
    }

    // Função de inicialização principal
    function inicializarMonitoramento() {
        console.log('PÁGINA CARREGADA: Monitoramento e estratégias de marketing ativados.');
        
        enviarNotificacao('visita', {
            pagina: window.location.href
        });

        configurarRastreamentoDeCliques();
    }

    inicializarMonitoramento();

});
