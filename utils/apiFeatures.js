class ApiFeatures{
    constructor(query,queryStr)
    {
        this.query=query;
        this.queryStr=queryStr;
    }
    search(){
        const keyword=this.queryStr.keyword?{
            category:{
                $regex:this.queryStr.keyword,
                $options:"i"//case insensitive
            }
        }:{};
        this.query=this.query.find({...keyword});
        console.log(this.queryStr.keyword);
        return this;

    }
}
module.exports=ApiFeatures;