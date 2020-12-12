const readline = require('readline')
const fs = require ('fs');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let input_file = process.argv[2];

let view =[];
const readingJson=()=>{
    let rawdata = fs.readFileSync(input_file); // It can read files in a synchronous way,
    // i.e. we are telling node.js to block other parallel process and do the current file reading process.
    let student = JSON.parse(rawdata); //convert JSON data to string of arrays
    for(let key in student){
        if(student[key]['completed']===true){
            view.push(`[✓] ${student[key]['title']}`)
        }
        else{
            view.push(`[ ] ${student[key]['title']}`)
        }
    }

}
if(input_file !== undefined){
    readingJson();
    
}

console.log("Welcome to Todo CLI!")
function todo()
{
    
    function prompt()
    {
        rl.question('(v) View • ( n ) New • (cX) Complete • (dX) Delete • (s) Save • (q) Quit \n>', (input) => { 
        if(input === 'v'){
       
        if(view.length === 0){
            console.log("List is empty ...")
            prompt();   
        }
         
        else{
            for (let i=0; i<view.length; i++){
                console.log(`${i} ${view[i]}`);
            }
            
            prompt();     
        }
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
            view[index] = '[✓]' + itemName;
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
                if(index === i){
                    console.log(`Deleted "${view[index].slice(3)}"`)
                }
                else
                newList.push(view[i]);
            }
            
            view = newList;
            prompt();
        }
        
    }
    else if(input === 's'){
        let final=[]; //created an empty array
        for(let i=0; i< view.length;i++){
            let obj={}; // created an empty object
            if(view[i].includes('✓')){
                obj['completed']=true;
            }
            else{
                obj['completed']=false
            }
            obj['title']=view[i].slice(3)
            final.push(obj)
            
        }
       
        const data = JSON.stringify(final) // convert string of arrays to JSON data

        rl.question('Where? \n>', path => {
    
           if(path === '' && input_file !== undefined){
            fs.writeFile(input_file, data, 'utf8', err => {
                if(err)
                console.log(err);
                else
                console.log(`List saved to ${input_file}`);
                prompt();
            }) 
            
        }
        
        else if(path === '' && input_file === undefined){
            fs.writeFile('./myList.json', data, 'utf8', err => {
                if(err)
                console.log(err);
                else
                console.log('List saved to myList.json');
                prompt();
            })
        }
        else{
            fs.writeFile(path, data, 'utf8', err => {
                if(err)
                console.log(err);
                else
                console.log(`List saved to ${path}`);
                prompt();
            }) 
        }
        })
        
    }

    else if(input === 'q'){
        console.log("See you soon !😄");
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






