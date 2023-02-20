import React, { createContext, SetStateAction, useState } from 'react';
import { Tabs } from 'antd'; 

import Basic from './components/basic/Basic';
import Skin from './components/skin/Skin';
import Punctuation from './components/punctuation/Punctuation';
import Schema from './components/schema/Schema';

import punctu_json from './components/punctuation.json'
import { Provider } from 'react-redux';
import store from './store/store';

const labels: Array<String> = [
  '方案选择',
  '基本设置',
  '皮肤调整',
  '符号配置'
]

const children = [
  <Schema />,
  <Basic />,
  <Skin />,
  <Punctuation />,
]


const AllConfigContext = createContext(
  {
    basic: {
      style: {

      }
    },
    setBasic: (basic: any) => { },

    schema: {
      style: {

      }
    }
    ,
    setSchema: (value: any) => { },

    punctuation: {
      full_shape: {},
      half_shape: {},
      ascii_style: {}
    },
    setPunctuation: (punctuation: any) => { },
  }
)

const App: React.FC = () => {
  const [basic, setBasic] = useState({
    style: {

    }
  })
  const [schema, setSchema] = useState({
    style: {

    }
  })
  const [punctuation, setPunctuation] = useState(punctu_json)

  const changePuncuation = (item: any) => {
    setPunctuation((perv) => {
      console.log('item = ', item, ' setPunctuation  perv  ==>>>>', perv);

      const newState = { ...perv } as any
      newState[item.type][item.key] = item.newValue

      console.log(item.newValue, 'newValue');

      // todo 在这里根据 newValue 维护一个标点符号的 patch
      return newState
    })
  }


  return (
    <Provider store={store}>
      <AllConfigContext.Provider value={{ basic, setBasic, schema, setSchema, punctuation, setPunctuation: changePuncuation }}>
        <div>
          <Tabs
            centered={true}
            style={{ height: '100vh', backgroundColor: '#f3f3f3' }}

            items={labels.map((_, i) => {
              const id = String(i);
              return {
                label: `${labels[i]}`,
                key: id,
                children: children[i],
                disabled: i == 2,
              };
            })}
          />

          {/*  todo 合适的情况下才会出现 */}
          {/* <FloatButton  icon={<UndoOutlined />} type="primary" style={{ right: 94 }} tooltip={<div>Reset</div>} /> */}
          {/*  todo 有配置项改变时，这个按钮才会出现 */}
          {/* <FloatButton type="primary" tooltip={<div>Save</div>} /> */}

        </div>

      </AllConfigContext.Provider>
    </Provider>
  );
};


export default App;

export { AllConfigContext }