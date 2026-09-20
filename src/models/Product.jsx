export class Product {
    constructor({ id, name, description, category, price, image, sizes = [], colors = [], color = '' }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = Number(price);
        this.image = "" + image;
        this.sizes = sizes;
        // Поддержка старого формата (одиночное поле "color"), но основной источник — массив "colors"
        this.colors = colors && colors.length > 0 ? colors : (color ? [color] : []);
    }

    // проверка фильтров
    hasSize(size) {
        if (!size || size === 'all') return true;
        return this.sizes.includes(size);
    }

    hasColor(color) {
        if (!color || color === 'all') return true;
        return this.colors.some(c => c.toLowerCase() === color.toLowerCase());
    }

    matchesCategory(category) {
        if (!category || category === 'all') return true;
        return this.category?.toLowerCase() === category.toLowerCase();
    }

    matches(filters = {}) {
        return (
            this.matchesCategory(filters.category) &&
            this.hasSize(filters.size) &&
            this.hasColor(filters.color)
        );
    }

    static getUniqueCategories(products) {
        const categories = products.map(p => p.category).filter(Boolean);
        return [...new Set(categories)];
    }

    static getUniqueSizes(products) {
        const sizes = products.flatMap(p => p.sizes || []);
        return [...new Set(sizes)];
    }

    static getUniqueColors(products) {
        const colors = products.flatMap(p => p.colors || []);
        return [...new Set(colors)];
    }
}