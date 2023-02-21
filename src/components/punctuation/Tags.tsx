import React, { useEffect, useRef, useState } from 'react';
import { PlusCircleFilled as PlusIcon, CloseCircleFilled as CloseIcon } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Space, Input, Tag, theme } from 'antd';



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

const AtuoShowClosebleIconTag = (prop: any) => {
  const [closable, changeClosable] = useState(false)
  const item = prop.item
  return (
    <Tag
      onMouseEnter={() => changeClosable(true)}
      onMouseLeave={() => changeClosable(false)}
      style={{ fontSize: "14px", height: '24px' }}
      color={prop.color}
      closable={closable}
      closeIcon={<CloseIcon style={{ fontSize: "14px" }} />}
      onClose={(e) => {
        e.preventDefault()
        console.log('onClose');
      }}>
      {item}
    </Tag>)
}


const Tags = (prop: any) => {
  const { item, record } = prop

  if (record.ascii_style === undefined) {
    return <Tag>space</Tag>
  }

  if (typeof item == 'string') {
    return <>
      <AtuoShowClosebleIconTag item={item} />
      <AddTag />
    </>
  }

  if (item['commit'] !== undefined) {
    return <>
      <AtuoShowClosebleIconTag color='processing' item={item['commit']} />
      <AddTag />
    </>
  }
  if (item['pair'] !== undefined) {
    return <>
      <AtuoShowClosebleIconTag color="success" item={item['pair']} />
      <AddTag />
    </>
  }


  if (Array.isArray(item)) {
    return (<>
      {item.map((char, index) => {
        return <AtuoShowClosebleIconTag
          item={char}
          index={index}
          array={item}
        />
      })}
      <AddTag />
    </>)
  }

  return <Tag>error</Tag>
};

export default Tags;