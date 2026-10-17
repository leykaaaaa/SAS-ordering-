const totalSales =
    document.getElementById(
        "totalSales"
    );

const totalOrders =
    document.getElementById(
        "totalOrders"
    );

const itemsSold =
    document.getElementById(
        "itemsSold"
    );

const bestSeller =
    document.getElementById(
        "bestSeller"
    );

const salesTable =
    document.getElementById(
        "salesTable"
    );

const transactionTable =
    document.getElementById(
        "transactionTable"
    );

const salesFilter =
    document.getElementById(
        "salesFilter"
    );


/* =========================
   LOAD SALES
========================= */

function loadSales() {

    const orders =
        getOrders();


    let filteredOrders =
        orders;


    /* TODAY */

    if (
        salesFilter.value ===
        "today"
    ) {

        const today =
            new Date().toDateString();


        filteredOrders =
            orders.filter(order => {

                return (
                    new Date(order.date)
                        .toDateString()
                    === today
                );

            });

    }


    let revenue = 0;

    let quantitySold = 0;


    const productSales = {};


    /* CALCULATE */

    filteredOrders.forEach(order => {

        revenue += order.total;


        order.items.forEach(item => {

            quantitySold +=
                item.quantity;


            if (
                !productSales[item.name]
            ) {

                productSales[item.name] = {

                    quantity: 0,

                    revenue: 0

                };

            }


            productSales[item.name]
                .quantity +=
                item.quantity;


            productSales[item.name]
                .revenue +=
                item.price *
                item.quantity;

        });

    });


    /* STATISTICS */

    totalSales.textContent =
        formatPeso(revenue);


    totalOrders.textContent =
        filteredOrders.length;


    itemsSold.textContent =
        quantitySold;


    /* BEST SELLER */

    let topProduct = null;


    Object.keys(productSales)
        .forEach(name => {

            if (
                !topProduct ||
                productSales[name]
                    .quantity >
                productSales[topProduct]
                    .quantity
            ) {

                topProduct = name;

            }

        });


    bestSeller.textContent =
        topProduct || "—";


    /* PRODUCT TABLE */

    salesTable.innerHTML = "";


    const sortedProducts =
        Object.entries(productSales)
            .sort(
                (a, b) =>
                    b[1].quantity -
                    a[1].quantity
            );


    sortedProducts.forEach(
        ([name, data]) => {

            const row =
                document.createElement(
                    "tr"
                );


            row.innerHTML = `

                <td>
                    <strong>
                        ${name}
                    </strong>
                </td>

                <td>
                    ${data.quantity}
                </td>

                <td>
                    ${formatPeso(
                        data.revenue
                    )}
                </td>

            `;


            salesTable.appendChild(row);

        }
    );


    loadTransactions(
        filteredOrders
    );

}


/* =========================
   TRANSACTIONS
========================= */

function loadTransactions(orders) {

    transactionTable.innerHTML = "";


    if (orders.length === 0) {

        transactionTable.innerHTML = `

            <tr>

                <td
                    colspan="4"
                    class="no-data"
                >
                    No orders yet.
                </td>

            </tr>

        `;

        return;

    }


    orders
        .slice()
        .reverse()
        .forEach(order => {

            const row =
                document.createElement(
                    "tr"
                );


            const date =
                new Date(order.date);


            const orderItems =
                order.items
                    .map(item => {

                        return `
                            ${item.name}
                            × ${item.quantity}
                        `;

                    })
                    .join(", ");


            row.innerHTML = `

                <td>

                    <strong>
                        #${String(order.id)
                            .padStart(3, "0")}
                    </strong>

                </td>


                <td>

                    ${date.toLocaleDateString(
                        "en-PH"
                    )}

                    <br>

                    <small>
                        ${date.toLocaleTimeString(
                            "en-PH",
                            {
                                hour: "2-digit",
                                minute: "2-digit"
                            }
                        )}
                    </small>

                </td>


                <td>
                    ${orderItems}
                </td>


                <td>

                    <strong>
                        ${formatPeso(
                            order.total
                        )}
                    </strong>

                </td>

            `;


            transactionTable.appendChild(
                row
            );

        });

}


/* =========================
   FILTER
========================= */

salesFilter.addEventListener(
    "change",
    loadSales
);


/* =========================
   RESET SALES
========================= */

document
    .getElementById("resetSales")
    .addEventListener(
        "click",
        function () {

            const confirmed =
                confirm(
                    "Are you sure you want to delete ALL sales records?"
                );


            if (!confirmed) {
                return;
            }


            localStorage.removeItem(
                "silogOrders"
            );


            loadSales();


            alert(
                "Sales records have been reset."
            );

        }
    );


/* INITIALIZE */

loadSales();
