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

connection.connect(function(error) {
	if (error) throw error;
	console.log("connected as " + connection.threadId);
	menu();
});

function menu() {
	inquirer.prompt({
		name: "choice",
		type: "list",
		message: "What would you like to do?",
		choices: ["View Products For Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]

	}).then(function(input) {
		console.log(input);
		switch (input.choice) {
			case "View Products For Sale":
				displayItems();
				break;
			case "View Low Inventory":
				viewLow();
				break;
			case "Add to Inventory":
				addToInv();
				break;
			case "Add New Product":
				addProduct();
				break;
		}
	})
}

//displays all items in bamazon.products as cli-table
function displayItems() {
	connection.query("SELECT * FROM products", function(error, response) {
		if (error) throw error;
		//create new table to push product info into
		var itemsTable = new Table({
			head: ["Item ID", "Product Name", "Price", "Quantity"]
		});
		//loop through response and push each items info into table
		for (var i = 0; i < response.length; i++) {
			itemsTable.push([response[i].item_id, response[i].product_name, "$ "+response[i].price, response[i].stock_quantity]);
		}
		//display table
		console.log(itemsTable.toString());
	})
}

function viewLow() {
	connection.query("SELECT * FROM products WHERE stock_quantity <= 5", function(error, response) {
		if (error) throw error;
		//create new table to push product info into
		var itemsTable = new Table({
			head: ["Item ID", "Product Name", "Price", "Quantity"]
		});
		//loop through response and push each items info into table
		for (var i = 0; i < response.length; i++) {
			itemsTable.push([response[i].item_id, response[i].product_name, "$ "+response[i].price, response[i].stock_quantity]);
		}
		//display table
		console.log(itemsTable.toString());
	})
}

//SHOW MORE INFO IN THIS FUNCTION, FEELS SHITTY TO USE
function addToInv() {
	console.log("add to inv called");
	inquirer.prompt([
		{
			name: "itemid",
			message: "Please enter the ID of the item you would like to add inventory for.",
			type: "input",
			validate: function(value) {
      		if (isNaN(value) === false) {
		        return true;
		      }
		      return false;
		    }		
		}, 
		{
			name: "amount",
			message: "Please enter the amount of units you would like to add.",
			type: "input",
			validate: function(value) {
      		if (isNaN(value) === false) {
		        return true;
		      }
		      return false;
		    }
		}

	]).then(function(input) {
		console.log(input);
		connection.query("SELECT * FROM products WHERE ?", {item_id: input.itemid}, function(error, response) {
			if (error) throw error;
			var currentQuantity = response[0].stock_quantity;


			connection.query("UPDATE products SET ? WHERE ?", [{
				stock_quantity: currentQuantity + parseInt(input.amount)
			}, {
				item_id: input.itemid
			}], function(error, response) {
				if (error) throw error;
				console.log("Successfully added.");
			})

		})
	})
}

function addProduct() {
	console.log("add product called");
}