import { CHECK_ID } from '../actions/validations';
import { CHECK_INDEX } from '../actions/validations';
import { fx_bar } from '../actions/validations';
import { f_bar } from '../actions/validations';
import { APPLY_F } from '../actions/validations';

export default function(state ="", action) {
  switch (action.type) {
    case CHECK_INDEX:
           { switch (action.payload.head["head"]){
                case "index":
                    if (action.payload.id == parseInt(action.payload.id, 10))
                    return {color:'green',borderColor:'3px solid green'};
                    else
                    return {color:'red',borderColor:'3px solid red'};
                    break;
            default: return {color:'green',borderColor:'3px solid green'};
            }
            break;
        }
        
    case CHECK_ID:{
        var data=[];
        data = action.payload.data;
        var head = action.payload.head;
        var value = action.payload.value;
        for(var i=0;i<data[0].length;i++)
        {
            if(data[0][i][head] == value){
                return {color:'red',borderColor:'3px solid red'};
            } 
        }
        return {color:'green',borderColor:'3px solid green'};
        break;
    }

    case APPLY_F: {
        var alpha = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        var s = action.payload.fx;
        var l = action.payload.l;
        if(s[0] != '=' ){
            alert("Not valid, missing =");
        }
        else
        {
            if(alpha.indexOf(s[1]) > l-1 || alpha.indexOf(s[3]) > l-1){
                alert("Invalid operands for calculations");
            }
            else{
                if(s[1]=='+'){
                    
                }
            }
        }
    }
    case fx_bar:
        return action.payload;

    case f_bar:{

    }
        return state;

    defualt: return state;
    
  }
  return state;
}

