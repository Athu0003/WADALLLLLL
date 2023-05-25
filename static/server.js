let http=require('http')
let fs=require('fs')
let path=require('path')

http.createServer((req,res) => {
    if (req.url=="/"){
        let indfile=path.join(__dirname,"index.html");
        let data = fs.readFile(indfile,"utf-8",(err,data)=>{
            if (err) throw err;
            res.write(data);
            res.end();
        })
    }

}).listen(5000,() => {
    console.log("Started!");
})