import React from "react";

// These are props that Field will pass to your wrapped component.
// The props provided by redux-form are divided into input and meta objects.
// {...input} equals to onBlur={input.onBlur} onChange={input.onChange}..
// reduxForm records those event handlers automatically for us!!!!!
export default ({input, label, meta:{error, touched}})=> {
    // console.log('props from redux form', {...input});


    return (
        <div>
            <label>{label}</label>
            <input {...input} style={{marginBottom:'5px'}}/>
            <div className='red-text' style={{marginBottom:'20px'}}>{touched && error}</div>
        </div>

    )
}



// The above equals to:
// export default (props)=> {
//     console.log('props from redux form', {...props.input});
//     return(
//         <div>
//             <label>{props.label}</label>
//             <input {...props.input} />
//         </div>

//     )
// }