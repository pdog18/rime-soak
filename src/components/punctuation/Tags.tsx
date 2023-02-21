import React, { useEffect, useRef, useState } from 'react';
import { PlusCircleFilled as PlusIcon, CloseCircleFilled as CloseIcon } from '@ant-design/icons';
import type { InputRef } from 'antd';
import { Space, Input, Tag, theme } from 'antd';
import { useDispatch } from 'react-redux';
import { changeFullShapePunctuation, changeHalfShapePunctuation } from '../../store/PunctuSlice';

const AddTag: React.FC = () => {
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
  const [showClosableIcon, changeShowClosableIcon] = useState(false)
  const { item, record, type } = prop

  const dispatch = useDispatch()

  return (<Tag
    onMouseEnter={() => changeShowClosableIcon(true)}
    onMouseLeave={() => changeShowClosableIcon(false)}
    style={{ fontSize: "14px", height: '24px', width: '40px', textAlign: 'center' }}
    color={prop.color}
    closable={showClosableIcon}
    closeIcon={<CloseIcon style={{ fontSize: "14px" }} />}
    onClose={(e) => {
      e.preventDefault()
      // 首先根据 type 判断是 half_shape 还是 full_shape
      const shape = type == 'half_shape' ? record.half_shape : record.full_shape
      // 然后根据 shape 的类型判断，当前是 {} 还是 string 还是 []
      // 1. 如果是 []， 并且有多个元素，那么过滤
      const hasMultipleElements = (Array.isArray(shape) && shape.length !== 1)
      // 2. 不是有多个元素的 []，那么直接置空就可以了 (1. {},2. 'string,3,[length = 1])
      if (type === 'half_shape') {
        const newShape = hasMultipleElements ? {
          ...record,
          half_shape: shape.filter((char: string) => char !== item),
        } : {
          ...record,
          half_shape: {},
        }
        dispatch(changeHalfShapePunctuation(newShape))
      } else {
        const newShape = hasMultipleElements ? {
          ...record,
          full_shape: shape.filter((char: string) => char !== item),
        } : {
          ...record,
          full_shape: {},
        }
        dispatch(changeFullShapePunctuation(newShape))
      }
    }}>
    {item}
  </Tag>)
}


const Tags = (prop: any) => {
  const { item, record, type } = prop

  if (typeof item == 'string') {
    return <>
      <AtuoShowClosebleIconTag item={item} record={record} type={type} />
      <AddTag   />
    </>
  }

  if (item['commit'] !== undefined) {
    return <>
      <AtuoShowClosebleIconTag color='processing' item={item['commit']} record={record} type={type} />
      <AddTag />
    </>
  }

  if (item['pair'] !== undefined) {
    return <>
      <AtuoShowClosebleIconTag color="success" item={item['pair']} record={record} type={type} />
      <AddTag />
    </>
  }

  if (Array.isArray(item)) {
    return (<>
      {item.map((char, index) => {
        return <AtuoShowClosebleIconTag
          key={`${type}${char}`}
          item={char}
          record={record}
          type={type}
          index={index}
          array={item}
        />
      })}
      <AddTag />
    </ >)
  }

  // 对应 shape 的符号全被删除，此时应该只留下一个 <AddTag/>
  return <AddTag />
};

export default Tags;