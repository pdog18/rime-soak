import React from "react"

interface CustomSkinContextValue {
  animationColorName: string
  changeAnimationColorName: (value: string) => void
}

const CustomSkinContext = React.createContext<CustomSkinContextValue>({
  animationColorName: "",
  changeAnimationColorName: () => {},
})

export default CustomSkinContext
