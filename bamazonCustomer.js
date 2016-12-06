var inquirer = require("inquirer");
var mysql = require("mysql");
var Table = require("cli-table");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as " + connection.threadId);
  displayItems();
});
//displays all items in bamazon.products as cli-table
function displayItems() {
	connection.query("SELECT * FROM products", function(error, response) {
		if (error) throw error;
		//create new table to push product info into
		var itemsTable = new Table({
			head: ["Item ID", "Product Name", "Price"]
		});
		//loop through response and push each items info into table
		for (var i = 0; i < response.length; i++) {
			itemsTable.push([response[i].item_id, response[i].product_name, "$ "+response[i].price]);
		}
		//display table
		console.log(itemsTable.toString());
		customer();
	})
}

function customer() {
	inquirer.prompt([
		{
			name: "productId",
			message: "Enter the ID of the product you would like to buy.",
			type: "input",
			validate: function(value) {
		      if (isNaN(value) === false) {
		        return true;
		      }
		      return false;
		    }
		},
		{
			name: "quantity",
			message: "How many would you like to buy?",
			type: "input",
			validate: function(value) {
      		if (isNaN(value) === false) {
		        return true;
		      }
		      return false;
		    }
		}

	]).then(function(input) {

		connection.query("SELECT * FROM products WHERE ?", {item_id: input.productId}, function(error, response) {
			if (error) throw error;

			if (parseInt(input.quantity) <= response[0].stock_quantity) {
				var orderCost = (parseInt(input.quantity) * response[0].price).toFixed(2);
				console.log("Your total is $ " + orderCost);
				fulfillOrder(response[0].item_id, response[0].stock_quantity, parseInt(input.quantity));
			} else {
				console.log("Sorry, we only have " + response[0].stock_quantity + " units left. We can't fulfill your order.");
				keepShopping();
			}
		})
	});
}

function fulfillOrder(itemId, currentQuantity, quantityPurchased) {
	connection.query("UPDATE products SET ? WHERE ?", [{
		stock_quantity: currentQuantity - quantityPurchased
	}, {
		item_id: itemId
	}], function(error, response) {
		if (error) throw error;

		console.log("Order complete. Thank you for shoppign with Bamazon.");
		keepShopping();
	})
}

function keepShopping() {
	inquirer.prompt({
		name: "keepShopping",
		message: "Would you like to make another purchase?",
		type: "list",
		choices: ["Yes", "No"]

	}).then(function(input) {

		if (input.keepShopping === "Yes") {
			displayItems();
		} else {
			console.log("Come back soon!");
			connection.end();
		}
	})
}