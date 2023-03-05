import React, { useState } from "react"
import { Card } from "antd"
import { useDispatch, useSelector } from "react-redux"
import { changeColorScheme } from "../../store/StyleSlice"
import { RootState } from "../../store/Store"

const names = [
  "color_scheme_android",
  "color_scheme_aqua",
  "color_scheme_azure",
  "color_scheme_brasil",
  "color_scheme_brisk",
  "color_scheme_cool_breeze",
  "color_scheme_dark_temple",
  "color_scheme_doraemon",
  "color_scheme_dota_2",
  "color_scheme_espagna",
  "color_scheme_flypy",
  "color_scheme_gholabok",
  "color_scheme_google",
  "color_scheme_google_plus",
  "color_scheme_ink",
  "color_scheme_kuma_shuzboz",
  "color_scheme_kuon",
  "color_scheme_lost_temple",
  "color_scheme_luna",
  "color_scheme_macau",
  "color_scheme_metroblue",
  "color_scheme_modern_warfare",
  "color_scheme_nba",
  "color_scheme_psionics",
  "color_scheme_skype",
  "color_scheme_smurfs",
  "color_scheme_ps4",
  "color_scheme_so_young",
  "color_scheme_solarized_rock",
  "color_scheme_starcraft",
  "color_scheme_starcraft_ii",
  "color_scheme_steam",
  "color_scheme_tintin",
  "color_scheme_wii",
  "color_scheme_xbox_silver",
  "color_scheme_youtube",
]

const Skin: React.FC = () => {
  return (
    <div
      style={{
        backgroundColor: "#f3f3f3",
      }}
    >
      <ImageRadioGroup images={names}></ImageRadioGroup>
    </div>
  )
}

interface ImageRadioGroupProps {
  images: string[]
}

const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({ images }) => {
  const colorScheme = useSelector((state: RootState) => state.rimeCustom.style.patch["style/color_scheme"])
  console.log("colorScheme", colorScheme)

  // const [selectedImage, setSelectedImage] = useState<string>(colorScheme)
  const dispatch = useDispatch()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setSelectedImage(e.target.value)
    dispatch(changeColorScheme(trimStart(e.target.value, "color_scheme_")))
  }

  return (
    <div
      style={{
        width: "80vw",
        margin: "0 auto",
        paddingTop: "16px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      {images.map((image: string) => (
        <label key={image}>
          <Card
            hoverable
            title={trimStart(image, "color_scheme_")}
            size="small"
            bordered
            style={{
              backgroundColor: `${trimStart(image, "color_scheme_") === colorScheme ? "#FF5733" : "white"}`,
              padding: "2px",
            }}
            cover={
              <img
                src={`${process.env.PUBLIC_URL}/images/${image}.png`}
                alt={image}
                style={{ width: 160, height: 180, objectFit: "contain" }}
              />
            }
          >
            <input
              type="radio"
              style={{ WebkitAppearance: "none", margin: 0 }}
              name="image"
              value={image}
              checked={colorScheme === image}
              onChange={handleImageChange}
            />
          </Card>
        </label>
      ))}
    </div>
  )
}

const trimStart = (content: string, start: string) => {
  return content.startsWith(start) ? content.substring(start.length) : content
}

export default Skin
