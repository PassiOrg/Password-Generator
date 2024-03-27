
// Password Generator project

import { useRef } from "react"
import { useEffect, useCallback } from "react"
import { useState } from "react"

const App = () => {

    // #1 useState hook
     const [length, setLength] = useState(8)
     const [numberAllowed, setNumberAllowed] = useState(false)
     const [charAllowed, setCharAllowed] = useState( false)
    const [password, setPassword] = useState("")


    // #4 useRef hook
    const passwordRef = useRef(null)

    // #2 useCallback hook
    const PasswordGenerator = useCallback(() => {
        let pass = ""
        let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

        if(numberAllowed) str +=  "0123456789"
        if(charAllowed) str += "!@#$%^&*("

        for (let i = 1; i < length; i++) {
            let char = Math.floor(Math.random() * str.length + 1)

        pass += str.charAt(char)
}

        setPassword(pass)

    }, [length, numberAllowed, charAllowed, setPassword])

    const copyPasswordToClipboard = useCallback(() => {
        passwordRef.current?.select()
        passwordRef.current?.setSelectionRange(0, 14)
        window.navigator.clipboard.writeText(password)
    }, [password])

    useEffect(() => {
         PasswordGenerator()
    },[length, numberAllowed, charAllowed, PasswordGenerator])

return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-md text-center">Password Generator
        <div>
          <input type="text" value={password} className="text-center" placeholder="Enter your password" readOnly ref={passwordRef}/>
          <button onClick={copyPasswordToClipboard} className="bg-white-300 hover:bg-sky-200">Copy</button>
        </div>

        <div className="flex">
            <div className="flex items-center gap-x-1">
                <input type="range" min={8} max={14} value={length} className="cursor-pointer" onChange={(e) => {setLength(e.target.value)}}/>
                <label>Length: {length}</label>
            </div>

            <div className="flex items-center gap-x-1">
                <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={() => {setNumberAllowed((prev) => !prev)}}/>
                Numbers
            </div>

            <div className="flex items-center gap-x-1">
                <input type="checkbox" defaultChecked={charAllowed} id="charInput" onChange={() => {setCharAllowed((prev) => !prev)}} />
                Characters
            </div>
        </div>
      </div>
    </>
  )
}

export default App



 


 