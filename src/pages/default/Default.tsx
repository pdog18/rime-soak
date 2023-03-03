import React, { useEffect } from 'react'
import { ClusterOutlined as InputTypeIcon, RetweetOutlined as SimpIcon, OrderedListOutlined as MenuSizeIcon } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { changeInputMode, changeSimplified, saveDefaultSetting, initDefaultCustomFile } from '../../store/DefaultSlice'
import { RootState } from '../../store/Store'
import RimeSettingItem, { RadioChoice } from '../../components/RimeSettingItem'
import { FloatButton, InputNumber, notification, Row, Slider } from 'antd'

import { changePageSize } from '../../store/DefaultSlice'
import { parse } from 'yaml'
import { initStyleCustomFromFile } from '../../store/StyleSlice'
import { title } from 'process'
import { initSchemaCustomFromFile } from '../../store/PunctuSlice'


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
}



const Default: React.FC = () => {
  const state = useSelector((state: RootState) => state)
  const defaultCustom = state.defaultCustom
  const dispatch = useDispatch()

  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (title: string, description: string, type: 'success' | 'info' | 'warning' | 'error') => {
    api[type]({
      message: title,
      description: description
    });
  };


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
    {contextHolder}
    <div
      style={{
        border: '2px dotted gray',
        width: '300px',
        height: '120px',
        borderRadius: '16px',
        background: '#dddddd',
        textAlign: 'center'
      }}
      onDrop={async e => {
        e.preventDefault()
        e.stopPropagation()

        let items = e.dataTransfer.items;
        if (items.length > 1) console.log('只能上传一个文件')
        if (items.length === 0) console.log('items.length === 0')

        const handle = await items[0].getAsFileSystemHandle();

        if (!(handle instanceof FileSystemDirectoryHandle)) {
          openNotificationWithIcon('文件类型不符', '请投喂 Rime 文件夹', 'error')
          return
        }
        if (handle?.name !== 'Rime') {
          openNotificationWithIcon('文件夹名不符', '请投喂 Rime 文件夹', 'error')
          return
        }
        // todo 如果 drop 了一个刚好叫 Rime 的文件夹，并且不是「用户文件夹」，此时应该即使报错

        for await (const entry of handle.values()) {
          if (entry instanceof FileSystemFileHandle) {
            switch (entry.name) {
              case 'default.custom.yaml':
                console.log('>>>>>default.custom.yaml');
                const defaultContent = await (await entry.getFile()).text()
                dispatch(initDefaultCustomFile({
                  hd: entry,
                  json: parse(defaultContent)
                }))
                continue
              case 'weasel.custom.yaml':
              case 'squirrel.custom.yaml':
                const styleContent = await (await entry.getFile()).text()
                dispatch(initStyleCustomFromFile({
                  hd: entry,
                  json: parse(styleContent)
                }))
                continue
              case 'pinyin_simp.custom.yaml':
                const schemaCustomContent = await (await entry.getFile()).text()
                dispatch(initSchemaCustomFromFile({
                  hd: handle, // 注意！ 这里传入了 DirectoryHandle
                  json: parse(schemaCustomContent)
                }))
                continue
              default:
                // todo
                continue
            }
          }
        }
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
      }}>
      <p>将 「用户文件夹」Rime 拖入此处 <p style={{ visibility: 'hidden' }}>(绝不会搜集隐私)</p></p>
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
      onClick={() => {
        dispatch(saveDefaultSetting())
        openNotificationWithIcon('保存成功', '请执行「重新部署」，使本次修改生效！', 'success')
      }} />
  </div >);
}

export default Default;