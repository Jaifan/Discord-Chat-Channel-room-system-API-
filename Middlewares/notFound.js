const notFound = (req,res)=>{
    res.status(404).send('This Route do not exists..!!');
}

module.exports = notFound;