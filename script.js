document.addEventListener("DOMContentLoaded", () => {
    // Referências dos elementos do Modal conforme o seu HTML
    const modal = document.getElementById("modal-pagamento");
    const modalDinamico = document.getElementById("modal-dinamico");
    const closeBtn = document.querySelector(".close-btn");

    // Seus dados de configuração
    const chavePixCopiaCola = "00020126330014BR.GOV.BCB.PIX0111101150919985204000053039865802BR5921Lucas do Vale Amancio6009SAO PAULO621405103kq6G0CFL66304F8B1";
    const numeroWhatsapp = "5547988281179"; // Formato internacional sem espaços

    // Função para gerar um número da sorte aleatório entre 1000 e 9999
    function gerarNumeroSorte() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Evento para os botões "Dar via Pix" ou "Dar Cota via Pix"
    document.querySelectorAll(".btn-pix").forEach(botao => {
        botao.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const nomePresente = card.querySelector("h3").innerText;
            const valorPresente = card.getAttribute("data-valor");
            const tipoPresente = card.getAttribute("data-tipo");
            const numeroSorte = gerarNumeroSorte();

            // Texto customizado dependendo se é cota ou valor integral
            const detalheValor = tipoPresente === "cota" ? `Cota de R$ ${valorPresente},00` : `Valor de R$ ${valorPresente},00`;

            // Injeta o conteúdo do passo a passo do PIX dentro do Modal
            modalDinamico.innerHTML = `
                <h3 style="font-size: 1.4rem; color: #2b6cb0; margin-bottom: 10px;">Você escolheu presentear com:</h3>
                <strong style="font-size: 1.2rem; color: #2d3748; display: block; margin-bottom: 5px;">${nomePresente}</strong>
                <p style="color: #718096; font-size: 0.95rem; margin-bottom: 20px;">(${detalheValor})</p>
                
                <p style="font-size: 0.9rem; margin-bottom: 10px; font-weight: 600;">⚡ PIX Copia e Cola:</p>
                <input type="text" class="input-copia" id="input-pix-link" value="${chavePixCopiaCola}" readonly 
                       style="width: 100%; padding: 12px; border: 1px solid #cbd5e0; border-radius: 8px; font-size: 0.8rem; text-align: center; background: #f7fafc; margin-bottom: 10px;">
                
                <button id="btn-copiar-chave" style="background-color: #4a90e2; color: white; margin-bottom: 25px;">
                    <i class="fa-solid fa-copy"></i> Copiar Código PIX
                </button>
                <p id="feedback-copia" style="color: #48bb78; font-weight: 600; font-size: 0.85rem; margin-top: -20px; margin-bottom: 15px; display: none;">✓ Código copiado!</p>

                <div style="background: #ebf8ff; padding: 15px; border-radius: 12px; border: 1px dashed #63b3ed; margin-top: 10px;">
                    <span style="font-size: 1.8rem;">🎁</span>
                    <strong style="display: block; color: #2b6cb0; margin-top: 5px;">Seu Número da Sorte:</strong>
                    <span style="font-size: 2rem; font-weight: 700; color: #2b6cb0; letter-spacing: 2px;">${numeroSorte}</span>
                    <p style="font-size: 0.75rem; color: #4a5568; margin-top: 5px;">Guarde seu número para concorrer à Cesta de Café da Manhã!</p>
                </div>

                <a href="https://wa.me/${numeroWhatsapp}?text=Oi%20Ra%C3%ADssa%20e%20Lucas!%20Acabei%20de%20contribuir%20via%20PIX%20com%20o%20presente%3A%20${encodeURIComponent(nomePresente)}%20(${encodeURIComponent(detalheValor)}).%20Meu%20n%C3%BAmero%20da%20sorte%20%C3%A9%20${numeroSorte}!" 
                   target="_blank" class="btn-whatsapp">
                    <i class="fa-brands fa-whatsapp"></i> Avisar os Noivos no WhatsApp
                </a>
            `;

            // Ativa a funcionalidade do botão de copiar que foi injetado
            document.getElementById("btn-copiar-chave").addEventListener("click", () => {
                const inputPix = document.getElementById("input-pix-link");
                inputPix.select();
                inputPix.setSelectionRange(0, 99999);
                navigator.clipboard.writeText(inputPix.value);
                
                const feedback = document.getElementById("feedback-copia");
                feedback.style.display = "block";
            });

            // Abre o modal removendo a classe hidden
            modal.classList.remove("hidden");
        });
    });

    // Evento para os botões "Comprei em outra loja"
    document.querySelectorAll(".btn-loja").forEach(botao => {
        botao.addEventListener("click", (e) => {
            const card = e.target.closest(".card");
            const nomePresente = card.querySelector("h3").innerText;
            const numeroSorte = gerarNumeroSorte();

            // Mensagem pronta para mandar as informações da compra exterior pelo WhatsApp
            const mensagemWhats = `Oi Raíssa e Lucas! Escolhi o presente "${nomePresente}" na lista e optei por comprar em outra loja física/online. Meu número da sorte gerado foi o ${numeroSorte}! Como faço para combinar a entrega com vocês?`;
            const linkWhatsapp = `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensagemWhats)}`;

            // Injeta o conteúdo explicativo de compra externa no Modal
            modalDinamico.innerHTML = `
                <h3 style="font-size: 1.4rem; color: #2b6cb0; margin-bottom: 15px;">🛍️ Comprar em outra Loja</h3>
                <p style="font-size: 0.95rem; color: #4a5568; margin-bottom: 15px; line-height: 1.5;">
                    Que ótimo! Você pode adquirir o item <strong>"${nomePresente}"</strong> na loja ou e-commerce de sua preferência (como Havan, Magazine Luiza, Amazon, etc).
                </p>
                <p style="font-size: 0.95rem; color: #4a5568; margin-bottom: 20px;">
                    Para combinarmos o endereço de entrega ou retirada do item físico, clique no botão abaixo para nos enviar os detalhes diretamente no WhatsApp.
                </p>

                <div style="background: #ebf8ff; padding: 15px; border-radius: 12px; border: 1px dashed #63b3ed; margin-bottom: 20px;">
                    <span style="font-size: 1.8rem;">🍀</span>
                    <strong style="display: block; color: #2b6cb0; margin-top: 5px;">Seu Número da Sorte:</strong>
                    <span style="font-size: 2rem; font-weight: 700; color: #2b6cb0; letter-spacing: 2px;">${numeroSorte}</span>
                    <p style="font-size: 0.75rem; color: #4a5568; margin-top: 5px;">Você também garante sua vaga no sorteio da Cesta de Café da Manhã!</p>
                </div>

                <a href="${linkWhatsapp}" target="_blank" class="btn-whatsapp" style="background-color: #25D366;">
                    <i class="fa-brands fa-whatsapp"></i> Enviar Informações no WhatsApp
                </a>
            `;

            // Abre o modal removendo a classe hidden
            modal.classList.remove("hidden");
        });
    });

    // Fechar o modal ao clicar no 'X'
    closeBtn.addEventListener("click", () => {
        modal.classList.add("hidden");
    });

    // Fechar o modal se o usuário clicar em qualquer lugar fora da caixinha branca
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.classList.add("hidden");
        }
    });
});