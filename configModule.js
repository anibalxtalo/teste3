export function renderConfigModule() {
    const container = document.getElementById('dynamic-content');
    container.innerHTML = `
        <style>
            .card-stack {
                position: relative;
                overflow: hidden;
                transition: transform 0.3s ease-in-out;
            }

            .card-set {
                display: flex;
                flex-direction: column;
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
            }

            .back-button {
                cursor: pointer;
                font-size: 18px;
                color: #00796b;
                display: flex;
                align-items: center;
                gap: 5px;
                margin-bottom: 15px;
            }

            .back-button:hover {
                text-decoration: underline;
            }
        </style>
        <div class="card-stack" id="card-stack">
            <div class="card-set" id="set-1">
                <div class="back-button" style="display: none;" onclick="navigateBack()">Voltar</div>
                <custom-card height="1" onclick="loadNextSet(2)">Card 1 (Altura 1)</custom-card>
                <custom-card height="2" onclick="loadNextSet(3)">Card 2 (Altura 2)</custom-card>
                <custom-card height="3" onclick="loadNextSet(4)">Card 3 (Altura 3)</custom-card>
            </div>
        </div>
    `;

    setupNavigation();
}

function setupNavigation() {
    const cardStack = document.getElementById('card-stack');
    let currentSet = 1;

    window.loadNextSet = function (setNumber) {
        fetchSet(setNumber)
            .then((newSetHTML) => {
                const newSet = document.createElement('div');
                newSet.classList.add('card-set');
                newSet.id = `set-${setNumber}`;
                newSet.innerHTML = `<div class="back-button" onclick="navigateBack()">Voltar</div>${newSetHTML}`;
                cardStack.appendChild(newSet);

                currentSet++;
                updateCardStack();
            })
            .catch((err) => {
                console.error('Erro ao carregar o próximo conjunto:', err);
            });
    };

    window.navigateBack = function () {
        if (currentSet > 1) {
            const lastSet = document.getElementById(`set-${currentSet}`);
            lastSet.remove();
            currentSet--;
            updateCardStack();
        }
    };

    function updateCardStack() {
        const offset = -(currentSet - 1) * 100;
        cardStack.style.transform = `translateX(${offset}%)`;
    }

    function fetchSet(setNumber) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Simula o carregamento AJAX para diferentes conjuntos
                if (setNumber === 2) {
                    resolve(`
                        <custom-card height="2" onclick="loadNextSet(5)">Card 4 (Altura 2)</custom-card>
                        <custom-card height="1">Card 5 (Altura 1)</custom-card>
                    `);
                } else if (setNumber === 3) {
                    resolve(`
                        <custom-card height="4">Card 6 (Altura 4)</custom-card>
                        <custom-card height="2" onclick="loadNextSet(2)">Card 7 (Altura 2)</custom-card>
                    `);
                } else {
                    resolve('<custom-card height="1">Card Final</custom-card>');
                }
            }, 500); // Simula um tempo de carregamento
        });
    }
}
