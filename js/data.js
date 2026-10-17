const products = [

    {
        id: 1,
        name: "Tapsilog",
        category: "Silog Meal",
        price: 85,
        description:
            "Beef tapa with garlic rice and fried egg."
    },

    {
        id: 2,
        name: "Longsilog",
        category: "Silog Meal",
        price: 80,
        description:
            "Longganisa with garlic rice and fried egg."
    },

    {
        id: 3,
        name: "Tocilog",
        category: "Silog Meal",
        price: 80,
        description:
            "Tocino with garlic rice and fried egg."
    },

    {
        id: 4,
        name: "Hotsilog",
        category: "Silog Meal",
        price: 75,
        description:
            "Hotdog with garlic rice and fried egg."
    },

    {
        id: 5,
        name: "Chicksilog",
        category: "Silog Meal",
        price: 85,
        description:
            "Chicken with garlic rice and fried egg."
    },

    {
        id: 6,
        name: "Lemonade",
        category: "Drink",
        price: 30,
        description:
            "Refreshing homemade lemonade."
    }

];


function getOrders() {

    const savedOrders =
        localStorage.getItem("silogOrders");

    if (!savedOrders) {
        return [];
    }

    return JSON.parse(savedOrders);
}


function saveOrders(orders) {

    localStorage.setItem(
        "silogOrders",
        JSON.stringify(orders)
    );

}


function getNextOrderNumber() {

    const orders = getOrders();

    if (orders.length === 0) {
        return 1;
    }

    return Math.max(
        ...orders.map(order => order.id)
    ) + 1;

}


function formatPeso(amount) {

    return "₱" + amount.toLocaleString(
        "en-PH",
        {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }
    );

}
