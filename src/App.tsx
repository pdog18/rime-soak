import { Tabs } from 'antd';

import Basic from './pages/basic/Basic';
import Skin from './pages/skin/Skin';
import Punctuation from './pages/punctuation/Punctuation';
import Schema from './pages/schema/Schema';

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

const App: React.FC = () => (
  <Provider store={store}>
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
  </Provider>
);

export default App;