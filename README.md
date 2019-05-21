# Bamazon

## Contributors
@missybarringer
____________________________________
## Links
* [GitHub Repository Link](https://github.com/missybarringer/Bamazon.git)
* [Click here to View the Customer App in action](http://www.webwabisabi.com/assets/media/BamazonCustomer.mp4)
* [Click here to View the Manager App in action](http://www.webwabisabi.com/assets/media/BamazonManager.webm)
____________________________________
## Technology
* Command line game using Javascript and Constructors
* Node & mySQL were used
* Inquirer (for prompts) & chalk (for command line colors) NPM packages
____________________________________

### The Problem: Customer View

This Amazon-like storefront needed a way for customers to interact with the items in the mySQL database.
### The Solution:
I created a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

The app then prompts the users with two messages.

   * The first asks them the ID of the product they would like to buy.
   * The second asks how many units of the product they would like to buy.

Once the customer has places the order, the app checks to see if your store has enough of the product to meet the customer's request.

   * The app says `There was not enough stock to place your order...`, and then prevents the order from going through.

If the store _does_ have enough of the product, the app fulfills the customer's order by:
   * Updating the SQL database to reflect the remaining quantity.
   * Then once the update goes through, it shows the customer the total cost of their purchase.

### The Problem: Manager View

This Amazon-like storefront needed a way for the administrators to interact with the items in the mySQL database.
### The Solution:
I created a Node application called `bamazonManager.js`. Running this application will first display:
  * A set of menu options:

    * View Products for Sale
    
    * View Low Inventory
    
    * Add to Inventory
    
    * Add New Product

  * If a manager selects `View Products for Sale`, the app lists every available item: the item IDs, names, prices, and quantities.

  * If a manager selects `View Low Inventory`, then it lists all items with an inventory count lower than five.

  * If a manager selects `Add to Inventory`, your app displays a prompt that will let the manager "add more" of any item currently in the store.

  * If a manager selects `Add New Product`, it allows the manager to add a completely new product to the store.
____________________________________
## License
*This product is licensed under the MIT License (MIT).
____________________________________
## Contributing Guidelines
All contributions and suggestions are welcome!
For direct contributions, please fork the repository and file a pull request.
____________________________________
## Contact
* e-mail: barringer.margaret@gmail.com
* Twitter: @webwabisabi_com
* Instagram: @webwabisabi_com
* Added to [Personal Portfolio webpage](https://missybarringer.github.io/)