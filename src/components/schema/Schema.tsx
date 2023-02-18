import React, { useState } from 'react';
import { Card, RadioChangeEvent, Row,Radio } from 'antd';
import { Options } from '../Options';
import { ClusterOutlined as InputTypeIcon, RetweetOutlined as SimpIcon } from '@ant-design/icons';

const simpOptions: Array<Options> = [
  new Options('简体', '简体'),
  new Options('繁体', '繁体'),
];

const inputTypeOptions: Array<Options> = [
  new Options('拼音', '拼音'),
  new Options('双拼', '双拼'),
  new Options('五笔', '五笔'),
];


const Schema: React.FC = () => {
  const [value2, setValue2] = useState(simpOptions[0].value);
  const [value3, setValue3] = useState(inputTypeOptions[0].value);

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };
  {/* 拼音 / 双拼 / 五笔 */ }

  {/* 繁体 / 简体 */ }

  {/* 具体方案 */ }

  {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */ }

  return (

    <div style={{ margin: '4vh 4vw', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '16px' }}>
      <Card  >
        {/* <div style={{ height: '20px' }}></div> */}
        <Row style={{ width: '60vw' }} justify='space-between'>
          <div><SimpIcon style={{ fontSize: '24px', margin: '0px 16px' }} />简体/繁体</div>
          <Radio.Group options={simpOptions} onChange={onChange2} value={value2} optionType="button" />
        </Row>
      </Card>
      <Card  >
        <Row align='middle' style={{ width: '60vw' }} justify='space-between'>
          <div><InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />输入模式</div>
          <Radio.Group options={inputTypeOptions} onChange={onChange3} value={value3} optionType="button" />
        </Row>

      </Card>
      <div>当前方案</div>

      <div>更多方案</div>
    </div>
  );
}

export default Schema;



