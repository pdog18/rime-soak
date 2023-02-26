import React from 'react';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { useSelector } from 'react-redux/es/exports';

import { FloatButton, InputNumber, Row, Slider } from 'antd';
import { PicRightOutlined as InputTypeIcon, DragOutlined, OrderedListOutlined as MenuSizeIcon } from '@ant-design/icons';

import { changePreedit, changeOrientation, changePageSize, saveBasicSetting } from '../../store/BasicSlice'
import type { RootState } from '../../store/store'
import RimeSettingItem, { RadioChoice } from '../../components/RimeSettingItem';

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
      icon={<DragOutlined style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title='候选词方向'>
      <RadioChoice
        values={[true, false]}
        defaultValue={state.horizontal}
        names={['水平排列', '垂直排列']}
        onChange={(value: boolean) => {
          dispatch(changeOrientation(value))
        }} />
    </RimeSettingItem>


    {/*  候选词数量 */}
    <RimeSettingItem
      icon={<MenuSizeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title='候选词数量'>
      <IntegerStep size={state.menu.page_size} onChange={(value: number) => {
        dispatch(changePageSize(value))
      }} />
    </RimeSettingItem>


    {/*  输入字符跟随光标候选面板 */}
    <RimeSettingItem
      icon={<InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title='输入字符'>

      <RadioChoice
        values={[true, false]}
        defaultValue={state.inline_preedit}
        names={['光标处内嵌', '候选词上方']}
        onChange={(value: boolean) => {
          dispatch(changePreedit(value))
        }} />
    </RimeSettingItem>


    <FloatButton
      style={{ display: state.setting_changed ? 'block' : 'none' }}
      type="primary"
      tooltip={<div>Save</div>}
      onClick={() => dispatch(saveBasicSetting())} />

  </div >);
}

export default Basic;