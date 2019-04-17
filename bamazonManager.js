// List a set of menu options:
//     * View Products for Sale
//     * View Low Inventory
//     * Add to Inventory
//     * Add New Product

//   * If a manager selects `View Products for Sale`, the app should list every available item: the item IDs, names, prices, and quantities.
//   * If a manager selects `View Low Inventory`, then it should list all items with an inventory count lower than five.
//   * If a manager selects `Add to Inventory`, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//   * If a manager selects `Add New Product`, it should allow the manager to add a completely new product to the store.
//   Added to portfolio https://missybarringer.github.io/

// require mysql & inquirer node packages
var mysql = require("mysql");
var inquirer = require("inquirer");

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
    manageProducts();
});

// function which prompts the manager for what action they should take
  function manageProducts() {
    inquirer
      .prompt({
        name: "manageInventory",
        type: "list",
        message: "Manage your inventory",
        choices: ["View Items", "View Low Inventory", "Add to Inventory", "Add New Products", "EXIT"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.manageInventory === "View Items") {
          viewItems();
        }
        else if(answer.manageInventory === "View Low Inventory") {
          viewLowInv();
        }
        else if(answer.manageInventory === "Add to Inventory") {
          addInv();
        }
        else if(answer.manageInventory === "Add New Products") {
          addNew();
        } else{
          connection.end();
        }
      });
  }
  function viewItems() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        var productsArray = [];
        for (var i = 0; i < results.length; i++) {
            productsArray.push(results[i].item_id + " | " + results[i].product_name + " | " + "$ " + results[i].price + " | " + results[i].department_name + " | " + results[i].stock_quantity);
        }
        console.log( " item_id" + " | " + "product_name" + " | " + "price" + " | " + "department_name" + " | " + "stock_quantity" );
        console.log(productsArray);
        manageProducts();
    });
  }
  function viewLowInv() {
      connection.query("SELECT * FROM products", function(err, results) {
          if (err) throw err;
            var productsArray = [];
            for (var i = 0; i < results.length; i++) {
                if (results[i].stock_quantity < 5) {
                    productsArray.push(results[i].item_id + " | " + results[i].product_name + " | " + "$ " + results[i].price + " | " + results[i].department_name + " | " + results[i].stock_quantity);
            }
        }
            console.log( " item_id" + " | " + "product_name" + " | " + "price" + " | " + "department_name" + " | " + "stock_quantity" );
            console.log(productsArray);
            manageProducts();
      });
    }

    function addInv() {
    // query the database for all inventory
      connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // prompt the manager for which item's stock quantity they'd like to update
          inquirer
            .prompt([
                {
                  name: "choice",
                  type: "rawlist",
                  choices: function() {
                  var productsArray = [];
                  for (var i = 0; i < results.length; i++) {
                  productsArray.push(results[i].product_name);
                }
                  return productsArray;
                },
                  message: "What item's stock quantity would you like to update?"
                },
                {
                  name: "quant",
                  type: "input",
                  message: "How much stock do you want to add?"
                }
                ])
            .then(function(answer) {
                // get the information of the chosen item
                var chosenItem;
                for (var i = 0; i < results.length; i++) {
                  if (results[i].product_name === answer.choice) {
                  chosenItem = results[i];
                  }
                }
              connection.query(
                "UPDATE products SET ? WHERE ?",
                    [
                        {
                          stock_quantity: chosenItem.stock_quantity + parseInt(answer.quant)
                        },
                        {
                          item_id: chosenItem.item_id
                        }
                    ],
                      function(error) {
                        if (error) throw err;
                        console.log("Your items stock was updated successfully!");
                        manageProducts();
                      }
              );
            });
      });
    }

    function addNew() {
        // prompt for info about the item being put up for auction
        inquirer
          .prompt([
            {
              name: "item",
              type: "input",
              message: "What is the item you would like to submit?"
            },
            {
              name: "department_name",
              type: "input",
              message: "What department would you like to place your item in?"
            },
            {
              name: "price",
              type: "input",
              message: "What is the price of the item?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            },
            {
              name: "stock_quantity",
              type: "input",
              message: "What is the stock quantity of the item?",
              validate: function(value) {
                if (isNaN(value) === false) {
                  return true;
                }
                return false;
              }
            }
          ])
          .then(function(answer) {
            // when finished prompting, insert a new item into the db with that info
            connection.query(
              "INSERT INTO products SET ?",
              {
                product_name: answer.item,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
              },
              function(err) {
                if (err) throw err;
                console.log("Your item was created successfully!");
                manageProducts();
              }
            );
          });
      }
      
