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
      name :"productId"
    },
    {
      type:"input",
      message:"Enter the Quantity:",
      name:"quantity"
    }
  ]).then(function(answer){
    connection.query("SELECT stock_quantity,product_name from products where ?",{item_id:answer.productId},function(err,res){
      if(err) throw err;
      for(var i=0;i<res.length;i++){
        if(res[i].stock_quantity>answer.quantity){
          console.log("\n"+res[i].product_name+" was sold\n");
          var a=res[i].stock_quantity-answer.quantity;
          var b=answer.productId;
          connection.query("UPDATE products SET ? WHERE ?",[{stock_quantity:a},{item_id:answer.productId}],function(err,res){
            if(err) throw err;
            console.log("row updated");
          });
        }
        else {
          console.log("Insufficient quantity!");
        }
      }
    });
  });
}



















