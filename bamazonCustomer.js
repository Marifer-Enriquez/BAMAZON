var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table3");

var connection=mysql.createConnection({

    host:"localhost",
    port:3306,
    user:"root",
    password:"",
    database:"bamazon"
});

connection.connect(function(err) {
    if (err) console.log("-1", err);
    // run the start function after the connection is made to prompt the user
    start();
  });

  function table (rows) {
    const headers = ["Id", "Product", "Department","Price", "Stock quantity"];
        let table = new Table({
          head: headers
        });
      
        rows.forEach(row => {
          table.push([row.id, row.product_name, row.department_name,row.price, row.stock_quantity]);
        });
      
        console.log(table.toString());  
    }

  function start() {
      
    connection.query("SELECT * FROM products", function(err, results) {
        table (results);
        inquirer
       .prompt ([
       {
        name: "item",
        type: "input",
        message: "Please type the id number of the product that you would like to buy?"  
       },
       {
        name: "amount",
        type: "input",
        message: "How many units would you like to buy?"  
       }
           ]).then(function (answer) {
               var chosenItem;
               for (var i = 0; i < results.length; i++) {
                   if (results[i].id == answer.item) {
                       chosenItem = results[i];
                   }
               }
             
               // determine if bid was high enough
               if (chosenItem.stock_quantity > parseInt(answer.amount)) {
                   // bid was high enough, so update db, let the user know, and start over
                   connection.query(
                       "UPDATE products SET ? WHERE ?",
                       [
                           {
                               stock_quantity: parseInt(chosenItem.stock_quantity) - parseInt(answer.amount)
                           },
                           {
                               id: chosenItem.id
                           }
                       ],
                       function (error) {
                           if (error) console.log(err);
                           console.log("Purchase placed successfully!");
                           var total = parseInt(chosenItem.price) * parseInt(answer.amount);
                           console.log("Your total amount is: " + total)
                           
                           newBuy();
                       }
                   );
               }
               else {
                // bid wasn't high enough, so apologize and start over
                console.log("Not enough items on stock! Try again...");
                start();
               }
            });
        });
      }

function newBuy() {
    inquirer
        .prompt([
            {
                name: "newbuy",
                type: "confirm",
                message: "Would you like to buy something else?",
                default: true
            },
            
        ]).then(function (answer) {
            if(answer.newbuy === true){
                console.log("Ok, here's the list of items")
                start();
            }
            else{
                console.log("ok, thank you for your purchase, good bye!")
            }
        })
    }

