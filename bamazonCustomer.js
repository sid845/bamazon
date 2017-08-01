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
  console.log("BAMAZON");
  bamazon();
});

function bamazon()
{
  connection.query("SELECT * FROM products;",function(err,res){
    if(err) throw err;
    console.log("___________________________________________________");
    
    console.log("| ID |    Price    |    Product Name    |");
    
    console.log("___________________________________________________");
    for(var i=0;i<res.length;i++){
      console.log("|  "+res[i].item_id+" |     "+res[i].price+"    |       "+res[i].product_name);
    }
  console.log("___________________________________________________");
  });
  inquirer.prompt([
    {
      type:"input",
      message:"Enter the ID of the product you want:",
      name :"product"
    },
    {
      type:"input",
      message:"Enter the Quantity:",
      name:"quantity"
    }
  ]).then(function(answer))
}