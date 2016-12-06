# Bamazon
Mock Amazon App built with Node and MySQL

Running bamazonCustomer.js displays all products currently available on Bamazon. Afterwards, enter the ID and quantity of the item you'd like to purchase and (as long as Bamazon has sufficient stock) your order will be fulfilled.

Running bamazonManager.js displays a list of 4 options:

1. View Products For Sale

	View products for sale displays product data for all items currently for sale on Bamazon. 

2. View Low Inventory
	
	View low inventory displays product data for all items that currently have a stock of 5 or less.

3. Add to Inventory

	Add to inventory allows the manager to add a specified amount of stock to an item as identified by it's unique item_id.

4. Add New Product

	Add new product prompts the manager to enter a product name, department name, price per unit, and stock quantity of a new item to be added to Bamazon.