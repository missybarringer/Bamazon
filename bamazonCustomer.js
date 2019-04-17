// create database bamazon with products table & 5 columns
// insert at least 10 items
// create the Node application bamazonCustomer.js
// display all items for sale
// use inquirer to prompt user with question of which product id they would like to buy
// then ask how many units they would like
// check stock level to see if there is enough,
// if yes place the order, decrease the quantity & tell them the total price
// if no say 'Insufficient quantity'
//   Added to portfolio https://missybarringer.github.io/

// require mysql & inquirer node packages
var mysql = require("mysql");
var inquirer = require("inquirer");
var chalk = require("chalk"); // allows us to change the font color of console.log responses

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localHost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
    if (err) throw err;
    buyProduct();
});

function buyProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        inquirer
          .prompt([
              {
                name: "choice",
                type: "rawlist",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                      choiceArray.push(results[i].product_name);
                    }
                      return choiceArray;
                },
                message: chalk.magenta("What item would you like to purchase?")
              },
              {
                    name: "numProducts",
                    type: "input",
                    message: chalk.yellow("How many units would you like to purchase?")
              }
            ])
            .then(function(answer) {
                var chosenProduct;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].product_name === answer.choice) {
                        chosenProduct = results[i];
                    }
                }
                //determine if there is enough stock
                if (chosenProduct.stock_quantity > parseInt(answer.numProducts)) {
                    connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: chosenProduct.stock_quantity - answer.numProducts
                            },
                            {
                                item_id: chosenProduct.item_id
                            }
                        ],
                    function(error) {
                        if (error) throw err;
                        var total = chosenProduct.price * answer.numProducts;
                        console.log(chalk.green.bold("Your order was placed!  " + "Your total is: " + total));
                        buyProduct();
                    }
                );
                } else {
                    console.log(chosenProduct.stock_quantity);
                    console.log(answer.numProducts);
                    console.log(chalk.green.bold("There was not enough stock to place your order..."));
                    buyProduct();
                }
            });
    });
}
