// Global variables
let currentShape = null;
let calculations = {};

// Shape configurations
const shapeConfigs = {
    square: {
        fields: [
            { name: "side", label: "Side Length", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="50" y="25" width="100" height="100" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <text x="100" y="80" text-anchor="middle" font-size="14" fill="#374151">Side Length</text>
                    <line x1="50" y1="15" x2="150" y2="15" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <line x1="150" y1="15" x2="50" y2="15" stroke="#ef4444" stroke-width="2" marker-start="url(#arrowhead)"/>
                    <defs><marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#ef4444"/></marker></defs>
                </svg>`,
    },
    rectangle: {
        fields: [
            { name: "length", label: "Length", required: true },
            { name: "width", label: "Width", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="25" y="40" width="150" height="80" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <text x="100" y="85" text-anchor="middle" font-size="14" fill="#374151">Length</text>
                    <text x="15" y="85" text-anchor="middle" font-size="12" fill="#374151" transform="rotate(-90 15 85)">Width</text>
                    <line x1="25" y1="30" x2="175" y2="30" stroke="#ef4444" stroke-width="2" marker-end="url(#arrowhead)"/>
                    <line x1="15" y1="40" x2="15" y2="120" stroke="#10b981" stroke-width="2" marker-end="url(#arrowhead)"/>
                </svg>`,
    },
    "rectangle-border": {
        fields: [
            { name: "innerLength", label: "Inner Length", required: true },
            { name: "innerWidth", label: "Inner Width", required: true },
            { name: "borderWidth", label: "Border Width", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <rect x="25" y="25" width="150" height="100" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <rect x="50" y="50" width="100" height="50" fill="white" stroke="#374151" stroke-width="2"/>
                    <text x="100" y="20" text-anchor="middle" font-size="12" fill="#374151">Border Width</text>
                    <line x1="50" y1="15" x2="25" y2="15" stroke="#ef4444" stroke-width="2"/>
                </svg>`,
    },
    circle: {
        fields: [
            { name: "diameter", label: "Diameter", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <circle cx="100" cy="75" r="60" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <line x1="40" y1="75" x2="160" y2="75" stroke="#ef4444" stroke-width="2"/>
                    <text x="100" y="85" text-anchor="middle" font-size="14" fill="#374151">Diameter</text>
                </svg>`,
    },
    "circle-border": {
        fields: [
            { name: "innerDiameter", label: "Inner Diameter", required: true },
            { name: "borderWidth", label: "Border Width", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <circle cx="100" cy="75" r="60" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <circle cx="100" cy="75" r="30" fill="white" stroke="#374151" stroke-width="2"/>
                    <text x="100" y="110" text-anchor="middle" font-size="12" fill="#374151">Border Width</text>
                </svg>`,
    },
    annulus: {
        fields: [
            { name: "outerDiameter", label: "Outer Diameter", required: true },
            { name: "innerDiameter", label: "Inner Diameter", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <circle cx="100" cy="75" r="60" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <circle cx="100" cy="75" r="25" fill="white" stroke="#374151" stroke-width="2"/>
                    <line x1="40" y1="75" x2="160" y2="75" stroke="#ef4444" stroke-width="2"/>
                    <line x1="75" y1="75" x2="125" y2="75" stroke="#10b981" stroke-width="2"/>
                    <text x="100" y="25" text-anchor="middle" font-size="12" fill="#ef4444">Outer Diameter</text>
                    <text x="100" y="65" text-anchor="middle" font-size="12" fill="#10b981">Inner Diameter</text>
                </svg>`,
    },
    triangle: {
        fields: [
            { name: "sideA", label: "Side A Length", required: true },
            { name: "sideB", label: "Side B Length", required: true },
            { name: "sideC", label: "Side C Length", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <polygon points="100,25 50,125 150,125" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <text x="75" y="80" text-anchor="middle" font-size="12" fill="#374151">a</text>
                    <text x="125" y="80" text-anchor="middle" font-size="12" fill="#374151">b</text>
                    <text x="100" y="140" text-anchor="middle" font-size="12" fill="#374151">c</text>
                </svg>`,
    },
    trapezoid: {
        fields: [
            { name: "sideA", label: "Side a Length (top)", required: true },
            { name: "sideB", label: "Side b Length (bottom)", required: true },
            { name: "height", label: "Height h", required: true },
            { name: "depth", label: "Depth", required: true },
        ],
        svg: `<svg width="200" height="150" viewBox="0 0 200 150">
                    <polygon points="75,40 125,40 150,110 50,110" fill="#e5e7eb" stroke="#374151" stroke-width="2"/>
                    <text x="100" y="35" text-anchor="middle" font-size="12" fill="#374151">a</text>
                    <text x="100" y="125" text-anchor="middle" font-size="12" fill="#374151">b</text>
                    <text x="35" y="75" text-anchor="middle" font-size="12" fill="#374151">h</text>
                    <line x1="40" y1="40" x2="40" y2="110" stroke="#10b981" stroke-width="2" stroke-dasharray="5,5"/>
                </svg>`,
    },
};

// Unit conversion factors to feet
const unitConversions = {
    in: 1 / 12, // inches to feet
    ft: 1, // feet (base unit)
    yd: 3, // yards to feet
    cm: 1 / 30.48, // centimeters to feet
    m: 3.28084, // meters to feet
};

// Initialize calculator
document.addEventListener("DOMContentLoaded", function () {
    initializeEventListeners();
    selectShape("square"); // Default shape
});

function initializeEventListeners() {
    // Shape selector
    document.querySelectorAll(".shape-card").forEach((card) => {
        card.addEventListener("click", () => {
            const shape = card.dataset.shape;
            selectShape(shape);
        });
    });

    // Calculate button
    document
        .getElementById("calculate-btn")
        .addEventListener("click", calculateVolume);

    // Clear button
    document
        .getElementById("clear-btn")
        .addEventListener("click", clearForm);

    // Real-time calculation on input change
    // document.addEventListener("input", debounce(autoCalculate, 500));
}

function selectShape(shapeName) {
    // Update active shape card
    document.querySelectorAll(".shape-card").forEach((card) => {
        card.classList.remove("active");
    });
    document
        .querySelector(`[data-shape="${shapeName}"]`)
        .classList.add("active");

    currentShape = shapeName;
    generateInputFields(shapeName);
    updateShapeDiagram(shapeName);
}

function generateInputFields(shapeName) {
    const config = shapeConfigs[shapeName];
    const container = document.getElementById("input-fields");

    let html = "";
    config.fields.forEach((field) => {
        html += `
                    <div class="input-group-modern">
                        <label class="label-modern">${field.label}:</label>
                        <div class="input-row">
                            <input type="number" 
                                   class="form-control-modern" 
                                   id="${field.name}" 
                                   step="0.01" 
                                   placeholder="Enter ${field.label.toLowerCase()}"
                                   ${field.required ? "required" : ""}>
                            <select class="unit-selector" id="${field.name
            }-unit">
                                <option value="ft">ft</option>
                                <option value="in">in</option>
                                <option value="yd">yd</option>
                                <option value="cm">cm</option>
                                <option value="m">m</option>
                            </select>
                        </div>
                    </div>
                `;
    });

    container.innerHTML = html;
    container.classList.add("fade-in");
}

function updateShapeDiagram(shapeName) {
    const config = shapeConfigs[shapeName];
    const container = document.getElementById("shape-svg-container");
    container.innerHTML = config.svg;
}

function calculateVolume() {
    try {
        const area = calculateArea();
        if (area === null) return;
        console.log('area', area)
        const depth = getValueInFeet("depth");
        const quantity =
            parseFloat(document.getElementById("quantity").value) || 1;

        // Calculate volumes
        const cubicFeet = area * depth * quantity;
        const cubicYards = cubicFeet / 27;
        const cubicMeters = cubicFeet / 35.315;

        // Calculate cost if price provided
        let totalCost = 0;
        const price = parseFloat(document.getElementById("price").value);
        if (price && price > 0) {
            const priceUnit = document.getElementById("price-unit").value;
            const currency = document.getElementById("currency").value;

            switch (priceUnit) {
                case "yard":
                    totalCost = cubicYards * price;
                    break;
                case "foot":
                    totalCost = cubicFeet * price;
                    break;
                case "meter":
                    totalCost = cubicMeters * price;
                    break;
            }
        }

        displayResults(cubicYards, cubicFeet, cubicMeters, totalCost);
    } catch (error) {
        alert("Please check your inputs and try again.");
        console.error("Calculation error:", error);
    }
}

function calculateArea() {
    switch (currentShape) {
        case "square":
            const side = getValueInFeet("side");
            return side * side;

        case "rectangle":
            const length = getValueInFeet("length");
            const width = getValueInFeet("width");
            return length * width;

        case "rectangle-border":
            const innerLength = getValueInFeet("innerLength");
            const innerWidth = getValueInFeet("innerWidth");
            const borderWidth = getValueInFeet("borderWidth");
            const outerLength = innerLength + 2 * borderWidth;
            const outerWidth = innerWidth + 2 * borderWidth;
            return outerLength * outerWidth - innerLength * innerWidth;

        case "circle":
            const diameter = getValueInFeet("diameter");
            const radius = diameter / 2;
            return Math.PI * radius * radius;

        case "circle-border":
            const innerDiameter = getValueInFeet("innerDiameter");
            const borderWidthCircle = getValueInFeet("borderWidth");
            const outerDiameter = innerDiameter + 2 * borderWidthCircle;
            const outerRadius = outerDiameter / 2;
            const innerRadius = innerDiameter / 2;
            return (
                Math.PI * outerRadius * outerRadius -
                Math.PI * innerRadius * innerRadius
            );

        case "annulus":
            const outerDiam = getValueInFeet("outerDiameter");
            const innerDiam = getValueInFeet("innerDiameter");
            const outerRad = outerDiam / 2;
            const innerRad = innerDiam / 2;
            return (
                Math.PI * outerRad * outerRad - Math.PI * innerRad * innerRad
            );

        case "triangle":
            const a = getValueInFeet("sideA");
            const b = getValueInFeet("sideB");
            const c = getValueInFeet("sideC");
            // Using Heron's formula
            const s = (a + b + c) / 2;
            const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
            if (isNaN(area) || area <= 0) {
                alert(
                    "Invalid triangle dimensions. Please check that the three sides can form a valid triangle."
                );
                return null;
            }
            return area;

        case "trapezoid":
            const sideA = getValueInFeet("sideA");
            const sideB = getValueInFeet("sideB");
            const height = getValueInFeet("height");
            return 0.5 * (sideA + sideB) * height;

        default:
            return 0;
    }
}

function getValueInFeet(fieldName) {
    const value = parseFloat(document.getElementById(fieldName).value);
    const unit = document.getElementById(`${fieldName}-unit`).value;

    if (isNaN(value) || value <= 0) {
        throw new Error(`Please enter a valid ${fieldName} value`);
    }

    return value * unitConversions[unit];
}

function displayResults(cubicYards, cubicFeet, cubicMeters, totalCost) {
    const resultsSection = document.getElementById("results-section");
    const resultsContent = document.getElementById("results-content");

    let html = `
                <div class="result-item">
                    <div class="result-value">${cubicYards.toFixed(2)} yd³</div>
                    <div class="result-label">Cubic Yards</div>
                </div>
                <div class="result-item">
                    <div class="result-value">${cubicFeet.toFixed(2)} ft³</div>
                    <div class="result-label">Cubic Feet</div>
                </div>
                <div class="result-item">
                    <div class="result-value">${cubicMeters.toFixed(2)} m³</div>
                    <div class="result-label">Cubic Meters</div>
                </div>
            `;

    if (totalCost > 0) {
        const currency = document.getElementById("currency").value;
        html += `
                    <div class="result-item" style="background: rgba(249, 115, 22, 0.2);">
                        <div class="result-value" style="color: #f97316;">${currency}${totalCost.toFixed(
            2
        )}</div>
                        <div class="result-label">Total Cost</div>
                    </div>
                `;
    }

    resultsContent.innerHTML = html;
    resultsSection.style.display = "block";
    resultsSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function clearForm() {
    // Clear all input fields
    document.querySelectorAll(".form-control-modern").forEach((input) => {
        input.value = "";
    });

    // Reset quantity to 1
    document.getElementById("quantity").value = "1";

    // Reset price
    document.getElementById("price").value = "";

    // Hide results
    document.getElementById("results-section").style.display = "none";

    // Reset to default shape
    selectShape("square");
}

function autoCalculate() {
    // Only auto-calculate if we have some values
    const inputs = document.querySelectorAll(
        "#input-fields .form-control-modern"
    );
    let hasValues = false;

    inputs.forEach((input) => {
        if (input.value && input.value > 0) {
            hasValues = true;
        }
    });

    if (hasValues) {
        try {
            calculateVolume();
        } catch (error) {
            // Silently fail for auto-calculation
        }
    }
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// Add loading animation to calculate button
document
    .getElementById("calculate-btn")
    .addEventListener("click", function () {
        const btn = this;
        const originalText = btn.innerHTML;
        btn.innerHTML =
            '<i class="fas fa-spinner fa-spin me-2"></i>Calculating...';
        btn.disabled = true;

        setTimeout(() => {
            btn.innerHTML = originalText;
            btn.disabled = false;
        }, 500);
    });