document.addEventListener('DOMContentLoaded', function() {

    /**
     * ------------------------------------------------------------------
     * ESTRATÉGIA 1: URGÊNCIA E ESCASSEZ (CRONÔMETRO REGRESSIVO)
     * ------------------------------------------------------------------
     * Cria um senso de que a oferta é limitada, incentivando a ação imediata.
     * Este cronômetro é "evergreen", ou seja, ele reseta para cada novo visitante.
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
    
    // Inicia o cronômetro para os dois locais na página
    const countdownTimer1 = document.getElementById('countdown-timer1');
    const countdownTimer2 = document.getElementById('countdown-timer2');
    if (countdownTimer1 && countdownTimer2) {
         // 30 minutos em segundos
        startCountdown(60 * 30, [countdownTimer1, countdownTimer2]);
    }


    /**
     * ------------------------------------------------------------------
     * ESTRATÉGIA 2: PROVA SOCIAL EM TEMPO REAL (FAKE)
     * ------------------------------------------------------------------
     * Simula atividade na página, mostrando que outras pessoas estão comprando.
     * Isso cria FOMO (Fear Of Missing Out - Medo de Ficar de Fora).
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
            }, 5000); // Popup fica visível por 5 segundos
        }

        // Mostra o primeiro popup após 8 segundos, e depois a cada 15 segundos
        setTimeout(() => {
            showPopup();
            setInterval(showPopup, 15000);
        }, 8000);
    }
    socialProofPopup();


    /**
     * ------------------------------------------------------------------
     * ESTRATÉGIA 3: RECUPERAÇÃO DE VENDAS (POPUP DE INTENÇÃO DE SAÍDA)
     * ------------------------------------------------------------------
     * Tenta reter o visitante que está prestes a sair da página com uma última oferta.
     * Aciona quando o mouse se move para fora da janela do navegador.
     */
    function exitIntentPopup() {
        const popup = document.getElementById('exit-intent');
        const closeButton = document.getElementById('exit-intent-close');
        if (!popup || !closeButton) return;
        
        let hasShown = false;

        const showExitPopup = () => {
            if (!hasShown) {
                popup.classList.add('show');
                hasShown = true;
            }
        };

        document.addEventListener('mouseleave', function (e) {
            // e.clientY < 0 significa que o mouse foi para o topo da página (aba/URL)
            if (e.clientY < 0) {
                showExitPopup();
            }
        });

        closeButton.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    }
    exitIntentPopup();


    /**
     * ------------------------------------------------------------------
     * RASTREAMENTO DE CLIQUES OTIMIZADO (Seu código original mantido e integrado)
     * ------------------------------------------------------------------
     * Mantém seu sistema de rastreio de cliques via Google Script.
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
