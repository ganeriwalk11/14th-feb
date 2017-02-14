import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { checkIDAction } from '../actions/validations';
import { checkIndexAction } from '../actions/validations';
import { inputEdit } from '../actions/validations';
import { applyF } from '../actions/index';
import rootReducer from '../reducers/index';
import { postData } from '../actions/index';
import { addData } from '../actions/index';
import { checkIntegerAction } from '../actions/index';
require("babel-polyfill");
import Rx from "rxjs";
import { Observable } from 'rxjs/Observable';

class ActualData extends Component {
    constructor(props) {
        super(props);
        this.x = [];
    }

    checkFocus(event){
        this.x.push(event.target.innerText);
    }

    checkBlur(h,i,j,event){
        var a = event.target.innerText;
        var head = h.h;
        if(this.props.data[i][head][head] !== a)
        {
            if( this.x[this.x.length - 1] != a)
            {
                this.props.checkIntegerAction(i,j,h,this.props.data,a);
            }
            if(this.props.data[i][head]["dep"] >-1){
            this.props.applyF(this.props.data[i]["d"]["fx"],this.props.data[i][head]["dep"],this.props.data,"red");
    }}
    }

        async checkFormulaBlur(i,event){
        var a = event.target.innerText;
        let alpha  = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        if(a != '')
        {
            if(a[0]!= '=' || a[1] != '(' || a[a.length - 1]!=')' )
            {
                console.log("Invalid format, the valid format is: =(op1 operand op2)");
            }
            else if( alpha.indexOf(a[2])>1 || alpha.indexOf(a[2]) == -1 || alpha.indexOf(a[5])>1 || alpha.indexOf(a[5])==-1 || a[3]-1>this.props.data.length || a[6]-1>this.props.data.length){
                console.log("Operands are out of bounds");
            }
            else{
                var color;
                color = "red";
               await this.tempfunc(a,i,this.props.data,color);
               // setTimeout((this.props.applyF(a,i,this.props.data,"black")),3000);
                
            }
        }
    }

    tempfunc(a,b,c,d){
          this.props.applyF(a,b,c,d);
            
    }

    renderHead = (data) => {
        var dupData = data;
        if(dupData[0])
        {
        var head = Object.keys(dupData[0]);
        var len = head.length;
        if(len>0)
        {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var a = [<th key="blank"></th>];
        for(var i=0;i<len-1;i++){
                a.push(<th key={i}>{alpha[i]}</th>);
        }
        // this.x.push(1);
             return (<tr key="header">{a}</tr>);
        }
        }
    }

    renderData = (data,i) => {
        let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let len = this.props.data.length;
        var b = [];
        var a = [];
        var dupdata = data;
        var head = Object.keys(dupdata);
        if(len != 0)
        {
        a.push(head.map((h,j) => {
            var s = alpha[j-1] + (i+1);
            if(h != "id" && h!='d')
            {
                var x = dupdata[h];
                var y = x[h];
                return (<td
                ref={function(e){if(e) e.contentEditable=true;}}
                key={s}
                style = {{color:dupdata[h]['color']}}
                onFocus = {this.checkFocus.bind(this)}
                onBlur = {this.checkBlur.bind(this,{h},i,j)}
            >{y}</td>);
            }   
            else if(h == 'id')
            { 
                return (<td
                        key={s}
                        //ref={function(e){if(e) e.contentEditable=true;}}
                        >{dupdata[h]}</td>);
            }
        }))
        var s = "D" + (i+1);
        a.push(<td 
                ref={function(e){if(e) e.contentEditable=true;}}
                key={s}
                className={s}
                onBlur = {this.checkFormulaBlur.bind(this,i)}
                 ref={this.refCallback.bind(this)} 
                style = {{color:dupdata['d']['color']}}                
                >{dupdata["d"]["ans"]}</td>)
        return (<tr key={i}>{a}</tr>);
    }
}


 refCallback(item) {
    if (item) {  
     //ReactDOM.findDOMNode(item).ondblclick = this.handleDoubleClick;
     var a = ReactDOM.findDOMNode(item);
     var fxBar = this.refs.theInput;
     a.contentEditable = true;
     var stream$ = Observable.fromEvent(a,'dblclick');
     stream$.subscribe((e) => { var rowno = Number(e.target.className[1]); var data = this.props.data[rowno -1]["d"]["fx"]; this.props.inputEdit(data);  });
    }
  }

    saveData(){
        var dats = this.props.data;
        this.props.postData(dats[0]);
    }


    addRow = () => {
        var add = {"id": this.props.data.length + 1,"a": "","b": "","c":""};
        var data = this.props.data;
        this.props.addData(add);
    }
    
    // submitForm = (e) => {
    //     e.preventDefault();
    //     var fx = ReactDOM.findDOMNode(this.refs.theInput).value;
    //     var head = Object.keys(this.props.data);
    //     var l = head.length;
    //     this.props.applyF(fx,l);
    // }


    render() {
        return (
            <div>
                <button id="save" onClick={this.saveData.bind(this)}>SAVE</button>
                <button id="addRow" onClick={this.addRow.bind(this)}>ADD ROW</button>
                <form onSubmit={this.submitForm}>
                    <input ref="theInput" placeholder="=fx" value= {this.props.vad}/>
                    <button type="Submit">Submit</button>
                </form>
                <table>
                    <thead>{this.renderHead(this.props.data)}</thead>
                    <tbody>{this.props.data.map(this.renderData)}</tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        data: state.data,
        vad : state.vad
    };
}

function mapDispatchToProps(dispatch) {
    return {
        //filterState: bindActionCreators(filterState, dispatch),
        checkIntegerAction: bindActionCreators(checkIntegerAction, dispatch),
        checkIDAction: bindActionCreators(checkIDAction, dispatch),
        postData: bindActionCreators(postData,dispatch),
        applyF: bindActionCreators(applyF,dispatch),
        addData: bindActionCreators(addData,dispatch),
        inputEdit: bindActionCreators(inputEdit,dispatch)
    };
}


export default connect(mapStateToProps,mapDispatchToProps)(ActualData);