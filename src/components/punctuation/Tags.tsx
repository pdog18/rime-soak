

import React, { useContext, useEffect, useRef, useState } from 'react';
import { PlusCircleFilled as PlusIcon, CloseCircleFilled as CloseIcon } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Space, Input, Tag, theme } from 'antd';
import { AllConfigContext } from '../../App';
import internal from 'stream';

const AddTag: React.FC = (prop) => {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(['Unremovable', 'Tag 2', 'Tag 3']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef<InputRef>(null);
  const editInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  useEffect(() => {
    editInputRef.current?.focus();
  }, [inputValue]);


  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };


  const tagInputStyle: React.CSSProperties = {
    width: 38,
    verticalAlign: 'top',
  };

  const tagPlusStyle: React.CSSProperties = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };

  return (<Space size={[0, 8]} wrap>
    {inputVisible ? (
      <Input
        maxLength={2}
        ref={inputRef}
        type="text"
        size="small"
        style={tagInputStyle}
        value={inputValue}
        onChange={handleInputChange}
        onBlur={handleInputConfirm}
        onPressEnter={handleInputConfirm}
      />
    ) : (
      <Tag style={tagPlusStyle} onClick={showInput}>
        <PlusIcon style={{ fontSize: '14px', color: '#7cc778' }} />
      </Tag>
    )}
  </Space>)
}


const Tags = (prop: any) => {
  const { setPunctuation } = useContext(AllConfigContext)
  const item = prop.item

  // console.log(prop.item, prop.record.key, prop.type);


  if (item == undefined || item == " ") {
    return <Tag>space</Tag>
  }

  if (typeof item == 'string') {
    return <><Tag
      closable
      closeIcon={<CloseIcon style={{ fontSize: "12px" }} />}
      onClose={() => { console.log('onClose'); }}>
      {item}
    </Tag>
      <AddTag />
    </>
  }

  if (Array.isArray(item)) {
    return (<>
      {item.map((char, index) => {
        return <Tag
          closable
          closeIcon={<CloseIcon style={{ fontSize: "12px" }} />}
          onClose={(e) => {
            e.preventDefault()

            if (Array.isArray(prop.item)) {
              prop.item.map((v: string, index: internal) => {
                if (v == char) {
                  prop.item.splice(index, 1)
                }
              })

              let newValue = prop.item
              if (newValue.length == 1) {
                newValue = newValue[0]
              }

              setPunctuation({
                key: prop.record.key,
                type: prop.type,
                newValue: newValue
              })
            }

          }} key={index}>{char}</Tag>
      })}
      <AddTag />
    </>)
  }

  if (item['commit'] !== undefined) {
    if (item['commit'] === "　") return <Tag>space</Tag>

    return <>
      <Tag
        closable
        closeIcon={<CloseIcon style={{ fontSize: "12px" }} />}
        onClose={() => { console.log('onClose'); }}
        color='processing'>
        {item['commit']}
      </Tag>
      <AddTag />
    </>
  }
  if (item['pair'] !== undefined) {
    return <><Tag
      closable
      closeIcon={<CloseIcon style={{ fontSize: "12px" }} />}
      onClose={() => { console.log('onClose'); }}
      color="success">
      {item['pair']}
    </Tag>
      <AddTag />
    </>
  }

  return <Tag>error</Tag>
};

export default Tags;