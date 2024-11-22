export function renderConfigModule() {
    const container = document.getElementById('dynamic-content');
    container.innerHTML = `
        <div class="card-stack" id="card-stack">
            <div class="card-set" id="set-1">
                <custom-card height="1" onclick="loadNextSet(2)">Card 1 (Altura 1)</custom-card>
                <custom-card height="2" onclick="loadNextSet(3)">Card 2 (Altura 2)</custom-card>
                <custom-card height="3">Card 3 (Altura 3)</custom-card>
            </div>
        </div>
    `;

    setupNavigation();
}

function setupNavigation() {
    const cardStack = document.getElementById('card-stack');
    let currentSet = 1;

    window.loadNextSet = function (setNumber) {
        fetchSet(setNumber).then(newSetHTML => {
            const newSet = document.createElement('div');
            newSet.classList.add('card-set');
            newSet.id = `set-${setNumber}`;
            newSet.innerHTML = newSetHTML;

            cardStack.appendChild(newSet);
            currentSet++;
            updateCardStack();
        });
    };

    function updateCardStack() {
        const offset = -(currentSet - 1) * 100;
        cardStack.style.transform = `translateX(${offset}%)`;
    }

    function fetchSet(setNumber) {
        return new Promise(resolve => {
            setTimeout(() => {
                if (setNumber === 2) {
                    resolve(`
                        <custom-card height="2">Novo Card 1 (Altura 2)</custom-card>
                        <custom-card height="1">Novo Card 2 (Altura 1)</custom-card>
                    `);
                } else {
                    resolve('<custom-card height="1">Card Final</custom-card>');
                }
            }, 500);
        });
    }
}
