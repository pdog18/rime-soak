import React from 'react';
import { Card, RadioChangeEvent, Row, Radio } from 'antd';
import { ClusterOutlined as InputTypeIcon, RetweetOutlined as SimpIcon } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeInputMode, changeSimplified } from '../../store/SchemaSlice';
import { RootState } from '../../store/store';

const Schema: React.FC = () => {
  const schema = useSelector((state: RootState) => state.schema)
  const dispatch = useDispatch()
  const onSimplifiedChanged = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(changeSimplified(value))
  };

  const onInputModeChanged = ({ target: { value } }: RadioChangeEvent) => {
    dispatch(changeInputMode(value))
  };

  return (<div style={{
    margin: '4vh 4vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '16px'
  }}>
    <Card>
      {/* 拼音 / 双拼 / 五笔 */}
      <Row style={{ width: '60vw' }} justify='space-between'>
        <div><SimpIcon style={{ fontSize: '24px', margin: '0px 16px' }} />简体/繁体</div>

        <Radio.Group defaultValue={schema.simplified} buttonStyle="solid" onChange={onSimplifiedChanged}  >
          <Radio.Button value={true}>简体</Radio.Button>
          <Radio.Button value={false}>繁体</Radio.Button>
        </Radio.Group>
      </Row>
    </Card>

    <Card>
      {/* 繁体 / 简体 */}
      <Row align='middle' style={{ width: '60vw' }} justify='space-between'>
        <div><InputTypeIcon style={{ fontSize: '24px', margin: '0px 16px' }} />输入模式</div>

        <Radio.Group defaultValue={schema.inputMode} buttonStyle="solid" onChange={onInputModeChanged}  >
          <Radio.Button value={'pinyin'}>拼音</Radio.Button>
          <Radio.Button value={'double_pinyin'}>双拼</Radio.Button>
          <Radio.Button value={'wubi'}>五笔</Radio.Button>
        </Radio.Group>
      </Row>
    </Card>

    {/* 具体方案 */}
    <div>当前方案</div>

    {/*  关闭方案选择快捷键( Control + Grave)        放到「按键管理」更合适？?  */}
    <div>更多方案</div>
  </div>);
}

export default Schema;