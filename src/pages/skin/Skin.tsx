import React, { useState } from "react"
import { Button, Card, Spin } from "antd"

import { CheckCircleFilled } from "@ant-design/icons"
import { useNavigate } from "react-router-dom"
import useStyleState, { StyleState } from "../../store/StyleStore"

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
  const navigate = useNavigate()
  return (
    <div
      style={{
        height: "90vh",
        overflowY: "scroll",
      }}
    >
      <div
        style={{
          backgroundColor: "#f3f3f3",
          display: "flex",

          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          style={{ width: "120px" }}
          type="primary"
          onClick={() => {
            navigate("custom-skin")
          }}
        >
          去自定义皮肤
        </Button>

        <ImageRadioGroup images={names}></ImageRadioGroup>
      </div>
    </div>
  )
}

interface ImageRadioGroupProps {
  images: string[]
}

const ImageRadioGroup: React.FC<ImageRadioGroupProps> = ({ images }) => {
  const styleState = useStyleState<StyleState>((state) => state)
  const colorScheme = styleState.styleCustom.patch["style/color_scheme"]

  const [loadingState, setLoadingState] = useState(
    names.map((name) => {
      return {
        name: name,
        loading: true,
      }
    })
  )

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
            extra={
              trimStart(image, "color_scheme_") === colorScheme ? (
                <CheckCircleFilled
                  style={{
                    fontSize: "22px",
                    color: "#FFEE33",
                  }}
                />
              ) : (
                <div></div>
              )
            }
            cover={
              <Spin spinning={loadingState.find((entry) => entry.name === image)!.loading}>
                <img
                  src={`${process.env.PUBLIC_URL}/images/${image}.png`}
                  alt={image}
                  onLoad={(e: React.SyntheticEvent) => {
                    setLoadingState((prev) => {
                      const name = (e.target as any)["alt"]
                      prev.find((entry) => entry.name === name)!.loading = false

                      return [...prev]
                    })
                  }}
                  style={{ width: 160, height: 180, objectFit: "contain" }}
                />
              </Spin>
            }
          >
            <input
              type="radio"
              style={{ WebkitAppearance: "none", margin: 0 }}
              name="image"
              value={image}
              checked={colorScheme === image}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                styleState.changeColorScheme(trimStart(e.target.value, "color_scheme_"))
              }}
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
