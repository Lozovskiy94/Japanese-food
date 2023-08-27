import PromoText from "./PromoText"
import MealList from "./MealList"
import React from "react"

const Meals = () => {
    return <React.Fragment>
        <PromoText/>
        <main>
            <MealList/>
        </main>   
    </React.Fragment>
}

export default Meals