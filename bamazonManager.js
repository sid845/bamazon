var mysql=require("mysql");
var inquirer=require("inquirer");
var connection=mysql.createConnection({
  host:"localhost",
  port:"3306",
  user:"root",
  password:"tiger",
  database:"bamazon"
});
connection.connect(function(err){
  if(err) throw err;
  options();
});
function options()
{
  inquirer.prompt({
    type: "rawlist",
    message:"Select one of the following:",
    name:"options",
    choices:["View products for sale","View low inventory","Add to inventory","Add new product"]
  }).then(function(answer){
    if(answer.options==="View products for sale")
    {
      viewProduct();
    }
    else if(answer.options==="View low inventory")
    {
      viewInventory();
    }
    else if(answer.options==="Add to inventory")
    {
      addInventory();
    }
    else if(answer.options==="Add new product")
    {
      addProduct();
    }
    
  });
}
function viewProduct(){
  connection.query("SELECT * FROM products;",function(err,res){
    if(err) throw err;
    console.log("_____________________________________________________");
    console.log("| ID |    Price    |  Quantity  |    Product Name    |");
    console.log("_____________________________________________________");
    for(var i=0;i<res.length;i++){
      console.log("|  "+res[i].item_id+" |     "+res[i].price+"      |   "+res[i].stock_quantity+"       |"+res[i].product_name);
    }
  console.log("_____________________________________________________");
  });
}
function viewInventory(){
   
  connection.query("SELECT*FROM products WHERE stock_quantity<5",function(err,res){
    if(err) throw err;
    for (var i=0;i<res.length;i++){
      console.log("id:" + res[i].item_id + "   product name:" + res[i].product_name + "   dept. name:" + res[i].department_name + "   price:"+res[i].price + "   quantity:" + res[i].stock_quantity);
    }
  });
}
function addInventory() {
  inquirer.prompt([{
    name:'item_id',
    type:'input',
    message: '\n\nEnter the ID of the Product you want to increase the inventory of'
    },
    {
    name: 'qty',
    type:'input',
    message: 'Enter the quantity you want to add to inventory'
  }]).then(function(answer) {
    var addAmount = (parseInt(answer.qty));
    connection.query("SELECT * FROM Products WHERE ?", [{item_id: answer.item_id}], function(err, res) {
      if(err) throw err;
      var updateQty = (parseInt(res[0].stock_quantity) + addAmount);
      connection.query('UPDATE products SET stock_quantity = ? WHERE item_id = ?', [updateQty, answer.item_id], function(err, results) {
        if(err) throw err;
        console.log('New Inventory Added!\n');
      });
    });
  });
}
function addProduct() {
  inquirer.prompt([{
    name: "product",
    type: "input",
    message: "Type the name of the Product you want to add to Bamazon"
  }, {
    name: "department",
    type: "input",
    message: "Type the Department name of the Product you want to add to Bamazon"
  }, {
    name: "price",
    type: "input",
    message: "Enter the price of the product without currency symbols"
  }, {
    name: "quantity",
    type: "input",
    message: "Enter the amount you want to add to the inventory"
  }]).then(function(answers) {
    var ProductName = answers.product;
    var DepartmentName = answers.department;
    var Price = answers.price;
    var StockQuantity = answers.quantity;
    connection.query("INSERT INTO Products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)", [ProductName, DepartmentName, Price, StockQuantity], function(err, data) {
      if (err) throw err;
      console.log('\n\nProduct: ' + ProductName + ' added successfully!\n\n');
    });
  });
}















