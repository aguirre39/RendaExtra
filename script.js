document.addEventListener('DOMContentLoaded', function() {

    /**
     * ==================================================================
     * NOVA ESTRATÉGIA PROFISSIONAL: CONTEÚDO ATRASADO (DELAYED CONTENT)
     * ==================================================================
     */
    function revelarConteudoAtrasado() {
        // Define o tempo de espera em milissegundos (30.000ms = 30 segundos)
        const tempoDeEspera = 30000; 
        
        const elementosOcultos = document.querySelectorAll('.conteudo-atrasado');

        if (elementosOcultos.length > 0) {
            setTimeout(() => {
                console.log('Tempo de espera de 30 segundos finalizado. Revelando o restante da página.');
                elementosOcultos.forEach(el => {
                    el.style.height = 'auto'; 
                    el.style.opacity = '1';   
                });
            }, tempoDeEspera);
        }
    }
    revelarConteudoAtrasado();

    /**
     * ==================================================================
     * ESTRATÉGIAS DE MARKETING
     * ==================================================================
     */

    /**
     * ESTRATÉGIA 1: URGÊNCIA E ESCASSEZ (CRONÔMETRO REGRESSIVO)
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
                if (display) display.innerHTML = countdownHTML;
            });

            if (--timer < 0) {
                clearInterval(intervalId);
                displayElements.forEach(display => {
                   if (display) display.innerHTML = "<p>OFERTA ENCERRADA!</p>";
                });
            }
        }, 1000);
    }
    
    /**
     * ESTRATÉGIA 2: PROVA SOCIAL EM TEMPO REAL (OTIMIZADA)
     */
    function socialProofPopup() {
        const popup = document.getElementById('social-proof');
        if (!popup) return;

        const names = ["Maria C.", "João P.", "Ana S.", "Lucas F.", "Beatriz M.", "Pedro H."];
        const cities = ["São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR", "Fortaleza, CE", "Salvador, BA"];
        // Ação variada para criar mais dinamismo
        const actions = ["acabou de garantir sua vaga!", "acabou de iniciar sua inscrição!", "também está vendo esta oferta!"];

        function showPopup() {
            const randomName = names[Math.floor(Math.random() * names.length)];
            const randomCity = cities[Math.floor(Math.random() * cities.length)];
            const randomAction = actions[Math.floor(Math.random() * actions.length)];
            
            popup.innerHTML = `
                <p><i class="fas fa-check-circle"></i> <strong>${randomName}</strong> de ${randomCity} ${randomAction}</p>
                <small>Verificado há poucos segundos</small>`;
            
            popup.classList.add('show');

            setTimeout(() => {
                popup.classList.remove('show');
            }, 5000); // Popup some após 5 segundos
        }

        // Mostra o primeiro popup após 8 segundos
        setTimeout(() => {
            showPopup();
            // Mostra os popups seguintes em intervalos aleatórios entre 10 e 20 segundos
            setInterval(showPopup, Math.random() * (20000 - 10000) + 10000);
        }, 8000);
    }

    /**
     * ESTRATÉGIA 3: RECUPERAÇÃO DE VENDAS (POPUP DE SAÍDA INTELIGENTE)
     */
    function exitIntentPopup() {
        const popup = document.getElementById('exit-intent');
        const closeButton = document.getElementById('exit-intent-close');
        if (!popup || !closeButton) return;
    
        let hasShown = false;
    
        const showExitPopup = (triggerType) => {
            if (hasShown) return;
            
            console.log(`Gatilho de Saída Ativado: ${triggerType}`);
            hasShown = true;
            popup.classList.add('show');
            
            document.removeEventListener('mouseleave', handleMouseLeave);
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('scroll', handleScroll);
        };
    
        closeButton.addEventListener('click', () => {
            popup.classList.remove('show');
        });
    
        const handleMouseLeave = (e) => {
            if (e.clientY < 0) showExitPopup('Mouse Leave (Desktop)');
        };

        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            if (window.scrollY > 200 && window.scrollY < lastScrollY - 30) { 
                showExitPopup('Scroll Up (Mobile)');
            }
            lastScrollY = window.scrollY;
        };

        const handleVisibilityChange = () => {
            if (document.visibilityState === 'hidden') {
                showExitPopup('Visibility Change (Mobile)');
            }
        };

        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
            console.log("Modo de detecção de saída: Mobile (Scroll & Visibility)");
            window.addEventListener('scroll', handleScroll, { passive: true });
            document.addEventListener('visibilitychange', handleVisibilityChange);
        } else {
            console.log("Modo de detecção de saída: Desktop (Mouse Leave)");
            document.addEventListener('mouseleave', handleMouseLeave);
        }
    }

    /**
     * RASTREAMENTO DE CLIQUES OTIMIZADO
     */
    function configurarRastreamentoDeCliques() {
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

        const ctaButtons = document.querySelectorAll('.cta-button');
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
        
        // Envia notificação de visita da página
        enviarNotificacao('visita', { pagina: window.location.href });
    }

    // Função de inicialização principal
    function inicializarEstrategias() {
        console.log('PÁGINA CARREGADA: Monitoramento e estratégias de marketing ativados.');
        
        const countdownTimer1 = document.getElementById('countdown-timer1');
        const countdownTimer2 = document.getElementById('countdown-timer2');
        if (countdownTimer1 && countdownTimer2) {
            startCountdown(60 * 30, [countdownTimer1, countdownTimer2]);
        }
        
        socialProofPopup();
        exitIntentPopup();
        configurarRastreamentoDeCliques();
    }

    inicializarEstrategias();
    
    
    /**
     * ==================================================================
     * CÓDIGO DO VENDEDOR COM IA (ATUALIZADO)
     * ==================================================================
     */
    const aiChatWidget = {
        // Elementos do DOM
        bubble: document.getElementById('ai-chat-bubble'),
        window: document.getElementById('ai-chat-window'),
        closeBtn: document.getElementById('ai-chat-close-btn'),
        chatBox: document.getElementById('ai-chat-box'),
        input: document.getElementById('ai-chat-input'),
        sendBtn: document.getElementById('ai-chat-send-btn'),
        notificationDot: document.querySelector('.notification-dot'),

        // Estado do Chat
        isOpen: false,
        isTyping: false,
        chatHistory: [],
        proactiveMessageTimer: null,
        hasSentProactiveMessage: false,

        // Prompt da IA (instruções que você forneceu)
        systemPrompt: `# INSTRUÇÕES PARA O VENDEDOR DE IA - SUA RENDA EM CASA...`, // O prompt completo permanece o mesmo

        init() {
            setTimeout(() => this.bubble.classList.add('show'), 2000);
            
            this.bubble.addEventListener('click', () => this.toggleWindow());
            this.closeBtn.addEventListener('click', () => this.toggleWindow());
            this.sendBtn.addEventListener('click', () => this.sendMessage());
            this.input.addEventListener('keyup', (e) => {
                if (e.key === 'Enter') this.sendMessage();
            });

            this.initializeChat();
            
            this.resetInactivityTimer();
            ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => 
                document.addEventListener(event, () => this.resetInactivityTimer(), { passive: true })
            );
        },
        
        resetInactivityTimer() {
            clearTimeout(this.proactiveMessageTimer);
            if (!this.hasSentProactiveMessage) {
                 this.proactiveMessageTimer = setTimeout(() => this.sendProactiveMessage(), 45000);
            }
        },
        
        sendProactiveMessage() {
            if (this.isOpen || this.hasSentProactiveMessage) return;

            console.log("Usuário inativo. Enviando mensagem proativa.");
            this.hasSentProactiveMessage = true;
            
            const proactiveMessage = "Olá! Vi que está há um tempo na página. Quer ajuda para entender como começar a ganhar de R$50 a R$200 por dia? 💰";

            this.addMessageToBox('ai', proactiveMessage);
            this.chatHistory.push({ role: "model", parts: [{ text: proactiveMessage }] });
            
            this.toggleWindow();
        },

        initializeChat() {
            this.chatHistory.push({ role: "user", parts: [{ text: this.systemPrompt }] });
            
            const initialGreeting = "E aí! 👋 Vi que você tá de olho no método Sua Renda em Casa. Ficou com alguma dúvida que eu possa resolver pra te ajudar a garantir sua vaga com desconto?";
            
            this.chatHistory.push({ role: "model", parts: [{ text: initialGreeting }] });
            
            setTimeout(() => {
                if (!this.isOpen) {
                     this.addMessageToBox('ai', initialGreeting);
                }
            }, 3000);
        },

        toggleWindow() {
            this.isOpen = !this.isOpen;
            this.bubble.classList.toggle('show', !this.isOpen);
            this.window.classList.toggle('show', this.isOpen);

            if (this.isOpen) {
                this.notificationDot.style.display = 'none';
                this.input.focus();
            }
        },

        addMessageToBox(sender, text) {
            const messageEl = document.createElement('div');
            messageEl.classList.add('ai-chat-message', sender);
            messageEl.textContent = text;
            this.chatBox.appendChild(messageEl);
            this.scrollToBottom();
        },

        showTypingIndicator() {
            if (this.isTyping) return;
            this.isTyping = true;
            const typingEl = document.createElement('div');
            typingEl.id = 'typing-indicator';
            typingEl.classList.add('ai-chat-message', 'typing-indicator');
            typingEl.innerHTML = '<span></span><span></span><span></span>';
            this.chatBox.appendChild(typingEl);
            this.scrollToBottom();
        },

        hideTypingIndicator() {
            const typingEl = document.getElementById('typing-indicator');
            if (typingEl) typingEl.remove();
            this.isTyping = false;
        },
        
        scrollToBottom() {
            this.chatBox.scrollTop = this.chatBox.scrollHeight;
        },

        sendMessage() {
            const userInput = this.input.value.trim();
            if (userInput === '' || this.isTyping) return;

            this.addMessageToBox('user', userInput);
            this.chatHistory.push({ role: "user", parts: [{ text: userInput }] });
            
            this.input.value = '';
            this.showTypingIndicator();
            this.getAIResponse();
        },

        async getAIResponse() {
            const apiKey = "AIzaSyDu95gpISeld0Bn-sOPIkWHAxb-OxSIDB0"; // <-- IMPORTANTE: Insira sua chave de API aqui
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

            const payload = {
                contents: this.chatHistory,
                safetySettings: [
                    { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
                    { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
                    { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
                    { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
                ]
            };
            
            try {
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) throw new Error(`Erro na API: ${response.statusText}`);

                const result = await response.json();
                this.hideTypingIndicator();

                if (result.candidates && result.candidates[0].content.parts.length > 0) {
                    const aiResponse = result.candidates[0].content.parts[0].text;
                    this.addMessageToBox('ai', aiResponse);
                    this.chatHistory.push({ role: "model", parts: [{ text: aiResponse }] });
                } else {
                    this.addMessageToBox('ai', 'Não consigo responder a isso. Você tem outra pergunta sobre o método Sua Renda em Casa?');
                }
            } catch (error) {
                console.error("Erro ao contatar a IA:", error);
                this.hideTypingIndicator();
                this.addMessageToBox('ai', 'Ops! Tive um probleminha de conexão. Poderia repetir sua pergunta, por favor?');
            }
        }
    };
    
    aiChatWidget.init();
});
