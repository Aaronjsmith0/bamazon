var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Bearscare1!",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, results) {
        if (err) throw err;
        inquirer
            .prompt([{
                    name: "choice",
                    type: "rawlist",
                    choices: function () {
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(`ID: ${results[i].id}  |  Product: ${results[i].product_name}  |  Price: $${results[i].price}  |  In Stock: ${results[i].stock_quantity}`);
                        }
                        return choiceArray;
                    },
                    message: "What is the ID of the item you would like to purchase?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How many would you like to buy?"
                }
            ])
            .then(function (answer) {
                var chosenItem;
                var stockQuantity;
                var productPrice;
                var chosenID;
                var customerQuantity = parseFloat(answer.quantity);
                for (var i = 0; i < results.length; i++) {
                    if (`ID: ${results[i].id}  |  Product: ${results[i].product_name}  |  Price: $${results[i].price}  |  In Stock: ${results[i].stock_quantity}` === answer.choice) {
                        chosenItem = results[i];
                        stockQuantity = results[i].stock_quantity;
                        productPrice = results[i].price;
                        chosenID = results[i].id;
                    }
                }
                if (chosenItem.stock_quantity >= parseInt(answer.quantity)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [{
                            stock_quantity: stockQuantity - customerQuantity
                        },
                        {
                            id: chosenID
                        }
                    ],
                        function (error) {
                            if (error) throw err;
                            console.log(`Your order has been filled\nThe total for your order is: $${productPrice * customerQuantity}`);
                            connection.end();
                        }
                    );
                } else {
                    if (chosenItem.stock_quantity < parseInt(answer.quantity)) {
                        console.log("There is not enough product to fill your order.");
                    }
                    start();
                }
            });
    });
}