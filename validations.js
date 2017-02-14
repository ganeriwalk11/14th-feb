import { Observable } from 'rxjs/Observable';


export const CHECK_ID = 'CHECK_ID';
export const CHECK_INDEX = 'CHECK_INDEX';
export const APPLY_F = 'APPLY_F';
export const fx_bar = 'fx_bar';

export function checkIndexAction(id,head,color) {
  return {
    type: CHECK_INDEX,
    payload:{
        id: id,
        head: head,
        color:color
    } 
  };
}

export function checkIDAction(data,head,value,color) {
  return {
    type: CHECK_ID,
    payload:{
        data: data,
        head: head,
        value: value,
        color:color
    } 
  };
}

export function applyF (fx,l){
  return {
    type: APPLY_F,
    payload:{
        fx:fx,
        l:l
    } 
  };
}

export function inputEdit(value) {
  return {
    type: fx_bar,
    payload: value 
  };
}

export function fbar(value) {
  return {
    type: f_bar,
    payload: value 
  };
}


export const inputEditEpic = action$ =>
  action$.ofType(fx_bar)
    // .subscribe(action =>
    //   Observable.of(action.payload)
    //     .subscribe(value => connsole.log(value))
    .mergeMap(action =>
        Observable.of(action.payload)
        .map(value => fbar(value))
    );
