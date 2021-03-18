import Link from "next/link"
import { useRouter } from "next/router";



export default function Login(props, state) {

    const router = useRouter();
    const login = async event => {
        event.preventDefault();
        alert(event.target.username.value)
        alert(event.target.password.value);

        try {
            const response = await fetch("/auth/login", {
                body: JSON.stringify({ username: event.target.username.value, password: event.target.password.value }),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }


            })

            const r = await response.json();
            window.localStorage.setItem("username", r.username);
            window.localStorage.setItem("token", r.token);
            alert ( localStorage.getItem("username" ) + " "  + localStorage.getItem("token"));
            router.push("/")

        } catch (e) {


            console.log(e);
        }


        ;


    }

    return (
        <div>
            <form className="item-center p-5" onSubmit={login}>
                <div className="mb-4">
                    <label className="block text-md font-light mb-2" >Username</label>
                    <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="text" name="username" id="" placeholder="Username" />
                </div>
                <div className="mb-4">
                    <label className="block text-md font-light mb-2" >Password</label>
                    <input className="w-full bg-drabya-gray border-gray-500 appearance-none border p-4 font-light leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" id="" placeholder="Password" />
                </div>

                <div className="flex items-center justify-between mb-5">
                    <button className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="submit">
                        Login
                </button>
                </div>
                <div className="text-center text-md">

                </div>
                <p className="font-light">Don't have an account?</p>
                <Link href={"/register"}>
                    <button className="bg-indigo-600 hover:bg-blue-700 text-white font-light py-2 px-6 rounded focus:outline-none focus:shadow-outline" type="button">
                        Create
                </button>
                </Link>
            </form>
        </div>
    );
}