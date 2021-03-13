


export default function Login (props, state)  {

const login = event => { 
    event.preventDefault();
        alert( event.target.username.value)
        alert( event.target.password.value)
}
    // return (
    //     <form onSubmit={login}>
    //         <label>Username</label>
    //         <input type="text" id="username" ></input>
    //         <br></br>
    //         <label>Password</label>
    //         <input type="password" id="password" ></input>
    //         <br></br>
    //         <input type="submit" />
    //
    //     </form>
    //
    //
    //
    //
    //
    // )


    return (
        <div>
        <form>
            <div className="mb-4">
                <label className="block text-md font-light mb-2" >Username</label>
                <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="" placeholder="Username" />
            </div>
            <div className="mb-4">
                <label className="block text-md font-light mb-2" >Password</label>
                <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="Password" />
            </div>

            <div className="flex items-center justify-between mb-5">
                <button className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="button">
                    LOGIN
                </button>
                <a className="inline-block align-baseline font-light text-sm text-indigo-600 hover:text-indigo-500" href="#">
                    Forgot Password?
                </a>
            </div>
            <p className="text-center text-md font-light">Don't have an account? <a className="font-light text-md text-indigo-600">Create</a></p>
        </form>
        </div>
    );
}