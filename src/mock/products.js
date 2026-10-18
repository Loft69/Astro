import { Product } from '../models/Product.jsx';

const rawProducts = [
    {
        "id": "1",
        "name": "Кофточка",
        "description": "Теплая кофточка",
        "category": "Женское",
        "price": "994",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "2",
        "name": "Джинсы",
        "description": "Синие джинсы",
        "category": "Женское",
        "price": "2500",
        "image": "1.png",
        "sizes": ["S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "3",
        "name": "Платье",
        "description": "Летнее платье в цветочный принт",
        "category": "Женское",
        "price": "3200",
        "image": "1.png",
        "sizes": ["XS", "M", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "4",
        "name": "Юбка",
        "description": "Кожаная юбка-карандаш",
        "category": "Женское",
        "price": "4100",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "5",
        "name": "Блузка",
        "description": "Шёлковая блузка с длинным рукавом",
        "category": "Женское",
        "price": "2750",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "6",
        "name": "Кардиган",
        "description": "Объёмный вязаный кардиган",
        "category": "Женское",
        "price": "4300",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "7",
        "name": "Пальто",
        "description": "Демисезонное пальто прямого кроя",
        "category": "Женское",
        "price": "8900",
        "image": "1.png",
        "sizes": ["M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "8",
        "name": "Брюки",
        "description": "Классические брюки с высокой посадкой",
        "category": "Женское",
        "price": "3100",
        "image": "1.png",
        "sizes": ["XS", "M"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "9",
        "name": "Свитер",
        "description": "Тёплый свитер крупной вязки",
        "category": "Женское",
        "price": "3600",
        "image": "1.png",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "10",
        "name": "Топ",
        "description": "Спортивный топ для тренировок",
        "category": "Женское",
        "price": "1450",
        "image": "1.png",
        "sizes": ["XS", "S", "M"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "11",
        "name": "Футболка",
        "description": "Хлопковая футболка с принтом",
        "category": "Мужское",
        "price": "1200",
        "image": "1.png",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "12",
        "name": "Рубашка",
        "description": "Классическая рубашка в клетку",
        "category": "Мужское",
        "price": "2800",
        "image": "1.png",
        "sizes": ["M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "13",
        "name": "Брюки",
        "description": "Строгие брюки со стрелками",
        "category": "Мужское",
        "price": "3500",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "14",
        "name": "Худи",
        "description": "Утепленное худи с капюшоном",
        "category": "Мужское",
        "price": "3900",
        "image": "1.png",
        "sizes": ["M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "15",
        "name": "Джинсы",
        "description": "Прямые джинсы из плотного денима",
        "category": "Мужское",
        "price": "4200",
        "image": "1.png",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "16",
        "name": "Свитшот",
        "description": "Свитшот с круглым вырезом",
        "category": "Мужское",
        "price": "2600",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "17",
        "name": "Куртка",
        "description": "Осенняя куртка-бомбер",
        "category": "Мужское",
        "price": "6700",
        "image": "1.png",
        "sizes": ["M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "18",
        "name": "Поло",
        "description": "Поло с коротким рукавом",
        "category": "Мужское",
        "price": "1900",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "19",
        "name": "Шорты",
        "description": "Летние шорты из хлопка",
        "category": "Мужское",
        "price": "1700",
        "image": "1.png",
        "sizes": ["S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "20",
        "name": "Пиджак",
        "description": "Классический пиджак на пуговицах",
        "category": "Мужское",
        "price": "7900",
        "image": "1.png",
        "sizes": ["M", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "21",
        "name": "Кроссовки",
        "description": "Спортивные кроссовки для бега",
        "category": "Обувь",
        "price": "5600",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "22",
        "name": "Ботинки",
        "description": "Зимние кожаные ботинки",
        "category": "Обувь",
        "price": "7200",
        "image": "1.png",
        "sizes": ["M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "23",
        "name": "Туфли",
        "description": "Классические туфли на каблуке",
        "category": "Обувь",
        "price": "4800",
        "image": "1.png",
        "sizes": ["XS", "M"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "24",
        "name": "Кеды",
        "description": "Текстильные кеды на резиновой подошве",
        "category": "Обувь",
        "price": "3300",
        "image": "1.png",
        "sizes": ["S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "25",
        "name": "Лоферы",
        "description": "Кожаные лоферы без шнуровки",
        "category": "Обувь",
        "price": "5900",
        "image": "1.png",
        "sizes": ["XS", "S", "M"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "26",
        "name": "Сумка",
        "description": "Сумка через плечо из экокожи",
        "category": "Аксессуары",
        "price": "2400",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "27",
        "name": "Ремень",
        "description": "Кожаный ремень с металлической пряжкой",
        "category": "Аксессуары",
        "price": "1500",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "28",
        "name": "Шарф",
        "description": "Тёплый вязаный шарф",
        "category": "Аксессуары",
        "price": "1100",
        "image": "1.png",
        "sizes": ["XS", "M", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "29",
        "name": "Кошелёк",
        "description": "Компактный кошелёк из натуральной кожи",
        "category": "Аксессуары",
        "price": "1900",
        "image": "1.png",
        "sizes": ["S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "30",
        "name": "Очки солнцезащитные",
        "description": "Очки с UV-защитой в трендовой оправе",
        "category": "Аксессуары",
        "price": "2700",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "31",
        "name": "Детская футболка",
        "description": "Мягкая хлопковая футболка с весёлым принтом",
        "category": "Детское",
        "price": "690",
        "image": "1.png",
        "sizes": ["XS", "M"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "32",
        "name": "Детские шорты",
        "description": "Летние шорты из натурального хлопка",
        "category": "Детское",
        "price": "850",
        "image": "1.png",
        "sizes": ["XS", "S", "M"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "33",
        "name": "Детское платье",
        "description": "Нарядное платье для маленькой принцессы",
        "category": "Детское",
        "price": "1590",
        "image": "1.png",
        "sizes": ["S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "34",
        "name": "Детский комбинезон",
        "description": "Тёплый комбинезон для прогулок зимой",
        "category": "Детское",
        "price": "3400",
        "image": "1.png",
        "sizes": ["XS", "M", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "35",
        "name": "Детская шапка",
        "description": "Вязаная шапка с помпоном",
        "category": "Детское",
        "price": "590",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "36",
        "name": "Детские кроссовки",
        "description": "Удобные кроссовки на липучках",
        "category": "Детское",
        "price": "2200",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "37",
        "name": "Детский свитшот",
        "description": "Тёплый свитшот с капюшоном",
        "category": "Детское",
        "price": "1350",
        "image": "1.png",
        "sizes": ["S", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "38",
        "name": "Детские джинсы",
        "description": "Джинсы с регулируемым поясом",
        "category": "Детское",
        "price": "1290",
        "image": "1.png",
        "sizes": ["XS", "S", "M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "39",
        "name": "Детская куртка",
        "description": "Лёгкая демисезонная куртка",
        "category": "Детское",
        "price": "2800",
        "image": "1.png",
        "sizes": ["M", "L", "XL"],
        "colors": ["black", "white", "green", "blue", "milk"]
    },
    {
        "id": "40",
        "name": "Детская пижама",
        "description": "Уютная пижама с весёлым рисунком",
        "category": "Детское",
        "price": "990",
        "image": "1.png",
        "sizes": ["XS", "M", "L"],
        "colors": ["black", "white", "green", "blue", "milk"]
    }
];

export const initialProducts = rawProducts.map(item => new Product(item));