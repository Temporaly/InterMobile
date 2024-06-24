import {useState} from 'react'
import {client} from '../src/supabase/client'

function Login()
{
    const [email,setEmail] = useState("");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try{
            const result = await client.auth.signIn({
                email,
            })
            console.log(result)
        }
        catch(error){
            console.log(error)
        }
    }

    return(
        <div>
            <form onSubmit={handleSubmit}>
                <input type="email" name="email" placeholder="yourmail@site.com" onChange={(e) => setEmail(e.target.value)}/>
                <button>
                    Send
                </button>
            </form>
        </div>
    )
}
export default Login