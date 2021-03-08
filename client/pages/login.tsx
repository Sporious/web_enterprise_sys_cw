


export default function Login (props, state)  {

const login = event => { 
    event.preventDefault();
        alert( event.target.username.value)
        alert( event.target.password.value)
}
    return ( 
        <form onSubmit={login}> 
            <label>Username</label>
            <input type="text" id="username" ></input>
            <br></br>
            <label>Password</label>
            <input type="password" id="password" ></input>
            <br></br>


            <input type="submit" /> 
            
        </form>
    )
}