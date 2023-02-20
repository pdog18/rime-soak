import React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/exports';

import { InputNumber, Row, Radio, Slider, Card, RadioChangeEvent } from 'antd';
import { PicRightOutlined as InputTypeIcon, DragOutlined, OrderedListOutlined as MenuSizeIcon } from '@ant-design/icons';


import { WrapType, changePreedit, changeOrientation, changePageSize } from '../../store/BasicSlice'

const IntegerStep = (props: any) => {
  const page_size = props.size
  const onChange = props.onChange

  return (<Row>
    <Slider
      style={{ width: '20vw' }}
      min={4}
      max={9}
      onChange={onChange}
      value={typeof page_size === 'number' ? page_size : 0}
    />

    <InputNumber
      min={4}
      max={9}
      style={{
        marginLeft: '16px',
        padding: '0px',
        width: '50px'
      }}
      value={page_size}
      onChange={onChange}
    />
  </Row>);
};


const Basic: React.FC = () => {
  const state = useSelector((state: WrapType) => state.basic)
  const dispatch = useDispatch()

  const onOrientationChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(changeOrientation(value))
  };

  const onPreeditChange = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(changePreedit(value))
  };

  const onSliderChange = (value: number) => {
    dispatch(changePageSize(value))
  };

  return (<div style={{
    display: 'flex',
    gap: '16px',
    margin: '4vh 4vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    {/*  候选栏展示方向设置 */}
    <Card  >
      <Row style={{ width: '60vw' }} justify='space-between'>
        <div><DragOutlined style={{ fontSize: '24px', margin: '0px 16px' }} />候选栏展示方向</div>

        <Radio.Group defaultValue={state.horizontal} buttonStyle="solid" onChange={onOrientationChange}  >
          <Radio.Button value={true}>水平排列</Radio.Button>
          <Radio.Button value={false}>垂直排列</Radio.Button>
        </Radio.Group>
      </Row>
    </Card>

    {/*  候选词数量 */}
    <Card >
      <Row style={{ width: '60vw' }} justify='space-between'>
        <div><MenuSizeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />候选词数量</div>

        <IntegerStep size={state.menu.page_size} onChange={onSliderChange} />
      </Row>
    </Card>

    {/*  输入字符跟随光标候选面板 */}
    <Card  >
      <Row style={{ width: '60vw' }} justify='space-between'>
        <div><InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />输入内容 </div>

        <Radio.Group defaultValue={state.inline_preedit} buttonStyle="solid" onChange={onPreeditChange}  >
          <Radio.Button value={true}>光标处内嵌</Radio.Button>
          <Radio.Button value={false}>候选词上方</Radio.Button>
        </Radio.Group>
      </Row>
    </Card>
  </div>);
}

export default Basic;