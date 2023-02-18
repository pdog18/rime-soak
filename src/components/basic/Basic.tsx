import React, { useState } from 'react';
import { Card, RadioChangeEvent } from 'antd';
import { Options } from '../Options';
import { InputNumber, Row, Radio, Slider } from 'antd';
import { PicRightOutlined  as InputTypeIcon, DragOutlined, OrderedListOutlined as MenuSizeIcon } from '@ant-design/icons';


const caniOptions: Array<Options> = [
  new Options('水平排列', '水平'),
  new Options('垂直排列', '垂直'),
];

const inlineOptions: Array<Options> = [
  new Options('光标处内嵌', 'inline'),
  new Options('候选词上方', '面板'),
];

const IntegerStep = () => {
  const [inputValue, setInputValue] = useState(5);
  const onChange = (newValue: any) => {
    setInputValue(newValue);
  };
  return (

    <Row>
      <Slider
        style={{ width: '20vw' }}
        min={4}
        max={9}
        onChange={onChange}
        value={typeof inputValue === 'number' ? inputValue : 0}
      />

      <InputNumber
        min={4}
        max={9}
        style={{
          marginLeft: '16px',
          padding: '0px',
          width: '50px'
        }}
        value={inputValue}
        onChange={onChange}
      />
    </Row>

  );
};


const Basic: React.FC = () => {

  const [value2, setValue2] = useState(caniOptions[0].value);
  const [value3, setValue3] = useState(inlineOptions[0].value);

  const onChange2 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio2 checked', value);
    setValue2(value);
  };

  const onChange3 = ({ target: { value } }: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setValue3(value);
  };


  return (

    <div style={{ display: 'flex', gap: '16px', margin: '4vh 4vw', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      {/*  候选栏展示方向设置 */}

      <Card  >
        <Row style={{ width: '60vw' }} justify='space-between'>
          <div><DragOutlined style={{ fontSize: '24px', margin: '0px 16px' }} />候选栏展示方向</div>

          <Radio.Group options={caniOptions} onChange={onChange2} value={value2} optionType="button" />
        </Row>
      </Card>

      {/*  候选词数量 */}
      <Card >
        <Row style={{ width: '60vw' }} justify='space-between'>
          <div><MenuSizeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />候选词数量</div>

          <IntegerStep />
        </Row>
      </Card>

      {/*  输入字符跟随光标候选面板 */}
      <Card  >
        <Row style={{ width: '60vw' }} justify='space-between'>
          <div><InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />输入内容 </div>

          <Radio.Group options={inlineOptions} onChange={onChange3} value={value3} optionType="button" />
        </Row>
      </Card>
    </div>

  );
}

export default Basic;





