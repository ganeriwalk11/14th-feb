import axios from 'axios';
import Rx from 'rxjs';
//import { ajax } from 'rxjs/observable/dom/ajax';
//import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/dom/ajax';

export const FETCH_DATA = 'FETCH_DATA';
export const FETCH_FUL = 'FETCH_USER_FULFILLED';
export const FETCH_FULL = 'FETCH_USER_F';
export const FETCH_STOCK = 'FETCH_STOCK';
export const ADD_DATA = 'ADD_DATA';
export const CHECK_INTEGER = 'CHECK_INTEGER';
export const APPLY_FORMULA = 'APPLY_FORMULA';
export const APPLY_FUN = 'APPLY_FUN';
import { Observable } from 'rxjs/Observable';
const url = 'src/jsonData/mainData.json';

export const fetchUserEpic = action$ =>
  action$.ofType(FETCH_DATA)
    .mergeMap(action =>
      Observable.ajax.getJSON(url)
        .map(response => fetchUserFulfilled(response))
    );

  // export const ObjectEpic = action$ =>
  // action$.ofType(FETCH_FUL)
  //   .mergeMap(action =>
  //     ajax.getJSON(url)
  //       .map(response => fetchUserFulfilled(response))
  //   );

// export const fetchStockEpic = action$ =>
//   action$.ofType(FETCH_FUL)
//     .mergeMap((action) =>
//             //for(var i=0;i<3;i++){
//               Observable.ajax.getJSON(action.payload[2]["c"])
//               .map(response => fetchUserF(response))
//             //}
//           //   action.payload.map((row,i) =>
//           //  Observable.ajax.getJSON(row["c"])
              
//           //   )}
//         // x.subscribe(value => data[1]["c"]["c"] = (value))    //  data.map((row,i) =>{
//         //  ajax.get(row["c"]["c"])
//         //  .map(response => response.json()
//         //  .subscibe(resp => data[i]["c"]["c"] = resp));
//     );
    //  console.log(data);
    //  return fetchUserF(data); 
    // );



export const fetchUserFulfilled = payload => ({ type: FETCH_FUL, payload });
export const fetchUserF = payload => ({ type: FETCH_FULL, payload });

//export const fetchStockValue = a;

export function fetchData() {
  return {
    type: FETCH_DATA
  }
};

 
export function postData(data) {
  console.log(data);
  //const url = 'src/jsonData/mainData.json';
  const request = axios.post(url,data);
  return ;
  //    return {
  //   type: FETCH_DATA,
  //   payload: request
  // }

 
};

export function addData(add) {
 var addRow = add;
 return {
    type: ADD_DATA,
    payload: addRow
  };
};

export function checkIntegerAction(i,j,h,data,a) 
{
  var a = a;
  var data = data;
  var color;     
  if(a == parseInt(a, 10))
  {
    color = 'green';
    var head  = h["h"];
  }
  else
  {
    color = 'red';
  }  
  return {
    type: CHECK_INTEGER,
    payload: {
      i:i,
      j:j,
      h:h,
      color: color,
      target:a
    }
  }
};

// export const applyFunctionEpic = action$ =>
//   action$.ofType(APPLY_FORMULA)
//     .map(function(action)
//       {
//         let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
//         var a = action.payload.a;
//         var i = action.payload.i;
//         var data = action.payload.data;
//         var head = Object.keys(data[0]);
//         var len = head.length;
//         var op1i = a[3] - 1;
//         var op2i = a[6] - 1;
//         var op1j = alpha.indexOf(a[2]) +1;
//         var op2j = alpha.indexOf(a[5]) +1;
//         var operator = a[4];
//         var ans;
//         if(operator == '+'){
//           ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) + parseInt(data[op2i][head[op2j]][head[op2j]],10);
//         }
//         else{
//           ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) - parseInt(data[op2i][head[op2j]][head[op2j]],10);
//         }
//         var color = action.payload.color;
//         var response = {
//           op1i: op1i,
//           op1j:op1j,
//           op2i: op2i,
//           op2j:op2j,
//           ans: ans,
//           data:data,
//           head,head,
//           i:i,
//           a:a,
//           color:color
//         };
//         return applyFunc(response);
//       });
//       // .subscribe(function(data){applyFunc(data);});
      

export function applyFunc(response) 
{
  return {
    type: APPLY_FUNC,
    payload : response
  }
};


export function applyF(a,i,data,color) 
{
  var a = a;
  var data = data;
  let alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var i = i;
        var head = Object.keys(data[0]);
        var len = head.length;
        var op1i = a[3] - 1;
        var op2i = a[6] - 1;
        var op1j = alpha.indexOf(a[2]) +1;
        var op2j = alpha.indexOf(a[5]) +1;
        var operator = a[4];
        var ans;

        if(operator == '+'){
          ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) + parseInt(data[op2i][head[op2j]][head[op2j]],10);
        }
        else{
          ans = parseInt(data[op1i][head[op1j]][head[op1j]],10) - parseInt(data[op2i][head[op2j]][head[op2j]],10);
        }
        var color = color;
        var response = {
          op1i: op1i,
          op1j:op1j,
          op2i: op2i,
          op2j:op2j,
          ans: ans,
          data:data,
          head,head,
          i:i,
          a:a,
          color:color
        };
        return {type:APPLY_FUN,payload:response};
  // return {
  //   type: APPLY_FORMULA,
  //   payload: {
  //     a:a,
  //     i:i,
  //     data:data,
  //     color:color
  //   }
  // }
};