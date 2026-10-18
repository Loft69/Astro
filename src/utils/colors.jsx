// Карта названий цветов (как они хранятся в JSON, например colors.js) -> реальный CSS-цвет для отображения кружка
export const COLOR_MAP = {
    black: "#111111",
    white: "#ffffff",
    milk: "#f3ecdd",
    yellow: "#f5c518",
    orange: "#ff8c00",
    red: "#c0392b",
    blue: "#2f5aa8",
    navy: "#1b2a4a",
    green: "#4a7c59",
    gray: "#8c8c8c",
    grey: "#8c8c8c",
    beige: "#e8e1d7",
    brown: "#6b4a34",
    pink: "#e6a3b5",
};

export function resolveColor(name) {
    if (!name) return "#cccccc";
    const key = name.toLowerCase();
    return COLOR_MAP[key] || key;
}

const COLOR_NAMES_RU = {
    black: "Чёрный",
    white: "Белый",
    milk: "Молочный",
    yellow: "Жёлтый",
    orange: "Оранжевый",
    red: "Красный",
    blue: "Синий",
    navy: "Тёмно-синий",
    green: "Зелёный",
    gray: "Серый",
    grey: "Серый",
    beige: "Бежевый",
    brown: "Коричневый",
    pink: "Розовый",
};

export function colorLabel(name) {
    if (!name) return "";
    const key = name.toLowerCase();
    return COLOR_NAMES_RU[key] || name;
}