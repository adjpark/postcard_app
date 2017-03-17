//-----------------------------------------------------Preview Module--------------------------------------------------------------
var Preview = React.createClass({
    render:function(){
        return(
            <div id="Preview" className="col-sm-8">
                <img id="postcard" src="img/card.png"/>
                <div id="postTo">To: {this.props.to}</div>
                <div id="postFrom">From: {this.props.from}</div>
                <div id="postMsg">{this.props.msg}</div>
                <div id="postImg">
                    <img id="postImgEle" src={this.props.stamp} />
                </div>
            
            </div>
        )
    }
})
    
//------------------------------------------------------------Control Module-------------------------------------------------------

var Control = React.createClass({
    render:function(){
        var self = this;
        var postcardList = this.props.cards.map(function(obj,index){
            return(
                <div className="postcardListClass" key={index}>
                    <div className="postcardListTo">
                        To: {obj.to}
                    </div>
                    <img onClick={self.props.loadInfo.bind(null, {index})} className="postcardListImg" data-tag={index} src={obj.stamp} />
                    <div className="postcardListFrom">
                        From: {obj.from}
                    </div>
                </div>
            )
        })
        
        return(
            <div id="Control" className="col-sm-4">
                <h3>Create Your Own Postcard!</h3>
                <input onKeyUp={this.props.grabInfo} id="to" placeholder="Who are you addressing?" className="form-control"/>
                <br />
                <textarea onKeyUp={this.props.grabInfo} id="msg" placeholder="What is your message?" className="form-control"></textarea>
                <br />
                <input onKeyUp={this.props.grabInfo} id="from" placeholder="Who is it from?" className="form-control"/>
                <br />
                <div id="stampImages">
                <img onClick={this.props.grabImgStamp1} id="stamp1" src="img/stamp1.jpg"/>
                <img onClick={this.props.grabImgStamp2} id="stamp2" src="img/stamp2.jpg"/>
                </div>
                <br />
                <input onKeyUp={this.props.grabImgInput} id="stamp" placeholder="Do you have your own online stamp?" className="form-control"/> 
                <br />
                <button onClick={this.props.postInfo} id="saveBut" className="btn btn-primary">Save</button>
                <br />
                <div>
                    {postcardList}
                </div>
            </div>
        )
    }
})

//------------------------------------------------------App Module-------------------------------------------------------------
var App = React.createClass({
    
   componentDidMount: function () {
       var self = this;

       if (localStorage.getItem("localPostcardList") === null) {
           console.log("There are no previous postcard list.");
       } else {
           var localPostcardList = localStorage.getItem('localPostcardList');
           var localPostcardListParsed = JSON.parse(localPostcardList);
           setInterval(function () {
               self.setState({
                   cards: localPostcardListParsed
               });
           }, 0);
       }
   },
    getInitialState:function(){
       return{
           to:"",
           msg:"",
           from:"",
           stamp:"",
           cards:[]
       }
    },
    //---------------------------------------------------Grab Input Func----------------------------------------------------------------
    grabInfo:function(){
        var to = document.getElementById("to").value;
        var msg = document.getElementById("msg").value;
        var from = document.getElementById("from").value;
        
        this.setState({
            to:to,
            msg:msg,
            from:from
        })
    },
    //-----------------------------------------------------Grab Img Funcs--------------------------------------------------------------
    grabImgInput:function(){
        var stamp = document.getElementById("stamp").value;
        this.setState({
            stamp:stamp
        })
    },
    grabImgClick1:function(){
        document.getElementById("stamp").value = "";
        var stamp = document.getElementById("stamp1").src;
        

        this.setState({
            stamp:stamp
        })
    },
    grabImgClick2:function(){
        document.getElementById("stamp").value = "";
        var stamp = document.getElementById("stamp2").src;

        this.setState({
            stamp:stamp
        })
    },
    //-------------------------------------------------------Save Arr Func------------------------------------------------------------
    postInfo:function(){
        var cardsList = this.state.cards;
        
        var cardObj = {
            to:this.state.to,
            msg:this.state.msg,
            from:this.state.from,
            stamp:this.state.stamp
        }
        
        cardsList.push(cardObj);
        
        this.setState({
            cards: cardsList 
        });
        
       
        
        localStorage.setItem('localPostcardList', JSON.stringify(cardsList));
    },
    //-------------------------------------------------------Load postcard form the list------------------------------------------
    loadInfo:function(i){
        var cardsList = this.state.cards;
    
        this.setState({
            to:cardsList[i.index].to,
            msg:cardsList[i.index].msg,
            from:cardsList[i.index].from,
            stamp:cardsList[i.index].stamp
        })
    },
    render:function(){
        return(
            <div>
                <Control 
                    grabInfo={this.grabInfo}
                    grabImgInput={this.grabImgInput}
                    grabImgStamp1={this.grabImgClick1}
                    grabImgStamp2={this.grabImgClick2}
                    postInfo = {this.postInfo}
                    cards = {this.state.cards}
                    loadInfo = {this.loadInfo}
                />
                
                <Preview 
                    to = {this.state.to} 
                    msg = {this.state.msg} 
                    from = {this.state.from} 
                    stamp = {this.state.stamp}
                />
            </div>
        )
    }
})


ReactDOM.render(
    <App />,
    document.getElementById("display")
)