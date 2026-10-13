import { useContext } from "react";
import { Authcontext } from "./AuthContext";

function useAuth(){
    return useContext(Authcontext)
}
export default useAuth