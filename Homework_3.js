const readline = require('readline')
const fs = require ('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

console.log("Welcome to Todo CLI!")

function todo()
{
    let view = []
    function prompt()
    {
        rl.question('(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n>', (input) => { 
        if(input === 'v'){
        // if(view.length === 0){
        //     console.log("List is empty...")
        // }
        // else
        //     for(let i=0;i<view.length;i++)
        //     {
        //     console.log(`${i} : ${view[i]}`);
        //     }
        fs.readFile('./myList.json', {encoding: 'utf8'}, (err, content) => {
            var data = JSON.parse(content);
            for( let i=0;i<data.length;i++){
                console.log(`${i} ${data[i]}`);    
            }
            prompt(); 
        });
            
     } 
    
    
    else if(input === 'n'){
        rl.question('What? \n>',  newItem => {
            view.push('[ ] ' + newItem )  
            prompt();
        });
    }
    
    else if(input[0] === 'c'){
        const x = input.slice(1,input.length) //c2 ->2
        let index = parseInt(x)
        if(isNaN(x) || index >= view.length ){
            console.log("Invalid Input...")
        }
        else
        {
            let item = view[index]
            let itemName = item.slice(3,item.length)
            view[index] = '[X]' + itemName;
            console.log(`Completed ${itemName}`);
            prompt();
        }   
    }
    else if(input[0] === 'd'){
        const y = input.slice(1,input.length) 
        let index = parseInt(y)
        if(isNaN(y) || index >= view.length )
        {
            console.log("Invalid Input...")
        }
        else
        {
            let newList = []
            for(let i=0; i < view.length; i++)
            {
                if(index === i)continue;
                newList.push(view[i]);
            }
            
            view = newList;
            prompt();
        }
        
    }
    else if(input === 's'){
        rl.question('Where? \n>', path => {
            const data = JSON.stringify(view)
            fs.writeFile(path, data, 'utf8', err => {
                if(err)
                console.log(err);
                else
                console.log(`List saved to ${path}`);
                prompt();
            }) 
        })
        
    }

    else if(input === 'q'){
        console.log("See you soon!");
        rl.close();
    }
    else{
        console.log("Invalid Option !")
    }
    
    }); 
}
prompt();
}
todo();






