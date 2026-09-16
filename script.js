document.addEventListener('DOMContentLoaded', () => {
    // 1. Accesibilidad: Ajuste de Contraste y Tamaño de Fuente
    const toggleContrastBtn = document.getElementById('toggle-contrast');
    const increaseFontBtn = document.getElementById('increase-font');
    const decreaseFontBtn = document.getElementById('decrease-font');
    let currentScale = 1.0;

    toggleContrastBtn.addEventListener('click', () => {
        const isHighContrast = document.body.classList.toggle('high-contrast');
        toggleContrastBtn.setAttribute('aria-pressed', isHighContrast);
    });

    increaseFontBtn.addEventListener('click', () => {
        if (currentScale < 1.4) {
            currentScale += 0.1;
            document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
        }
    });

    decreaseFontBtn.addEventListener('click', () => {
        if (currentScale > 0.8) {
            currentScale -= 0.1;
            document.documentElement.style.setProperty('--font-scale', `${currentScale}rem`);
        }
    });

    // 2. Simulador Explorable (Caja Blanca)
    const ratioInput = document.getElementById('dataset-ratio');
    const valA = document.getElementById('val-a');
    const valB = document.getElementById('val-b');
    const runBtn = document.getElementById('run-simulation');
    
    const metricA = document.getElementById('metric-a');
    const metricB = document.getElementById('metric-b');
    const biasAlert = document.getElementById('bias-alert');

    ratioInput.addEventListener('input', (e) => {
        const percentA = e.target.value;
        const percentB = 100 - percentA;
        valA.textContent = `${percentA}%`;
        valB.textContent = `${percentB}%`;
    });

    runBtn.addEventListener('click', () => {
        const percentA = parseInt(ratioInput.value, 10);
        const percentB = 100 - percentA;

        // Cálculo determinista simulación de precisión basada en cantidad de muestras
        // A mayor representación en el dataset, mayor precisión estadística.
        const accuracyA = Math.min(99, Math.round(50 + (percentA * 0.5)));
        const accuracyB = Math.min(99, Math.round(50 + (percentB * 0.5)));

        metricA.textContent = `${accuracyA}% de precisión`;
        metricB.textContent = `${accuracyB}% de precisión`;

        const diff = Math.abs(accuracyA - accuracyB);

        if (diff > 15) {
            biasAlert.hidden = false;
            biasAlert.textContent = `Alerta de Sesgo: El modelo presenta una brecha de rendimiento del ${diff}% entre grupos. El grupo con menos datos de entrenamiento sufre mayor tasa de error.`;
        } else {
            biasAlert.hidden = false;
            biasAlert.textContent = `Distribución equilibrada: La diferencia de rendimiento (${diff}%) está dentro de márgenes aceptables.`;
        }
    });
});