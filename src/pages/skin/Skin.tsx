import React from "react"
import { Radio } from "antd"
// import color_scheme_android from "./images/color_scheme_android.png"
// import color_scheme_aqua from "./images/color_scheme_aqua.png"
// import color_scheme_azure from "./images/color_scheme_azure.png"
// import color_scheme_brasil from "./images/color_scheme_brasil.png"
// import color_scheme_brisk from "./images/color_scheme_brisk.png"
// import color_scheme_cool_breeze from "./images/color_scheme_cool_breeze.png"
// import color_scheme_dark_temple from "./images/color_scheme_dark_temple.png"
// import color_scheme_doraemon from "./images/color_scheme_doraemon.png"
// import color_scheme_dota_2 from "./images/color_scheme_dota_2.png"
// import color_scheme_espagna from "./images/color_scheme_espagna.png"
// import color_scheme_flypy from "./images/color_scheme_flypy.png"
// import color_scheme_gholabok from "./images/color_scheme_gholabok.png"
// import color_scheme_google from "./images/color_scheme_google.png"
// import color_scheme_google_plus from "./images/color_scheme_google_plus.png"
// import color_scheme_ink from "./images/color_scheme_ink.png"
// import color_scheme_kuma_shuzboz from "./images/color_scheme_kuma_shuzboz.png"
// import color_scheme_kuon from "./images/color_scheme_kuon.png"
// import color_scheme_lost_temple from "./images/color_scheme_lost_temple.png"
// import color_scheme_luna from "./images/color_scheme_luna.png"
// import color_scheme_macau from "./images/color_scheme_macau.png"
// import color_scheme_metroblue from "./images/color_scheme_metroblue.png"
// import color_scheme_modern_warfare from "./images/color_scheme_modern_warfare.png"
// import color_scheme_nba from "./images/color_scheme_nba.png"
// import color_scheme_psionics from "./images/color_scheme_psionics.png"
// import color_scheme_skype from "./images/color_scheme_skype.png"
// import color_scheme_smurfs from "./images/color_scheme_smurfs.png"
// import color_scheme_ps4 from "./images/color_scheme_ps4.png"
// import color_scheme_so_young from "./images/color_scheme_so_young.png"
// import color_scheme_solarized_rock from "./images/color_scheme_solarized_rock.png"
// import color_scheme_starcraft from "./images/color_scheme_starcraft.png"
// import color_scheme_starcraft_ii from "./images/color_scheme_starcraft_ii.png"
// import color_scheme_steam from "./images/color_scheme_steam.png"
// import color_scheme_tintin from "./images/color_scheme_tintin.png"
// import color_scheme_wii from "./images/color_scheme_wii.png"
// import color_scheme_xbox_silver from "./images/color_scheme_xbox_silver.png"
// import color_scheme_youtube from "./images/color_scheme_youtube.png"

//<Image preview={false} src="/color_scheme_android.png" width={"30vw"} />
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

// const options = names.map((name) => {
//   return {
//     label: <Image src={`./images/${name}.png`}></Image>,
//     value: { name },
//     alt: { name },
//   }
// })

const Skin: React.FC = () => {
  const options = names.map((name) => {
    const imageUrl = `https://raw.githubusercontent.com/pdog18/soak/main/public/images/${name}.png`
    return {
      label: <img src={imageUrl} alt={name} style={{ width: "240px", height: "320px", objectFit: "cover" }}></img>,
      value: name,
    }
  })

  return (
    <div style={{ height: "80vh" }}>
      <Radio.Group options={options} />
    </div>
  )
}

export default Skin