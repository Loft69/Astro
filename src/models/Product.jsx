export class Product {
    constructor({ id, name, description, category, price, image, sizes = [], color = '' }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.category = category;
        this.price = Number(price);
        this.image = "" + image;
        this.sizes = sizes;
        this.color = color;
    }

    // проверка фильтров
    hasSize(size) {
        if (!size || size === 'all') return true;
        return this.sizes.includes(size);
    }

    matchesCategory(category) {
        if (!category || category === 'all') return true;
        return this.category?.toLowerCase() === category.toLowerCase();
    }

    matchesColor(color) {
        if (!color || color === 'all') return true;
        return this.color?.toLowerCase() === color.toLowerCase();
    }

    matches(filters = {}) {
        return (
            this.matchesCategory(filters.category) &&
            this.hasSize(filters.size) &&
            this.matchesColor(filters.color)
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
        const colors = products.map(p => p.color).filter(Boolean);
        return [...new Set(colors)];
    }
}