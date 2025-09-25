import Tabs from "../components/Tabs"

const Policies=async({params})=>{
const {url}=await params
    return (
        <Tabs url={url}/>
    )
}
export default Policies