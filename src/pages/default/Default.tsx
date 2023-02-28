import React, { useEffect } from 'react';
import { ClusterOutlined as InputTypeIcon, RetweetOutlined as SimpIcon, OrderedListOutlined as MenuSizeIcon } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputMode, changeSimplified, handleDefaultDrop, saveDefaultSetting, saveDefaultCustomFileHandle } from '../../store/DefaultSlice';
import { RootState } from '../../store/Store';
import RimeSettingItem, { RadioChoice } from '../../components/RimeSettingItem';
import { FloatButton, InputNumber, Row, Slider } from 'antd';

import { changePageSize } from '../../store/DefaultSlice'
import { parse } from 'yaml';

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

function preventWindowDrop() {
  function preventDrop(e: DragEvent) {
    e.preventDefault()
    e.stopPropagation()
  }
  window.addEventListener('drop', preventDrop)
  window.addEventListener('dragover', preventDrop)
  console.log('addEventListener');

  return () => {
    window.removeEventListener('drop', preventDrop)
  };
}


const Default: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const defaultCustom = state.defaultCustom
  const dispatch = useDispatch()

  useEffect(() => {
    preventWindowDrop()
  }, [])


  return (<div style={{
    margin: '4vh 4vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px'
  }}>
    <div
      style={{
        border: '5px solid gray',
        width: '200px',
        height: '100px'
      }}

      id="drop_zone"
      onDrop={async e => {
        e.preventDefault()
        e.stopPropagation()

        let items = e.dataTransfer.items;
        if (items.length > 1) console.log('只能上传一个文件')
        if (items.length === 0) console.log('items.length === 0')
        const item = items[0]

        const handle = await item.getAsFileSystemHandle() as FileSystemFileHandle;

        const fileData = await handle.getFile()
        const text = await fileData.text()
        const json = parse(text)
        console.log('json json', json);
        console.log('handle handle', handle);

        dispatch(saveDefaultCustomFileHandle({ handle, json }))
      }}
      onDragOver={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragEnter={e => {
        e.preventDefault();
        e.stopPropagation();
      }}
      onDragLeave={e => {
        e.preventDefault();
        e.stopPropagation();
      }}      >
      <p>Drag [default.custom.yaml] to this <i>drop zone</i>.</p>
    </div>

    <RimeSettingItem

      icon={<SimpIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title="简体/繁体">
      <RadioChoice
        values={[true, false]}
        defaultValue={defaultCustom.schema.simplified}
        names={['简体', '繁体']}
        onChange={(value: boolean) => {
          dispatch(changeSimplified(value))
        }} />
    </RimeSettingItem>

    <RimeSettingItem icon={<InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title='输入模式'>
      <RadioChoice
        values={['pinyin', 'double_pinyin', 'wubi']}
        defaultValue={defaultCustom.schema.inputMode}
        names={['拼音', '双拼', '五笔']}
        onChange={(value: string) => {
          dispatch(changeInputMode(value))
        }} />
    </RimeSettingItem>

    <RimeSettingItem
      icon={<MenuSizeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />}
      title='候选词数量'>
      <IntegerStep size={defaultCustom.default.patch['menu/page_size']} onChange={(value: number) => {
        dispatch(changePageSize(value))
      }} />
    </RimeSettingItem>

    {/* 具体方案 */}
    {/* <div>当前方案</div> */}

    {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
    {/* <div>更多方案</div> */}

    <FloatButton
      style={{ display: defaultCustom.default_setting_changed ? 'block' : 'none' }}
      type="primary"
      tooltip={<div>Save</div>}
      onClick={() => dispatch(saveDefaultSetting())} />
  </div >);
}

export default Default;