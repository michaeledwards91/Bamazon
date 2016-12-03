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
		console.log(response);
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
	})
}

