import React, {useState} from "react";
import './App.css';
import Header from './components/Header.js' 

// mmongodb+srv://Assi:<Assi>@server-mhlgh.azure.mongodb.net/test?retryWrites=true&w=majority
function Todo({item, index, completeTodo, removeItem, updateFrequency}) {
    return (
        <div >
            <div className="d-flex justify-content-center" style={{textDecoration: item.isCompleted ? 'line-through' : ''}}>
                {item.title}
            </div>
            <div>
            <button onClick= {() => completeTodo(index)} type="button" className="btn btn-success"> Complete </button>
            <button onClick= {() =>{updateFrequency(index) 
            removeItem(index)}} type="button" className="btn btn-danger"> x </button>
            </div>
        </div>
    )
}

function ItemList ({addTodo}) {
    const [value, setValue] = useState ('');
    const handleSubmit = e => {
        e.preventDefault();
        if(!value) return;
        addTodo(value);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            
            <input id="input" type="text" 
                className="input" 
                placeholder="Legg til vare.."
                value={value} 
                onChange={e => setValue(e.target.value)}>
            </input>
            
            <button onClick={handleSubmit} type="button" className="btn btn-primary">Legg til</button>
        </form>
    )
}


function App () {


    const [item, changelist] = useState([
        {
            title: 'Brokkoli',
            isCompleted: false,
            frequency: 1
        },
        {
            title: 'Brød',
            isCompleted: false,
            frequency: 1
        },
        {
            title: 'Peanøttsmør',
            isCompleted: false,
            frequency: 1
        }
    ]);

    const [delitem, changedellist] = useState([
        {
            title: "this has been deleted",
            isCompleted: false,
            frequency: 1
        }
    ])

    const addTodo = title => {
        const newList = [...item,{title}];
        changelist(newList);
        
    };

    const completeTodo = index => {
        const newList = [...item];
        newList[index].isCompleted = true;
        changelist(newList);
    }

    const removeItem = index => {
        const newList = [...item];
        newList.splice(index, 1);
        changelist(newList);

    }

    const updateFrequency = index => {
        const newList = [...item];
        newList[index].frequency = newList[index].frequency + 1;
        changelist(newList);
    } 

    const clearList = index => {
        const newList  = [...item];
        newList.splice(0,1000);
        changelist(newList);
    }

    return (
        <div className="app">
            <Header />
            <button onClick={() => clearList()} type="button" className="btn btn-danger">Tøm listen </button>
            <ItemList addTodo={addTodo} />
            <div className="todo-list">
                {item.map((item, index) => (<Todo key={index} index={index} item={item} 
                completeTodo={completeTodo}
                removeItem={removeItem}
                updateFrequency={updateFrequency}
                /> 
                ))}
                
               
            </div>
        </div>
    )
}
export default App;