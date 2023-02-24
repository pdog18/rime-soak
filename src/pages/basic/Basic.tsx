import React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/exports';

import { InputNumber, Row, Slider, Card, Space } from 'antd';
import { PicRightOutlined as InputTypeIcon, DragOutlined, OrderedListOutlined as MenuSizeIcon } from '@ant-design/icons';


import { changePreedit, changeOrientation, changePageSize } from '../../store/BasicSlice'
import type { RootState } from '../../store/store'
import RimeSettingItem from '../../components/RimeSettingItem';

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
  const state = useSelector((state: RootState) => state.basic)
  const dispatch = useDispatch()

  return (<div style={{
    display: 'flex',
    gap: '16px',
    margin: '4vh 4vw',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  }}>
    <RimeSettingItem
      title='候选栏展示方向'
      values={[true, false]}
      defaultValue={state.horizontal}
      names={['水平排列', '垂直排列']}
      onChange={(value: boolean) => {
        dispatch(changeOrientation(value))
      }} >
      <DragOutlined style={{ fontSize: '24px', margin: '0px 16px' }} />
    </RimeSettingItem>

    {/*  候选词数量 */}
    <Card >
      <Row style={{ width: '60vw' }} justify='space-between'>
        <Space>
          <MenuSizeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />
          候选词数量
        </Space>

        <IntegerStep size={state.menu.page_size} onChange={(value: number) => {
          dispatch(changePageSize(value))
        }} />
      </Row>
    </Card>

    {/*  输入字符跟随光标候选面板 */}
    <RimeSettingItem
      title='输入内容'
      values={[true, false]}
      defaultValue={state.inline_preedit}
      names={['光标处内嵌', '候选词上方']}
      onChange={(value: boolean) => {
        dispatch(changePreedit(value))
      }} >
      <InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />
    </RimeSettingItem>
  </div>);
}

export default Basic;