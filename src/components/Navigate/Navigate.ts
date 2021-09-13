import {useIonRouter} from '@ionic/react'

const router = useIonRouter()
const dynamicNavigate = (path: string, direction: string | undefined) => {
    const action = direction === "forward" ? "push" : "pop";
    // router.push(path, direction, action)
    
}