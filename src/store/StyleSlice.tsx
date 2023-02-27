import { createSlice } from '@reduxjs/toolkit'
import { stringify } from 'yaml'

const rimeCustom = {
  style: {
    customization: {
      distribution_code_name: 'Weasel',
      distribution_version: '0.14.3_dev_0.8',
      generator: "Rime::SwitcherSettings",
      modified_time: "Mon Jan 30 22:32:13 2023",
      rime_version: '1.7.3',
    },
    patch: {
      style: {
        horizontal: false,
        inline_preedit: false
      },
      preset_color_schemes: {

      }
    }
  },
  basic_setting_changed: false
}

const rimeSlice = createSlice({
  name: 'rime',
  initialState: rimeCustom,
  reducers: {
    changeOrientation: (state, actions) => {
      state.style.patch.style.horizontal = actions.payload
      state.basic_setting_changed = true
    },
    changePreedit: (state, actions) => {
      state.style.patch.style.inline_preedit = actions.payload
      state.basic_setting_changed = true
    },
    saveBasicSetting: (state) => {
      console.log('basic');
      generateRimeCustomYAML(state.style)
    },
  }
})

export function generateRimeCustomYAML(rime: typeof rimeCustom.style) {
  rime.customization.modified_time = new Date().toLocaleString()
  console.log(stringify(rime));
}

export const { changeOrientation, changePreedit, saveBasicSetting } = rimeSlice.actions;
export default rimeSlice;