
import Link from "next/link";
import { useRouter } from "next/router"
import { useRef } from "react";
export default function Register(props, state) {
    const router = useRouter();
    const register = async event => {
        event.preventDefault();
        const response = await fetch('/auth/create',
            {
                body: JSON.stringify({ username: event.target.username.value, password: event.target.password.value }),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            })

            .then(r => r.json())
            .catch(e => {
                console.log("create user error");
                console.log(e);
            });

        console.log(response);
        localStorage.setItem("username", response.username);
        localStorage.setItem("token", response.token);
      window.localStorage.setItem("privilege", response.privilege);
            router.push("/")
      
        
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
            <form onSubmit={register} >
                <div className="mb-4">
                    <label className="block text-md font-light mb-2" >Username</label>
                    <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="username" placeholder="Username" />
                </div>
                <div className="mb-4">
                    <label className="block text-md font-light mb-2" >Password</label>
                    <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="password" placeholder="Password" />
                </div>

                <div className="mb-4">
                    <label className="block text-md font-light mb-2" >Password confirm</label>
                    <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="passwordConfirm" placeholder="Password" />
                </div>



                <div className="flex items-center justify-between mb-5">
                    <button className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Confirm
                </button>

                </div>
            </form>
        </div>
    );
}