import { FETCH_DATA } from '../actions/index';
import { FETCH_FUL } from '../actions/index';
import { FETCH_FULL } from '../actions/index';
import { ADD_DATA } from '../actions/index';
import { CHECK_INTEGER } from '../actions/index';
import { APPLY_FUN } from '../actions/index';
import Rx from 'rxjs';
import 'rxjs/Rx'; 
import { ajax } from 'rxjs/observable/dom/ajax';
import { applyF } from '../actions/index';
import { Observable } from 'rxjs/Observable';
const rxFetch = require('rxjs-fetch');
var z = "abc";


export default function(state = [], action) {
  switch (action.type) {
      
    case FETCH_DATA:
      return state;
      break;

      case FETCH_FULL:{
          var head = Object.keys(action.payload[0]);
          var len = head.length;
          var data = action.payload;
          data.map(function(row){
              for(var i=1;i<len;i++){
                  if(i == 3)
                  {
                    console.log(row[head][i]);
                      var stockStream$ = Observable.of(row[head[i]]);
                       console.log(stockStream$);
                       var stream2$ = stockStream$.map(value => ajax.getJSON(value));
                       console.log(stream2$);
                      stream2$.subscibe((value) => console.log(value));
                  }
                  var t = head[i];
                  var b = row[head[i]];
                  var x = {};
                  x[t] = b;
                  row[head[i]] = x;
              }
          }); 
        return (data);
        break;
      }

       case FETCH_FUL:{var head = Object.keys(action.payload[0]);
          var len = head.length;
          var data = action.payload;
          var q = [];
          data.map(function(row){
            
             for(var i=1;i<len;i++){
                  if(i == 3)
                  {
                    var urla = row[head[i]];
                    
                    var stockStream$ = rxFetch(urla).json();
                    console.log(stockStream$);
                    var stream2$ = stockStream$.subscribe(response =>{q.push(response["cod"]);});
                        //console.log(i,q);
                        //row[head[i]]= response
                      // stream2$.map((data) => console.log(data.response));
                  }
                  else {
                  var t = head[i];
                  var b = row[head[i]];
                  var x = {};
                  x[t] = b;
                  row[head[i]] = x;
              }
            }
          });
          data.map(function(row){
            console.log(q);
            var b = row['c'];
            var x= {};
            x['c'] = q.pop();
              row['c'] = x;
          })
          console.log(data);
        return (data);
        break;
      }

      case ADD_DATA:{ 
        state = state.concat(action.payload);
        return state;
      }

       case CHECK_INTEGER:
       {
            var row = action.payload.i;
            var column = action.payload.j;
            var head = action.payload.h["h"];
            var data = [...state];
            data[row][head][head] = action.payload.target;
            data[row][head]['color'] = action.payload.color;

              // if(action.payload.color == 'green'){
              //   if(data[row][head]["dep"])
              //       applyF(data[row]["d"]["fx"],data[row][head]["dep"],data,"red" );
              //       console.log(data[row]["d"]["fx"],data[row][head]["dep"],data,"red");
              //  }
          //  console.log(data);
            return data;
      }

      case APPLY_FUN:
       {
           //var data = action.payload.data;
           var i = action.payload.i;
           var op1i = action.payload.op1i;
           var op1j = action.payload.op1j;
           var op2i = action.payload.op2i;
           var op2j = action.payload.op2j;
           var head = action.payload.head;
           var ans = action.payload.ans;
           var color = action.payload.color;
           //console.log(color);
           var data = [...state];
           data[op2i][head[op1j]]["dep"] = i;
           data[op2i][head[op2j]]["dep"] = i;
           data[i]['d'] = {"ans" : ans , "fx": action.payload.a,"color": color};
           var s = [...data];
          //  data[i]['d']["fx"] = action.payload.a;
           //console.log(s);
           return s;
      }
  }

  return state;
}
