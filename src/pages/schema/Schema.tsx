import React from 'react';
import { ClusterOutlined as InputTypeIcon, RetweetOutlined as SimpIcon } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputMode, changeSimplified } from '../../store/SchemaSlice';
import { RootState } from '../../store/store';
import RimeSettingItem, { RadioChoice } from '../../components/RimeSettingItem';

const Schema: React.FC = () => {
  const schema = useSelector((state: RootState) => state.schema)
  const dispatch = useDispatch()

  return (<div style={{
    margin: '4vh 4vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px'
  }}>

    <RimeSettingItem
      icon={<SimpIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title="简体/繁体">
      <RadioChoice
        values={[true, false]}
        defaultValue={schema.simplified}
        names={['简体', '繁体']}
        onChange={(value: boolean) => {
          dispatch(changeSimplified(value))
        }} />
    </RimeSettingItem>

    <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title='输入模式'>
      <RadioChoice
        values={['pinyin', 'double_pinyin', 'wubi']}
        defaultValue={schema.inputMode}
        names={['拼音', '双拼', '五笔']}
        onChange={(value: string) => {
          dispatch(changeInputMode(value))
        }} />
    </RimeSettingItem>


    {/* 具体方案 */}
    <div>当前方案</div>

    {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
    <div>更多方案</div>
  </div >);
}


export default Schema;